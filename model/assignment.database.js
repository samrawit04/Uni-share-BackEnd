// importing mongoose dependency
const mongoose = require("mongoose");

// create an assignment schema
const assignmentschema = new mongoose.Schema(
  {
    course: {
      type: String,
      required: true,
    },

    file: {
      type: String,
      required: true,
    }
  },

  { timestamps: true }
);

module.exports = mongoose.model("Assignment", assignmentschema);
 



