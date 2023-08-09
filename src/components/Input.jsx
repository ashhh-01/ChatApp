import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';




export default function Input(){
    return (
        <div className="input">
            <Box > 
            <TextField sticky="bottom" sx={{ input: { color: 'rgba(255, 255, 255,0.7)'} , border:"rgba(255, 255, 255,0.7) solid 1px"}} className='text'fullWidth id="fullWidth" placeholder="Hello World"/>
            </Box>

        </div>
    )
}