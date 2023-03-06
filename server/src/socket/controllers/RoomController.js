import BaseController from "./BaseController.js";
import Rooms from "../../api/rooms/roomModel.js";

export default class RoomController extends BaseController {
  joinRoom = ({ roomId }) => {
    this.socket.join(roomId);
    console.log("Joined the room2: ", roomId);
  };
  newRoomCreated = ({ roomId }) => {
    console.log("THE EMITTED ROOM ID: ", { roomId });

    const newRoom = new Rooms({
      name: "Test",
      roomId: roomId,
    });
    newRoom.save();

    // this.socket.join(roomId);

    this.socket.broadcast.emit("new-room-created", { roomId });
    console.log("CREATING NEW ROOM");
  };
  // roomRemoved = async ({ roomId }) => {
  //   console.log("THE DELETED ROOM ID: ", roomId);
  //   await Rooms.findOneAndDelete({ roomId: roomId });
  //   this.socket.broadcast.emit("room-removed", { roomId });
  //   console.log("DELETING ROOM");
  // };
}
