import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import { useState } from 'react';
import Messages from './Messages';
import Input from './Input';

export default function Chat(){
    const [Mute,Unmute]=useState("false")
    const toggleMute=()=>{
        Unmute(!Mute)
    }
    return( 
    <div className="chat">
        <div className="chatInfo">
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:"black"}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Jacob
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <NotificationsActiveOutlinedIcon />
              </Badge>
            </IconButton>
            <IconButton onClick={toggleMute} size="large" aria-label="show 4 new mails" color="inherit">
              {Mute?<VolumeOffOutlinedIcon/>:<VolumeUpOutlinedIcon/>}
            </IconButton>
 

            </Box>        
            </Toolbar>
      </AppBar>
    </Box>
        <Messages/>
        <Input/>
        </div>

    </div>
)}