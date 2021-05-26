import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";

export default function Post() {
  let { postId } = useParams();

  const [post, setPost] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/getFromId/${postId}`).then((data) => {
      setPost({
        title: data.data[0].title,
        postText: data.data[0].post_text,
        userName: data.data[0].user_name,
      });
      console.log(data.data);
    });
  }, []);

  return (
    
    <div className="Appx"> 
      <div className="Post individual">
        <h1>{post.title}</h1>
        <p>{post.postText}</p>
        <h4>{post.userName}</h4>
      </div>
    </div>
  );
}
