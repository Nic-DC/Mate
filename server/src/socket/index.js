export const handleSocket = (socket) => {
  console.log("NEW CONNECTION WITH SOCKET ID: ", socket.id);

  socket.on("client-message", (message) => {
    console.log(`Message from ${socket.id} - received: `, message);

    const editedMessage = `${message.message} => BE`;

    socket.broadcast.emit("server-message", { editedMessage });
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
  });
};
