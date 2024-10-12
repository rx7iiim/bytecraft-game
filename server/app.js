const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors=require("cors")

const myfruits = require("./api/routes/myfruits.js");
const rankingRoutes = require("./api/routes/ranking.js");
const userRoutes = require("./api/routes/user.js");
const getfruitroutes = require("./api/routes/getfruit.js");
const getprofileroutes =require("./api/routes/myProfile.js")

const uri = "mongodb+srv://bytecraft:bytecraft@first.avwfgdf.mongodb.net/?retryWrites=true&w=majority&appName=first";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };


async function run() {
  try {
    await mongoose.connect(uri, clientOptions);
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
run().catch(console.dir);

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const corsOptions = {
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));







// Routes which should handle requests
app.use("/user",userRoutes);
app.use("/myfruits",myfruits);
app.use("/ranking",rankingRoutes);
app.use("/getfruit",getfruitroutes);
app.use("/myprofile",getprofileroutes);

app.use((req, res, next) => {
  const error = new Error("Resource not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
