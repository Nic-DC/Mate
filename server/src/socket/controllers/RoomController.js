import BaseController from "./BaseController.js";

export default class RoomController extends BaseController {
  joinRoom = ({ roomId }) => {
    this.socket.join(roomId);
    console.log("Joined the room2");
  };
}
