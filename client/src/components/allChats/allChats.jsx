import "./allChats.css";
import { SocketContext } from "./../../context/socket";
import { useContext, useEffect } from "react";

const AllChats = () => {
  const { allChats, getAllChats } = useContext(SocketContext);

  useEffect(() => {
    getAllChats();
  }, []);
  return (
    <div className="allChats">
      {allChats?.map((chat) => {
        return (
          <div className="allChatsWrapper" key={chat._id}>
            {console.log(chat.members[1])}
            {chat._id}
          </div>
        );
      })}
    </div>
  );
};

export default AllChats;
