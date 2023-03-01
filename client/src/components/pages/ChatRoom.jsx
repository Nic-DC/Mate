// import { Box } from "@mui/system";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ChatWindow from "../ChatWindow";

const ChatRoom = ({ socket }) => {
  const params = useParams();
  const passedSocket = socket;

  useEffect(() => {
    if (!passedSocket) return;

    passedSocket.emit("join-room", { roomId: params.roomId });
    console.log("ROOM CHAT ID: ", params.roomId);
    console.log("ROOM CHAT SOCKET: ", passedSocket);
  }, [passedSocket]);

  return (
    <>
      <ChatWindow socket={passedSocket} />
    </>
  );
};
export default ChatRoom;
