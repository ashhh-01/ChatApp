import { useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import Message from "./Message";
import { doc, onSnapshot } from "firebase/firestore";
import * as React from "react";
import { db } from "../firebase";
import Input from "./Input";

export default function Messages() {
  const [messages, setMessage] = useState([]);
  const { data } = React.useContext(ChatContext);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessage(doc.data().messages);
    });
    return () => {
      unsub();
    };
  }, [data.chatId]);
  // console.log(messages)

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
}
