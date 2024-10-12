const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

const myfruits = require("./api/routes/myfruits");
const rankingRoutes = require("./api/routes/ranking");
const userRoutes = require("./api/routes/user");
const getfruitroutes = require("./api/routes/getfruit");

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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("./user", userRoutes);
app.use("./myfruits", myfruits);
app.use("./ranking", rankingRoutes);
app.use("./getfruit", getfruitroutes);

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
