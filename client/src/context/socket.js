import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtdecode from "jwt-decode";
import axios from "axios";
import App from "./../App";
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

  //! send new message
  const postNewMessage = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5555/api/message", {
        conversationId: currentChatId,
        sender: id,
        text: messageToSend,
      });
      console.log(res.data);

      setMessages([...messages, res.data]);
    } catch (error) {
      console.log(error.message);
    }
  };
  //! get all messages of current chat

  const getChatMessages = async (chatId) => {
    try {
      const res = await axios.get(
        "http://localhost:5555/api/message/" + chatId
      );
      setMessages(res.data);
      setCurrentChatId(chatId);
      navigate("/chat");
    } catch (error) {
      console.log(error.message);
    }
  };
  //!get all chats of the user

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

  //! create a new conv

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
        }}
      >
        {children}
      </SocketContext.Provider>
    </div>
  );
};

export default SocketProvider;
