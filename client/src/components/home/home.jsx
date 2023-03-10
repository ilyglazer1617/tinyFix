import * as React from "react";
import { styled } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import "./navBar.css";
import Bottom from "./../bottom/bottom";
import { UserContext } from "./../../context/user";
import { useEffect } from "react";
import { useContext } from "react";
import Explanation from "../explanation/explanation";
import MyPosts from "../myPosts/myPosts";
import SuccessPrompt from "./../successPrompt/SuccessPrompt";
import { CommentsContext } from "./../../context/CommentsContext";

const StyledFab = styled(Fab)({
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
});

export default function Home() {
    const { getUserInfo, userPosts, getUserPosts } = useContext(UserContext);
    const { showPromptMessage } = useContext(CommentsContext);
    useEffect(() => {
        getUserInfo();
    }, []);
    useEffect(() => {
        getUserPosts();
    }, []);
    return (
        <div className="home">
            <React.Fragment>
                {/* <CssBaseline />
                <Paper square sx={{ pb: "50px", boxShadow: "none" }}>
                    <Typography
                        variant="h5"
                        gutterBottom
                        component="div"
                        // className="homeHead"
                        sx={{ p: 2, pb: 0 }}
                    ></Typography>
                    {console.log(userPosts)} */}
                {userPosts.length ? <MyPosts /> : <Explanation />}
                {/* </Paper> */}
                <div className="buttomHome">
                    <Bottom className="bottomHomeC" />
                </div>
            </React.Fragment>
            {showPromptMessage === true && <SuccessPrompt />}
        </div>
    );
}
