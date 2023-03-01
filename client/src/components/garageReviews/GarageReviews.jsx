import { useEffect, useState, useContext } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { GarageContext } from "../../context/garageContext";
import "./GarageReviewsCSS.css";


const GarageReviews = () => {
  const { getGarageById, garageInfo, setNewReview, newReview } = useContext(GarageContext);

  useEffect(() => {
    getGarageById();
  }, []);

  const reviews = {
    prfessionalism: [Number],
    reliability: [Number],
    text: [String],
  };

  return (
    <div className="allReviews">
    <div className="table-wrapper">
  <table className="table">
    <thead>
      <tr>
        <th className="textReliability">אמינות</th>
        <th className="professionalismReviews">מקצועיות</th>
        <th className="textReviews">ביקורות</th>
      </tr>
    </thead>
    <tbody>
      {garageInfo.reviews?.text.map((text, index) => {
        return (
          <tr key={index}>
            <td>{garageInfo.reviews?.reliability[index]}</td>
            <td>{garageInfo.reviews?.prfessionalism[index]}</td>
            <td>{text}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>


    </div>
  );
};
export default GarageReviews;
