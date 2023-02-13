import "./chat.css";
import { SocketContext } from "./../../context/socket";
import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import jwtdecode from "jwt-decode";
import { GarageContext } from "./../../context/garageContext";

const Chat = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  let token = localStorage.getItem("token");
  let id;
  if (token) {
    const { _id } = jwtdecode(token);
    id = _id;
  }
  const {
    messages,
    setMessageToSend,
    postNewMessage,
    getChatMessages,
    currentChat,
    socket,

    getMessage,
    arrivalMessage,
    updateMessages,
    messageToSend,
    setMessages,
    connectToSocketServer,
    garageId,
    setGarageId,
  } = useContext(SocketContext);
  const { getGarageById } = useContext(GarageContext);
  //!=========================scroll down============================
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //!===============GET ALL MESSAGES WHEN PAGE OPEN FIRST TIME===============
  useEffect(() => {
    getChatMessages(localStorage.getItem("chat_Id"));
    console.log(garageId);
  }, []);
  //!===============GET ALL DURING THE CHAT===============

  useEffect(() => {
    socket.on(
      "receive_message",
      (data) => {
        console.log(typeof messages);
        console.log("data", data);
        setMessages([...messages, data]);
        console.log(messages);
      },
      [socket]
    );
  });

  return (
    <div className="chat">
      <div className="garageTopButton">
        <button
          onClick={() => {
            localStorage.removeItem("chat_Id");
            navigate("/UserChatsList");
          }}
        >
          חזור לשאר הצעות המוסכים
        </button>
        {user ? (
          <button
            onClick={() => {
              getGarageById(garageId);
              // console.log(garageId);
            }}
            style={{ backgroundColor: "red" }}
          >
            ראה פרופיל מוסך
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="AllmessageWrap">
        {messages &&
          messages?.map((message, index) => {
            return (
              <div
                ref={scrollRef}
                key={index}
                className={message.sender === id ? "user" : "otherSide"}
              >
                <p>{message?.text}</p>
              </div>
            );
          })}
      </div>
      <div className="chat-footer">
        <input
          value={messageToSend}
          onChange={(e) => setMessageToSend(e.target.value)}
          type="text"
          placeholder="הודעה שלך"
          className="inputChat"
        />
        <button
          onClick={async (e) => {
            await postNewMessage(e);
            getChatMessages(localStorage.getItem("chat_Id"));
          }}
        >
          &#9658;
        </button>
      </div>
    </div>
  );
};

export default Chat;
