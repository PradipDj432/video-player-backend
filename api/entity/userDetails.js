const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Basic email regex
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    phone: {
      type: String,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\d{10,15}$/.test(v); // Allow 10 to 15 digit phone numbers
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    password: { type: String, required: true },
    first_name: { type: String, default: "" },
    last_name: { type: String, default: "" },
    profile_picture: { type: String, default: "" },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "user_details" }, // Reference to user_details
    updated_by: { type: mongoose.Schema.Types.ObjectId, ref: "user_details" }, // Reference to user_details
    is_active: { type: Boolean, default: true },
    roles: { type: [String], default: ["user"] },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Middleware to handle `updated_at` before save (not necessary with `timestamps`, but kept for backward compatibility)
userDetailsSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const UserDetails = mongoose.model("user_details", userDetailsSchema);

module.exports = UserDetails;
