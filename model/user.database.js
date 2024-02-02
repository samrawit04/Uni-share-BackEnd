const mongoose = require("mongoose")

//create a user schema
const userschema = new mongoose.Schema(
  { 
    name: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role:{
        type: String,
        default:"",
    },
    course:{
        type:String,
        default:""
    },

    user_id:{
        type:String,
        required:true
    }
  },
  {
    timestamps: true,
  }
);

module.exports=mongoose.model("user",userschema);
