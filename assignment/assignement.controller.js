
const assignment = require("../model/assignment.database");
// exporting a module
module.exports = {
  // Method to submit an assignment
  submitAssignment: async (req, res) => {
    try {
      const {course,file} = req.body

      // Creating a new assignment object
      const newassignment = new assignment({
        course: course,
        file: file,
      });

      // Validating if course name and file are provided
      if (!course) {
        return res
          .status(400)
          .json({ msg: "course type should be provided ⚠" });
      }
      if (!file) {
        return res.status(400).json({ msg: "file should be uploaded ⚠" });
      }

      // Saving the assignment to the database
      const postedAssignment = await newassignment.save();
      // Sending success response
      res.status(200).json({
        msg: "Assignment submitted successfully 🎉",
        data: postedAssignment,
      });
    } catch (err) {
      // Handling errors and sending error response
      res.status(500).json(err);
    }
  },

  // Method to get all assignments
  getAssignment: (req, res) => {
    assignment
      .find({})
      .then(function (assignment) {
        // Sending assignments as JSON data
        res.json({
          data: assignment,
        });
      })
      .catch(function (err) {
        // Handling errors
        console.log(err.message);
      });
  },

  // Method to edit an assignment
  EditAssignment: async (req, res) => {
    try {
      // Updating the assignment
      const updatedAssignment = await assignment.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      // Sending success response
      return res
        .status(200)
        .json({ msg: "Assignment successfully updated!!", updatedAssignment });
    } catch (err) {
      // Handling errors
      console.error(err);
      return res.status(500).json(err);
    }
  },

  // Method to delete an assignment
  deleteAssignment: async (req, res) => {
    try {
      // Deleting the assignment
      const deletedAssignment = await assignment.findByIdAndDelete(req.params.id);
      // Sending success response
      return res
        .status(200)
        .json({ msg: "Assignment has been deleted!!!", deletedAssignment });
    } catch (err) {
      // Handling errors
      console.error(err);
      return res.status(500).json(err);
    }
  },
};
