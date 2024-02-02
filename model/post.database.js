// importing mongoose dependency
const mongoose = require("mongoose");
// import mongoose from "mongoose";

// create a post schema
const postschema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      default:"",
    },

    postType: {
      type: String,
      required: true,
    },
    
    username: {
      type: String,
      required: true
    },
    file:{
     type:String,
     default:"",
    },
    course:{
      type:String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("post", postschema);
 



