import { createContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtdecode from "jwt-decode";
import axios from "axios";
import App from "./../App";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const SocketProvider = (props) => {
  const navigate = useNavigate();
  const { children } = props;
  let token = localStorage.getItem("token");
  let id;
  if (token) {
    const { _id } = jwtdecode(token);
    id = _id;
  }
  const [allChats, setallChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageToSend, setMessageToSend] = useState({});
  const [currentChatId, setCurrentChatId] = useState(null);
  const [currentChat, setCurrentChat] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const user = localStorage.getItem("user");

  //! ===============connect to socket server===============

  const connectToSocketServer = () => {
    socket.current = io("ws://localhost:4040");
  };
  //! ===============get Users===============
  const getUsers = () => {
    socket.current.on("getUsers", (users) => {
      // console.log(users);
    });
  };
  //! ===============send to socket server id and socketId===============
  const sendToSocket = () => {
    socket.current.emit("addUser", id);
  };

  //! =============== set messages =================
  const updateMessages = () => {
    console.log("currentChat", currentChat);
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
    console.log(messages);
  };
  //! ===============get new messageby socket===============
  const getMessage = () => {
    if (socket.current) {
      socket.current.on("getMessage", (data) => {
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      });
    }
  };
  //!=============== send new message===============
  const postNewMessage = async (e) => {
    // console.log(currentChat.members);
    e.preventDefault();
    const message = {
      conversationId: localStorage.getItem("chat_Id"),
      sender: id,
      text: messageToSend,
    };

    const reciverId = currentChat.members.find((member) => member !== id);
    // console.log("reciverId=", reciverId);
    socket.current.emit("sendMessage", {
      senderId: id,
      reciverId,
      text: messageToSend,
    });

    try {
      const res = await axios.post(
        "http://localhost:5555/api/message",
        message
      );
      console.log(res.data.text);
      setMessages([...messages, res.data.text]);
    } catch (error) {
      console.log(error.message);
    }
  };
  //!=============== get all messages of current chat===============

  const getChatMessages = async (chatId) => {
    try {
      const res = await axios.get(
        "http://localhost:5555/api/message/" + chatId
      );
      setMessages(res.data);
      setCurrentChatId(chatId);
      setMessageToSend("");
      // navigate("/chat");
    } catch (error) {
      console.log(error.message);
    }
  };
  //!===============get all chats of the user===============

  const getAllChats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5555/api/conversation/" + id
      );
      setallChats(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  //!=============== create a new conv===============

  const newChat = async (garage_id) => {
    try {
      const newConversation = await axios.post(
        "http://localhost:5555/api/conversation",
        { senderId: id, receiverId: garage_id }
      );
      navigate("/allChats");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <SocketContext.Provider
        value={{
          newChat,
          getAllChats,
          allChats,
          getChatMessages,
          messages,
          setMessageToSend,
          setMessages,
          postNewMessage,
          socket,
          sendToSocket,
          id,
          getUsers,
          connectToSocketServer,
          currentChat,
          setCurrentChat,
          arrivalMessage,
          getMessage,
          updateMessages,
        }}
      >
        {children}
      </SocketContext.Provider>
    </div>
  );
};

export default SocketProvider;
