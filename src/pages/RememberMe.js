import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { selectUser } from "../reducer/infuser";

export default function RememberMe() {

    const [rememberP, setRememberP] = useState("");
    const [rememberPass, setRememberPass] = useState("");
    const [idx, setIdx] = useState("");
    const [savedP, setSavedP] = useState("");
    const [savedPass, setSavedPass] = useState("");
    const [hidd, setHidd] = useState(true)

    const user = useSelector(selectUser);

    const Sendx = () => {
        axios.post("http://localhost:3001/api/remember", {
            remember: rememberP,
            rememberpass: rememberPass,
            idx: idx,
        }).then((response) => {
            console.log(response)
            
        })
        setTimeout(() => {
            window.location.reload(false);
        }, 500);
    }

    useEffect(() => {
        setIdx(user.id)
    }, [])

    const Savex = () => {
        setHidd(!hidd)
        axios.post("http://localhost:3001/api/rememberr", {
            idx: idx,
        }).then((response) => {
            setSavedP(response.data[0].remember)
            setSavedPass(response.data[0].rememberpassword)
            console.log(savedP)
        })
    }


    return (
        
        <div style={{color:"white"}}className="Appx">
            <h1 style={{position:"absolute",fontSize:"50px",right:"40%"}}>Unuttuğun Şifrelerini Kaydet<span style={{position:"absolute",right:"-37%",top:"7%"}}className="badge bg-secondary">Yeni Özellik</span></h1>

            <div style={{position:"absolute",width:"500px",right:"40.3%",top:"7%"}} class="form-floating">
            <input style={{fontSize:"25px"}} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e) => {setRememberP(e.target.value)}}/>
            <label htmlFor="floatingInput">Platform Adı</label>
            </div>
            <div style={{position:"absolute",width:"500px",right:"40.3%",top:"15%"}} className="form-floating">
            <input style={{fontSize:"25px"}} type="password" className="form-control" id="floatingPassword" placeholder="Şifren" onChange={(e) => {setRememberPass(e.target.value)}}/>
            <label htmlFor="floatingPassword">Şifren:</label>
            </div>
            <br/>
            <button style={{position:"absolute",top:"23%",right:"41%"}} className="btn btn-success" onClick={Sendx}>Kaydet</button>

            <button style={{position:"absolute",top:"35%",right:"49%"}} className="btn btn-success" onClick={Savex}>Kaydettiklerimi Göster</button>
            <br/>
            
           {hidd ? "" : (<div style={{position:"absolute",fontSize:"45px",top:"43%",right:"35%"}}>Platform: {savedP} | Şifren: {savedPass} </div>) }
           
        </div>
    )
}
