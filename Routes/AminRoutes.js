const express = require('express');
const {getAllUsers, changeAccountStatus, getAllDoctors} = require("../controllers/AdminCrtl")
const { authenticate } = require("../Middleware/Auth");  

const  router = express.Router();

router.route("/getAllUsers").get(authenticate,getAllUsers)

router.route("/getAllDoctors").get(authenticate, getAllDoctors)

router.route("/changeAccountStatus").post(authenticate,changeAccountStatus)

module.exports = router;


