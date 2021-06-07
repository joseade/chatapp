const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");

const currentUserRouter = require("./routes/current-user");
const signinRouter = require("./routes/signin");
const signoutRouter = require("./routes/signout");
const signupRouter = require("./routes/signup");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.set("trust proxy", true);
app.use(cors());
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
  })
);

//    secure: true,

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect("mongodb://mongodb:27017/chatapp", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log("Connected to MongoDb");
  } catch (err) {
    console.log(error);
  }
  app.listen(4000, () => {
    console.log("Listening on port 5000");
  });
};

start();
