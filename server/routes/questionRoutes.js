var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const {getQuestion} = require('../controller/questionController')

router.get('/getquestion/:qcmID', getQuestion)

module.exports = router;