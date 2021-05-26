import React from 'react'
import { useSelector } from "react-redux";
import { selectUser } from "../reducer/infuser";

export default function Admin() {

    const user = useSelector(selectUser);

    return (
        <div >
            <h1>Kullanıcı adı: {user.username}</h1>
            <h2>Rol: {user.role}</h2>
            
            <img alt="de" src="https://teleme.io/assets/feature_updates/tg_group_admins.jpg"></img>
        </div>
    )
}
