const mongoose = require("mongoose");

const otpSchema = mongoose.Schema(
  {
    transactionId:{
      type: mongoose.Types.ObjectId,
      required: true
    },
    expiration:{
      type: "String",
      required: true,
      default:"24hrs"
    },
    status:{
      type: String,
      required: true,
      default: "active"
    }
  },
  {
    timestamps: true,
  }
);



const otp = mongoose.model("OTP", otpSchema);

module.exports = otp;
