import TextField from "@mui/material/TextField";
import * as React from "react";

import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { Alert } from "@mui/material";

export default function Login() {
  const [err, setErr] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //2 doesnt exist its the visiblity button
    const password = e.target[1].value;
    const email = e.target[0].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/ChatApp/");
    } catch (err) {
      const errorCode = err.code;
      const errorMessage = err.message;
      console.log(errorCode, errorMessage);
      setErr(true);
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">ChatApp</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            type="email"
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
                    className="eyeIcon"
                  >
                    {showPassword ? (
                      <VisibilityOff sx={{ width: 15, height: 15 }} />
                    ) : (
                      <Visibility sx={{ width: 15, height: 15 }} />
                    )}{" "}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <button>Sign In</button>
          {err && <Alert severity="error">Email/Password Doesn't Match.</Alert>}
        </form>

        <p>
          Don't have an account? <Link to="/ChatApp/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
