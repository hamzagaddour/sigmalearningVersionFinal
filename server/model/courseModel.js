const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      maxlength: 64,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 6000,
    },
    
    duration: {
      type: String,
    },
    idTeacher : {
      type: String,
    },
    nameTeacher:{
      type: String,
    },
    activer:{
      type: Boolean,
      default: false,
    },
    learners : {
      type : Array,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);
