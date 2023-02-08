import List from "@mui/material/List";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "./../../context/user";

const Explanation = () => {
  const messages = [
    {
      id: 1,
      primary: "?עשית תאונה",
      secondary: "בשביל זה בידיוק אנחנו פה",
      person: "/images/intro1.png",
    },
    {
      id: 2,
      primary: "לחץ על כפתור ה + והעלה את התמונה ",
      secondary: `לאחר שמילאת את הטופס`,
      person: "/images/intro2.png",
    },
    {
      id: 3,
      primary: "אנחנו נפיץ את התקלה שלך",
      secondary: "בין המוסכים הטובים ביותר שנמצאים בקרבתך",
      person: "/images/intro3.jpg",
    },
    {
      id: 4,
      primary: "המוסכים יבחנו את התקלה שלך",
      secondary: "ויתחרו על מי יתן לך את ההצעה והמחיר הטוב ביותר",
      person: "/images/intro4.png",
    },
    {
      id: 5,
      primary: "שלב הבחירה",
      secondary: "אתה תבחר מי יטפל לך ברכב מבין כל ההצעות",
      person: "/images/intro5.png",
    },
  ];
  return (
    <div>
      <List sx={{ mb: 2 }}>
        <h2 style={{ margin: "0px" }} className="howWeStart">
          ?איך מתחילים
        </h2>
        <div className="cardWrap">
          {messages.map(({ id, primary, secondary, person }) => (
            <div className="card" key={id}>
              <div className="card-img">
                {" "}
                <img className="introPic" src={person} alt="" />
              </div>
              <div className="card-info">
                <p className="text-title">{primary}</p>
                <p class="text-body">{secondary}</p>
              </div>
            </div>
          ))}
        </div>
      </List>
    </div>
  );
};

export default Explanation;
