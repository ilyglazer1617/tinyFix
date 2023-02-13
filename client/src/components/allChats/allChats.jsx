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
    // sendToSocket,
    id,
    getUsers,
    connectToSocketServer,
    setCurrentChat,
    garageId,
    setGarageId,
  } = useContext(SocketContext);

  //! get all user chat
  useEffect(() => {
    connectToSocketServer();
    getAllChats();
  }, []);
  //! connect to socket
  useEffect(() => {
    // sendToSocket();
    getUsers();
  }, [id]);

  const user = localStorage.getItem("user");
  return (
    <div className="allChats">
      <div className="allChatsCotrert">הצאטים שלי</div>

      {allChats?.map((chat, index) => {
        return (
          <div className="allChatsWrapper" key={chat._id}>
            <p>{index + 1}</p>
            <article
              className="chatName"
              onClick={() => {
                getChatMessages(chat._id);
                setCurrentChat(chat);
                localStorage.setItem("chat_Id", chat._id);
                setGarageId(chat.members[1]);
                navigate("/chat");
              }}
            >
              {user
                ? chat.garageChat_side?.garage_name
                : chat.userChat_side?.full_name}
            </article>
            <div className="chatImgWraper">
              <img
                className="allChatImg"
                src={
                  user
                    ? chat.garageChat_side.image.url
                    : "https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-image-700-205124837.jpg"
                }
                alt=""
              />
            </div>
          </div>
        );
      })}
      {user ? <Bottom /> : <></>}
    </div>
  );
};

export default AllChats;
