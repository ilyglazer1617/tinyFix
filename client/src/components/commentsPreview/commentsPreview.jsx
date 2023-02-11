import { useContext, useEffect, useState } from "react";
import Posts from "../comments/Comments";
import { CommentsContext } from "./../../context/CommentsContext";
import "./commentsPreview.css";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import GarageInfo from "./../garageInfo/garageInfo";

const CommentsPreview = () => {
  const { getAllComments, comments, editComment, setEditComment, newComment, deleteComment, setComments } = useContext(CommentsContext);

  const navigate = useNavigate();

  let token = localStorage.getItem("token");
  const { _id, garage_name } = jwtDecode(token);
  console.log(garage_name);
  //to check if the garage already comment
  let letAddComment = comments.filter((comment) => comment.garage_id._id == _id || comment.garage_id == _id);
  console.log(letAddComment);
  if (letAddComment.length === 0) {
    letAddComment = true;
  } else {
    letAddComment = false;
  }

  //extraxt date
  const extractDate = (date) => {
    let year = date.substring(0, 4);
    let month = date.substring(5, 7);
    let day = date.substring(8, 10);

    let extractedDate = day + "/" + month + "/" + year;
    return extractedDate;
  };

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
                      {comment.garage_id._id == _id || comment.garage_id == _id ? (
                        <div className="commentGarageName">
                          <h1>ההצעה שלך : {typeof comment.garage_id.garage_name === "string" ? comment.garage_id.garage_name : garage_name}</h1>
                        </div>
                      ) : null}

                      <div className="commentPrice">
                        <h1>מחיר התיקון: {comment.bid}</h1>
                      </div>
                      <div className="commentFix">
                        <h1>פרטי התיקון: {comment.text}</h1>
                      </div>
                      <div className="commentDate">
                        <h5>{extractDate(comment.updatedAt)}</h5>
                      </div>
                      {comment.garage_id._id == _id || comment.garage_id == _id ? (
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
                          <button onClick={() => deleteComment(comment._id)}>מחיקת הצעה</button>
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
          {letAddComment == true ? (
            <div className="addCommentContainer">
              <Posts />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default CommentsPreview;
