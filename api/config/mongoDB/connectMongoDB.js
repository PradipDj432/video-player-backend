const mongoose = require("mongoose");

const mongo_url = process.env.MONGO_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectMongoDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(mongo_url, options);
    console.log("MongoDB connected successfully!");
    // configMaster.logger.info("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    // configMaster.logger.info("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectMongoDB;
