// import router
const router = require("express").Router();

// import functions
const {submitAssignment,getAssignment,EditAssignment,deleteAssignment} = require("./assignement.controller");

// add routes 
router.post("/submitAssignment", submitAssignment);
router.delete("/deleteAssignment/:id", deleteAssignment);
router.get("/getAssignment", getAssignment);
router.put("/EditAssignment/:id",EditAssignment);

//export modules

module.exports = router;

