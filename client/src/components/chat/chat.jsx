import "./chat.css";
import { SocketContext } from "./../../context/socket";
import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import jwtdecode from "jwt-decode";

const Chat = () => {
  const navigate = useNavigate();
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
  } = useContext(SocketContext);

  //!=========================scroll down============================
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //!===============GET ALL MESSAGES WHEN PAGE OPEN FIRST TIME===============
  useEffect(() => {
    getChatMessages(localStorage.getItem("chat_Id"));
    // console.log(currentChat);
    // postNewMessage();
  }, []);
  //!===============GET ALL DURING THE CHAT===============

  useEffect(() => {
    //getMessage();
    // updateMessages();
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessages([...messages, data]);
      console.log(messages);
    });
  }, [socket]);

  useEffect(() => {
    updateMessages();
    getMessage();
  }, [arrivalMessage, currentChat]);

  return (
    <div className="chat">
      <button
        onClick={() => {
          localStorage.removeItem("chat_Id");
          navigate("/UserChatsList");
        }}
      >
        חזור לשאר הצעות המוסכים
      </button>
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
      <input
        value={messageToSend}
        onChange={(e) => setMessageToSend(e.target.value)}
        type="text"
        placeholder="הודעה שלך"
      />
      <button
        onClick={async (e) => {
          await postNewMessage(e);
          // getChatMessages(localStorage.getItem("chat_Id"));
        }}
      >
        שלח הודעה
      </button>
    </div>
  );
};

export default Chat;
