
const router=require("express").Router();
const User=require("../model/user.database")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//export the modules 
module.exports = {
  // Function to add a new user to the database
  adduser: async (req, res) => {
    try {
      // Generate a salt for password hashing
      const salt = await bcrypt.genSalt(10);
      const { name, password, role, course, user_id } = req.body;
      
      // Hash the provided password
      const hashedpassword = await bcrypt.hash(password, salt);
      const newuser = new User({
        name: name,
        password: hashedpassword,
        role: role,
        course: course,
        user_id: user_id,
      });

      // Save the new user to the database
      const user = await newuser.save();
      // Send a success response with the newly created user
      res.status(200).json(user);
    } catch (err) {
      // Handle errors and send an error response
      res.status(500).json(err);
    }
  },

  // Function to retrieve a user by user_id
  getuserbyid: async (req, res) => {
    try {
      // Find the user by user_id
      const user = await User.findOne({
        user_id: req.body.user_id,
      });

      // Check if the user exists
      if (!user) {
        return res.status(400).json("User Id not found!!");
      }

      // Compare the provided old password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(
        req.body.oldpassword,
        user.password
      );

      // Log the result of the password comparison for debugging
      console.log(isPasswordValid);

      // Check if the old password is valid
      if (!isPasswordValid) {
        return res.status(400).json("Invalid oldpassword!!");
      }
    } catch (err) {
      // Handle errors and send an error response
      console.error(err);
      return res.status(500).json(err);
    }
  },

  // Function to authenticate a user and generate a JWT token
  login: async (req, res) => {
    try {
      // Find user by user_id
      const user = await User.findOne({
        user_id: req.body.user_id,
      });

      // Check if user exists
      if (!user) {
        return res.status(400).json("please check your Id!!");
      }

      // Validate password
      const validated = await bcrypt.compare(req.body.password, user.password);

      if (!validated) {
        return res.status(400).json("Wrong password!!");
      }

      // Generate JWT token for authentication
      const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, {
        expiresIn: "50s",
      });
      console.log(token);
      // If authentication is successful, send the token and user data
      const { password, ...others } = user._doc;
      return res.status(200).json({ token, others });
    } catch (err) {
      // Handle errors and send an error response
      console.error(err);
      return res.status(500).json(err);
    }
  },

  // Function to update a user's password
  update: async (req, res) => {
    try {
      // Find the user in the database by their user_id
      const user = await User.findOne({
        user_id: req.body.user_id,
      });

      // Check if the user exists
      if (!user) {
        return res.status(400).json("User Id not found!!");
      }

      // Compare the provided old password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(
        req.body.oldpassword,
        user.password
      );

      // Log the result of the password comparison for debugging
      console.log(isPasswordValid);

      // Check if the old password is valid
      if (!isPasswordValid) {
        return res.status(400).json("Invalid oldpassword!!");
      }

      // Generate a new salt and hash the new password
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);

      // Update the user's password and other fields in the database
      const updateduser = await User.findByIdAndUpdate(
        user.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      // Send a success response with the updated user object
      return res
        .status(200)
        .json({ msg: "Password successfully updated!!", updateduser });
    } catch (err) {
      // Handle errors and send an error response
      console.error(err);
      return res.status(500).json(err);
    }
  }  
};
