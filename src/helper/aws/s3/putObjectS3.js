const { PutObjectCommand } = require("@aws-sdk/client-s3");
const awsMaster = require("../../../config/aws/awsMaster");
const { v4: uuidv4 } = require("uuid");

const putObjectS3 = async (req) => {
  const fileName = uuidv4() + ".mp4";

  const params = {
    Bucket: awsMaster.awsConfig.s3_bucket,
    Key: fileName,
    Body: req.file.buffer,
    ContentType: "video/mp4",
  };

  try {
    const command = new PutObjectCommand(params);
    const data = await awsMaster.connectS3.send(command);

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
