import { useContext, useState } from "react";
import "./garage.css";
import { useNavigate } from "react-router-dom";

import { GarageContext } from "../../context/garageContext";
const GarageLogin = () => {
    const Navigate = useNavigate();
    const {
        registerSubmit,
        setRegisterInformation,
        registerInformation,
        setImgUrl,
        uploudImg,
        loginSubmit,
        setLoginInformation,
        loginInformation,
    } = useContext(GarageContext);
    const [registerPage, setRegisterPage] = useState("personalInfo");
    return (
        <>
            <div className="fakeBody">
                <div className="registerImage"></div>
                <div className="registerForm">
                    <form className="form" onSubmit={(ev) => loginSubmit(ev, loginInformation)}>
                        <img className="loginLogo" src="/images/logo.png" alt="" />
                        <div className="personalInfo">
                            <div className="field">
                                <input
                                    className="garageRegisterInput"
                                    type="email"
                                    placeholder="אימייל"
                                    name=""
                                    id=""
                                    onChange={(ev) =>
                                        setLoginInformation({
                                            ...loginInformation,
                                            email: ev.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="field">
                                <input
                                    className="garageRegisterInput"
                                    type="password"
                                    placeholder="סיסמא"
                                    name=""
                                    id=""
                                    onChange={(ev) =>
                                        setLoginInformation({
                                            ...loginInformation,
                                            password: ev.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <button className="submitButton">כניסה</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default GarageLogin;
