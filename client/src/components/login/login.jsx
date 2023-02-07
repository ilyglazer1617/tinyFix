import "./login.css";
import { useContext } from "react";
import { UserContext } from "./../../context/user";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { setLoginData, loginData, login } = useContext(UserContext);
  return (
    <div className="login">
      <div className="LogoWrap">
        <img src="/images/logo.png" alt="" className="LogInlogo" />
      </div>
      <div className="loginWrap">
        <input
          placeholder="דואר אלקטרוני"
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
          type="text"
          name="text"
          className="input"
        ></input>
        <input
          placeholder="סיסמא"
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
          type="text"
          name="text"
          className="input"
        ></input>
        <a href="#" class="btn" onClick={() => login()}>
          כניסה
        </a>
        <a
          style={{ backgroundColor: "darkslateblue" }}
          href="#"
          class="btn"
          onClick={() => navigate("/register")}
        >
          הרשמה
        </a>
      </div>
    </div>
  );
};

export default Login;
