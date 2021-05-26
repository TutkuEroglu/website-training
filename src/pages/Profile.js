import React from "react";
import Axios from "axios";
import NormalUser from "../Components/NormalUser";
import Mod from "../Components/Mod";
import Admin from "../Components/Admin";
import { useSelector } from "react-redux";
import { selectUser } from "../reducer/infuser";

export default function Profile() {
  

  Axios.defaults.withCredentials = true;

  const user = useSelector(selectUser);

  return (
    <div className="Appx">
      {user.role === "visitor" && <NormalUser />} 
      {user.role === "mod" && <Mod />}
      {user.role === "admin" && <Admin />}
    </div>
  );
}