import React, { useContext, useState, useEffect } from "react";
import { CommentsContext } from "../../context/CommentsContext";

function EditComments() {
    const { newComment, setNewComment, uploudComment, editComment,editingComment, setEditComment} = useContext(CommentsContext);
    const [inputValue, setInputValue] = useState("helo");

    return (
        <div className="App">
            <input
                type="text"
                placeholder="הצעת מחיר"
                value={editComment.bid}
                onChange={(e) => setEditComment({ ...editComment, bid: e.target.value })}
            />
            <input
                type="text"
                placeholder="פירוט הטיפול"
                value={editComment.text}
                onChange={(e) => setEditComment({ ...editComment, text: e.target.value })}
            />
            <button onClick={() => editingComment()}>עדכן הצעה</button>
        </div>
    );
}

export default EditComments;
