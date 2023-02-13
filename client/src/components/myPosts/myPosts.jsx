import React, { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "./../../context/user";
import "./myPosts.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useState } from "react";
import { format } from "timeago.js";
import ConstructionIcon from "@mui/icons-material/Construction";
import { SocketContext } from "./../../context/socket";
import { useNavigate } from "react-router-dom";
import { PostsContext } from "../../context/PostsContext";

const MyPosts = () => {
    const { userPosts, commentOfPost, postComment, setPostComment } = useContext(UserContext);
    const { newChat, getAllChats, allChats } = useContext(SocketContext);
    const { editingPost, editPost, setEditPost } = useContext(PostsContext);

    const [visibility, setVisibility] = useState(null);
    const [hiddenOrNot, setHiddenOrNot] = useState(false);

    const navigate = useNavigate();

    return (
        <div className="myPosts">
            <div className="myPostsHedear">
                <ConstructionIcon />
                <p>התקלות שלי</p>
            </div>
            {userPosts.map((post, index) => {
                return (
                    <div key={index}>
                        <div className="myPostscard">
                            <div className="card-top-part">
                                <div className="right-part">
                                    <div className="user-photo">
                                        <img src={post.images[0]} className="photo" />
                                    </div>
                                </div>
                                <div className="left-part">
                                    <div className="user-name">
                                        <h3 className="name">{post.description}</h3>
                                        {/* <p className="role"> בתהליך </p> */}
                                    </div>

                                    {/* <div className="user-position">
                                        <p className="position">סיווג התקלה: {post.problem_classification}</p>
                                    </div> */}
                                </div>
                            </div>
                            <div className="card-bottom-part">
                                <div className="bottom-part">
                                    <button
                                        className="link"
                                        onClick={() => {
                                            commentOfPost(post._id);
                                            setVisibility(visibility === index ? null : index);
                                        }}
                                    >
                                        <span className="icon">
                                            <svg
                                                viewBox="0 0 20 20"
                                                height="20"
                                                width="20"
                                                xmlns="http://www.w3.org/2000/svg"
                                                data-name="20"
                                                id="_20"
                                            >
                                                <path
                                                    transform="translate(1.25 3.75)"
                                                    d="M16.25,12.5h-15A1.252,1.252,0,0,1,0,11.25v-10A1.252,1.252,0,0,1,1.25,0h15A1.251,1.251,0,0,1,17.5,1.25v10A1.251,1.251,0,0,1,16.25,12.5ZM1.25,1.819V11.25h15V1.819L9.106,6.763a.626.626,0,0,1-.713,0ZM2.625,1.25,8.75,5.487,14.875,1.25Z"
                                                    id="Fill"
                                                ></path>
                                            </svg>
                                        </span>
                                        תגובות: {post.numberOfComments}
                                    </button>
                                    <p> </p>
                                </div>
                                <div className="bottom-part" value={post._id}>
                                    <button
                                        className="link"
                                        onClick={() => {
                                            console.log(post);
                                            setEditPost(post);
                                            navigate("/EditPost");
                                        }}
                                    >
                                        עריכה
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div
                            className="commentsWrap"
                            style={{
                                visibility: "",
                            }}
                        >
                            {visibility === index && (
                                <div className="cardCommentWrraper">
                                    <div className="commentComments">
                                        <button
                                            onClick={() =>
                                                setPostComment(
                                                    [...postComment].sort((a, b) => {
                                                        return a.bid - b.bid;
                                                    })
                                                )
                                            }
                                        >
                                            מחיר
                                        </button>
                                        <button
                                            onClick={() =>
                                                setPostComment(
                                                    [...postComment].sort((a, b) => {
                                                        return (
                                                            b.garage_id.reviews.reliability[0] -
                                                            a.garage_id.reviews.reliability[0]
                                                        );
                                                    })
                                                )
                                            }
                                        >
                                            {" "}
                                            אמינות
                                        </button>
                                        <button
                                            onClick={() => {
                                                setPostComment(
                                                    [...postComment].sort((a, b) => {
                                                        return (
                                                            b.garage_id.reviews.prfessionalism[0] -
                                                            a.garage_id.reviews.prfessionalism[0]
                                                        );
                                                    })
                                                );
                                            }}
                                        >
                                            מקצועיות
                                        </button>
                                    </div>

                                    {postComment.map((comment) => {
                                        return (
                                            <div class="cardComment" key={comment._id}>
                                                <div class="textBoxComment">
                                                    <div class="textContentComment">
                                                        <div className="leftCommentSide">
                                                            <span class="spanComment">
                                                                {format(comment.createdAt)}
                                                            </span>
                                                            {hiddenOrNot ? (
                                                                <h3>בתהליך</h3>
                                                            ) : (
                                                                <button
                                                                    class="btnComment"
                                                                    onClick={() => {
                                                                        newChat(comment.garage_id._id);
                                                                    }}
                                                                >
                                                                    פתח צ'אט
                                                                </button>
                                                            )}
                                                        </div>
                                                        <p class="h1Comment">
                                                            {comment.garage_id.garage_name}
                                                        </p>
                                                    </div>
                                                    <div className="bidWrapper">
                                                        <p class="pComment" id="bid">
                                                            {comment.bid} :הצעה
                                                        </p>
                                                        <p class="pComment">{comment.text}</p>
                                                    </div>
                                                    <div className="dirug">
                                                        <p>
                                                            {comment.garage_id.reviews.prfessionalism[0]}
                                                            :מקצועיות
                                                        </p>
                                                        <p>
                                                            {comment.garage_id.reviews.reliability[0]} :אמינות
                                                        </p>
                                                    </div>
                                                </div>
                                                {/* <div class="imgCommentWrap">
                                                     <img
                                                        className="imgComment"
                                                        src={comment.garage_id.image.url}
                                                        alt=""
                                                    /> 
                                                </div> */}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MyPosts;
