import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import PersonIcon from "@mui/icons-material/Person";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import TableRowsIcon from "@mui/icons-material/TableRows";
import MailIcon from "@mui/icons-material/Mail";
import MapIcon from "@mui/icons-material/Map";
import "./navBar.css";
import Bottom from "./../bottom/bottom";
import { UserContext } from "./../../context/user";
import { useEffect } from "react";
import { useContext } from "react";

const messages = [
  {
    id: 1,
    primary: "?עשית תאונה",
    secondary: "בשביל זה בידיוק אנחנו פה",
    person: "/static/images/avatar/5.jpg",
  },
  {
    id: 2,
    primary: "לחץ על כפתור ה + והעלה את התמונה ",
    secondary: `לאחר שמילאת את הטופס`,
    person: "/static/images/avatar/1.jpg",
  },
  {
    id: 3,
    primary: "אנחנו נפיץ את התקלה שלך",
    secondary: "בין המוסכים הטובים ביותר שנמצאים בקרבתך",
    person: "/static/images/avatar/2.jpg",
  },
  {
    id: 4,
    primary: "המוסכים יבחנו את התקלה שלך",
    secondary: "ויתחרו על מי יתן לך את ההצעה והמחיר הטוב ביותר",
    person: "/static/images/avatar/3.jpg",
  },
  {
    id: 5,
    primary: "שלב הבחירה",
    secondary: "אתה תבחר מי יטפל לך ברכב מבין כל ההצעות",
    person: "/static/images/avatar/4.jpg",
  },
];

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

export default function Home() {
  const { getUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div className="home">
      <React.Fragment>
        <CssBaseline />
        <Paper square sx={{ pb: "50px" }}>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            // className="homeHead"
            sx={{ p: 2, pb: 0 }}
          >
            <div className="homeImgWrap">
              <img className="homeLogoImg" src="/images/logo.png" alt="" />
            </div>
          </Typography>
          <List sx={{ mb: 2 }}>
            <h2 style={{ margin: "0px" }} className="howWeStart">
              ?איך מתחילים
            </h2>
            <div className="cardWrap">
              {messages.map(({ id, primary, secondary, person }) => (
                <div class="card">
                  <div class="card-img"></div>
                  <div class="card-info">
                    <p class="text-title">{primary}</p>
                    <p class="text-body">{secondary}</p>
                  </div>
                </div>
              ))}
            </div>
          </List>
        </Paper>
        <Bottom />
      </React.Fragment>
    </div>
  );
}
