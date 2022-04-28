const express = require('express');
const router = express.Router();

/*var multer  = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null,file.originalname);
    }
  });
  var upload = multer({ storage: storage })*/

const {
        getCoursebyId,
        createCourse,
        getCourse,
        getAllCourse,
        removeCourse,
        updateCourse,
        getCoursebyIdTeacher,
        activerCourse,
        desactiverCourse,
    } = require("../controller/courseController");


//update statu of learner
router.put("/activercoursebyid/:idCourse", activerCourse)//http://localhost:5000/api/updatecoursebyid/
//update statu of learner
router.put("/desactivercoursebyid/:idCourse", desactiverCourse)//http://localhost:5000/api/updatecoursebyid/

router.get("/getcoursebyidteacher/:teacherId", getCoursebyIdTeacher) 
   
router.param("courseId", getCoursebyId); //param : parameter
router.post("/course/create/",createCourse);  //http://localhost:5000/api/course/create/
//router.post("/createcourse",upload.single('courseImage'),createCourse);
router.get("/coursebyid/:courseId", getCourse)  //http://localhost:5000/api/coursebyid/
router.get("/getallcourses/",getAllCourse); //http://localhost:5000/api/getallcourses
router.delete("/removecoursebyid/:courseId",removeCourse); //http://localhost:5000/api/removecoursebyid/
router.put("/updatecoursebyid/:courseId", updateCourse);  //http://localhost:5000/api/updatecoursebyid/

module.exports = router;