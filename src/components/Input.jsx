import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { BottomNavigationAction, Box, Button, IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';

export default function Input(){
    return (
        <div className="input">

        <input type="text" placeholder='Type Message' />

            <div className="send">
            <input type="file"style={{display:"none"}}id="file" />
                <label htmlFor="file" className='chatIcons'>
                <AttachFileIcon/>
                </label>
                <IconButton className='chatIcons' size="large" color="inherit" type='submit'>
                <MicIcon/>
                </IconButton>
                 {/* <IconButton className='chatIcons' size="large" color="inherit" type='submit'>
                <SendIcon/>
                </IconButton> */}

        <Button size="small" className='chatIcons'>                
        <SendIcon/>
        </Button>
            </div>

        </div>
    )
}