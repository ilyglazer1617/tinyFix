const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv"); //! מסתיר מידע סיסמאות ומפתחות env

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const comments = require("./routes/commentsR");
const posts = require("./routes/postsR");
const garage = require("./routes/garage");
const app = express();
mongoose.set("strictQuery", true);
dotenv.config();
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () =>
  console.log("connected to mongo DB")
);

app.use(cors());
app.use(express.json({ limit: "20mb" }));

app.use("/user", userRoute);
app.use("/api/login", authRoute);
app.use("/api/comments", comments);
app.use("/api/posts", posts);
app.use("/api/garage", garage);
app.listen(5555, () => {
  console.log("backend Server on live !");
});
