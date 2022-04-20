const mongoose = require("mongoose");

const chapterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      maxlength: 64,
    },
    content: {
      type: String,
      required: true,
    },
    courseId:{
        type: String,
        
    }

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chapter", chapterSchema);