import React, { useContext, useState, useEffect } from "react";
import { CommentsContext } from "../../context/CommentsContext";

function Posts() {
    const { newComment, setNewComment, uploudComment } = useContext(CommentsContext);

    return (
        <div className="App">
            <input
                type="text"
                placeholder="הצעת מחיר"
                onChange={(e) => setNewComment({ ...newComment, bid: e.target.value })}
            />
            <input
                type="text"
                placeholder="פירוט הטיפול"
                onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
            />
            <button onClick={() => uploudComment()}>העלה הצעה </button>
        </div>
    );
}

export default Posts;
