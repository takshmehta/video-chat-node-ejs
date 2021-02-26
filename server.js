const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const cors = require("cors");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const authRoute = require("./routes/route_auth");
const emailRoute = require("./routes/route_email");

const users = {};
const socketToRoom = {};

io.on("connection", (socket) => {
  socket.on("join room", (roomID) => {
    if (users[roomID]) {
      const length = users[roomID].length;
      if (length === 4) {
        socket.emit("room full");
        return;
      }
      users[roomID].push(socket.id);
    } else {
      users[roomID] = [socket.id];
    }
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);

    socket.emit("all users", usersInThisRoom);
  });

  socket.on("sending signal", (payload) => {
    io.to(payload.userToSignal).emit("user joined", {
      signal: payload.signal,
      callerID: payload.callerID,
    });
  });

  socket.on("returning signal", (payload) => {
    io.to(payload.callerID).emit("receiving returned signal", {
      signal: payload.signal,
      id: socket.id,
    });
  });

  socket.on("disconnect", () => {
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    if (room) {
      room = room.filter((id) => id !== socket.id);
      users[roomID] = room;
    }
  });
});

const PORT = process.env.port || 3000;

app.use(bodyparser.json());

//connecting with database
db = "mongodb://localhost:27017/newdb";
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connection is successfull");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use("/api", authRoute);
app.use("/api", emailRoute);

// app.get("/", (req, res) => {
//   res.json({ messsage: "working" });
// });

server.listen(PORT, () => {
  console.log(`The app is running at ${PORT}`);
});
