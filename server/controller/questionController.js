const Question = require("../model/questionModel");
const mongoose = require("mongoose");
// const formidable = require("formidable");
// const _ = require("lodash");
// const fs = require("fs");

exports.getQuestion =(req, res)=>{
    //res.status(200).json({message: "hello world question"})
    //console.log(req.params.qcmID)
    let qcmID = req.params.qcmID

    Question.find({ qcmID }, (error, data) => {
        if (error || !Question) {
          return res.status(400).json({
            error: "Question Does Not Exists",
          });
        }
        console.log(data)
        return res.status(200).json(data);
      });
}
