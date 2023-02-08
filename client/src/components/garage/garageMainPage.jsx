import "./navbar.css";
import "./garageMainPage.css";
import "./garage.css";

import { useState, useContext, useEffect } from "react";
import { PostsContext } from "../../context/PostsContext";

const GarageMainPage = () => {
    const { getAllPosts, posts, filterParams, setFilterParams } = useContext(PostsContext);

    useEffect(() => {
        console.log(filterParams);
        getAllPosts(filterParams);
    }, [filterParams]);
    return (
        <>
            <header>
                <img className="logo" src="Images/logo.png" alt="Logo" />
                <nav>
                    <ul className="nav__links">
                        <li>
                            <a onClick={() => getAllPosts()}>Services</a>
                        </li>
                        <li>
                            <a href="#">Projects</a>
                        </li>
                        <li>
                            <a href="#">About</a>
                        </li>
                        <select
                            name=""
                            id=""
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
                        <button onClick={() => setFilterParams({})}>נקה בחירה</button>
                    </ul>
                </nav>
                <a className="cta" href="#"></a>
            </header>
            <main>
                <div className="postsList">
                    {posts.map((post, index) => {
                        return (
                            <div key={index} className="postCard">
                                <div className="nameAndTime">
                                    <h3>12:31 20/4/2022</h3>
                                    <h1>עילי גלזר</h1>
                                </div>
                                <h2 className="problemClasification">
                                    סיווג הבעיה: {post.problem_classification}
                                </h2>
                                <h3>תיאור מפורט של הבעיה: {post.description}</h3>
                                <div className="imagesList">
                                    {post.images.map((image, index) => {
                                        return <img key={index} src={image} />;
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
                {/* <div className="filterContainer">
          <select
            name=""
            id=""
            onChange={(ev) => {
              setFilterParams({
                ...filterParams,
                problemClassification: ev.target.value,
              });
            }}
          >
            <option value="Windows">Windows</option>
            <option value="BodyWork">BodyWork</option>
            <option value="Mirrors">Mirrors</option>
          </select>
          <select
            name=""
            id=""
            onChange={(ev) => {
              setFilterParams({ ...filterParams, district: ev.target.value });
            }}
          >
            <option value="Markez">Markez</option>
            <option value="Zufen">Zufen</option>
            <option value="Durem">Durem</option>
          </select>
          <select
            name=""
            id=""
            onChange={(ev) => {
              setFilterParams({ ...filterParams, make: ev.target.value });
            }}
          >
            <option value="Mazda">Mazda</option>
            <option value="Ferrari">Ferrari</option>
            <option value="Tesla">Tesla</option>
          </select>
        </div> */}
            </main>
        </>
    );
};

export default GarageMainPage;
