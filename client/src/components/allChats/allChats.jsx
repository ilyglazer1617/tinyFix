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
      {user ? (
        <div className="allChatsCotrert">הצאטים שלי</div>
      ) : (
        <div class="groupAC">
          <svg class="iconAC" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
          <input
            placeholder="חפש לקוח פוטנציאלי"
            type="search"
            class="inputAC"
          />
        </div>
      )}

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
