const Chapter = require("../model/chapterModel");
const mongoose = require("mongoose");
// const formidable = require("formidable");
// const _ = require("lodash");
// const fs = require("fs");

exports.chaptersByCourseId = (req, res) => 
  {
      //console.log(req.params.courseId)
      let courseId = req.params.courseId

    Chapter.find({ courseId }, (error, data) => {
        if (error || !Chapter) {
          return res.status(400).json({
            error: "CourseId Does Not Exists",
          });
        }
        return res.status(200).json(data);
      });

  }

exports.getChapterByChapterId =(req, res)=>{
  //console.log(req.params.chapterId)
  let chapterId = req.params.chapterId
  chapterId = mongoose.Types.ObjectId(chapterId)

  Chapter.findById( chapterId , (err, data)=>{
    if (err || !Chapter) {
      throw (err)
    }
    //console.log(data.name)
    switch(data.name){
      case "NodeJS Introduction" : res.download('./uploads/nodeChap1.pdf'); break;
      case "Local Environment Setup" : res.download('./uploads/nodeChap2.pdf'); break;
      case "Node.js File System" : res.download('./uploads/nodeChap3.pdf'); break;
      case "Introduction To ReactJs" : res.download('./uploads/reactJsChap1.pdf'); break;
      case "Installation & environment" : res.download('./uploads/reactJsChap2.pdf'); break;
      case "React Hooks" : res.download('./uploads/reactJsChap3.pdf'); break;
      default : console.log('rien afficher')
      
    }
  })
}

/*exports.test =(req, res)=>{
  console.log(req.params.chapterId)
  res.status(200).json({message:"hello"})
}*/




