import { useContext, useState } from "react";
import Posts from "../comments/Comments";
import { CommentsContext } from "./../../context/CommentsContext";
import "./commentsPreview.css";
import { useNavigate } from "react-router-dom";
const CommentsPreview = () => {
    const { comments } = useContext(CommentsContext);
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
