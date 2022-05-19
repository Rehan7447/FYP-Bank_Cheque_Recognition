const asyncHandler = require("express-async-handler");
const chequeM = require("../models/chequeTransModel");
const OCR = require("../utils/OCR");

const createChequeTransfer = asyncHandler(async (req, res) => {
  const data = await OCR(req.body.pic);
  const arr = data.split("\n");
  const numberReg = /\d+/g;
  var chequeNumber = arr[0].match(numberReg);
  var date = "";
  var bank = "";
  var reciever = "";
  var amount = "";
  var account = "";
  var holder = "";
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].indexOf("Date") > -1) {
      date = arr[i].replace(/\s/g, "").match(numberReg);
      date =
        date[0][0] +
        date[0][1] +
        "-" +
        date[0][2] +
        date[0][3] +
        "-" +
        date[0][4] +
        date[0][5] +
        date[0][6] +
        date[0][7];
    }
    if (arr[i].indexOf("ABL") > -1 || arr[i].indexOf("HBL") > -1) {
      bank = arr[i].match(/^[A-Z]{3}/);
    }
    if (arr[i].indexOf("Pay") > -1) {
      reciever = arr[i].match(/(?<=Pay)(.*)(?=or bearer)/);
    }
    if (arr[i].indexOf("PKR") > -1) {
      const temp = arr[i].replace(/[^a-zA-Z0-9 ]/g, "");
      amount = temp.match(numberReg);
    }
    if (arr[i].match(/\bPK.*\b/)) {
      account = arr[i]
        .replace(/\s*/g, "")
        .match(/^[PK]{2}[0-9]{2}[A-Z]{4}[0-9]{16}/);
    }
    if (i == arr.length - 3) {
      holder = arr[i].match(/^\s*(\w+ \w+)/);
    }
  }
  chequeNumber = chequeNumber[0];
  bank = bank[0];
  reciever = reciever[0].trim();
  amount = amount[0];
  account = account[0];
  holder = holder[0];

  const transfer = await chequeM.create({
    chequeNumber: chequeNumber,
    amount: amount,
    holderBankName: bank,
    holderAccountNumber: account,
    chequeImage: req.body.pic,
    type: req.body.type,
    holderName: holder,
    chequeName: reciever,
    date: date,
  });
  if (transfer) {
    res.status(201);
    res.json(transfer);
  } else {
    res.status(400);
    throw new Error("Failed to create transfer request");
  }
});

module.exports = { createChequeTransfer };
