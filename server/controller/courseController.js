const Course = require("../model/courseModel");
// const formidable = require("formidable");
// const _ = require("lodash");
// const fs = require("fs");

// to create course
exports.createCourse = (req, res) => {
  const course = new Course(req.body);
  //course.image = req.file.path;

  course.save((error, course) => {
    if (error) {
      if (error.code === 11000 || error.code === 11001) {
        return res.status(400).json({
          error:
            "Duplicate Value " + req.body.name + ", Course Name Must Be Unique",
        });
      } else {
        return res.status(400).json({
          error: "Not Able To Save Course",
          message: error,
        });
      }
    }
    res.json({ course });
  });
};

// to read all course
exports.getAllCourse = (req, res) => {
  Course.find().exec((error, courseData) => {
    if (error) {
      return res.status(400).json({
        error: "No Courses Found",
      });
    }

    res.json(courseData);
  });
};

//to read course
exports.getCoursebyId = (req, res, next, id) => {
  Course.findById(id).exec((error, courseData) => {
    if (error) {
      return res.status(400).json({
        error: "Course Not Found",
      });
    }

    req.course = courseData; //global variable
    next();
  });
};

//get course by id teacher

exports.getCoursebyIdTeacher = (req, res) => {
  console.log("this is teacher id ");
  console.log(req.params.teacherId);
  let idTeacher = req.params.teacherId;

  Course.find({ idTeacher }, (error, data) => {
    if (error || !Course) {
      return res.status(400).json({
        error: "Teacher Does Not Have Any Course",
      });
    }
    console.log(data);
    return res.status(200).json(data);
  });
};

//to read course byId
exports.getCourse = (req, res) => {
  return res.json(req.course);
};

//to remove course bycourseId
exports.removeCourse = (req, res) => {
  const course = req.course;

  course.remove((error, course) => {
    if (error) {
      return res.status(400).json({
        error: "Failed To Delete This Course",
      });
    }
    res.json({
      message: "Successfully Deleted",
    });
  });
};

//to update course
exports.updateCourse = (req, res) => {
  const course = new Course();
  course._id = req.body.id;
  course.name = req.body.name;
  course.lastName = req.body.description;
  course.email = req.body.duration;
  console.log(course);

  var consditions = { _id: req.body.id };

  Course.updateOne(consditions, req.body)
    .then((doc) => {
      if (!doc) {
        return res.status(404).end();
      }
      return res.status(200).json(doc);
    })
    .catch((err) => next(err));
};


//activer course
exports.activerCourse = (req, res) => {
  const course = new Course();
  course._id = req.body.id;
  course.activer = req.body.activer
  console.log(course);
  //const {name,lastName,email, password} = req.body
  var consditions = { _id: req.body.id };

  Course.updateOne(consditions, req.body)
    .then((doc) => {
      if (!doc) {
        return res.status(404).end();
      }
      return res.status(200).json(doc);
    })
    .catch((err) => next(err));
};

//desactiver course
exports.desactiverCourse = (req, res) => {
  const course = new Course();
  course._id = req.body.id;
  course.activer = req.body.activer
  console.log(course);
  //const {name,lastName,email, password} = req.body
  var consditions = { _id: req.body.id };

  Course.updateOne(consditions, req.body)
    .then((doc) => {
      if (!doc) {
        return res.status(404).end();
      }
      return res.status(200).json(doc);
    })
    .catch((err) => next(err));
};