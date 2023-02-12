import React, { useContext, useState, useEffect } from "react";
import { CommentsContext } from "../../context/CommentsContext";
import { useNavigate } from "react-router-dom";

function EditComments() {
    const { newComment, setNewComment, uploudComment, editComment, editingComment, setEditComment } =
        useContext(CommentsContext);
    const [inputValue, setInputValue] = useState("helo");
    const navigate = useNavigate();

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
            <button
                onClick={() => {
                    editingComment();
                    navigate("/GarageMainPage/PostComments");
                }}
            >
                עדכן הצעה
            </button>
        </div>
    );
}

export default EditComments;
