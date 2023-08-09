import TextField from '@mui/material/TextField';
import * as React from 'react';

import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



export default function Login(){
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    return(
        <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">WhatsApp</span>
            <span className="title">Login</span>
            <form>
            <TextField id="standard-basic" label="Email" variant="standard" type="email" />

            {/* Password */}
            <FormControl sx={{ width: '35ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton 
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  className='eyeIcon'

                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton >
              </InputAdornment>
            }
          />
        </FormControl>


                <button>Sign In</button>
            </form>
            <p>Don't have an account? Register</p>
            </div>
            </div>
    )
}