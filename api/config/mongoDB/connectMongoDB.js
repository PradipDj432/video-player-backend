const mongoose = require("mongoose");
const configMaster = require("../configMaster");

const MONGO_URI = process.env.MONGO_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectMongoDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(MONGO_URI, options);
    console.log("MongoDB connected successfully!");
    // configMaster.logger.info("video -> getAllVideoHandler -> Metadata Success");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectMongoDB;
