var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const {desactiverLearner,activerLearner,getAllTeacher ,getAllLearner ,register,getAllUser,getUserbyId,getUser,removeUser,updateUser,login } = require("../controller/userController");

//Register User
router.post("/createuser",    //http://localhost:5000/api/createuser
[
    check("name", "Name Should Be At Least 3 Character").isLength({ min: 3 }), // form validation
    check("lastName", "lastName Should Be At Least 3 Character").isLength({ min: 3 }), // form validation
    check("email", "Your Entered Wrong Email-ID ").isEmail(),  // check  email validation
    check("password", "Password Should Be At Least 3 Character").isLength({ min: 3 }),  // check  password validation
    
],
  register
);


//update statu of learner
router.put("/activerlearnerbyid/:idLearner", activerLearner)//http://localhost:5000/api/updatelearnerbyid/
//update statu of learner
router.put("/desactiverlearnerbyid/:idLearner", desactiverLearner)//http://localhost:5000/api/updatelearnerbyid/
//getallteacher
router.get("/getallteacher", getAllTeacher)//http://localhost:5000/api/getallteacher

//get learner by each teacher
//router.get("getlearnerbyteacher", getLearnerByTeacher)
//getalllearner
router.get("/getalllearner", getAllLearner) //http://localhost:5000/api/getalllearner
//GetAllUser
router.get("/getallusers/",getAllUser); //http://localhost:5000/api/getallusers
router.param("userId", getUserbyId); //param : parameter
//Find UserById
router.get("/userbyid/:userId", getUser)  //http://localhost:5000/api/userbyid/
//Remove User
router.delete("/removeuserbyid/:userId",removeUser); //http://localhost:5000/api/removeuserbyid/
//Update User 
router.put("/updateuserbyid/:idLearner", updateUser); //http://localhost:5000/api/updateuserbyid/ 
//Login User
router.post("/login",         //http://localhost:5000/api/login
  [
    check("email", "Email Is Required").isEmail(),
    check("password", "Password Is Required").isLength({ min: 3 })
  ],
  login
);


module.exports = router;
