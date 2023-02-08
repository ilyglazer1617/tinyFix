import { useContext, useState } from "react";
import "./garage.css";

import { GarageContext } from "../../context/garageContext";
const GarageRegister = () => {
    const { registerSubmit, setRegisterInformation, registerInformation, setImgUrl, uploudImg } =
        useContext(GarageContext);
    const [registerPage, setRegisterPage] = useState("personalInfo");
    console.log(registerInformation);
    return (
        <>
            <div className="fakeBody">
                <div className="registerImage"></div>
                <div className="registerForm">
                    <form className="form" onSubmit={(ev) => registerSubmit(ev, registerInformation)}>
                        <img className="garageRegisterLogo" src="/images/logo.png" alt="" />
                        {registerPage === "personalInfo" ? (
                            <div className="personalInfo">
                                <div className="field">
                                    <input
                                        className="garageRegisterInput"
                                        type="text"
                                        placeholder="שם מוסך"
                                        name=""
                                        id=""
                                        onChange={(ev) =>
                                            setRegisterInformation({
                                                ...registerInformation,
                                                garage_name: ev.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="field">
                                    <input
                                        className="garageRegisterInput"
                                        type="email"
                                        placeholder="אימייל"
                                        name=""
                                        id=""
                                        onChange={(ev) =>
                                            setRegisterInformation({
                                                ...registerInformation,
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
                                            setRegisterInformation({
                                                ...registerInformation,
                                                password: ev.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="field">
                                    <input
                                        className="garageRegisterInput"
                                        type="text"
                                        placeholder="שם בעלים"
                                        name=""
                                        id=""
                                        onChange={(ev) =>
                                            setRegisterInformation({
                                                ...registerInformation,
                                                owner: ev.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <button
                                    className="submitButton"
                                    onClick={() => setRegisterPage("locationInfo")}
                                >
                                    המשך
                                </button>
                            </div>
                        ) : (
                            ""
                        )}
                        {registerPage === "locationInfo" ? (
                            <div className="locationInfo">
                                <select
                                    className="garageRegisterInput"
                                    name=""
                                    placeholder="מחוז"
                                    id=""
                                    onChange={(ev) =>
                                        setRegisterInformation({
                                            ...registerInformation,
                                            district: ev.target.value,
                                        })
                                    }
                                >
                                    <option value="">מחוז</option>
                                    <option value="מחוז הצפון">מחוז הצפון</option>
                                    <option value="מחוז חיפה">מחוז חיפה</option>
                                    <option value="מחוז תל אביב">מחוז תל אביב</option>
                                    <option value="מחוז המרכז">מחוז המרכז</option>
                                    <option value="מחוז ירושלים">מחוז ירושלים</option>
                                    <option value="מחוז הדרום">מחוז הדרום</option>
                                    <option value="מחוז יהודה ושומרון">מחוז יהודה ושומרון</option>
                                </select>
                                <input
                                    className="garageRegisterInput"
                                    type="text"
                                    placeholder="עיר"
                                    name=""
                                    id=""
                                    onChange={(ev) =>
                                        setRegisterInformation({
                                            ...registerInformation,
                                            city: ev.target.value,
                                        })
                                    }
                                />
                                <input
                                    className="garageRegisterInput"
                                    type="text"
                                    placeholder="רחוב"
                                    name=""
                                    id=""
                                    onChange={(ev) =>
                                        setRegisterInformation({
                                            ...registerInformation,
                                            street: ev.target.value,
                                        })
                                    }
                                />
                                <input
                                    className="garageRegisterInput"
                                    type="text"
                                    placeholder="מספר מבנה"
                                    name=""
                                    id=""
                                    onChange={(ev) =>
                                        setRegisterInformation({
                                            ...registerInformation,
                                            street_number: ev.target.value,
                                        })
                                    }
                                />
                                <input
                                    className="garageRegisterInput"
                                    type="text"
                                    name=""
                                    placeholder="מיקוד"
                                    id=""
                                    onChange={(ev) =>
                                        setRegisterInformation({
                                            ...registerInformation,
                                            zip_code: ev.target.value,
                                        })
                                    }
                                />
                                <button
                                    className="submitButton"
                                    onClick={() => setRegisterPage("generalInfo")}
                                >
                                    המשך
                                </button>
                                <button
                                    className="submitButton"
                                    onClick={() => setRegisterPage("personalInfo")}
                                >
                                    חזור
                                </button>
                            </div>
                        ) : (
                            ""
                        )}
                        {registerPage === "generalInfo" ? (
                            <div className="generalInfo">
                                <input
                                    className="garageRegisterInput"
                                    type="tel"
                                    name=""
                                    placeholder="מספר טלפון"
                                    id=""
                                    onChange={(ev) =>
                                        setRegisterInformation({
                                            ...registerInformation,
                                            phone: ev.target.value,
                                        })
                                    }
                                />
                                <textarea
                                    placeholder="מידע על המוסך"
                                    cols="30"
                                    rows="1"
                                    onChange={(ev) =>
                                        setRegisterInformation({
                                            ...registerInformation,
                                            garage_info: ev.target.value,
                                        })
                                    }
                                ></textarea>
                                <input
                                    className="garageRegisterInput"
                                    type="file"
                                    accept="image/*"
                                    multiple="multiple"
                                    max={4}
                                    onChange={(e) => setImgUrl(e)}
                                />
                                <input
                                    className="garageRegisterInput"
                                    type="text"
                                    placeholder="זמני פעילות"
                                    name=""
                                    id=""
                                    onChange={(ev) =>
                                        setRegisterInformation({
                                            ...registerInformation,
                                            operation_time: ev.target.value,
                                        })
                                    }
                                />
                                <input
                                    className="garageRegisterInput"
                                    type="text"
                                    placeholder="מספר רשיון עסק"
                                    onChange={(ev) =>
                                        setRegisterInformation({
                                            ...registerInformation,
                                            licanse: ev.target.value,
                                        })
                                    }
                                />
                                <button className="submitButton" type="submit">
                                    שלח
                                </button>
                                <button
                                    className="submitButton"
                                    onClick={() => setRegisterPage("locationInfo")}
                                >
                                    חזור
                                </button>
                            </div>
                        ) : (
                            ""
                        )}
                    </form>
                </div>
            </div>
        </>
    );
};

export default GarageRegister;
