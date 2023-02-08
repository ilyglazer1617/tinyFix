import { useContext, useState } from "react";
import Posts from "../comments/Comments";
import { CommentsContext } from "./../../context/CommentsContext";
import "./commentsPreview.css";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const CommentsPreview = () => {
  const { comments, editComment, setEditComment, newComment } = useContext(CommentsContext);
  const navigate = useNavigate();

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
                console.log(comment);
                return (
                  <>
                    <div className="comment">
                      <div className="commentPrice">
                        <h1>מחיר התיקון: {comment.bid}</h1>
                      </div>
                      <div className="commentFix">
                        <h1>התיקון: {comment.text}</h1>
                      </div>
                      {comment.garage_id === (jwtDecode(localStorage.getItem("token"))).id ? (
                          <button onClick={() => setEditComment({ ...editComment, comment_id: comment._id, text: comment.text, bid: comment.bid })}>עריכת הצעה</button>
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
