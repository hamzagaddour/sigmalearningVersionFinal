var mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 64,
      trim: true
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 64,
        trim: true
      },
      
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    admin:{
      type: Boolean,
      default: false,
    },
    teacher:{
      type: Boolean,
      default: false,
    },
    logged:{
      type: Boolean,
      default: false
    },
    activer:{
      type: Boolean,
      default:false,
    }

  },
  { timestamps: true }
);

userSchema.methods = 
{
  autheticate: function(plainpassword) 
  {
    return plainpassword === this.password;
  },
};
module.exports = mongoose.model("User", userSchema);
