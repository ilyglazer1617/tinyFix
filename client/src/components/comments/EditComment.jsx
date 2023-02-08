import React, { useContext, useState, useEffect } from "react";
import { CommentsContext } from "../../context/CommentsContext";

function Posts() {
    const { newComment, setNewComment, uploudComment, editComment,editingComment, setEditComment} = useContext(CommentsContext);

    return (
        <div className="App">
            <input
                type="text"
                placeholder="הצעת מחיר"
                onChange={(e) => setEditComment({ ...editComment, bid: e.target.value })}
            />
            <input
                type="text"
                placeholder="פירוט הטיפול"
                onChange={(e) => setEditComment({ ...editComment, text: e.target.value })}
            />
            <button onClick={() => editingComment()}>עדכן הצעה</button>
        </div>
    );
}

export default Posts;
