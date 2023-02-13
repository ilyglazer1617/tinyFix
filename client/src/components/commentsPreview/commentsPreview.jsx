import { useContext, useEffect, useState } from "react";
import Posts from "../comments/Comments";
import { CommentsContext } from "./../../context/CommentsContext";
import "./commentsPreview.css";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import GarageInfo from "./../garageInfo/garageInfo";
import ConstructionIcon from "@mui/icons-material/Construction";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const CommentsPreview = () => {
    const {
        commentsOpen,
        setCommentsOpen,
        getAllComments,
        comments,
        editComment,
        setEditComment,
        newComment,
        deleteComment,
        setComments,
    } = useContext(CommentsContext);

    useEffect(() => {
        console.log(commentsOpen);
    }, []);

    const navigate = useNavigate();

    let token = localStorage.getItem("token");
    const { _id, garage_name } = jwtDecode(token);
    console.log(garage_name);
    //to check if the garage already comment
    let letAddComment = comments.filter(
        (comment) => comment.garage_id._id == _id || comment.garage_id == _id
    );
    console.log(letAddComment);
    if (letAddComment.length === 0) {
        letAddComment = true;
    } else {
        letAddComment = false;
    }

    //extraxt date
    const extractDate = (date) => {
        let year = date.substring(0, 4);
        let month = date.substring(5, 7);
        let day = date.substring(8, 10);

        let extractedDate = day + "/" + month + "/" + year;
        return extractedDate;
    };

    return (
        <>
            <div className="backgroundBlocker">
                <div className="commentsPreview">
                    <div className="commentsContainer">
                        {!comments.length == 0 ? (
                            comments.map((comment) => {
                                return (
                                    <>
                                        <div
                                            className={
                                                comment.garage_id._id == _id || comment.garage_id == _id
                                                    ? "personalComment"
                                                    : "comment"
                                            }
                                        >
                                            {comment.garage_id._id == _id || comment.garage_id == _id ? (
                                                <div className="commentGarageName">
                                                    <h1>
                                                        ההצעה שלך :{" "}
                                                        {typeof comment.garage_id.garage_name === "string"
                                                            ? comment.garage_id.garage_name
                                                            : garage_name}
                                                    </h1>
                                                </div>
                                            ) : null}

                                            <div className="commentPrice">
                                                <h1>
                                                    {" "}
                                                    {comment.bid}
                                                    <svg
                                                        fill="#39ad25"
                                                        height="15px"
                                                        width="15px"
                                                        version="1.1"
                                                        id="Layer_1"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 330.00 330.00"
                                                        stroke="#39ad25"
                                                        stroke-width="0.0033"
                                                        transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)"
                                                    >
                                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                        <g
                                                            id="SVGRepo_tracerCarrier"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke="#CCCCCC"
                                                            stroke-width="0.66"
                                                        ></g>
                                                        <g id="SVGRepo_iconCarrier">
                                                            {" "}
                                                            <g id="XMLID_244_">
                                                                {" "}
                                                                <path
                                                                    id="XMLID_245_"
                                                                    d="M255,0c-8.284,0-15,6.716-15,15v285h-90V75c0-8.284-6.716-15-15-15s-15,6.716-15,15v240 c0,8.284,6.716,15,15,15h120c8.284,0,15-6.716,15-15V15C270,6.716,263.284,0,255,0z"
                                                                ></path>{" "}
                                                                <path
                                                                    id="XMLID_307_"
                                                                    d="M180,255c0,8.284,6.716,15,15,15s15-6.716,15-15V15c0-8.284-6.716-15-15-15H75c-8.284,0-15,6.716-15,15 v300c0,8.284,6.716,15,15,15s15-6.716,15-15V30h90V255z"
                                                                ></path>{" "}
                                                            </g>{" "}
                                                        </g>
                                                    </svg>
                                                </h1>
                                            </div>
                                            <div className="commentFix">
                                                <h3>
                                                    {comment.text}
                                                    <ConstructionIcon />
                                                </h3>
                                            </div>
                                            <div className="commentDate">
                                                <h4>
                                                    {extractDate(comment.updatedAt)}
                                                    <CalendarMonthIcon />
                                                </h4>
                                            </div>
                                            {comment.garage_id._id == _id || comment.garage_id == _id ? (
                                                <div className="manageComment">
                                                    <button
                                                        className="editComment"
                                                        onClick={() => {
                                                            setEditComment({
                                                                ...editComment,
                                                                comment_id: comment._id,
                                                                text: comment.text,
                                                                bid: comment.bid,
                                                            });
                                                            navigate("/EditComment");
                                                        }}
                                                    >
                                                        <EditIcon />
                                                        <p>עריכת הצעה</p>
                                                    </button>
                                                    <button
                                                        className="deleteComment"
                                                        onClick={() => deleteComment(comment._id)}
                                                    >
                                                        <DeleteIcon />
                                                        <p>מחק הצעה</p>
                                                    </button>
                                                </div>
                                            ) : null}
                                        </div>
                                    </>
                                );
                            })
                        ) : (
                            <h1>אין הצעות זמינות</h1>
                        )}
                    </div>
                    {letAddComment == true ? (
                        <div className="addCommentContainer">
                            <Posts />
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default CommentsPreview;
