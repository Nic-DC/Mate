/* We create classes in order to have access to the "socket" */

import BaseController from "./BaseController.js";

export default class TypingController extends BaseController {
  typingStarted = ({ roomId }) => {
    console.log("tyyyyyyweee");
    let skt = this.socket.broadcast;
    skt = roomId ? skt.to(roomId) : skt;
    skt.emit("typing-started-server");
  };

  typingStopped = ({ roomId }) => {
    console.log("stoppppp");
    let skt = this.socket.broadcast;
    skt = roomId ? skt.to(roomId) : skt;
    skt.emit("typing-stopped-server");
  };
}
