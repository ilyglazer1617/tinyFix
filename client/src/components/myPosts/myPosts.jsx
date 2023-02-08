import React, { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "./../../context/user";
import "./myPosts.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
const MyPosts = () => {
  const { userPosts, commentOfPost } = useContext(UserContext);

  return (
    <div className="myPosts">
      {userPosts.map((post) => {
        return (
          <div class="myPostscard">
            <div class="card-top-part">
              <div class="left-part">
                <div class="user-name">
                  <p class="name">{post.description}</p>
                  <p class="role"> בתהליך </p>
                </div>
                <div class="user-position">
                  <p class="position">
                    סיווג התקלה: {post.problem_classification}
                  </p>
                </div>
              </div>
              <div class="right-part">
                <div class="user-photo">
                  <img src={post.images[0]} class="photo" />
                </div>
              </div>
            </div>
            <div class="card-bottom-part">
              <div class="bottom-part">
                <a class="link">
                  <span class="icon">
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
                  תגובות
                </a>
              </div>
              <div
                class="bottom-part"
                value={post._id}
                onClick={() => commentOfPost(post._id)}
              >
                <a class="link">
                  צפיות <RemoveRedEyeIcon />
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyPosts;
