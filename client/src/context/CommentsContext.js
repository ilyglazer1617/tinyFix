import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import jwtdecode from "jwt-decode";
import jwtDecode from "jwt-decode";

export const CommentsContext = createContext();

function CommentsProvider(props) {
    const { children } = props;

    const [newComment, setNewComment] = useState({});
    const [comments, setComments] = useState([]);
    const [commentsOpen, setCommentsOpen] = useState("false");
    const [editComment, setEditComment] = useState({});

    useEffect(() => {
        const sendWhenComment = async () => {
            let token = localStorage.getItem("token");
            let id;
            if (token) {
                const { _id } = await jwtdecode(token);
                id = _id;
            }
            setNewComment({ ...newComment, garage_id: id });
            return;
        };
        sendWhenComment();
    }, []);

    //!new comments====================

    const uploudComment = async () => {
        const token = localStorage.getItem("token");
        const garage_id = await jwtDecode(token);

        const req = await axios.post(
            `http://localhost:5555/api/comments/${newComment.post_id}/${garage_id._id}`,
            newComment
        );
    };

    //!edit comments====================

    const editingComment = async () => {
        const token = localStorage.getItem("token");
        const garage_id = jwtDecode(token);
        const req = await axios.put(
            `http://localhost:5555/api/comments/${editComment.comment_id}`,
            editComment
        );
    };

    //! get all comments ============================

    async function getAllComments(postId) {
        const comments = await axios.post(
            "http://localhost:5555/api/comments/sortComments/display/" + postId
        );
        setComments(comments.data);
        setCommentsOpen("true");
    }

    return (
        <CommentsContext.Provider
            value={{
                newComment,
                comments,
                setComments,
                setNewComment,
                uploudComment,
                getAllComments,
                commentsOpen,
                editComment,
                editingComment,
                setEditComment,
            }}
        >
            {children}
        </CommentsContext.Provider>
    );
}

export default CommentsProvider;
