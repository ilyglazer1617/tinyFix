import React, { useContext, useState, useEffect } from "react";
import { CommentsContext } from "../../context/CommentsContext";
import "./newPost.css";

function Posts() {
    const { newComment, setNewComment, uploudComment } = useContext(CommentsContext);

    return (
        <div className="fixInputCntainer">
            <input
                className="fixPriceInput"
                type="text"
                placeholder="הצעת מחיר"
                onChange={(e) => setNewComment({ ...newComment, bid: e.target.value })}
            />
            <input
                className="fixInfoInput"
                type="text"
                placeholder="פירוט הטיפול"
                onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
            />
            <button onClick={() => uploudComment()}>העלה הצעה </button>
        </div>
    );
}

export default Posts;
