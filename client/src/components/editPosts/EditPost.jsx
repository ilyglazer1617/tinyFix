import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { PostsContext } from "../../context/PostsContext";

function EditPost() {
    const { newPost, setNewPost, uploudPost, generateIMGS,editPost, setEditPost } = useContext(PostsContext);

    return (
        <div className="App">
            <input
                type="text"
                placeholder="תיאור התקלה"
                onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
            />

            <select
                name=""
                placeholder="סיווג תקלה"
                id=""
                onChange={(ev) =>
                    setNewPost({
                        ...newPost,
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
            <input id="inputImages" type="file" accept="image/*" multiple onChange={(e) => generateIMGS(e)} />
            <button onClick={() => uploudPost()}>העלה בקשה לתיקון</button>
        </div>
    );
}

export default EditPost;
