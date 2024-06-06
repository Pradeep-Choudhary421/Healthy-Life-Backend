const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
require("dotenv").config({ path: "./config/.env" });
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
const user = require("./Routes/route");
const admin = require("./Routes/AminRoutes")

app.use(morgan("common"));
app.use(cors());
app.use("/api",user);
app.use("/admin",admin);
module.exports = app;
