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
  const [newChatData, setnewChatData] = useState({ senderId: id });
  const [allChats, setallChats] = useState([]);

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

  const newChat = async () => {
    try {
      console.log(newChatData);
      // const newConversation = await axios.post(
      //   "http://localhost:5555/api/conversation",
      //   newChatData
      // );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <SocketContext.Provider
        value={{ newChat, newChatData, setnewChatData, getAllChats, allChats }}
      >
        {children}
      </SocketContext.Provider>
    </div>
  );
};

export default SocketProvider;
