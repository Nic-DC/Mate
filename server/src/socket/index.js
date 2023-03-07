import MessageController from "./controllers/MessageController.js";
import RoomController from "./controllers/RoomController.js";
import TypingController from "./controllers/TypingController.js";

import fs from "fs";

export const handleSockets = (socket) => {
  console.log("NEW CONNECTION WITH SOCKET ID: ", socket.id);

  const typingController = new TypingController(socket);
  const messageController = new MessageController(socket);
  const roomController = new RoomController(socket);

  // typing
  socket.on("typing-started-client", typingController.typingStarted);
  socket.on("typing-stopped-client", typingController.typingStopped);

  // messages
  socket.on("message-client", messageController.sendMessage);

  // rooms
  socket.on("join-room", roomController.joinRoom);
  socket.on("new-room-created", roomController.newRoomCreated);
  // socket.on("room-removed", roomController.roomRemoved);

  // file sharing
  socket.on("upload", ({ data, roomId }) => {
    // const image = data.file;
    // console.log("FILE SHARING IMAGE: ", image);
    fs.writeFile("upload/" + "test.png", data, { encoding: "base64" }, () => {});
    socket.to(roomId).emit("uploaded", { buffer: data.toString("base64") });
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
  });
};
