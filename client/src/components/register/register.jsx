import { useContext, useEffect, useState } from "react";
import { UserContext } from "./../../context/user";
import "./register.css";
const Register = () => {
  const {
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

  const [passwordType, setPasswordType] = useState("password");

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
    <div className="register">
      <img src="/images/loginLogo-removebg.png" alt="" />
      <div className="registerWrap">
        <input
          type="text"
          placeholder="שם מלא"
          onChange={(e) =>
            setRegisterData({ ...registerData, full_name: e.target.value })
          }
          className="RegisterInput"
        />
        <input
          type="text"
          placeholder="דואר אלקטרוני"
          onChange={(e) =>
            setRegisterData({ ...registerData, email: e.target.value })
          }
          className="RegisterInput"
        />
        <div className="password">
          <input
            type={passwordType}
            placeholder="סיסמא"
            onChange={(e) =>
              setRegisterData({ ...registerData, password: e.target.value })
            }
            className="RegisterInput"
          />
          <label className="container">
            הראה סיסמא
            <input
              type="checkbox"
              onClick={() => {
                setPasswordType(
                  passwordType === "password" ? "text" : "password"
                );
              }}
            />
            <span className="checkmark"></span>
          </label>
        </div>
        <input
          type="text"
          placeholder="מספר טלפון"
          onChange={(e) =>
            setRegisterData({ ...registerData, phone: e.target.value })
          }
          className="RegisterInput"
        />
        <select
          onChange={(e) =>
            setRegisterData({ ...registerData, district: e.target.value })
          }
          name=""
          id=""
          className="registerSelect"
        >
          <option value="">אזור בארץ</option>
          <option value="מחוז הצפון">מחוז הצפון</option>
          <option value="מחוז חיפה">מחוז חיפה</option>
          <option value="מחוז תל אביב">מחוז תל אביב</option>
          <option value="מחוז המרכז">מחוז המרכז</option>
          <option value="מחוז ירושלים">מחוז ירושלים</option>
          <option value="מחוז הדרום">מחוז הדרום</option>
          <option value="מחוז יהודה ושומרון">מחוז יהודה ושומרון</option>
        </select>{" "}
        <select
          onChange={(e) => {
            setRegisterData({ ...registerData, car_make: e.target.value });
            setCarCompany({ make: e.target.value });
          }}
          name=""
          id=""
          className="registerSelect"
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
        <select
          onChange={(e) => {
            setRegisterData({ ...registerData, car_model: e.target.value });
            setUserCarModel({ model: e.target.value });
          }}
          name=""
          id=""
          className="registerSelect"
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
        <select
          onChange={(e) => {
            setRegisterData({ ...registerData, car_year: e.target.value });
          }}
          name=""
          id=""
          className="registerSelect"
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
        <a
          style={{ background: "forestgreen" }}
          href="#"
          class="btn1"
          onClick={(e) => registerReq(e)}
        >
          אישור והרשמה
        </a>
      </div>{" "}
    </div>
  );
};

export default Register;
