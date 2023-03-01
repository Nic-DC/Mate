import BaseController from "./BaseController.js";

export default class RoomController extends BaseController {
  joinRoom = ({ roomId }) => {
    this.socket.join(roomId);
    console.log("Joined the room2");
  };
  newRoomCreated = ({ roomId }) => {
    console.log("THE EMITTED ROOM ID: ", { roomId });
    this.socket.broadcast.emit("new-room-created", { roomId });
    console.log("CREATING NEW ROOM");
  };
}
