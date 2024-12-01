const express = require("express");
require('dotenv').config();
const connectDB = require("./config/database");
const app = express();


const cookieParser = require("cookie-parser");
const cors=require("cors")

app.use(cors({
  origin: "https://hiren-dev-tinder.vercel.app",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());



const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/request", requestRouter);
app.use("/user", userRouter);



connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.log("Error connecting to the database:", err.message);
    console.error("Database cannot be connected!!");
  });
