const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(200).json({
          message: "Auth Failed",
          success: false,
        });
      } else {
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (err) {
    res.status(401).json({ message: "Auth failed catch", success: false });
  }
};

// exports.authenticate= async(req,res,next)=>{
//      const usertoken = req.headers.authorization;
//      if(!usertoken){
//         return res.status(401).json({
//             mesage:'Unauthorized'
//         })
//      }
//      try {
//     const token = usertoken.split(" ")[1];
//     const data =jwt.verify(token,process.env.JWT_SECRET);
//     req.user = await  User.findById(data._id);
//     next();
//      } catch (err) {
//      return res.status(500).json({
//         message: err.message
//      })
//      }
// }
