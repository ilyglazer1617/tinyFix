import React, { useContext, useState, useEffect } from "react";
import { CommentsContext } from "../../context/CommentsContext";
import { useNavigate } from "react-router-dom";
import "./newPost.css";

function EditComments() {
    const {
        newComment,
        setNewComment,
        uploudComment,
        editComment,
        editingComment,
        setEditComment,
        setCommentEditorOpen,
    } = useContext(CommentsContext);
    const navigate = useNavigate();

    return (
        <div className="App">
            <input
                className="fixPriceInput"
                type="text"
                placeholder="הצעת מחיר"
                value={editComment.bid}
                onChange={(e) => setEditComment({ ...editComment, bid: e.target.value })}
            />
            <input
                className="fixInfoInput"
                type="text"
                placeholder="פירוט הטיפול"
                value={editComment.text}
                onChange={(e) => setEditComment({ ...editComment, text: e.target.value })}
            />
            <button
                className="submitButton"
                onClick={() => {
                    editingComment();
                    setCommentEditorOpen(false);
                    // navigate("/GarageMainPage/PostComments");
                }}
            >
                עדכן הצעה
            </button>
        </div>
    );
}

export default EditComments;
