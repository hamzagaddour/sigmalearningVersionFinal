const Qcm = require("../model/qcmModel");
const Questions = require("../model/questionModel");
const mongoose = require("mongoose");
// const formidable = require("formidable");
// const _ = require("lodash");
// const fs = require("fs");

exports.getQcm = (req, res) => {
  //res.status(200).json({message: "hello world"})

  //console.log(req.params.courseId)
  let courseId = req.params.courseId;

  Qcm.find({ courseId }, (error, data) => {
    if (error || !Qcm) {
      return res.status(400).json({
        error: "CourseId Does Not Exists",
      });
    }
    return res.status(200).json(data);
  });
};

exports.calculateScore = (req, res) => {
  //console.log(req.body)
  var qcmId = req.body.qcmId;
  var qcmUserResponses = req.body.reps;
  console.log("provided qcmId >> " + qcmId);
  console.log("provided user resps >> ");
  console.log(qcmUserResponses);
  Questions.find({ qcmId }, (error, qcmQuestionsInDb) => {
    if (error || !qcmQuestionsInDb) {
      return res.status(400).json({
        error: "error occured during calculating Qcm score",
      });
    }
    // score calculation: compare user responses with Qcm responses in DB
    //console.log(qcmQuestionsInDb)
    var rightAnswersInDB = []
    var score = 0;

    qcmQuestionsInDb.map((q)=>{
      q.items.map((item)=>{
        if(item.isRightAnswer == true){
          rightAnswersInDB.push({id: q._id, correctAnswer: item.title});
        }
      })
    })

    console.log("###########################")
      rightAnswersInDB.map((ra)=>{
        console.log(ra)
        qcmUserResponses.map((userResp) => {
          if(userResp.id === ra.id){
            console.log("\t     |_ user resp on question_"+userResp.id+" est >>"+userResp.response)
            if(userResp.response === ra.correctAnswer){
              score+=2;
              console.log('\t     |_ bonne reponse (+2pt)')
              console.log('\t     |_ les score est devenu >>'+score)
            } else {
              console.log('\t     |_ mauvaise réponse (+0)')
              console.log('\t     |_ les score reste >>'+score)
            }
          }
        })
      })
    return res.status(200).json({ score: score });
  });
};
