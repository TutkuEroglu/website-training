import axios from "axios";
import React, { useState, useEffect } from "react";

export default function AllUsers() {
  const [alluser, setAllUser] = useState([]);

  useEffect(() => {
    axios.post("http://localhost:3001/api/allusers").then((response) => {
      setAllUser(response.data);
    });
  }, []);

  return (
    <div className="Appx">
       
       <h1>Sitemize kayıtlı tüm kullanıcılar<span className="badge bg-secondary">^_^</span></h1>   
       <br/>
       <br/>
       <br/>      
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Kullanıcı Adı</th>
            <th scope="col">Şifre</th>
            <th scope="col">Rol</th>
          </tr>
        </thead>
        <tbody>
        {alluser.map((item, key) => {
              return (
          <tr key={item.id}>
            <th scope="row">{item.id}</th>
            <td>{item.username}</td>
            <td>{item.password}</td>
            <td>{item.role}</td>
          </tr>
          )})}
        </tbody>
      </table>
      
    </div>
    
  );
}
