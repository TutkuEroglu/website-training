import React, { useState } from "react";
import Axios from "axios";

export default function RegisterPage() {
  const [userNameReg, setUserNameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [roleReg] = useState("visitor");
  const [hidd, setHidd] = useState(true);

  Axios.defaults.withCredentials = true;

  const register = () => {
    Axios.post("http://localhost:3001/api/register", {
      username: userNameReg,
      password: passwordReg,
      role: roleReg,
    })
    setHidd(false)
  };

  return (
    <div className="Appx">
      <div style={{position:"absolute", top:"25%", fontSize:"30px", right:"50%"}} className="mb-3">
        <label className="form-label">
          Kullanıcı Adı
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          onChange={(e) => {
            setUserNameReg(e.target.value);
          }}
        />
      </div>
      <div  style={{position:"absolute", top:"35%", fontSize:"30px",right:"50%"}} className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Şifre
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
      </div>
      <button style={{position:"absolute", top:"47%", right:"50%"}} type="submit" className="btn btn-primary" onClick={register}>
        Kayıt Ol
      </button>

      <div style={{position:"absolute",top:"57%",right:"45.5%",fontSize:"25px"}}>Zaten bir hesabın varsa <a href="/login">buraya</a> tıklayarak giriş yapabilirsin.</div>
      {hidd ? "" : (<div className="alert alert-success" role="alert">
    Başarıyla kayıt oldun. Giriş yapabilirsin!
      </div>)}
    </div>
  );
}
