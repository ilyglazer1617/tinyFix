import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import jwtdecode from "jwt-decode";
import { useContext } from "react";

export const PostsContext = createContext();

function PostsProvider(props) {
    const { children } = props;

    const [newPost, setNewPost] = useState({});
    const [posts, setPosts] = useState([]);
    const [filterParams, setFilterParams] = useState({});
    const [editPost, setEditPost] = useState({});

    //!get user_id by token



    //! get all posts

    async function getAllPosts(params) {
        const token = localStorage.getItem("token");
        const token_info = jwtdecode(token);
        const district = token_info.district;

        const posts = await axios.post(`http://localhost:5555/api/posts/withFilters/${district}`, params);
        setPosts(posts.data);
        console.log(posts.data);
    }

    //!new posts functions
    //generate images and push to newPost
    // setNewPost({ ...newPost, user_id: id });

    const generateIMGS = (e) => {
        if (e.target.files.length > 4) {
            const input = document.getElementById("inputImages");
            input.value = "";
            input.type = "";
            input.type = "file";
            alert("You can only select a maximum of 4 files");
        } else {
            setImgUrls(e);
        }
    };

    const setImgUrls = (e) => {
        const files = e.target.files;
        const base64Array = [];

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            readFile(reader, files[i], base64Array, setNewPost, files.length);
        }
    };

    const readFile = (reader, file, base64Array, setNewPost, total) => {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            base64Array.push(reader.result);
            if (base64Array.length === total) {
                setNewPost({ ...newPost, images: base64Array });
            }
        };
    };

    //generate images and push tu newPost===============

    const uploudPost = async () => {
        const req = await axios.post("http://localhost:5555/api/posts", newPost);
    };

    //!new posts functions====================

    //!  editing post========================

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
                editPost,
                setEditPost,
            }}
        >
            {children}
        </PostsContext.Provider>
    );
}

export default PostsProvider;
