import { useContext, useEffect, useState } from "react";
import Posts from "../comments/Comments";
import { CommentsContext } from "./../../context/CommentsContext";
import "./commentsPreview.css";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const CommentsPreview = () => {
  const { getAllComments,comments, editComment, setEditComment, newComment,deleteComment,setComments } = useContext(CommentsContext);

    const navigate = useNavigate();

  

  let token = localStorage.getItem("token");
  const { _id } = jwtDecode(token);

  return (
    <>
      <div className="backgroundBlocker">
        <div className="commentsPreview">
          <h4 className="exitButton">
            <span onClick={() => navigate("/GarageMainPage")}>❌</span>
          </h4>
          <div className="commentsContainer">
            {!comments.length == 0 ? (
              comments.map((comment) => {
                return (
                  <>
                    <div className="comment">
                      <div className="commentPrice">
                        <h1>מחיר התיקון: {comment.bid}</h1>
                      </div>
                      <div className="commentFix">
                        <h1>התיקון: {comment.text}</h1>
                      </div>
                      {comment.garage_id._id == _id || comment.garage_id== _id? (
                        <div>
                          <button
                            onClick={() => {
                              setEditComment({
                                ...editComment,
                                comment_id: comment._id,
                                text: comment.text,
                                bid: comment.bid,
                              });
                              navigate("/EditComments");
                            }}
                          >
                            עריכת הצעה
                          </button>
                          <button onClick={()=> deleteComment(comment._id)}>מחיקת הצעה</button>
                        </div>
                      ) : null}
                    </div>
                  </>
                );
              })
            ) : (
              <h1>אין הצעות זמינות</h1>
            )}
          </div>
          <div className="addCommentContainer">
            <Posts />
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentsPreview;
