import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import TextField from "@mui/material/TextField";
import * as React from "react";

import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { Alert } from "@mui/material";

export default function Register() {
  const [err, setErr] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //2 doesnt exist its the visiblity button
    const displayName = e.target[0].value;
    const password = e.target[1].value;
    const email = e.target[3].value;
    const file = e.target[4].files[0];
    console.log(email, password, displayName);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (err) {
      const errorCode = err.code;
      const errorMessage = err.message;
      console.log(errorCode, errorMessage);
      setErr(true);
    }
    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     console.log(user)
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(errorMessage, errorCode)
    //     // ..
    //   });
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">WhatsApp</span>
        <span className="title">Register</span>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <TextField
            id="standard-basic"
            label="User Name"
            variant="standard"
            type="text"
          />
          {/* Password */}
          <FormControl sx={{ width: "35ch" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? (
                      <VisibilityOff sx={{ width: 15, height: 15 }} />
                    ) : (
                      <Visibility sx={{ width: 15, height: 15 }} />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            type="email"
          />

          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            placeholder=""
            name=""
          />
          <label htmlFor="file">
            <InsertDriveFileIcon />
            <span>Upload profile</span>
          </label>
          <button>Sign Up</button>
          {err && <Alert severity="error">Invalid Email/Password.</Alert>}
        </form>
        <p>
          Do you have an account? <Link to="/ChatApp/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
