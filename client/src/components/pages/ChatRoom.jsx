// import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatWindow from "../ChatWindow";

const ChatRoom = ({ socket }) => {
  const [roomId, setRoomId] = useState("");
  const params = useParams();
  const passedSocket = socket;
  console.log("PARAMS - CHAT ROOM: ", params.roomId);

  useEffect(() => {
    if (!passedSocket) return;

    setRoomId(params.roomId);
    passedSocket.emit("join-room", { roomId: roomId });
    console.log("ROOM CHAT ID: ", roomId);
    console.log("ROOM CHAT SOCKET: ", passedSocket);
  }, [passedSocket, roomId]);

  return (
    <>
      <ChatWindow socket={passedSocket} />
    </>
  );
};
export default ChatRoom;
