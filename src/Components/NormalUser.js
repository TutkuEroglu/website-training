import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { editz, selectUser } from "../reducer/infuser";

export default function NormalUser() {
  const [userx, setUserX] = useState([]);
  const [visible, setVisible] = useState(true);
  const [newUser, SetNewUser] = useState("");
  const [userId, setUserID] = useState("");
  const [alertx, setAlertX] = useState(true);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  Axios.defaults.withCredentials = true;

  const edit = () => {
    Axios.post("http://localhost:3001/api/change", {
      newusername: newUser,
      newid: userId,
    });
    SetNewUser("");
    setAlertX(false);
    setTimeout(() => {
      setAlertX(true);
      window.location.reload(false);
    }, 3000);
    dispatch(
      editz({
        id: userx[0].id,
        username: newUser,
        password: userx[0].password,
        role: userx[0].role,
        loggedIn: true,
      })
    );
    setVisible(!visible);
  };

  const vis = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    getUser();
  }, [newUser]);

  const getUser = async () => {
    const res = await Axios.get("http://localhost:3001/api/login");
    if (res.data.loggedIn === true) {
      setUserX(res.data.user);
      setUserID(res.data.user[0].id);
    }
  };

  return (
    <div style={{color:"white"}}>
      <div className="zz" key={user.id}>
        <h1>
          Kullanıcı Adın: {""}
          {visible ? (
            user.username
          ) : (
            <>
              {" "}
              <input
                style={{
                  position: "absolute",
                  width: "350px",
                  right: "21%",
                  top: "0.7%",
                  height: "40px",
                }}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => {
                  SetNewUser(e.target.value);
                }}
                placeholder={user.username}
              />
              <button
                className="btn btn-warning"
                style={{
                  position: "absolute",
                  right: "15%",
                  top: "-0.7%",
                  height: "5%",
                }}
                onClick={edit}
              >
                Güncelle
              </button>{" "}
            </>
          )}
        </h1>
        {alertx ? (
          ""
        ) : (
          <div
            style={{
              position: "absolute",
              right: "10%",
              width: "20%",
              height: "20%",
              textAlign: "center",
              fontSize: "25px",
              paddingTop: "50px",
              top: "0%",
            }}
            className="alert alert-success"
            role="alert"
          >
            KULLANICI ADINI BAŞARIYLA DEĞİŞTİRDİN!
          </div>
        )}
        <button
          className="btn btn-warning"
          style={{
            position: "absolute",
            right: "44%",
            top: "6%",
            height: "5%",
          }}
          onClick={vis}
        >
          Kullanıcı adını değiştir
        </button>
        <br />
        <br />
        <br />
        <h1>Rolün: {user.role}</h1>
      </div>

      <img
        alt="de"
        src="https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331257__340.png"
      ></img>
      <h2 style={{ position: "absolute", top: "57%", right: "35%" }}>
        Fotoğrafını değiştirmek ister misin?
      </h2>

      <div
        style={{ position: "absolute", top: "62%", right: "35%" }}
        className="input-group mb-3"
      >
        <label
          className="input-group-text bi bi-cloud-arrow-up"
          for="inputGroupFile01"
        ></label>
        <input type="file" className="form-control" id="inputGroupFile01" />
      </div>
      <button
        style={{ position: "absolute", top: "66%", right: "46.8%" }}
        className="btn btn-success"
      >
        Değiştir
      </button>
    </div>
  );
}
