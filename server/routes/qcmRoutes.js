var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const {getQcm, calculateScore} = require('../controller/qcmController')

router.get('/getqcm/:courseId', getQcm)
router.post('/calculateScore', calculateScore)

module.exports = router;