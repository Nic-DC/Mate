import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ChatRoom = () => {
  const params = useParams();

  useEffect(() => {
    console.log("ROOM CHAT ID: ", params.chatId);
  }, [params]);

  return <h1>Chat room</h1>;
};
export default ChatRoom;
