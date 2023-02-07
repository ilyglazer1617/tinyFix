import { useContext, useState } from "react";
import "./garage.css";

import { GarageContext } from "../../context/garageContext";
const GarageLogin = () => {
  const {
    registerSubmit,
    setRegisterInformation,
    registerInformation,
    setImgUrl,
    uploudImg,
  } = useContext(GarageContext);
  const [registerPage, setRegisterPage] = useState("personalInfo");
  console.log(registerInformation);
  return (
    <>
      <div className="fakeBody">
        <div className="registerImage"></div>
        <div className="registerForm">
          <form
            className="form"
            onSubmit={(ev) => registerSubmit(ev, registerInformation)}
          >
            <img className="logo" src="/images/logo.png" alt="" />
            <div className="personalInfo">
              <div className="field">
                <input
                  type="text"
                  placeholder="אימייל"
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
                  type="email"
                  placeholder="סיסמא"
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
            </div>
            <button className="submitButton">כניסה</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default GarageLogin;
