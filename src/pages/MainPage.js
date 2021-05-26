import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../reducer/infuser";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { BsHeartFill } from "react-icons/bs";
import ReactScrollableFeed from "react-scrollable-feed";

export default function MainPage() {
  const [postList, setPostList] = useState([]);
  const [role, setRole] = useState("");

  const user = useSelector(selectUser);

  let history = useHistory();

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("http://localhost:3001/api/login").then((response) => {
      if (response.data.loggedIn === true) {
        setRole(response.data.user[0].role);
      }
    });
    Axios.get("http://localhost:3001/api/get/").then((data) => {
      setPostList(data.data);
      console.log(data.data);
    });
  }, []);

  const likePost = (id) => {
    Axios.post(`http://localhost:3001/api/like/${id}`).then((response) => {
      console.log("response");
      alert("you liked the post");
    });
  };

  const deletex = (id) => {
    Axios.post(`http://localhost:3001/api/delete/${id}`);
    setTimeout(() => {
      window.location.reload(false);
    }, 200);
  };

  return (
    <div className="Appx">
      <ReactScrollableFeed>
        <div style={{backgroundColor:"#18191A", color:"white"}} className="PostContainer">
          {postList.map((val, key) => {
            return (
              <div

                className="Post"
                style={{ border: "1px solid #242526",backgroundColor:"#242526", borderTopRightRadius:"25px", borderTopLeftRadius:"25px" }}
                key={key}
                onClick={() => {
                  //history.push(`/post/${val.id}`);
                }}
              >
                <div style={{position:"absolute",right:"92.3%"}} className="bottom">
                  <h4>{user.username}</h4>
                </div>
                <h1>{val.title}</h1>
                <p>
                  {val.post_text.length > 500
                    ? val.post_text.substring(0, 500) + "..."
                    : val.post_text}
                </p>
                <BsHeartFill
                  style={{
                    position: "relative",
                    right: "48.8%",
                    top: "27px",
                    color: "#633b86",
                  }}
                />
                <div style={{ display: "flex", fontSize: "20px"}}>
                  {" "}
                  <AiFillLike
                    style={{ position: "relative", right: "90%" }}
                  />{" "}
                  <strong>{val.likes} like</strong>
                  </div>
                  <div
                  onClick={() => {
                    likePost(val.id)
                  }}
                  className="likes"
                  style={{
                    position: "absolute",
                    right: "49.9%",
                    width: "462px",
                    border: "1px solid #18191A",
                    color: "white",
                    borderBottomLeftRadius:"10px"
                  }}
                >
                  <AiFillLike/>
                  Beğen
                </div>
                <div
                  className="likes"
                  style={{
                    position: "absolute",
                    right: "3.8%",
                    width: "462px",
                    border: "1px solid #18191A",
                    color: "white",
                    borderBottomRightRadius:"10px"
                  }}
                >
                  <AiFillDislike />
                  disslike
                </div>
                

                

                {role === "admin" ? (
                  <button
                    className="btn-success bi bi-trash"
                    onClick={() => {
                      deletex(val.id);
                    }}
                  >
                    Sil
                  </button>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </ReactScrollableFeed>
    </div>
  );
}
