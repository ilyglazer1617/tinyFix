import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import jwtdecode from "jwt-decode";

export const CommentsContext = createContext();

function CommentsProvider(props) {
  const { children } = props;

  const [newComment, setNewComment] = useState({});
  useEffect(() => {
    const sendWhenComment = async () => {
      let token = localStorage.getItem("token");
      let id;
      if (token) {
        const { _id } = await jwtdecode(token);
        id = _id;
      }
      setNewComment({ ...newComment, garage_id: id });
      return;
    };
    sendWhenComment();
  }, []);

  //!new posts comments====================

  const uploudComment = async () => {
    const req = await axios.post(
      //todo `http://localhost:5555/api/comments/${newComment.garage_id}`,
      `http://localhost:5555/api/comments/63e13d41a85456fda0636b64`,
      newComment
    );
  };

  return (
    <CommentsContext.Provider
      value={{ newComment, setNewComment, uploudComment }}
    >
      {children}
    </CommentsContext.Provider>
  );
}

export default CommentsProvider;
