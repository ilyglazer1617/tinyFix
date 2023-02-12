import "./personalinfo.css";
import Bottom from "./../bottom/bottom";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "./../../context/user";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router-dom";

const PrsonalInfo = () => {
    const navigate = useNavigate();

    const { getUserInfo, userInfo } = useContext(UserContext);
    useEffect(() => {
        getUserInfo();
    }, []);
    return (
        <div className="personalInfo1">
            <div onClick={() => navigate("/UserMainPage")} className="personalInfoLogoWrapper">
                <img src="/images/logo.png" alt="" className="personalInfoLogo" />
            </div>
            <div className="card-client">
                <div className="user-picture">
                    <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                        <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path>
                    </svg>
                </div>
                <p className="name-client">
                    {" "}
                    <div className="P_Info">
                        <b> {console.log(userInfo)}</b>
                    </div>
                    <h3 className="P_Info">{userInfo.full_name} :שם משתמש</h3>
                    <h3 className="P_Info">{userInfo.email} :אימייל</h3>
                    <h3 className="P_Info"> {userInfo.phone} :מספר פלאפון</h3>
                    <h3 className="P_Info">{userInfo.district} :אזור</h3>
                    <h3 className="P_Info">{userInfo.car_make} :חברת רכב</h3>
                    <h3 className="P_Info">{userInfo.car_model} :דגם</h3>
                    <h3 className="P_Info">{userInfo.car_year} :שנת רכב</h3>
                    <span
                        onClick={() => navigate("/User/EditPersonalInformation")}
                        className="setPersonalInfo"
                    >
                        <CreateIcon />
                        לחץ כאן לעריכת מידע אישי
                    </span>
                </p>
            </div>
            <Bottom />
        </div>
    );
};

export default PrsonalInfo;
