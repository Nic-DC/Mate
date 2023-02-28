export const handleSocket = (socket) => {
  console.log("NEW CONNECTION WITH SOCKET ID: ", socket.id);

  socket.on("typing-started-client", () => {
    console.log("tyyyyyyweee");
    socket.broadcast.emit("typing-started-server");
  });

  socket.on("typing-stopped-client", () => {
    console.log("stoppppp");
    socket.broadcast.emit("typing-stopped-server");
  });

  socket.on("message-client", (message) => {
    console.log(`Message from ${socket.id} - received: `, message);
    socket.broadcast.emit("message-server", { message: message.message });
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
  });
};
