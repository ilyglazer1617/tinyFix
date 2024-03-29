import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import jwtdecode from "jwt-decode";
import { useContext } from "react";
import { UserContext } from "./user";
import { useNavigate } from "react-router-dom";
import { CommentsContext } from "./CommentsContext";

export const PostsContext = createContext();

function PostsProvider(props) {
    const { children } = props;
    const navigate = useNavigate();

    const { userPosts, setUserPosts } = useContext(UserContext);
    const { setPromptMessage, setShowPromptMessage, removePrompt } = useContext(CommentsContext);

    const [newPost, setNewPost] = useState({});
    const [posts, setPosts] = useState([]);
    const [filterParams, setFilterParams] = useState({});
    const [editPost, setEditPost] = useState({});

    //! get all posts

    async function getAllPosts(params) {
        const token = localStorage.getItem("token");
        const token_info = jwtdecode(token);
        const district = token_info.district;

        const posts = await axios.post(
            `https://tinyfix.onrender.com/api/posts/withFilters/${district}`,
            params
        );
        setPosts(posts.data);
        console.log(posts.data);
    }

    //!new posts functions
    //generate images and push to newPost
    // setNewPost({ ...newPost, user_id: id });

    const generateIMGS = (e, edit = false) => {
        if (e.target.files.length > 4) {
            const input = document.getElementById("inputImages");
            input.value = "";
            input.type = "";
            input.type = "file";
            alert("You can only select a maximum of 4 files");
        } else {
            setImgUrls(e, edit);
        }
    };

    const setImgUrls = (e, edit) => {
        const files = e.target.files;
        const base64Array = [];

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            readFile(reader, files[i], base64Array, setNewPost, files.length, edit);
        }
    };

    const readFile = (reader, file, base64Array, setNewPost, total, edit) => {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            base64Array.push(reader.result);
            if (base64Array.length === total) {
                edit == false
                    ? setNewPost({ ...newPost, images: base64Array })
                    : setEditPost({ ...editPost, images: base64Array });
            }
        };
    };

    const uploudPost = async () => {
        const req = await axios.post("https://tinyfix.onrender.com/api/posts", newPost);
        setUserPosts([...userPosts, req.data]);
        navigate("/UserMainPage");
        setPromptMessage(() => "הפוסט נוסף בהצלחה");
        setShowPromptMessage(true);
        removePrompt();
    };

    //!  editing post========================
    const editingPost = async (post_Id) => {
        const req = await axios.put(`https://tinyfix.onrender.com/api/posts/${post_Id}`, editPost);
        // console.log(req.data);
        // console.log(userPosts);
        setUserPosts([...userPosts, req.data]);
        navigate("/UserMainPage");
        setPromptMessage(() => "הפוסט נערך בהצלחה");
        setShowPromptMessage(true);
        removePrompt();
    };

    //!  delete post========================
    const deletePost = async (post_Id) => {
        const req = await axios.delete(`https://tinyfix.onrender.com/api/posts/${post_Id}`);
        setUserPosts(userPosts.filter((post) => post._id != post_Id));
        navigate("/UserMainPage");
        setPromptMessage(() => "הפוסט נמחק בהצלחה");
        setShowPromptMessage(true);
        removePrompt();
    };

    return (
        <PostsContext.Provider
            value={{
                newPost,
                setNewPost,
                uploudPost,
                generateIMGS,
                posts,
                setPosts,
                getAllPosts,
                filterParams,
                setFilterParams,
                editingPost,
                editPost,
                setEditPost,
                deletePost,
            }}
        >
            {children}
        </PostsContext.Provider>
    );
}

export default PostsProvider;
