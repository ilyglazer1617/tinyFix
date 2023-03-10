// import { createContext, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import jwtdecode from "jwt-decode";
// import axios from "axios";
// import App from "./../App";
// import { io } from "socket.io-client";

// export const SocketContext = createContext();

// const SocketProvider = (props) => {
//   const navigate = useNavigate();
//   const { children } = props;
//   let token = localStorage.getItem("token");
//   let id;
//   if (token) {
//     const { _id } = jwtdecode(token);
//     id = _id;
//   }
//   const [allChats, setallChats] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [messageToSend, setMessageToSend] = useState({});
//   const [currentChatId, setCurrentChatId] = useState(null);
//   const [currentChat, setCurrentChat] = useState([]);
//   const [arrivalMessage, setArrivalMessage] = useState(null);
//   const socket = useRef();
//   const user = localStorage.getItem("user");

//   //! ===============connect to socket server===============

//   const connectToSocketServer = () => {
//     socket.current = io("ws://localhost:4040");
//   };
//   //! ===============get Users===============
//   const getUsers = () => {
//     socket.current.on("getUsers", (users) => {});
//   };
//   //! ===============send to socket server id and socketId===============
//   const sendToSocket = () => {
//     socket.current.emit("addUser", id);
//   };

//   //! =============== set messages =================
//   const updateMessages = () => {
//     // console.log("currentChat", currentChat);
//     console.log(messages);
//     // console.log(arrivalMessage);
//     arrivalMessage &&
//       currentChat?.members.includes(arrivalMessage.sender) &&
//       setMessages((prev) => [...prev, arrivalMessage]);
//   };
//   //! ===============get new messageby socket===============
//   const getMessage = () => {
//     if (socket.current) {
//       socket.current.on("getMessage", (data) => {
//         setArrivalMessage({
//           sender: data.senderId,
//           text: data.text,
//           createdAt: Date.now(),
//         });
//       });
//     }
//   };
//   //!=============== send new message===============
//   const postNewMessage = async (e) => {
//     // console.log(currentChat.members);
//     e.preventDefault();
//     const message = {
//       conversationId: localStorage.getItem("chat_Id"),
//       sender: id,
//       text: messageToSend,
//     };

//     const reciverId = currentChat.members.find((member) => member !== id);
//     console.log("reciverId=", reciverId);
//     socket.current.emit("sendMessage", {
//       senderId: id,
//       reciverId,
//       text: messageToSend,
//     });

//     try {
//       const res = await axios.post(
//         "http://localhost:5555/api/message",
//         message
//       );
//       console.log(res.data.text);
//       // setMessages([...messages, res.data.text]);
//       setMessageToSend("");
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
//   //!=============== get all messages of current chat===============

//   const getChatMessages = async (chatId) => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5555/api/message/" + chatId
//       );
//       setMessages(res.data);
//       setCurrentChatId(chatId);
//       setMessageToSend("");
//       // navigate("/chat");
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
//   //!===============get all chats of the user===============

//   const getAllChats = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5555/api/conversation/" + id
//       );
//       setallChats(res.data);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   //!=============== create a new conv===============

//   const newChat = async (garage_id) => {
//     try {
//       const newConversation = await axios.post(
//         "http://localhost:5555/api/conversation",
//         { senderId: id, receiverId: garage_id }
//       );
//       navigate("/allChats");
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div>
//       <SocketContext.Provider
//         value={{
//           newChat,
//           getAllChats,
//           allChats,
//           getChatMessages,
//           messages,
//           messageToSend,
//           setMessageToSend,
//           setMessages,
//           postNewMessage,
//           socket,
//           sendToSocket,
//           id,
//           getUsers,
//           connectToSocketServer,
//           currentChat,
//           setCurrentChat,
//           arrivalMessage,
//           getMessage,
//           updateMessages,
//         }}
//       >
//         {children}
//       </SocketContext.Provider>
//     </div>
//   );
// };

// export default SocketProvider;

//!==============================================================room====================================

import { createContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtdecode from "jwt-decode";
import axios from "axios";
import App from "./../App";
import { io } from "socket.io-client";

export const SocketContext = createContext();
// const url = "https://tinyfixsocketserver.onrender.com";
const url = "ws://localhost:4040";
const socket = io.connect(url);

export const ChatContext = createContext();
const SocketProvider = (props) => {
  const navigate = useNavigate();
  const { children } = props;
  let token = localStorage.getItem("token");
  let id;
  if (token) {
    const { _id } = jwtdecode(token);
    id = _id;
  }
  const [currentChat, setCurrentChat] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messageToSend, setMessageToSend] = useState({});
  const [messages, setMessages] = useState([]);
  const [allChats, setallChats] = useState([]);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [garageId, setGarageId] = useState(null);
  const user = localStorage.getItem("user");

  //! ===============connect to socket server===============

  const connectToSocketServer = () => {
    // socket.current = io("ws://localhost:4040");
  };
  //! ===============get Users===============
  const getUsers = () => {
    socket.on("getUsers", (users) => {});
    // socket.current.on("getUsers", (users) => {});
  };
  // //! ===============send to socket server id and socketId===============

  // //! =============== set messages =================
  const updateMessages = () => {
    // console.log("currentChat", currentChat);
    // arrivalMessage &&
    //   currentChat?.members.includes(arrivalMessage.sender) &&
    //   setMessages((prev) => [...prev, arrivalMessage]);
  };
  // //! ===============get new messageby socket===============
  const getMessage = () => {
    if (socket.current) {
      socket.on("getMessage", (data) => {
        // socket.current.on("getMessage", (data) => {
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      });
    }
  };
  // //!=============== send new message===============
  const postNewMessage = async (e) => {
    e.preventDefault();
    const message = {
      conversationId: localStorage.getItem("chat_Id"),
      sender: id,
      text: messageToSend,
    };

    if (messageToSend !== "") {
      console.log(message);
      await socket.emit("send_message", message);
      setMessages([...messages, { message: message }]);

      // setMessages((prev) => [...prev, message]);
      setMessageToSend("");
      // }
    }

    try {
      const res = await axios.post(
        "https://tinyfix.onrender.com/api/message",
        message
      );
      console.log("res data", res.data);
      setMessages([...messages, res.data]);
      // setMessages((prev) => [...prev, res.data]);
      // setMessageToSend("");
    } catch (error) {
      console.log(error.message);
    }
  };
  // //!=============== get all messages of current chat===============

  const getChatMessages = async (chatId) => {
    try {
      const res = await axios.get(
        "https://tinyfix.onrender.com/api/message/" + chatId
      );
      setMessages(res.data);
      setCurrentChatId(chatId);
      setMessageToSend("");
      setRoom(localStorage.getItem("chat_Id"));
      setUsername(user ? "user" : "garage");
      if (username !== "" && room !== "") {
        socket.emit("join_room", room);
        // navigate("/chat");
      }
      // navigate("/chat");
    } catch (error) {
      console.log(error.message);
    }
  };
  // //!===============get all chats of the user===============

  const getAllChats = async () => {
    try {
      const res = await axios.get(
        "https://tinyfix.onrender.com/api/conversation/" + id
      );
      setallChats(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  //!=============== create a new conv===============
  const newChat = async (garage_id) => {
    try {
      const conv = await axios.get(
        "https://tinyfix.onrender.com/api/conversation/" + id
      );
      console.log(conv.data);
      const arr = conv.data;

      const newConversation = await axios.post(
        "https://tinyfix.onrender.com/api/conversation",
        { senderId: id, receiverId: garage_id }
      );
      setRoom(localStorage.getItem("chat_Id"));
      setUsername(user ? "user" : "garage");
      if (username !== "" && room !== "") {
        socket.emit("join_room", room);
      }

      navigate("/chat");
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
          // messageToSend,
          setMessageToSend,
          setMessages,
          socket,
          postNewMessage,
          // socket,
          // sendToSocket,
          // id,
          getUsers,
          connectToSocketServer,
          // currentChat,
          setCurrentChat,
          // arrivalMessage,
          getMessage,
          updateMessages,
          garageId,
          setGarageId,
        }}
      >
        {children}
      </SocketContext.Provider>
    </div>
  );
};

export default SocketProvider;
