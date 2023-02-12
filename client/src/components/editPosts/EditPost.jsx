import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { PostsContext } from "../../context/PostsContext";

function EditPost() {
  const { newPost, setNewPost, uploudPost, generateIMGS, editingPost, editPost, setEditPost } = useContext(PostsContext);
  return (
    <div className="App">
      <input type="text" placeholder="תיאור התקלה" onChange={(e) => setEditPost({ ...editPost, description: e.target.value })} />

      <select
        placeholder="סיווג תקלה"
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
      <input id="inputImages" type="file" accept="image/*" multiple onChange={(e) => generateIMGS(e, true)} />
      <button onClick={() => editingPost(editPost._id)}>העלה בקשה לתיקון</button>
    </div>
  );
}

export default EditPost;
