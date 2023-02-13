import { useEffect, useState, useContext } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { GarageContext } from "../../context/garageContext";

const GarageReviews = () => {
  const { getGarageById, garageInfo, setNewReview, newReview } = useContext(GarageContext);

  useEffect(() => {
    getGarageById();
  }, []);

  return (
    <div>
      <h1>{garageInfo.reviews?.text[0]}</h1>
      <h1>
        {garageInfo.reviews?.text.map((review) => {
          return <h4>{review}</h4>;
        })}
      </h1>
    </div>
  );
};
export default GarageReviews;
