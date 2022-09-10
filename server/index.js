import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { on } from "events";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection",(socket) => {
    console.log("Client connected", socket.id);

    socket.on("join_room",(data) =>{
        console.log("Client joined room", data);
        socket.join(data.room)
    })

    socket.on("send_message", (data) => {
        console.log(data)
        socket.to(data.room).emit("receive_message", data)
    })

    socket.on("disconnect",() => {
        console.log("Client disconnected", socket.id);
    })
})


server.listen(5000, () => {
  console.log("Listening on port 5000");
});
