import { createContext, useState } from "react";
import App from "./../App";
import axios from "axios";
import PostsProvider from "./PostsContext";
export const GarageContext = createContext();

const GarageProvider = (props) => {
    const { children } = props;
    const [registerInformation, setRegisterInformation] = useState([]);
    const [loginInformation, setLoginInformation] = useState([]);
    const [image, setImg] = useState();

    async function registerSubmit(ev, info) {
        ev.preventDefault();
        try {
            const req = await axios.post("http://localhost:5555/api/garage/register", {
                ...info,
                image: image,
            });
            localStorage.setItem("token", req.data.token);
            console.log(req);
        } catch (error) {
            console.log(error);
        }
    }

    async function loginSubmit(ev, info) {
        ev.preventDefault();
        const garage = await axios.post("http://localhost:5555/api/garage/login", info);
        localStorage.setItem("token", garage.data);
        console.log(garage.data);
    }

    // function that set the newArticle obj with imgUrl
    const setImgUrl = (e) => {
        const file = e.target.files[0]; // defines file as an object who contain image data
        const reader = new FileReader(); // defines new instance from FileReader class
        reader.readAsDataURL(file); // converts the file to base64

        //func that get the image in base64 and add it to newArticle object
        reader.onloadend = () => {
            console.log(reader.result);
            setImg(reader.result);
        };
    };

    const uploudImg = async () => {
        // console.log("first");
        const req = await axios.post("http://localhost:5555/api/garage/register", {
            ...registerInformation,
            image: image,
        });
        console.log("req.data  ", req.data);
    };

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
            }}
        >
            {children}
        </GarageContext.Provider>
    );
};

export default GarageProvider;
