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
import EditComments from "./components/comments/EditComment";
import EditPost from "./components/editPosts/EditPost";
import GarageInfo from "./components/garageInfo/garageInfo";
import AddReview from "./components/addReview/addReview";
import AllChats from "./components/allChats/allChats";
import Chat from "./components/chat/chat";
import ChatConteiner from "./components/chatConteiner/chatConteiner";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/SetInfo" element={<SetInfo />} />
        <Route path="/Posts" element={<Posts />} />
        <Route path="/EditPost" element={<EditPost />} />
        <Route path="/Comments" element={<Comments />} />
        <Route path="/EditComments" element={<EditComments />} />
        <Route path="/GarageRegister" element={<GarageRegister />} />
        <Route path="/GarageLogin" element={<GarageLogin />} />
        <Route path="/GarageMainPage" element={<GarageMainPage />} />
        <Route path="/allChats" element={<AllChats />} />
        {/* <Route path="/allChats" element={<ChatConteiner />} /> */}
        <Route path="/Chat" element={<Chat />} />

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
        <Route path="/GarageInfo" element={<GarageInfo />} />
        <Route path="/AddReview" element={<AddReview />} />
      </Routes>
    </div>
  );
}

export default App;
