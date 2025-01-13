const EntityMaster = require("../../entity/entityMaster.js");
const configMaster = require("../../config/configMaster.js");

const postVideoHandler = async (req, res) => {
  try {
    const { name, description, createdBy, video_lengths } = req.body;

    configMaster.logger.info("video -> postVideoHandler -> Start");

    const videoMetadata = new EntityMaster.VideoMetadata({
      name,
      description,
      s3_video_url: "",
      video_lengths: video_lengths || 0,
      is_active: true,
      created_by: createdBy,
      updated_by: createdBy,
    });

    const savedVideo = await videoMetadata.save();
    configMaster.logger.info(
      "video -> postVideoHandler -> Metadata saved to MongoDB"
    );

    res.status(201).json({
      message: "Video metadata saved successfully.",
      video_id: savedVideo._id,
      status: 201,
    });
  } catch (error) {
    configMaster.logger.error(
      `video -> postVideoHandler -> Error: ${error.message}`
    );

    res.status(500).json({
      message:
        "An error occurred while processing the request. " + error.message,
      status: 500,
      code: "SERVER_ERROR",
    });
  }

  configMaster.logger.info("video -> postVideoHandler -> End");
};

module.exports = postVideoHandler;
