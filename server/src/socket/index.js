import MessageController from "./controllers/MessageController.js";
import RoomController from "./controllers/RoomController.js";
import TypingController from "./controllers/TypingController.js";

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

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
  });
};
