const EntityMaster = require("../../entity/entityMaster.js");
const configMaster = require("../../config/configMaster.js");

const getAllVideoHandler = async (req, res) => {
  try {
    configMaster.logger.info("video -> getAllVideoHandler -> Start");

    const allVideo = await EntityMaster.VideoMetadata.find();
    configMaster.logger.info("video -> getAllVideoHandler -> Metadata Success");

    res.status(200).json(allVideo);
  } catch (error) {
    configMaster.logger.error(
      `video -> getAllVideoHandler -> Error: ${error.message}`
    );

    res.status(500).json({
      message:
        "An error occurred while processing the request. " + error.message,
      status: 500,
      code: "SERVER_ERROR",
    });
  }

  configMaster.logger.info("video -> getAllVideoHandler -> End");
};

module.exports = getAllVideoHandler;
