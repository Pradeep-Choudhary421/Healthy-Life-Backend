const Doctor = require("../models/Doctors");
const User = require("../models/User");


exports.getAllUsers = async(req,res) =>{
    try{
        const users = await User.find({_id:req.body.userId});
        res.status(200).json({
            success: true, 
            message: "List of all Users", 
            count: users.length, 
            data: users
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

}

exports.getAllDoctors = async(req,res) =>{
    try{
        const doctors = await Doctor.find({});
        res.status(200).json({
            success: true, 
            message: "List of all Users", 
            count: doctors.length, 
            data: doctors
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }


}


exports.changeAccountStatus = async (req, res) => {
    try {
      const { doctorId, status } = req.body;
      const doctor = await Doctor.findByIdAndUpdate(doctorId, {status});
      const user = await User.findOne({ _id: doctor.userId });
      const notifcation = user.notification;
      notifcation.push({
        type: "doctor-account-request-updated",
        message: `Your Doctor Account Request Has ${status} `,
      });
      user.isDoctor = status === "approved" ? true : false;
      await user.save();
      res.status(201).send({
        success: true,
        message: "Account Status Updated",
        data: doctor,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Eror in Account Status",
        error,
      });
    }
  };
  