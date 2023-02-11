import AllChats from "../allChats/allChats";
import Chat from "../chat/chat";
import "./chatConteiner.css";

const ChatConteiner = () => {
  return (
    <div>
      <Chat />
      <AllChats />
    </div>
  );
};

export default ChatConteiner;
