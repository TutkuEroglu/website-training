import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { islogged } from "../action/index";
import { loginz, selectUser } from "../reducer/infuser";
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const isLogged = useSelector((state) => state.isLogged);
  const UserSelect = useSelector(selectUser);

  const override = css`
  position:absolute;
  display: block;
  margin: 0 auto;
  right: 56%;
  top:35%;
`;

  const dispatch = useDispatch();
  let history = useHistory();

  Axios.defaults.withCredentials = true;

  const login = () => {
    Axios.post("http://localhost:3001/api/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        console.log(loginStatus);
        setLoginStatus(response.data.message);
      } else {
        setTimeout(() => {
          window.location.reload(false);
          dispatch(
            loginz({
              id: response.data[0].id,
              username: username,
              password: password,
              role: response.data[0].role,
              loggedIn: true,
            })
          );
          dispatch(islogged());
        }, 100);
      }
      history.push("/HomePage");
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/api/login")
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, 2700);
  }, [])

  return (
    <div className="Appx">
    {loading ? (<BounceLoader css={override} size={70} color={"#880115"} loading={loading} />) : (<div className="xxxx">
      
    <div style={{position:"absolute", top:"25%", fontSize:"30px", right:"50%"}} className="mb-3">
      <label style={{color:"white"}}className="form-label">Kullanıcı Adı</label>
      <input
        type="email"
        className="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <div id="emailHelp" className="form-text"></div>
    </div>
    <div style={{position:"absolute", top:"35%", fontSize:"30px",right:"50%"}} className="mb-3">
      <label style={{color:"white"}} htmlFor="exampleInputPassword1" className="form-label">
        Şifre
      </label>
      <input
        type="password"
        className="form-control"
        id="exampleInputPassword1"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <div id="emailHelp" className="form-text">
      </div>
    </div>
    <button style={{position:"absolute", top:"47%", right:"50%"}} type="submit" className="btn btn-success" onClick={login}>
      Giriş Yap
    </button>
    <div style={{position:"absolute",top:"57%",right:"44.5%",fontSize:"25px",color:"white"}}>Eğer hesabın yoksa <a href="/register">buraya</a> tıklayarak hesap oluşturabilirsin.</div>
  </div>) }
  </div>
  );
}
