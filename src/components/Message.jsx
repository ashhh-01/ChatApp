import Avatar from "@mui/material/Avatar";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export default function Message({ message }) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${
        message.senderId === currentUser.uid ? "owner" : "guest"
      }`}
    >
      <div className="messageInfo">
        <Avatar
          alt="Remy Sharp"
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
        />

        <span>Just Now</span>
      </div>
      <div className="messageContent">
        {message.text && <p>{message.text}</p>}
        {message.img && <img className="chatimg" src={message.img} alt="" />}
      </div>
    </div>
  );
}
