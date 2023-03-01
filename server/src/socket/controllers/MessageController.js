import BaseController from "./BaseController.js";

export default class MessageController extends BaseController {
  sendMessage = ({ message, roomId }) => {
    console.log(`Message from ${this.socket.id} - received: `, message);
    console.log(`roomId from ${this.socket.id} - received: `, roomId);
    let skt = this.socket.broadcast;
    skt = roomId ? skt.to(roomId) : skt;
    skt.emit("message-server", { message });
  };
}
