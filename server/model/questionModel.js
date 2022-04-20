const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
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
    qcmId:{
        type: Number,
        
    },
    items: {
      type: Array,
      required: true,
    }

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", questionSchema);