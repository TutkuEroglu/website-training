const express = require("express");
const app = express();
const http = require("http");
var server = app.listen(3001);
const mysql = require("mysql");
const bodyParser = require("body-parser");

const cors = require("cors");

const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = mysql.createPool({
  host: "localhost:3306",
  user: "randquac_randqua",
  password: "Tutku.@015",
  database: "randquac_blogposts",
});

app.use(
  cors({
    origin: ["www.randqua.com"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 60 * 60 * 24,
    },
  })
);

const io = require("socket.io")(server, {
  cors: {
    origin: "www.randqua.com",
    methods: ["GET", "POST"],
  },
});

const PORT = 3001;

app.get("/api/get", (req, res) => {
  db.query("SELECT * FROM posts", (err, result) => {
    if (err) {
      console.log(err);
    }

    res.send(result);
  });
});

app.post("/api/register", (req, res) => {
  const userName = req.body.username;
  const password = req.body.password;
  const role = req.body.role;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO users (username, password, role) VALUES (?,?,?)",
      [userName, hash, role],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

app.get("/api/getFromId/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM posts WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }

    res.send(result);
  });
});

app.post("/api/create", (req, res) => {
  const username = req.body.userName;
  const title = req.body.title;
  const text = req.body.text;

  db.query(
    "INSERT INTO posts (title, post_text, user_name) VALUES (?,?,?)",
    [title, text, username],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

app.post("/api/like/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "UPDATE posts SET likes = likes + 1 WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

app.post("/api/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            console.log(req.session.user);
            res.send(result);
          } else {
            res.send({ message: "yanlış kullanıcı adı/şifre kombinasyonu" });
          }
        });
      } else {
        res.send({ message: "Kullanıcı bulunamadı" });
      }
    }
  );
});

app.get("/api/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.get("/api/logout", (req, res) => {
  if (req.session.user) {
    res.clearCookie("userId");
    res.redirect("/");
  }
});

app.post("/api/change", (req, res) => {
  const idx = req.body.newid;
  const userName = req.body.newusername;
  const sqlUpdate = "UPDATE users SET  username = ? WHERE id = ?;";

  db.query(sqlUpdate, [userName, idx], (err, result) => {
    if (err) console.log(err);
  });
});

app.post("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM posts WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
});

app.post("/api/allusers", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.post("/api/remember", (req, res) => {
  const remember = req.body.remember;
  const rememberpass = req.body.rememberpass;
  const id = req.body.idx;
  db.query(
    "UPDATE users SET remember = ?, rememberpassword = ? WHERE id = ?",
    [remember, rememberpass, id],
    (err, result) => {
      console.log(err);
    }
  );
});

app.post("/api/rememberr", (req, res) => {
  const idx = req.body.idx;
  db.query("SELECT * FROM users WHERE id = ?;", idx, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("user joined the room: " + data);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data.content)
  })

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

