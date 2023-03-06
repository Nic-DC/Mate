// import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatWindow from "../ChatWindow";

const ChatRoom = ({ socket, countRooms, setCountRooms }) => {
  const params = useParams();
  const passedSocket = socket;
  console.log("PARAMS - CHAT ROOM: ", params.roomId);
  console.log("COUNT ROOMS: ", countRooms);
  useEffect(() => {
    if (!passedSocket) return;

    passedSocket.emit("join-room", { roomId: params.roomId });
    console.log("ROOM CHAT ID: ", params.roomId);
    console.log("ROOM CHAT SOCKET: ", passedSocket);
  }, [passedSocket]);

  return (
    <>
      <h6>New chat room: {params.roomId}</h6>
      <ChatWindow socket={passedSocket} countRooms={countRooms} setCountRooms={setCountRooms} />
    </>
  );
};
export default ChatRoom;
