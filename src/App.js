import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Profile from "./pages/Profile";
import AllUsers from "./pages/AllUsers";
import { logoutz } from "./reducer/infuser";
import { islogged } from "./action/index";
import { useDispatch } from "react-redux";
import Axios from "axios";
import SideBar from "./SideBar/SideBar";
import RememberMe from "./pages/RememberMe";
import Chat from "./pages/Chat";
import BuyPage from "./pages/BuyPage";

function App(props) {
  const [role, setRole] = useState("");

  const dispatch = useDispatch();

  Axios.defaults.withCredentials = true;

  const logout = () => {
    Axios.get("http://localhost:3001/api/logout");

    dispatch(logoutz());
    dispatch(islogged());
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/api/login").then((response) => {
      if (response.data.loggedIn === true) {
        //console.log(response)
        setRole(response.data.user[0].role);
      }
    });
  }, []);

  return (
    <>
      <div>
        {role === "visitor" || role === "admin" || role === "mod" ? (
          <div className="Navbar">
            <div class="dropdown">
              {role === "visitor" || role === "admin" || role === "mod" ? (
                <a
                  style={{
                    backgroundColor: "#242526",
                    border: "none",
                    fontSize: "30px",
                  }}
                  className="btn btn-secondary dropdown-toggle"
                  href="/"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Ayarlar
                </a>
              ) : (
                " "
              )}

              <ul style={{backgroundColor:"#242526"}} className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                {role === "visitor" || role === "admin" || role === "mod" ? (
                  <li>
                    <a style={{
                    backgroundColor: "#242526",color:"white"}} className="dropdown-item" href="/profile">
                      Profil
                    </a>
                  </li>
                ) : (
                  ""
                )}
                {role === "admin" ? (
                  <li>
                    <a className="dropdown-item" href="/AllUsers">
                      Kullanıcılar
                    </a>
                  </li>
                ) : (
                  ""
                )}
                {role === "visitor" || role === "admin" || role === "mod" ? (
                  <li>
                    <a style={{
                    backgroundColor: "#242526",color:"white"}} className="dropdown-item" href="/rememberme">
                      Remember Me
                    </a>
                  </li>
                ) : (
                  ""
                )}
                {role === "visitor" || role === "admin" || role === "mod" ? (
                  <li>
                    <a style={{
                    backgroundColor: "#242526",color:"white"}} className="dropdown-item" href="/" onClick={logout}>
                      Çıkış Yap
                    </a>
                  </li>
                ) : (
                  ""
                )}
                
              </ul>
            </div>
            <div className="links">
              <div
                style={{ position: "absolute", right: "36%", width: "17%" }}
                className="input-group flex-nowrap"
              >
                <span
                  className="input-group-text bi bi-search"
                  id="addon-wrapping"
                ></span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Randqua'da ara"
                  aria-label="Username"
                  aria-describedby="addon-wrapping"
                />
              </div>

              <img
                alt="de"
                style={{
                  position: "absolute",
                  right: "97%",
                  top: "0%",
                  height: "60px",
                  width: "60px",
                }}
                src="https://i.hizliresim.com/ABncva.png"
              ></img>
            </div>
          </div>
        ) : (
          <div className="NavbarX"></div>
        )}
      </div>

      <div className="App">
        {role === "visitor" || role === "admin" || role === "mod" ? (
          <SideBar />
        ) : (
          <div className="SidebarX"></div>
        )}
      </div>

      <Router>
        <Route path="/" exact render={(props) => <LoginPage />} />
        <Route path="/Register" render={(props) => <RegisterPage />} />
        <Route path="/HomePage" render={(props) => <HomePage />} />
        <Route path="/Login" render={(props) => <LoginPage />} />
        <Route path="/posts" render={(props) => <MainPage />} />
        <Route path="/createpost" render={(props) => <CreatePost />} />
        <Route path="/post/:postId" render={(props) => <Post />} />
        <Route path="/Profile" render={(props) => <Profile />} />
        <Route path="/AllUsers" render={(props) => <AllUsers />} />
        <Route path="/rememberme" render={(props) => <RememberMe />} />
        <Route path="/Chat" render={(props) => <Chat />} />
        <Route path="/Buy" render={(props) => <BuyPage />} />
      </Router>
    </>
  );
}

export default App;
