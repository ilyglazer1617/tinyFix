import "./setInfo.css";
import { useContext, useEffect } from "react";
import { UserContext } from "./../../context/user";
import { useNavigate } from "react-router-dom";
import SuccessPrompt from "./../successPrompt/SuccessPrompt";
import { CommentsContext } from "./../../context/CommentsContext";

const SetInfo = () => {
    const {
        setInfo,
        setSetInfo,
        updateUserInfo,
        userInfo,
        setUserInfo,
        // carMake,
        // getAllCars,
        // carCompany,
        // setCarCompany,
        // getAllCarModels,
        // carModels,
        // carYears,
        // userCarModel,
        // getCarYear,

        registerReq,
        registerData,
        setRegisterData,
        carMake,
        getAllCars,
        updating,
        setUpdating,
        setCarCompany,
        carCompany,
        getAllCarModels,
        carModels,
        setUserCarModel,
        userCarModel,
        getCarYear,
        carYears,
        getUserInfo,
    } = useContext(UserContext);
    const { showPromptMessage } = useContext(CommentsContext);

    useEffect(() => {
        getUserInfo();
    }, []);
    console.log(userInfo);

    //! get all makes
    useEffect(() => {
        getAllCars();
    }, []);

    //! fet all models
    useEffect(() => {
        getAllCarModels();
    }, [carCompany]);

    //! get all years
    useEffect(() => {
        getCarYear();
    }, [userCarModel]);
    const navigate = useNavigate();

    console.log(userInfo);

    return (
        <div>
            <div className="SetInfoForm">
                {" "}
                <h3 className="P_SetInfo">
                    {" "}
                    <input
                        type="text"
                        defaultValue={userInfo.full_name}
                        onChange={(e) => setSetInfo({ ...setInfo, full_name: e.target.value })}
                    />
                    :שם משתמש
                </h3>
                <h3 className="P_SetInfo">
                    <input
                        type="text"
                        defaultValue={userInfo.email}
                        onChange={(e) => setSetInfo({ ...setInfo, email: e.target.value })}
                    />
                    :אימייל
                </h3>
                <h3 className="P_SetInfo">
                    <input
                        type="text"
                        defaultValue={userInfo.phone}
                        className="P_SetInfo_input"
                        onChange={(e) => setSetInfo({ ...setInfo, phone: e.target.value })}
                    />
                    :מספר פלאפון
                </h3>
                <h3 className="P_SetInfo">
                    <select
                        // defaultValue={userInfo.district}
                        onChange={(e) => setSetInfo({ ...setInfo, district: e.target.value })}
                        className="P_SetInfo"
                    >
                        <option value="">אזור בארץ</option>
                        <option value="מחוז הצפון">מחוז הצפון</option>
                        <option value="מחוז חיפה">מחוז חיפה</option>
                        <option value="מחוז תל אביב">מחוז תל אביב</option>
                        <option value="מחוז המרכז">מחוז המרכז</option>
                        <option value="מחוז ירושלים">מחוז ירושלים</option>
                        <option value="מחוז הדרום">מחוז הדרום</option>
                        <option value="מחוז יהודה ושומרון">מחוז יהודה ושומרון</option>
                    </select>
                </h3>
                <h3 className="P_SetInfo">
                    <select
                        // defaultValue={userInfo.car_model}
                        onChange={(e) => {
                            setCarCompany({ make: e.target.value });
                            setSetInfo({ ...setInfo, car_make: e.target.value });
                        }}
                        name=""
                        id=""
                        // className="registerSelect"
                    >
                        <option>חברה</option>
                        {carMake.map((car, index) => {
                            return (
                                <option value={car} key={index}>
                                    {car}
                                </option>
                            );
                        })}
                    </select>
                    :חברת רכב
                </h3>
                <h3 className="P_SetInfo">
                    <select
                        onChange={(e) => {
                            setUserCarModel({ model: e.target.value });
                            setSetInfo({ ...setInfo, car_model: e.target.value });
                        }}
                        name=""
                        id=""
                    >
                        <option value="">דגם</option>
                        {carModels.map((model) => {
                            return (
                                <option key={model} value={model}>
                                    {model}
                                </option>
                            );
                        })}
                    </select>{" "}
                    :דגם
                </h3>
                <h3 className="P_SetInfo">
                    {" "}
                    <select
                        onChange={(e) => {
                            setRegisterData({ ...registerData, car_year: e.target.value });
                        }}
                        name=""
                        id=""
                    >
                        <option value="">שנה</option>
                        {carYears.map((year) => {
                            return (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            );
                        })}
                    </select>
                    :שנת רכב{" "}
                </h3>
                <button
                    onClick={(e) => {
                        updateUserInfo(e);
                    }}
                >
                    עדכן מידע{" "}
                </button>
            </div>
            {showPromptMessage === true && <SuccessPrompt />}
        </div>
    );
};

export default SetInfo;
