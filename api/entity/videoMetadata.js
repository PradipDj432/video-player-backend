const mongoose = require("mongoose");

const videoMetadataSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    s3_video_url: { type: String, default: "" },
    video_lengths: { type: Number, min: 0 },
    is_active: { type: Boolean, default: true },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "user_details" }, // References user_details
    updated_by: { type: mongoose.Schema.Types.ObjectId, ref: "user_details" }, // References user_details
  },
  { timestamps: true } // Automatically manages createdAt and updatedAt
);

const VideoMetadata = mongoose.model("video_metadata", videoMetadataSchema);

module.exports = VideoMetadata;
