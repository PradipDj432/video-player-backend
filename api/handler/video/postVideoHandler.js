const EntityMaster = require("../../entity/entityMaster.js");
const configMaster = require("../../config/configMaster.js");
const helperMaster = require("../../helper/helperMaster.js");

const postVideoHandler = async (req, res) => {
  try {
    configMaster.logger.info("video -> postVideoHandler -> Start");

    const { name, description, video_lengths } = req.body;

    const isUpload = await helperMaster.awsMaster.s3Master.putObjectS3(req);
    if (isUpload.success) {
      const videoMetadata = new EntityMaster.VideoMetadata({
        name,
        description,
        s3_video_url: `https://${process.env.AWS_S3_BUCKET}.s3.us-east-1.amazonaws.com/${isUpload.file_name}`,
        video_lengths: video_lengths || 0,
        is_active: true,
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
    } else {
      configMaster.logger.error(
        "video -> postVideoHandler -> S3 upload failed."
      );
      res.status(500).json({
        message: "Failed to upload video to S3.",
        status: 500,
        code: "UPLOAD_ERROR",
      });
    }
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
