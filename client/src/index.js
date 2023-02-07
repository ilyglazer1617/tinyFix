import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import UserContextProvider, { UserContext } from "./context/user";
import { BrowserRouter } from "react-router-dom";

import PostsProvider from "./context/PostsContext";
import CommentsProvider from "./context/CommentsContext";
import GarageProvider from "./context/garageContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CommentsProvider>
        <GarageProvider>
          <PostsProvider>
            <UserContextProvider>
              <App />
            </UserContextProvider>
          </PostsProvider>
        </GarageProvider>
      </CommentsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
