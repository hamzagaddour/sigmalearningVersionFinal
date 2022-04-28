const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      maxlength: 64,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 6000,
    },
    
    duration: {
      type: String,
      required: true,
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
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);
