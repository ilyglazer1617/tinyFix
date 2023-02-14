import { useEffect, useState, useContext } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { GarageContext } from "../../context/garageContext";

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
      <table>
        <thead>
          <th className="textReliability">אמינות</th>
          <th className="prfessionalismReviews">מקצועיות</th>
          <th className="textReviews"> ביקורות</th>
        </thead>
        <tbody>
          <tr>
            {garageInfo.reviews?.reliability.map((reliability) => {
              return <td>{reliability}</td>;
            })}
          </tr>
          <tr>
            {garageInfo.reviews?.prfessionalism.map((prfessionalism) => {
              return <td>{prfessionalism}</td>;
            })}
          </tr>
          <tr>
            {garageInfo.reviews?.text.map((text) => {
              return <td>{text}</td>;
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default GarageReviews;
