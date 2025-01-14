require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const routesMaster = require("./routes/routesMaster");
const configMaster = require("./config/configMaster");
const cors = require("cors");

const corsOptions = {
  origin: ["http://localhost:3001"], // Replace with your frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
routesMaster(app);

// Connect MongoDB
configMaster.connectMongoDB();

// Export the app as a serverless function (default export)
module.exports = serverless(app); // Change this line to a default export
