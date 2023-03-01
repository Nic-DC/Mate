export const handleSocket = (socket) => {
  console.log("NEW CONNECTION WITH SOCKET ID: ", socket.id);

  socket.on("typing-started-client", ({ roomId }) => {
    console.log("tyyyyyyweee");
    let skt = socket.broadcast;
    // if we have the roomId, emit ONLY on the roomId
    // otherwise, emit everywhere
    skt = roomId ? skt.to(roomId) : skt;
    skt.emit("typing-started-server");
  });

  socket.on("typing-stopped-client", ({ roomId }) => {
    console.log("stoppppp");
    let skt = socket.broadcast;
    skt = roomId ? skt.to(roomId) : skt;
    skt.emit("typing-stopped-server");
  });

  socket.on("message-client", (message) => {
    console.log(`Message from ${socket.id} - received: `, message);
    socket.broadcast.emit("message-server", { message: message.message });
  });

  socket.on("join-room", ({ roomId }) => {
    socket.join(roomId);
    console.log("Joined the room2");
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
  });
};
