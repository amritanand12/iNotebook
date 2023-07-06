const mongoose = require("mongoose");
require("dotenv").config;

// const mongoURI = process.env.CONNECTION_STRING;

const connectToMongo = ( mongoURI) => {
    console.log(mongoURI);
  mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to MongoDB");
      // Rest of your code
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

module.exports = connectToMongo;
