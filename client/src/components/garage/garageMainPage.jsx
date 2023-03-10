import "./navbar.css";
import "./garageMainPage.css";
import "./garage.css";

import { useState, useContext, useEffect } from "react";
import { PostsContext } from "../../context/PostsContext";
import { CommentsContext } from "./../../context/CommentsContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./../../context/user";
import jwtDecode from "jwt-decode";
import Posts from "../comments/Comments";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import MessageIcon from "@mui/icons-material/Message";
import GarageInfo from "../garageInfo/garageInfo";
import FactoryIcon from "@mui/icons-material/Factory";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CommentsPreview from "./../commentsPreview/commentsPreview";
import { GarageContext } from "./../../context/garageContext";
import SuccessPrompt from "./../successPrompt/SuccessPrompt";

const GarageMainPage = () => {
    const { getAllPosts, posts, filterParams, setFilterParams } = useContext(PostsContext);
    const {
        getAllComments,
        setNewComment,
        newComment,
        editComment,
        comments,
        commentsOpen,
        setCommentsOpen,
        showPromptMessage,
        setShowPromptMessage,
        removePrompt,
    } = useContext(CommentsContext);
    const { carMake, getAllCars } = useContext(UserContext);
    const { logout } = useContext(GarageContext);
    const navigate = useNavigate();

    useEffect(() => {
        getAllPosts(filterParams);
        getAllCars();
    }, [filterParams, newComment, editComment, comments]);

    let token = localStorage.getItem("token");
    const { _id } = jwtDecode(token);

    //extraxt date
    const extractDate = (date) => {
        let year = date.substring(0, 4);
        let month = date.substring(5, 7);
        let day = date.substring(8, 10);

        let extractedDate = day + "/" + month + "/" + year;
        return extractedDate;
    };
    console.log("rendering");
    return (
        <>
            <header className="garageMainHeader"></header>
            <div className="navbar">
                <div></div>
                <div className="navbarButtons">
                    <button onClick={() => navigate("/UserChatsList")}>??'????????</button>
                    <button onClick={() => navigate("/GarageReviews")}>??????????????</button>
                    <button onClick={() => logout()} style={{ color: "red" }}>
                        ??????????
                    </button>
                    <img
                        className="navbarProfilePicture"
                        src="https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-image-700-205124837.jpg"
                        alt=""
                        onClick={() => navigate("/GarageInfo")}
                    />
                </div>
            </div>
            <main>
                {/* <div className="leftPlaceHolder">
          <GarageInfo />
        </div> */}
                <div className="postsList">
                    {posts.map((post, index) => {
                        return (
                            <div key={index} className="postCard">
                                <div className="userInfo">
                                    <img
                                        className="profilePicture"
                                        src="https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-image-700-205124837.jpg"
                                        alt=""
                                    />
                                    <div className="nameAndTime">
                                        <h1>{post.user[0].full_name}</h1>
                                        <h5>{extractDate(post.createdAt)} </h5>
                                    </div>
                                </div>
                                <div className="topContainer">
                                    <div className="carInfo">
                                        <h2>:???????? ???? ????????</h2>
                                        <p>
                                            <FactoryIcon />
                                            {post.user[0].car_make}
                                        </p>
                                        <p>
                                            <DirectionsCarIcon /> {post.user[0].car_model}
                                        </p>
                                        <p>
                                            <ScheduleIcon /> {post.user[0].car_year}
                                        </p>
                                    </div>
                                    <div className="problemInfo">
                                        <h2 className="problemClasification">
                                            ?????????? ??????????: {post.problem_classification}
                                        </h2>
                                        {post.comments[0] ? (
                                            post.comments[0].garage_id === _id ? (
                                                <h3>
                                                    ???? ??????????! ?????????? ???????????? ?????????? ?????? ??????:{" "}
                                                    {post.comments[0].bid}???
                                                </h3>
                                            ) : (
                                                <h3>?????????? ???????????? ??????????: {post.comments[0].bid}??? </h3>
                                            )
                                        ) : (
                                            <h3>?????????? ???? ?????? ??????????! ???????? ???????????? ??????????</h3>
                                        )}
                                        <h3>?????????? ?????????? ???? ??????????: {post.description}</h3>
                                    </div>
                                </div>
                                <div className="imagesList">
                                    <Carousel width={"200%"} centerSlidePercentage={"10"}>
                                        {post.images.map((image, index) => {
                                            return (
                                                <div>
                                                    <img key={index} src={image} />
                                                </div>
                                            );
                                        })}
                                    </Carousel>
                                </div>
                                <div
                                    className="comments"
                                    onClick={() => {
                                        setCommentsOpen(commentsOpen === index ? null : index);
                                        getAllComments(post._id);
                                        setNewComment({ ...newComment, post_id: post._id });
                                    }}
                                >
                                    <div className="icon">
                                        <MessageIcon />
                                        <p>{post.numberOfComments} :??????????</p>
                                    </div>
                                </div>
                                {commentsOpen === index ? <CommentsPreview /> : ""}
                            </div>
                        );
                    })}
                </div>
                <div className="rightPlaceHolder">
                    <nav>
                        <label>???????????? ??????</label>
                        <input
                            type="checkbox"
                            id="Checkbox"
                            onChange={(ev) => {
                                if (ev.target.checked) {
                                    setFilterParams({
                                        ...filterParams,
                                        garage_id: _id,
                                    });
                                } else {
                                    setFilterParams({
                                        ...filterParams,
                                        garage_id: undefined,
                                    });
                                }
                            }}
                        />
                        <select
                            className="submitButton"
                            name=""
                            id="selectedProblem"
                            onChange={(ev) => {
                                setFilterParams({
                                    ...filterParams,
                                    problem_classification: ev.target.value,
                                });
                            }}
                        >
                            <option onClick={() => setFilterParams({})}>?????????? ??????????</option>
                            <option value="????">????</option>
                            <option value="??????????">??????????</option>
                            <option value="????????????">????????????</option>
                            <option value="???????? ??????????">???????? ??????????</option>
                            <option value="??????????">??????????</option>
                            <option value="????????">????????</option>
                            <option value="??????????">??????????</option>
                            <option value="????????????">????????????</option>
                            <option value="??????????">??????????</option>
                            <option value="?????? ??????????????">?????? ??????????????</option>
                            <option value="??????">??????</option>
                        </select>
                        <select
                            className="submitButton"
                            id="selectedCar"
                            onChange={(e) => {
                                setFilterParams({ ...filterParams, car_make: e.target.value });
                            }}
                            name=""
                        >
                            <option>????????</option>
                            {carMake.map((car, index) => {
                                return (
                                    <option value={car} key={index}>
                                        {car}
                                    </option>
                                );
                            })}
                        </select>
                        <button
                            className="submitButton"
                            onClick={() => {
                                setFilterParams({});
                                document.getElementById("Checkbox").checked = false;
                                document.getElementById("selectedProblem").value = "?????????? ??????????";
                                document.getElementById("selectedCar").value = "????????";
                            }}
                        >
                            ?????? ??????????
                        </button>
                        <p>???????? ????????????: {posts.length}</p>
                    </nav>
                </div>
            </main>
            {showPromptMessage === true && <SuccessPrompt />}
        </>
    );
};

export default GarageMainPage;
