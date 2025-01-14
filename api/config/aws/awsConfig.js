const awsConfig = {
  region: process.env.AWS_REGION,
  access_key: process.env.AWS_ACCESS_KEY,
  secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
  s3_bucket: process.env.AWS_S3_BUCKET,
};

module.exports = awsConfig;
