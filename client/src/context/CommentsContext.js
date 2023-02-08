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

    //!new posts comments====================

    const uploudComment = async () => {
        const token = localStorage.getItem("token");
        const garage_id = jwtDecode(token);

        console.log(garage_id);
        const req = await axios.post(
            `http://localhost:5555/api/comments/${newComment.post_id}/${garage_id.id}`,
            newComment
        );
    };
    
    //! get all comments ============================

    async function getAllComments(postId) {
        console.log(postId);
        const comments = await axios.post(
            "http://localhost:5555/api/comments/sortComments/display/" + postId
        );
        console.log(comments.data);
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
            }}
        >
            {children}
        </CommentsContext.Provider>
    );
}

export default CommentsProvider;
