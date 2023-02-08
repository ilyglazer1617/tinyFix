import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./components/register/register";
import Login from "./components/login/login";
import Home from "./components/personalArea/personalArea";
import PrsonalInfo from "./components/personalInfo/prsonalInfo";
import SetInfo from "./components/setInfo/setInfo";
import Posts from "./components/posts/Posts";
import Comments from "./components/comments/Comments";
import GarageRegister from "./components/garage/garageRegister";
import GarageLogin from "./components/garage/garageLogin";
import GarageMainPage from "./components/garage/garageMainPage";
import LandingPage from "./components/landingPage/landingPage";
import CommentsPreview from "./components/commentsPreview/commentsPreview";
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} />
                <Route path="/SetInfo" element={<SetInfo />} />
                <Route path="/Posts" element={<Posts />} />
                <Route path="/Comments" element={<Comments />} />
                <Route path="/GarageRegister" element={<GarageRegister />} />
                <Route path="/GarageLogin" element={<GarageLogin />} />
                <Route path="/GarageMainPage" element={<GarageMainPage />} />
                <Route
                    path="/GarageMainPage/Comments"
                    element={
                        <>
                            <GarageMainPage />
                            <CommentsPreview />
                        </>
                    }
                />
                <Route path="/Home" element={<Home />} />
                <Route path="/PrsonalInfo" element={<PrsonalInfo />} />
                <Route path="/LandingPage" element={<LandingPage />} />
            </Routes>
        </div>
    );
}

export default App;
