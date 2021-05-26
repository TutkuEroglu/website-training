import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import ReactScrollableFeed from "react-scrollable-feed";
import "./Chat.css"
import { useSelector } from "react-redux";
import { selectUser } from "../reducer/infuser";



let socket;
const CONNECTION_PORT = "localhost:3001";

function Chat() {
  // before login
  
  const user = useSelector(selectUser);


  const [loggedIn, setLoggedIn] = useState(false);
  const [userName] = useState("");
  const [room, setRoom] = useState("Class of 2023");

  // after login

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    });
  });

  const connectToRoom = () => {
    setLoggedIn(true);
    socket.emit("join_room", room);
  };

  const sendMessage =  (e) => {
    let messageContent = {
      room: room,
      content: {
        author: user.username,
        message: message,
      },
    };

    setMessage("");
    e.preventDefault();
    
    socket.emit("send_message", messageContent);
    setMessageList([...messageList, messageContent.content]);
    
    
  };

  return (
    <div className="Appq">
      {!loggedIn ? (
        <div className="logIn">
          <div className="inputs">
           
            <input
              type="text"
              placeholder="Room..."
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
          </div>
          <button onClick={connectToRoom}>Enter Chat</button>
        </div>
      ) : (
        <div className="chatContainer">
          <ReactScrollableFeed>
            <div className="messages">
              {messageList.map((val, key) => {
                return (
                  <div
                    className="messageContainer"
                    id={val.author === userName ? "Other" : "You"}
                  >
                    <div className="messageIndividual">
                      {val.author}: {val.message}
                    </div>
                  </div>
                );
              })}
            </div>
          </ReactScrollableFeed>
          <div className="messageInputs">
            <input
              type="text"
              value={message}
              placeholder="Message..."
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;