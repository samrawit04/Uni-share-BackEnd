
const post = require("../model/post.database.js");

// exporting a module 
module.exports = {
  // Method to add a new post to the database
  addpost: async (req, res) => {
    // Destructuring title, description, date, and postType from the request body
    const { title, description, date, postType } = req.body;
    // Checking title length
    const titlelength = title.trim().split();

    // Validating title length
    if (title.length > 20) {
      return res.status(400).json({ msg: "title cannot exceed 20 characters ⚠" });
    }

    // Checking if title and description are provided
    if (!title && !description) {
      return res.status(400).json({ msg: "title and description should be provided ⚠" }); 
    } else if (!title) {
      return res.status(400).json({ msg: "title should be provided ⚠" });
    } else if (!description) {
      return res.status(400).json({ msg: "description should be provided ⚠" }); 
    } 

    // Inserting the post into the database
    try {
      const newpost = new post({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date, 
        postType: req.body.postType,
        username: req.body.username,
        course: req.body.course,
      }); 

      const postedData = await newpost.save();
      // Sending success response
      res.status(200).json({
        msg: "post added successfully 🎉",
        data: postedData,
      });
    } catch (err) {
      // Handling errors and sending error response
      res.status(500).json(err);
    }
  },

  // Method to retrieve all posts from the database
  getposts: (req, res) => {
    post
      .find({})
      .then(function (users) {
        // Sending posts as JSON data
        res.json({
          data: users,
        });
      })
      .catch(function (err) {
        // Handling errors
        console.log(err.message);
      });
  },

  // Method to update a post in the database
  postupdate: async (req, res) => {
    try {
      // Update the post in the database
      const updatedpost = await post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      // Sending success response with the updated post object
      return res
        .status(200)
        .json({ msg: "Post successfully updated!!", updatedpost });
    } catch (err) {
      // Handle errors and send an error response
      console.error(err);
      return res.status(500).json(err);
    }
  },

  // Method to delete a post from the database
  postdelete: async (req, res) => {
    try {
      // Deleting the post from the database
      const deletedpost = await post.findByIdAndDelete(req.params.id);
      // Sending success response
      return res
        .status(200)
        .json({ msg: "Post has been deleted!!!", deletedpost });
    } catch (err) {
      // Handle errors and send an error response
      console.error(err);
      return res.status(500).json(err);
    }
  }
};


