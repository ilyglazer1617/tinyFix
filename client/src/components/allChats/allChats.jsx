import "./allChats.css";
import { SocketContext } from "./../../context/socket";
import { useContext, useEffect, useState } from "react";
import Bottom from "../bottom/bottom";
// import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const AllChats = () => {
  const navigate = useNavigate();
  const {
    allChats,
    getAllChats,
    getChatMessages,
    socket,
    sendToSocket,
    id,
    getUsers,
    connectToSocketServer,
    setCurrentChat,
  } = useContext(SocketContext);

  //! get all user chat
  useEffect(() => {
    connectToSocketServer();
    getAllChats();
  }, []);
  //! connect to socket
  useEffect(() => {
    sendToSocket();
    getUsers();
  }, [id]);

  const user = localStorage.getItem("user");
  return (
    <div className="allChats">
      הצאטים שלי
      {allChats?.map((chat, index) => {
        return (
          <div className="allChatsWrapper" key={chat._id}>
            <p
              onClick={() => {
                getChatMessages(chat._id);
                setCurrentChat(chat);
                localStorage.setItem("chat_Id", chat._id);
                navigate("/chat");
              }}
            >
              {user
                ? chat.garageChat_side.garage_name
                : chat.userChat_side.full_name}
            </p>
          </div>
        );
      })}
      {user ? <Bottom /> : <></>}
    </div>
  );
};

export default AllChats;
