const express = require("express");
const { register, login, authCtrl, applyDoc, getAllNotificarions, deleteNotification } = require("../controllers/UserControl");
const { authenticate } = require("../Middleware/Auth");


const router = express.Router()

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/getUser").post(authenticate,authCtrl)
router.route("/applyDoctor").post(authenticate,applyDoc)
router.route("/getAllNotification").post(authenticate,getAllNotificarions);
router.route("/deleteNotification").post(authenticate, deleteNotification)

module.exports = router;