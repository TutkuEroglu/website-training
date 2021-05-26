import React, { useState, useEffect } from "react";
import "../App.css";
import Axios from "axios";

export default function CreatePost() {

  const [userx, setUserX] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const res = await Axios.get("http://localhost:3001/api/login");
    if (res.data.loggedIn === true) {
      setUserX(res.data.user[0].username);
      console.log(res.data.user[0].username);
    }
  };


  const submitPost = () => {
    Axios.post("http://localhost:3001/api/create", {
      userName: userx,
      title: title,
      text: text,
    })
    setTimeout(() => {
      window.location.reload(false);
    }, 300);
  };

  return (
    <div style={{position:"absolute"}} className="Appx">
      <div style={{position:"absolute",top:"13%",right:"45%"}}className="uploadPost">
        <label>Başlık</label>
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label>Post</label>
        <textarea
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button className="btn btn-success" onClick={submitPost}>Gönder</button>
      </div>
    </div>
  );
}
