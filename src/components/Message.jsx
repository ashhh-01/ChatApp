import Avatar from '@mui/material/Avatar';

export default function Message(){
    return(
        <div className="message owner">
            <div className="messageInfo">
            <Avatar  alt="Remy Sharp" src="https://cdn.dribbble.com/users/3484830/screenshots/16310649/media/49fbb89808a5b92fbad58d5b6729205c.gif"/>

                <span>Just Now</span>
            </div>
                <div className="messageContent">
                <p>Hello</p>
                <img className='chatimg' src="https://cdn.dribbble.com/users/3484830/screenshots/16310649/media/49fbb89808a5b92fbad58d5b6729205c.gif" alt="" />
            </div>
        </div>
        )
}