import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import jwtdecode from "jwt-decode";
import jwtDecode from "jwt-decode";

export const CommentsContext = createContext();

function CommentsProvider(props) {
  const { children } = props;

  const [newComment, setNewComment] = useState({});
  const [comments, setComments] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState("false");
  const [editComment, setEditComment] = useState({});

  //!new comments====================

  const uploudComment = async () => {
    const token = localStorage.getItem("token");
    const garage_id = await jwtDecode(token);

    const req = await axios.post(`http://localhost:5555/api/comments/${newComment.post_id}/${garage_id._id}`, newComment);
    console.log(req.data)
    setComments([...comments, req.data.newComment].sort((a, b) => a.bid - b.bid));

  };

  //!edit comments====================

  const editingComment = async () => {
    const token = localStorage.getItem("token");
    const garage_id = jwtDecode(token);
    const req = await axios.put(`http://localhost:5555/api/comments/${editComment.comment_id}`, editComment);

      setComments(comments.map((comment) => {
        if (comment._id === editComment.comment_id) {
            return {
              ...comment,
              bid: editComment.bid,
              text: editComment.text,
            };
          }
          else {
              return comment
          }
      }));
  };

  //! get all comments ============================

  async function getAllComments(postId) {
    const comments = await axios.post("http://localhost:5555/api/comments/sortComments/display/" + postId);
    setComments(comments.data);
    setCommentsOpen("true");
  }

  //! delete comment ============================

  async function deleteComment(comment_id) {
    const deleteC = await axios.delete(`http://localhost:5555/api/comments/${comment_id}`);
    setComments(comments.filter((comment) => comment._id !== comment_id));
  }

  return (
    <CommentsContext.Provider
      value={{
        newComment,
        comments,
        setComments,
        setNewComment,
        uploudComment,
        getAllComments,
        commentsOpen,
        editComment,
        editingComment,
        setEditComment,
        deleteComment,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
}

export default CommentsProvider;
