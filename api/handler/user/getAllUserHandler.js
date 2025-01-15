const EntityMaster = require("../../entity/entityMaster.js");
const configMaster = require("../../config/configMaster.js");

const getAllUserHandler = async (req, res) => {
  try {
    configMaster.logger.info("user -> getAllUserHandler -> Start");

    const allUser = await EntityMaster.UserDetails.find().sort({
      createdAt: -1,
    });

    configMaster.logger.info("user -> getAllUserHandler -> Metadata Success");

    res.status(200).json(allUser);
  } catch (error) {
    configMaster.logger.error(
      `user -> getAllUserHandler -> Error: ${error.message}`
    );

    res.status(500).json({
      message:
        "An error occurred while processing the request. " + error.message,
      status: 500,
      code: "SERVER_ERROR",
    });
  }

  configMaster.logger.info("user -> getAllUserHandler -> End");
};

module.exports = getAllUserHandler;
