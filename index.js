const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());

require("dotenv").config();
// Create server
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const p2pserver = require("socket.io-p2p-server").Server;
const io = new Server(server);
io.use(p2pserver);

// Connect to database
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
});

mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`Listen to port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
