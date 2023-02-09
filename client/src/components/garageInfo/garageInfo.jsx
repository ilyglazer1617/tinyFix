import { useEffect, useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { GarageContext } from "./../../context/garageContext";
import "./garageInfo.css";
const GarageInfo = () => {
    const { getGarageById, garageInfo, setNewReview, newReview } = useContext(GarageContext);
    const Navigate = useNavigate();
    useEffect(() => {
        getGarageById();
    }, []);
    console.log(garageInfo);
    return (
        <>
            <div className="garageInfoContainer">
                <h1>{garageInfo.garage_name}</h1>
                <h2>בעלים: {garageInfo.owner}</h2>
                <img className="garageImage" src={garageInfo.image?.url} alt="" />
                <div className="garageInfo">
                    <p>{garageInfo.garage_info}</p>
                    <h3>טלפון: {garageInfo.phone}</h3>
                    <h2>זמני פתיחה: {garageInfo.operation_time}</h2>
                </div>
                <div className="address">
                    <h2>
                        כתובת: {garageInfo.city} {garageInfo.street} {garageInfo.street_number}
                    </h2>
                </div>
                <div className="reviews">
                    <h3>מקצועיות: {garageInfo.reviews?.prfessionalism[0]}</h3>
                    <h3>אמינות: {garageInfo.reviews?.reliability[0]}</h3>
                </div>
                <div className="contactButtons">
                    <button>צור קשר</button>
                    <button
                        onClick={() => {
                            Navigate("/AddReview");
                            setNewReview({ ...newReview, garage_id: garageInfo._id });
                        }}
                    >
                        הוסף ביקורת
                    </button>
                </div>
            </div>
        </>
    );
};

export default GarageInfo;
