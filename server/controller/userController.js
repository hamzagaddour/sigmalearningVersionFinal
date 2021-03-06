const User = require("../model/userModel");
const { check, validationResult } = require("express-validator");
const { default: mongoose } = require("mongoose");
// var jwt = require("jsonwebtoken");
// var expressJwt = require("express-jwt");

//regiseter user
exports.register = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);

  user.save((error, userData) => {
    if (error) {
      return res.status(400).json({
        error: "Not Able To Save User In DB - Email Already Exist !",
      });
    }

    res.json({
      name: userData.name,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      id: userData._id,
      admin: false,
    });
  });
};

// to read all user
exports.getAllUser = (req, res) => {
  User.find().exec((error, userData) => {
    if (error) {
      return res.status(400).json({
        error: "No User Found",
      });
    }

    res.json(userData);
  });
};

//to find user
exports.getUserbyId = (req, res, next, id) => {
  User.findById(id).exec((error, userData) => {
    if (error) {
      return res.status(400).json({
        error: "User Not Found",
      });
    }

    req.user = userData; //global variable

    next();
  });
};

//to find user byId
exports.getUser = (req, res) => {
  return res.json(req.user);
};

//to remove user byuserId
exports.removeUser = (req, res) => {
  const user = req.user;

  user.remove((error, user) => {
    if (error) {
      return res.status(400).json({
        error: "Failed To Delete This User",
      });
    }
    res.json({
      message: "Successfully Deleted",
    });
  });
};
//to update user
exports.updateUser = (req, res) => {
  const user = new User();
  user._id = req.body.id;
  user.name = req.body.name;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  console.log(user);
  //const {name,lastName,email, password} = req.body
  var consditions = { _id: req.body.id };

  User.updateOne(consditions, req.body)
    .then((doc) => {
      if (!doc) {
        return res.status(404).end();
      }
      return res.status(200).json(doc);
    })
    .catch((err) => next(err));
};



//activerLearner
exports.activerLearner = (req, res) => {
  const user = new User();
  user._id = req.body.id;
  user.activer = req.body.activer
  console.log(user);
  //const {name,lastName,email, password} = req.body
  var consditions = { _id: req.body.id };

  User.updateOne(consditions, req.body)
    .then((doc) => {
      if (!doc) {
        return res.status(404).end();
      }
      return res.status(200).json(doc);
    })
    .catch((err) => next(err));
};

//desactiverLearner
exports.desactiverLearner = (req, res) => {
  const user = new User();
  user._id = req.body.id;
  user.activer = req.body.activer
  console.log(user);
  //const {name,lastName,email, password} = req.body
  var consditions = { _id: req.body.id };

  User.updateOne(consditions, req.body)
    .then((doc) => {
      if (!doc) {
        return res.status(404).end();
      }
      return res.status(200).json(doc);
    })
    .catch((err) => next(err));
};



//login user
exports.login = (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "User Email Does Not Exists",
      });
    }

    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: "Email And Password Does Not Match",
      });
    }

    //const { _id, name, email } = user;
    return res.status(200).json({ user });
  });
};

//getAllLearner
exports.getAllLearner = (req, res) => {
  User.find({ admin: false, teacher: false }).exec((error, userData) => {
    if (error) {
      return res.status(400).json({
        error: "No User Found",
      });
    }

    res.json(userData);
  });
};

//get learner by teacher
/*exports.getLearnerByTeacher = (req, res) => {

}
*/
//getAllTeacher
exports.getAllTeacher = (req, res) => {
  User.find({ teacher: true }).exec((error, userData) => {
    if (error) {
      return res.status(400).json({
        error: "No User Found",
      });
    }

    res.json(userData);
  });
};
