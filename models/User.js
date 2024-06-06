const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },


  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    select: false,
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
  isDoctor:{
    type:Boolean,
    default:false
  },
  notification:{
    type:Array,
    default:[]
  },
  seennotification:{
    type:Array,
    default:[]
  }

});
module.exports = mongoose.model("User", userSchema);