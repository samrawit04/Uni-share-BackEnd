// import router 
const router = require("express").Router();

// import functions 
const {addpost,getposts,postupdate,postdelete}=require("./post.controller")

//add routes
router.post("/",addpost )
router.delete("/:id",postdelete)
router.get("/",getposts)
router.put('/:id',postupdate)

//export the module 
module.exports = router;

