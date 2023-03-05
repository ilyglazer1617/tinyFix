import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import jwtdecode from "jwt-decode";
import jwtDecode from "jwt-decode";

export const CommentsContext = createContext();

function CommentsProvider(props) {
    const { children } = props;

    const [newComment, setNewComment] = useState({});
    const [comments, setComments] = useState([]);
    const [commentsOpen, setCommentsOpen] = useState(null);
    const [editComment, setEditComment] = useState({});
    const [commentEditorOpen, setCommentEditorOpen] = useState(false);
    const [promptMessage, setPromptMessage] = useState("");
    const [showPromptMessage, setShowPromptMessage] = useState(false);

    // let token = localStorage.getItem("token");
    // const { _id, garage_name } = jwtDecode(token);
    // console.log(garage_name);
    //!new comments====================

    const uploudComment = async () => {
        const token = localStorage.getItem("token");
        const garage_id = await jwtDecode(token);

        const req = await axios.post(
            `https://tinyfix.onrender.com/api/comments/${newComment.post_id}/${garage_id._id}`,
            newComment
        );
        console.log(req.data.newComment);
        setPromptMessage(() => "ההצעה נוספה בהצלחה");
        setShowPromptMessage(true);
        removePrompt();

        setComments([...comments, req.data.newComment].sort((a, b) => a.bid - b.bid));
    };

    //!edit comments====================

    const editingComment = async () => {
        const token = localStorage.getItem("token");
        const garage_id = jwtDecode(token);
        const req = await axios.put(
            `https://tinyfix.onrender.com/api/comments/${editComment.comment_id}`,
            editComment
        );

        setComments(
            comments
                .map((comment) => {
                    if (comment._id === editComment.comment_id) {
                        return {
                            ...comment,
                            bid: editComment.bid,
                            text: editComment.text,
                        };
                    } else {
                        return comment;
                    }
                })
                .sort((a, b) => a.bid - b.bid)
        );
        setPromptMessage(() => "ההצעה נערכה בהצלחה");
        setShowPromptMessage(true);
        removePrompt();
    };

    //! get all comments ============================

    async function getAllComments(postId) {
        const comments = await axios.post(
            "https://tinyfix.onrender.com/api/comments/sortComments/display/" + postId
        );
        setComments(comments.data);
    }

    //! delete comment ============================

    async function deleteComment(comment_id) {
        const deleteC = await axios.delete(`https://tinyfix.onrender.com/api/comments/${comment_id}`);
        setComments(comments.filter((comment) => comment._id !== comment_id));
        setPromptMessage(() => "ההצעה נמחקה בהצלחה");
        setShowPromptMessage(true);
        removePrompt();
    }

    function removePrompt() {
        setTimeout(() => {
            setShowPromptMessage(false);
        }, 5000);
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
                editComment,
                editingComment,
                setEditComment,
                deleteComment,
                commentsOpen,
                setCommentsOpen,
                commentEditorOpen,
                setCommentEditorOpen,
                promptMessage,
                setPromptMessage,
                showPromptMessage,
                setShowPromptMessage,
                removePrompt,
            }}
        >
            {children}
        </CommentsContext.Provider>
    );
}

export default CommentsProvider;
