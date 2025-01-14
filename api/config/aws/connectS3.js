const { S3Client } = require("@aws-sdk/client-s3");
const awsConfig = require("./awsConfig");
const connectS3 = new S3Client({
  region: awsConfig.region,
  credentials: {
    accessKeyId: awsConfig.access_key,
    secretAccessKey: awsConfig.secret_access_key,
  },
});

module.exports = connectS3;
