const asyncHandler = require("express-async-handler");
const otpGenerator = require("otp-generator");
const pinM = require("../models/otpModel");

const createPIN = asyncHandler(async (req, res) => {
  const pin = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
  const expDate = new Date().getTime() + 86400000;
  const transId = req.body.id;
  const create = await pinM.create({
    transactionId: transId,
    expiration: expDate,
    pin: pin,
  });
  if (create) {
    res.status(201);
    res.json(create);
  } else {
    res.status(400);
    throw new Error("Failed to create transfer request");
  }
});

const getPin = asyncHandler(async (req, res) => {
  const pin = await pinM.find({ pin: req.body.pin });
  if (pin) {
    res.status(201);
    const data = pin[0];
    const currDate = new Date().getTime();
    if (data.expiration < currDate) {
      const expire = await pinM.findOneAndUpdate(pin, { status: "expired" });
      if (expire) {
        res.status(201);
        res.json("Pin has expired");
      } else {
        res.status(400);
        throw new Error("Error resolving request");
      }
    } else if (data.status.toLowerCase() === "used".toLowerCase()) {
      res.json("Used");
    } else if (data.status.toLowerCase() === "expired".toLowerCase()) {
      res.json("Expired");
    } else if (data.status.toLowerCase() === "invalid".toLowerCase()) {
      res.json("Invalid");
    } else {
      res.json(pin);
    }
  } else {
    res.status(400);
    throw new Error("Pin doesnt exist");
  }
});

module.exports = { createPIN, getPin };
