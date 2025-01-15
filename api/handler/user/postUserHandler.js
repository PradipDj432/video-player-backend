const EntityMaster = require("../../entity/entityMaster.js");
const configMaster = require("../../config/configMaster.js");
const helperMaster = require("../../helper/helperMaster.js");

const postUserHandler = async (req, res) => {
  try {
    configMaster.logger.info("user -> postUserHandler -> Start");

    const { username, email, phone, password, first_name, last_name } =
      req.body;

    // Validate required fields
    if (!username || !email || !phone || !password) {
      return res.status(400).json({
        message: "Missing required fields.",
        status: 400,
        code: "VALIDATION_ERROR",
      });
    }

    // Upload profile picture to S3 if provided
    let profile_picture_url = "";
    if (req.file) {
      const uploadResult = await helperMaster.awsMaster.s3Master.putObjectS3(
        req
      );
      if (!uploadResult.success) {
        return res.status(500).json({
          message: "Failed to upload profile picture to S3.",
          status: 500,
          code: "UPLOAD_ERROR",
        });
      }
      profile_picture_url = `https://${configMaster.awsMaster.awsConfig.s3_bucket}.s3.${configMaster.awsMaster.awsConfig.region}.amazonaws.com/${uploadResult.file_name}`;
    }

    // Create a new user document
    const newUser = new EntityMaster.UserDetails({
      username,
      email,
      phone,
      password, // Ensure you hash the password before saving
      first_name,
      last_name,
      profile_picture: profile_picture_url,
    });

    // Save to database
    const savedUser = await newUser.save();

    configMaster.logger.info(
      "user -> postUserHandler -> User saved to MongoDB"
    );

    res.status(201).json({
      message: "User created successfully.",
      user_id: savedUser._id,
      status: 201,
    });
  } catch (error) {
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue)[0];
      const duplicateValue = error.keyValue[duplicateField];
      configMaster.logger.warn(
        `user -> postUserHandler -> Duplicate key error: ${duplicateField} (${duplicateValue})`
      );
      return res.status(400).json({
        message: `The ${duplicateField} "${duplicateValue}" is already in use.`,
        status: 400,
        code: "DUPLICATE_KEY_ERROR",
      });
    }

    configMaster.logger.error(
      `user -> postUserHandler -> Error: ${error.message}`
    );
    res.status(500).json({
      message: `An error occurred: ${error.message}`,
      status: 500,
      code: "SERVER_ERROR",
    });
  }

  configMaster.logger.info("user -> postUserHandler -> End");
};

module.exports = postUserHandler;
