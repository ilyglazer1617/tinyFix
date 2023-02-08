import "./landingPage.css";
const LandingPage = () => {
    return (
        <div>
            <div className="slides">
                <div className="slide slide1">
                    <h2>
                        <span>מצלמים</span> את התקלה
                    </h2>
                    <img src="/images/intro2.png" alt="" />
                </div>
                <div className="slide slide2">
                    <img src="/images/intro4.png" alt="" />
                    <h2>
                        המוסכים <span>מציעים</span> את הצעות המחיר שלהם
                    </h2>
                </div>
                <div className="slide slide3">
                    <h2>
                        ואתה יוצא עם רכב כמו חדש <span>בלי</span> חור בכיס ובראש
                    </h2>
                    <img src="/images/intro5.png" alt="" />
                </div>
                <div className="slide slide4">
                    <div className="garageSide">
                        <h3>?יש לך משתמש קיים</h3>
                        <button className="userLogin submitButton">התחבר</button>
                        <h3>?עדיין אין לך משתמש</h3>
                        <button className="userRegister submitButton">הרשמה</button>
                    </div>
                    <div className="userSide">
                        <h3>?בעל עסק</h3>
                        <button className="garageLogin submitButton">התחבר</button>
                        <button className="garageRegister submitButton">הרשמה</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
