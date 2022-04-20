var express = require("express");
var router = express.Router();
//const { check } = require("express-validator");
const { chaptersByCourseId, getChapterByChapterId } = require("../controller/chapterController");


router.get("/chapters/:courseId", chaptersByCourseId) 
router.get("/getChapter/:chapterId", getChapterByChapterId)
//router.get('/test/:chapterId', test)






module.exports = router;