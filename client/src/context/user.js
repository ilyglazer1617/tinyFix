import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtdecode from "jwt-decode";
import axios from "axios";
import App from "./../App";

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const { children } = props;
    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState({});
    const [carMake, setcarMake] = useState([]);
    const [updating, setUpdating] = useState("false");
    const [carCompany, setCarCompany] = useState({});
    const [carModels, setCarModels] = useState([]);
    const [userCarModel, setUserCarModel] = useState({});
    const [carYears, setCarYears] = useState([]);
    const [loginData, setLoginData] = useState({});
    const [userInfo, setUserInfo] = useState([]);
    const [setInfo, setSetInfo] = useState({});
    const [userPosts, setUserPosts] = useState([]);
    const [postComment, setPostComment] = useState([]);

    let token = localStorage.getItem("token");
    let id;
    if (token) {
        const { _id } = jwtdecode(token);
        id = _id;
    }

    //! go to garage profile

    const goToGarage = async () => {
        try {
        } catch (error) {
            console.log(error);
        }
    };
    //!get all comments of a specific posts

    const commentOfPost = async (postId) => {
        try {
            const res = await axios.post(
                "https://tinyfix.onrender.com/api/comments/sortComments/display/" + postId
            );
            setPostComment(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    //! get user posts
    const getUserPosts = async () => {
        try {
            const res = await axios.get("https://tinyfix.onrender.com/api/posts/" + id);
            setUserPosts(res.data);
            // console.log(userPosts);
        } catch (error) {
            console.log(error.message);
        }
    };
    //! update user info
    const updateUserInfo = async (e) => {
        e.preventDefault();
        const data = setInfo;
        try {
            const res = await axios.put("https://tinyfix.onrender.com/user/updateUser/" + id, data);
            setUserInfo(res.data);
            alert("המידע עודכן בהצלחה");
            navigate("/UserPersonalInfo");
        } catch (error) {
            console.log(error.message);
        }
    };
    //! get User info
    const getUserInfo = async () => {
        try {
            const res = await axios.get("https://tinyfix.onrender.com/user/" + id);

            setUserInfo(res.data);
        } catch (error) {
            console.log(error.message);
        }
    };
    //!login
    const login = async () => {
        try {
            console.log("hi");
            const res = await axios.post("https://tinyfix.onrender.com/api/login", loginData);
            localStorage.setItem("token", res.headers["x-auth-token"]);
            localStorage.setItem("user", "user");
            navigate("/UserMainPage");
            console.log(res);
        } catch (error) {
            console.log(error.message);
        }
    };

    //! get all car years by make & model
    const getCarYear = async () => {
        try {
            const data = { make: carCompany.make, model: userCarModel.model };
            const carYears = await axios.post("https://tinyfix.onrender.com/user/getCarYear", data);
            setCarYears(
                carYears.data
                    .map((obj) => obj.year)
                    .filter((value, index, self) => self.indexOf(value) === index)
            );
        } catch (error) {
            console.log(error.message);
        }
    };

    //! get all car models
    const getAllCarModels = async () => {
        try {
            let allModels = await axios.post("https://tinyfix.onrender.com/user/getCarModel", carCompany);
            setCarModels(
                allModels.data
                    .map((item) => item.model)
                    .filter((value, index, self) => self.indexOf(value) === index)
            );
        } catch (error) {
            console.log(error);
        }
    };

    //!get all car make
    const getAllCars = async () => {
        try {
            let allCars = await axios.post("https://tinyfix.onrender.com/user/getCarMake");
            setcarMake(allCars.data);
        } catch (error) {
            console.log(error);
        }
    };

    //! register
    const registerReq = async (e) => {
        e.preventDefault();
        console.log(registerData);
        try {
            e.preventDefault();
            const res = await axios.post("https://tinyfix.onrender.com/user/register", registerData);

            e.target.reset();
            navigate("/UserMainPage");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            <UserContext.Provider
                value={{
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
                    setLoginData,
                    loginData,
                    login,
                    getUserInfo,
                    userInfo,
                    setInfo,
                    setSetInfo,
                    updateUserInfo,
                    userPosts,
                    setUserPosts,
                    getUserPosts,
                    commentOfPost,
                    postComment,
                    setPostComment,
                }}
            >
                {children}
            </UserContext.Provider>
        </div>
    );
};

export default UserContextProvider;
