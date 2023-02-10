import "./allChats.css";
import { SocketContext } from "./../../context/socket";
import { useContext, useEffect } from "react";
import Bottom from "../bottom/bottom";

const AllChats = () => {
  const { allChats, getAllChats, getChatMessages } = useContext(SocketContext);

  useEffect(() => {
    getAllChats();
  }, []);

  return (
    <div className="allChats">
      הצאטים שלי
      {allChats?.map((chat, index) => {
        return (
          <div className="allChatsWrapper" key={chat._id}>
            <p
              onClick={() => {
                getChatMessages(chat._id);
                console.log(chat._id);
                localStorage.setItem("chat_Id", chat._id);
              }}
            >
              {chat.garageChat_side.garage_name}
            </p>
          </div>
        );
      })}
      <Bottom />
    </div>
  );
};

export default AllChats;
