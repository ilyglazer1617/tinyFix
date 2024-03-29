import { createContext, useState, useContext } from "react";
import App from "./../App";
import axios from "axios";
import PostsProvider from "./PostsContext";
import jwtDecode from "jwt-decode";
import { useNavigate, Navigate } from "react-router-dom";
import { CommentsContext } from "./CommentsContext";
export const GarageContext = createContext();

const GarageProvider = (props) => {
    const Navigate = useNavigate();
    const { children } = props;
    const [registerInformation, setRegisterInformation] = useState([]);
    const [loginInformation, setLoginInformation] = useState([]);
    const [garageInfo, setGarageInfo] = useState([]);
    const [image, setImg] = useState();
    const [newReview, setNewReview] = useState({});
    const [addReviewOpen, setAddReviewOpen] = useState(false);

    const { removePrompt, promptMessage, setPromptMessage, showPromptMessage, setShowPromptMessage } =
        useContext(CommentsContext);

    async function registerSubmit(ev, info) {
        ev.preventDefault();
        try {
            const req = await axios.post("https://tinyfix.onrender.com/api/garage/register", {
                ...info,
                image: image,
            });
            localStorage.setItem("token", req.data.token);
            Navigate("/GarageMainPage");
        } catch (error) {
            console.log(error);
        }
    }

    async function loginSubmit(ev, info) {
        ev.preventDefault();
        const garage = await axios.post("https://tinyfix.onrender.com/api/garage/login", info);
        localStorage.setItem("token", garage.data);
        Navigate("/GarageMainPage");
    }

    // function that set the newArticle obj with imgUrl
    const setImgUrl = (e) => {
        const file = e.target.files[0]; // defines file as an object who contain image data
        const reader = new FileReader(); // defines new instance from FileReader class
        reader.readAsDataURL(file); // converts the file to base64

        //func that get the image in base64 and add it to newArticle object
        reader.onloadend = () => {
            setImg(reader.result);
        };
    };

    const uploudImg = async () => {
        const req = await axios.post("https://tinyfix.onrender.com/api/garage/register", {
            ...registerInformation,
            image: image,
        });
    };

    async function getGarageById(garageId) {
        if (garageId) {
            const garage = await axios.get(`https://tinyfix.onrender.com/api/garage/${garageId}`);
            setGarageInfo(garage.data);
            console.log(garage.data);
            Navigate("/GarageInfo");
        } else {
            const token = localStorage.getItem("token");
            const token_info = await jwtDecode(token);
            const garage = await axios.get(`https://tinyfix.onrender.com/api/garage/${token_info._id}`);
            setGarageInfo(garage.data);
        }
    }

    async function addReviewToGarage(ev) {
        ev.preventDefault();
        try {
            const comment = await axios.post(`https://tinyfix.onrender.com/api/garage/addReviews`, newReview);
            console.log(comment);
            setPromptMessage(() => "הביקורת נוספה בהצלחה");
            setShowPromptMessage(true);
            removePrompt();
        } catch (err) {
            console.log(err.message);
        }
    }

    function logout() {
        localStorage.removeItem("token");
        Navigate("/garageLogin");
    }

    return (
        <GarageContext.Provider
            value={{
                registerSubmit,
                setRegisterInformation,
                registerInformation,
                uploudImg,
                setImgUrl,
                loginSubmit,
                setLoginInformation,
                loginInformation,
                garageInfo,
                getGarageById,
                newReview,
                setNewReview,
                addReviewToGarage,
                logout,
                addReviewOpen,
                setAddReviewOpen,
            }}
        >
            {children}
        </GarageContext.Provider>
    );
};

export default GarageProvider;
