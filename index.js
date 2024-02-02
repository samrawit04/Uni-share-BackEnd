//import dependencies
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const postroute = require("./post/post.route");
const userroute=require("./user/user.route")
const assignmentroute=require("./assignment/assignment.route")
//use the dependencies
dotenv.config();
app.use(express.json());
app.use(cors());
// app.use(cors({
//   origin: 'https://unishare-x.netlify.app',
//   credentials: true
// }));

app.use(express.urlencoded({ extended: true }));

// specify the main routes
app.use("/api/user",userroute)
app.use("/api/post/add", postroute);
app.use("/api/post/get",postroute);
app.use("/api/post/update",postroute);
app.use("/api/post/delete/",postroute)
app.use("/api/assignment", assignmentroute);


//connect to database
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("connected to mongoDB"))
  .catch((err) => console.log(err));

  //listening 
app.listen(5000,() => { 
  console.log("server is successfully running on port 5000");
});
