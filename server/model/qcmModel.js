const mongoose = require("mongoose");

const qcmSchema = mongoose.Schema(
  {
    _id: {
      type: Number,
      trim: true,
      required: true,
      unique: true,
      maxlength: 64,
    },
    title: {
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

module.exports = mongoose.model("Qcm", qcmSchema);