import React, { useContext, useState, useEffect } from "react";
import { CommentsContext } from "../../context/CommentsContext";
import "./newPost.css";

function Posts() {
    const { newComment, setNewComment, uploudComment } = useContext(CommentsContext);

    return (
        <div className="fixInputCntainer">
            <input
                className="fixPriceInput"
                pattern="\d+"
                type="text"
                placeholder="מחיר"
                onChange={(e) => setNewComment({ ...newComment, bid: e.target.value })}
            />

            <input
                className="fixInfoInput"
                type="text"
                placeholder="פירוט הטיפול"
                onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
            />
            <button className="submitButton" onClick={() => uploudComment()}>
                העלה הצעה{" "}
            </button>
        </div>
    );
}

export default Posts;
