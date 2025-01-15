const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const configMaster = require("../../../config/configMaster");

const putObjectS3 = async (req) => {
  try {
    // Extract file extension from original file name
    const originalFileName = req.file.originalname;
    const fileExtension = path.extname(originalFileName) || ".bin";

    // Generate unique file name with the correct extension
    const fileName = uuidv4() + fileExtension;

    const params = {
      Bucket: configMaster.awsMaster.awsConfig.s3_bucket,
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype, // Dynamically set content type
    };

    const command = new PutObjectCommand(params);
    const data = await configMaster.awsMaster.connectS3.send(command);

    return {
      success: true,
      file_name: fileName,
      s3_data: data,
    };
  } catch (error) {
    console.error("Error uploading to S3:", error.message);
    return {
      success: false,
      error: error.message,
    };
  }
};

module.exports = putObjectS3;
