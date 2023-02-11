import "./navbar.css";
import "./garageMainPage.css";
import "./garage.css";

import { useState, useContext, useEffect } from "react";
import { PostsContext } from "../../context/PostsContext";
import { CommentsContext } from "./../../context/CommentsContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./../../context/user";
import jwtDecode from "jwt-decode";

const GarageMainPage = () => {
  const { getAllPosts, posts, filterParams, setFilterParams } = useContext(PostsContext);
  const { getAllComments, setNewComment, newComment, editComment,comments } = useContext(CommentsContext);
  const { carMake, getAllCars } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    getAllPosts(filterParams);
    getAllCars();
  }, [filterParams, newComment, editComment, comments]);

  useEffect(() => {}, [posts]);

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

  return (
    <>
      <header>
        <img className="logo" src="Images/logo.png" alt="Logo" />
        <nav>
          <label>ההצעות שלי</label>
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
            name=""
            id="selectedProblem"
            onChange={(ev) => {
              setFilterParams({
                ...filterParams,
                problem_classification: ev.target.value,
              });
            }}
          >
            <option onClick={() => setFilterParams({})}>סיווג התקלה</option>
            <option value="פח">פח</option>
            <option value="פנסים">פנסים</option>
            <option value="חלונות">חלונות</option>
            <option value="שמשה קדמית">שמשה קדמית</option>
            <option value="דלתות">דלתות</option>
            <option value="מנוע">מנוע</option>
            <option value="בלמים">בלמים</option>
            <option value="צמיגים">צמיגים</option>
            <option value="מראות">מראות</option>
            <option value="לוח מכוונים">לוח מכוונים</option>
            <option value="אחר">אחר</option>
          </select>
          <select
            id="selectedCar"
            onChange={(e) => {
              setFilterParams({ ...filterParams, car_make: e.target.value });
            }}
            name=""
          >
            <option>סוג הרכב</option>
            {carMake.map((car, index) => {
              return (
                <option value={car} key={index}>
                  {car}
                </option>
              );
            })}
          </select>
          <button
            onClick={() => {
              setFilterParams({});
              document.getElementById("Checkbox").checked = false;
              document.getElementById("selectedProblem").value = "סיווג התקלה";
              document.getElementById("selectedCar").value = "סוג הרכב";
            }}
          >
            נקה בחירה
          </button>
        </nav>
        <a className="cta" href="#"></a>
      </header>
      <main>
        <div className="postsList">
          {posts.map((post, index) => {
            return (
              <div key={index} className="postCard">
                <div className="nameAndTime">
                  <h5>{extractDate(post.createdAt)} </h5>
                  <h1>{post.user[0].full_name}</h1>
                </div>
                <div className="topContainer">
                  <div className="carInfo">
                    <h2>:מידע על הרכב</h2>
                    <p>
                      {post.user[0].car_make} <span>:סוג הרכב</span>
                    </p>
                    <p>
                      {post.user[0].car_model} <span>:מודל הרכב</span>
                    </p>
                    <p>
                      {post.user[0].car_year}
                      <span> :שנתון</span>
                    </p>
                  </div>
                  <div className="problemInfo">
                    <h2 className="problemClasification">סיווג הבעיה: {post.problem_classification}</h2>
                    <h3>תיאור מפורט של הבעיה: {post.description}</h3>
                    {post.comments[0] ? post.comments[0].garage_id === _id ? <h3>כל הכבוד! ההצעה הנמוכה ביותר היא שלך: {post.comments[0].bid}</h3> : <h3>ההצעה הנמוכה ביותר: {post.comments[0].bid} </h3> : <h3>לתקלה זו אין הצעות! תהיה הראשון להציע</h3>}
                  </div>
                </div>
                <div className="imagesList">
                  {post.images.map((image, index) => {
                    return <img key={index} src={image} />;
                  })}
                </div>
                <button
                  className="comments"
                  onClick={() => {
                    navigate("/GarageMainPage/Comments");
                    getAllComments(post._id);
                    setNewComment({ ...newComment, post_id: post._id });
                  }}
                >
                  הצעות
                </button>
              </div>
            );
          })}
        </div>
       
      </main>
    </>
  );
};

export default GarageMainPage;