export const socket = (client) => {
  console.log("NEW CONNECTION WITH CLIENT ID: ", client.id);

  client.on("client-message", (message) => {
    console.log("Message received", message);

    const editedMessage = `${message.message} => WAS EDITED IN THE SERVER`;

    client.emit("server-message", { editedMessage });
  });
};
