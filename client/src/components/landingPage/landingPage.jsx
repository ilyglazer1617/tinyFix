import "./landingPage.css";
import { to } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="slides">
                <div className="page page1">
                    <h2>
                        <span>מצלמים</span> את התקלה
                    </h2>
                    <img src="/images/intro2.png" alt="" />
                </div>
                <div className="page page2">
                    <img src="/images/intro4.png" alt="" />
                    <h2>
                        המוסכים <span>מציעים</span> את הצעות המחיר שלהם
                    </h2>
                </div>
                <div className="page page3">
                    <h2>
                        ואתה יוצא עם רכב כמו חדש <span>בלי</span> חור בכיס ובראש
                    </h2>
                    <img src="/images/intro5.png" alt="" />
                </div>
                <div className="page page4">
                    <div className="userSide">
                        <h3>?יש לך משתמש קיים</h3>
                        <button className="userLogin submitButton" onClick={() => navigate("/UserLogin")}>
                            התחבר
                        </button>
                        <h3>?עדיין אין לך משתמש</h3>
                        <button
                            className="userRegister submitButton"
                            onClick={() => navigate("/UserRegister")}
                        >
                            הרשמה
                        </button>
                    </div>
                    <div className="garageSide">
                        <h3>?בעל עסק</h3>
                        <button className="garageLogin submitButton" onClick={() => navigate("/GarageLogin")}>
                            התחבר
                        </button>
                        <button
                            className="garageRegister submitButton"
                            onClick={() => navigate("/GarageRegister")}
                        >
                            הרשמה
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
