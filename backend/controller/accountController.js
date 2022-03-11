const asyncHandler = require("express-async-handler");
const accountM = require("../models/accountModel");

const findAccount = asyncHandler(async (req, res) => {
  const account = await accountM.findById(req.params.id);
  if (account) {
    res.status(201);
    res.json(account);
  } else {
    res.json(400);
    throw new Error("Account not found");
  }
});

const findAccountByAccountNumber = asyncHandler(async (req, res) => {
  const account = await accountM.findOne({ IBAN: req.body.IBAN });
  if (account) {
    res.status(201);
    res.json(account);
  } else {
    res.json(400);
    throw new Error("Account not found");
  }
});

// function amountCalculate(amount, fee){

// }

const editAccount = asyncHandler(async (req, res) => {
  const IBAN = req.body.IBAN;
  const bankInfo = await accountM.findOne({ IBAN } || req.params.id);
  if (bankInfo) {
    if (bankInfo.balance < (req.body.amount + req.body.fee && req.body.fee)) {
      res.status(400);
      throw new Error("Not Enough Balance");
    } else {
      res.status(201);
      let amount;
      if (req.body.fee) {
        amount = bankInfo.balance - (req.body.amount + req.body.fee);
      } else {
        amount = bankInfo.balance + req.body.amount;
      }
      const account = await accountM.findOneAndUpdate(
        { IBAN } || req.params.id,
        {
          balance: amount,
        }
      );
      if (account) {
        const updated = await accountM.findOne({ IBAN } || req.params.id);
        if (updated) {
          res.status(201);
          res.json(updated);
        } else {
          res.json(400);
          throw new Error("Account not found");
        }
      } else {
        res.json(400);
        throw new Error("Error While Updating account");
      }
    }
  } else {
    res.json(400);
    throw new Error("Account not found");
  }
});

const getAccountDetails = asyncHandler(async (req, res) => {
  const { accountHolder } = req.query;
  const account = await accountM.findOne({ accountHolder });
  if (account) {
    res.status(201);
    res.json({
      accountId: account._id,
      IBAN: account.IBAN,
      balance: account.balance,
    });
  } else {
    res.status(400);
    throw new Error(
      "No account Associated With User " + accountHolder + " found"
    );
  }
});

module.exports = {
  getAccountDetails,
  findAccount,
  editAccount,
  findAccountByAccountNumber,
};
