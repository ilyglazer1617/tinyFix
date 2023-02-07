import "./setInfo.css";
import { useContext } from "react";
import { UserContext } from "./../../context/user";

const SetInfo = () => {
  const { setInfo, setSetInfo } = useContext(UserContext);
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
          <input
            type="text"
            onChange={(e) =>
              setSetInfo({ ...setInfo, car_make: e.target.value })
            }
          />
          :חברת רכב
        </h3>
        <h3 className="P_SetInfo">
          {" "}
          <input
            type="text"
            onChange={(e) =>
              setSetInfo({ ...setInfo, car_model: e.target.value })
            }
          />
          :דגם
        </h3>
        <h3 className="P_SetInfo">
          <input
            type="text"
            onChange={(e) =>
              setSetInfo({ ...setInfo, car_year: e.target.value })
            }
          />
          :שנת רכב
        </h3>
      </div>
    </div>
  );
};

export default SetInfo;
