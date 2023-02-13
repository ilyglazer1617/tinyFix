import "./personalinfo.css";
import Bottom from "./../bottom/bottom";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "./../../context/user";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FactoryIcon from "@mui/icons-material/Factory";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

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
        <div className="userInfoBox">
          <PersonIcon />
          <h3 className="P_Info">{userInfo.full_name}</h3>
        </div>
        <div className="userInfoBox">
          <AlternateEmailIcon />
          <h3 className="P_Info">{userInfo.email}</h3>
        </div>
        <div className="userInfoBox">
          <LocalPhoneIcon />
          <h3 className="P_Info"> {userInfo.phone}</h3>
        </div>
        <div className="userInfoBox">
          <LocationOnIcon />
          <h3 className="P_Info">{userInfo.district}</h3>
        </div>
        <div className="userInfoBox">
          <FactoryIcon />
          <h3 className="P_Info">{userInfo.car_make}</h3>
        </div>
        <div className="userInfoBox">
          <DirectionsCarIcon />
          <h3 className="P_Info">{userInfo.car_model}</h3>
        </div>
        <div className="userInfoBox">
          <CalendarMonthIcon />
          <h3 className="P_Info">{userInfo.car_year}</h3>
        </div>
        <span onClick={() => navigate("/User/EditPersonalInformation")} className="setPersonalInfo">
          <CreateIcon />
          לחץ כאן לעריכת מידע אישי
        </span>
      </div>
      <Bottom />
    </div>
  );
};

export default PrsonalInfo;
