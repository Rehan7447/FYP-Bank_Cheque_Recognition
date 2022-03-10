const asyncHandler = require("express-async-handler");
const accountM = require("../models/accountModel");

const findAccount = asyncHandler(async (req, res) => {
  const account = await accountM.findById(req.body);
  if (account) {
    res.status(201);
    res.json(account);
  } else {
    res.json(400);
    throw new Error("Account not found");
  }
});

const editAccount = asyncHandler(async (req, res) => {
  const account = await accountM.findByIdAndUpdate(req.params.id, req.body);
  if (account) {
    const updated = await accountM.findById(req.params.id);
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

module.exports = { getAccountDetails, findAccount, editAccount };
