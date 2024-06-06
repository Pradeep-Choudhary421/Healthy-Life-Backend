const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require( "jsonwebtoken" );
const Doctor = require("../models/Doctors");
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user)
      return res.status(400).json({
        success: false,
        messgae: "this is already registered",
      });
    const salt = await bcrypt.genSalt(10);
    const Hashpass = await bcrypt.hash(password, salt);

    user = await User.create({ name, email, password: Hashpass });
    res.status(201).json({
      success: true,
      message: "user created successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;
  const user = await User.findOne({email}).select("+password");
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    const  validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(401).json({
        success:false,
        message:"Invalid Password",
      })
    }
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'1d'});
    res.status(200).json({
      success: true,
      message:"Login Success",
      token,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.authCtrl = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.password = undefined
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};



exports.applyDoc = async(req,res)=>{
  try{
    const newDoc = await Doctor.create({...req.body, status:"pending" });
    await newDoc.save();
    const adminUser = await User.findOne({isAdmin:true});
    const notification = adminUser.notification;
    notification.push({
      type:"apply-doctor-request",
      message:`${newDoc.firstName} ${newDoc.lastName} has applied for a doctor Account`,
      data: {
        doctorId : newDoc._id,
        name: `${newDoc.firstName} ${newDoc.lastName}`,
        path:"/admin/doctors"
      } 
    })
    await User.findByIdAndUpdate(adminUser._id,{notification})
    return res.status(200).json({
      success:true,
      message:"Successfully applied for doctor"
      })

  }catch(err){
    res.status(500).json({
      success:false,
      message:err.message
    })
    console.log("catch", err)
  }
}


exports.getAllNotificarions = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const notifications = user.notification;
    user.seennotification.push(...notifications);
    user.notification = [];
    const updatedUser = await user.save();

    res.status(201).json({
      success: true,
      message: "All notifications are marked as read",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



exports.deleteNotification = async(req, res) =>{
  try{
    const user = await  User.findById({ _id: req.body.userId });
    user.notification = [];
    user.seennotification = [];
    const updateUser = await user.save();
    updateUser.password = undefined;
    res.status(200).json({
      success : true,
      message: "All notifications are deleted successfully",
      data : updateUser,
    })

  } catch(err){
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}