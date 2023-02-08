import "./setInfo.css";
import { useContext, useEffect } from "react";
import { UserContext } from "./../../context/user";

const SetInfo = () => {
  const {
    setInfo,
    setSetInfo,
    updateUserInfo,
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
  } = useContext(UserContext);
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
  return (
    <div>
      <div className="SetInfoForm">
        {" "}
        <h3 className="P_SetInfo">
          {" "}
          <input
            type="text"
            onChange={(e) =>
              setSetInfo({ ...setInfo, full_name: e.target.value })
            }
          />
          :שם משתמש
        </h3>
        <h3 className="P_SetInfo">
          <input
            type="text"
            onChange={(e) => setSetInfo({ ...setInfo, email: e.target.value })}
          />
          :אימייל
        </h3>
        <h3 className="P_SetInfo">
          <input
            type="text"
            className="P_SetInfo_input"
            onChange={(e) => setSetInfo({ ...setInfo, phone: e.target.value })}
          />
          :מספר פלאפון
        </h3>
        <h3 className="P_SetInfo">
          <input
            type="text"
            onChange={(e) =>
              setSetInfo({ ...setInfo, district: e.target.value })
            }
          />
          :אזור
        </h3>
        <h3 className="P_SetInfo">
          <select
            onChange={(e) => {
              setCarCompany({ make: e.target.value });
              setSetInfo({ ...setInfo, car_make: e.target.value });
            }}
            name=""
            id=""
            // className="registerSelect"
          >
            <option value="">חברה</option>
            {carMake.map((car, index) => {
              return (
                <option value={car} key={index}>
                  {car}
                </option>
              );
            })}
          </select>{" "}
          :חברת רכב
        </h3>
        <h3 className="P_SetInfo">
          {" "}
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
        <button onClick={(e) => updateUserInfo(e)}>עדכן מידע </button>
      </div>
    </div>
  );
};

export default SetInfo;
