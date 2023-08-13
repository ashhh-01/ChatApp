import SendIcon from "@mui/icons-material/Send";
import * as React from 'react';
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Button, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import MicOffIcon from '@mui/icons-material/MicOff';
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { useReactMediaRecorder } from "react-media-recorder";

import Popper from '@mui/material/Popper';
import Grow from '@mui/material/Grow';
import MenuList from '@mui/material/MenuList';




//Mic setting
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import Stack from '@mui/material/Stack';

import "../mic.scss"






export default function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);
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
          console.log("here", error);
          // setErr(true)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else if(text) {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  const [isActive, setIsActive] = useState(false);

  const handleKey = (e) => [e.code === "Enter" && handleSend()];





  // const {
  //   status,
  //   startRecording,
  //   stopRecording,
  //   pauseRecording,
    
  // } = useReactMediaRecorder({
  //   video: false,
  //   audio: true,
  //   echoCancellation: true
  // });







  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);







  return (
    <>
    {data.user.displayName &&
    <div className="input">
      <input
        type="text"
        placeholder="Type Message"
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={handleKey}
      />

      <div className="send">
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        {/*  */}
        <label htmlFor="file" className="chatIcons">
          <AttachFileIcon />
        </label>



          
        {/* <IconButton className="chatIcons" size="large" color="inherit"
                  ref={anchorRef}
                  id="composition-button"
                  aria-controls={open ? 'composition-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
        onClick={() => {
                  if (!isActive) {
                    handleToggle
                    handleClose
                    // startRecording();
                  } 
                  // else {
                  //   // pauseRecording();
                  // }

                  setIsActive(!isActive);
                }}>
          
          {isActive ? <MicIcon sx={{color:"rgb(78, 128, 255)"}} onClick={ handleToggle} /> : <MicOffIcon onClick={handleClose}/>}

        </IconButton> */}




<IconButton
  className="chatIcons"
  size="large"
  color="inherit"
  ref={anchorRef}
  id="composition-button"
  aria-controls={open ? 'composition-menu' : undefined}
  aria-expanded={open ? 'true' : undefined}
  onClick={() => {
    // Toggle the menu visibility and state
    handleToggle();
    setIsActive(!isActive);
  }}
>
  {isActive ? (
    <MicIcon sx={{ color: "rgb(78, 128, 255)" }} />
  ) : (
    <MicOffIcon />
  )}
</IconButton>












        
        {/* <IconButton
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Dashboard
        </IconButton>*/}

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                    className="micMenu"
                  >
                    {/* <MenuItem onClick={()=>{handleClose(),setIsActive(!isActive);}}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                    <Stack direction="row" spacing={0.5} sx={{padding:2}}justifyContent="center">
  <span className="box box1"></span>
  <span className="box box2"></span>
  <span className="box box3"></span>
  <span className="box box4"></span>
  <span className="box box5"></span>
  <span className="box box2"></span>
  <span className="box box4"></span>
  <span className="box box5"></span>


</Stack>
<Stack direction="row" spacing={2}   justifyContent="center"
>
<RadioButtonCheckedIcon className="recBtn"  />
</Stack>

<Stack direction="row"    justifyContent="center"
>
<Typography sx={{margin:1}} className="rec">Recording</Typography>
</Stack>

                  </MenuList>
            </Grow>
          )}
        </Popper> 











        <Button
          size="small"
          className="chatIcons"
          type="submit"
          onClick={handleSend}
        >
          <SendIcon />
        </Button>
      </div>

    </div>
      }
    </>
  );
}
