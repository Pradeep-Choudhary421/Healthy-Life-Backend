const mongoose = require( 'mongoose' );

const  DoctorSchema = new mongoose.Schema({
    userId:{
        type:String,
    },
    firstName:{
        type:String,
        required:[true," Please provide your First Name"]
    },
    lastName:{
        type:String,
        required:[true, "Please provide your Last Name"]
    },
    phone:{
        type:Number,
        required:[true, "Number is required"]
    },
    email:{
        type:String,
        required :[true,"email is required"]
    },
    website:{
        type:String
    },
    address:{
        type:String,
        required: [true, "Address field cannot be empty."]
    },
    specialization:{
        type:String,
        required:[true,"Specialization is required"]
    },
    experience:{
        type:String,
        required:[true,"Experience is required"],
    },
    feesPerConsultation:{
        type:Number,
        required:[true,"Enter your fees"]
    },
    status:{
        type: String , 
        default:"pending"
    },
    // timing:{
    //     type:Object,
    //     required:[true,"Work timing is required"]
    // }
}, {
    timestamps:true
})
const Doctor = mongoose.model("Doctor",DoctorSchema);
module.exports= Doctor;