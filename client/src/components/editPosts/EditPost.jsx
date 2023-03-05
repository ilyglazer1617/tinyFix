import React, { useContext, useState, useEffect } from "react";
import { PostsContext } from "../../context/PostsContext";
import { useNavigate } from "react-router-dom";
import "./EditPost.css";

function EditPost() {
    const { newPost, setNewPost, uploudPost, generateIMGS, editingPost, editPost, setEditPost, deletePost } =
        useContext(PostsContext);
    const navigate = useNavigate();

    return (
        <div className="editPostContainer">
            <input
                className="submitButton"
                type="text"
                placeholder="תיאור התקלה"
                value={editPost.description}
                onChange={(e) => setEditPost({ ...editPost, description: e.target.value })}
            />

            <select
                className="editPostSelect"
                placeholder="סיווג תקלה"
                value={editPost.problem_classification}
                onChange={(ev) =>
                    setEditPost({
                        ...editPost,
                        problem_classification: ev.target.value,
                    })
                }
            >
                <option value="">סיווג התקלה</option>
                <option value="פח">פח</option>
                <option value="פנסים">פנסים</option>
                <option value="חלונות">חלונות</option>
                <option value="שמשה קדמית">שמשה קדמית</option>
                <option value="דלתות">דלתות</option>
                <option value="צמיגים">צמיגים</option>
                <option value="מראות">מראות</option>
                <option value="לוח מכוונים">לוח מכוונים</option>
                <option value="לוח מכוונים">פנים רכב</option>
                <option value="מנוע">מנוע</option>
                <option value="בלמים">בלמים</option>
                <option value="אחר">אחר</option>
            </select>
            <input
                className="submitButton"
                id="inputImages"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => generateIMGS(e, true)}
            />
            <button
                className="submitButton"
                onClick={() => {
                    editingPost(editPost._id);
                }}
            >
                עדכן{" "}
            </button>
            <br />
            <button
                className="submitButton"
                onClick={() => {
                    deletePost(editPost._id);
                }}
            >
                מחיקת תקלה
            </button>
        </div>
    );
}

export default EditPost;
