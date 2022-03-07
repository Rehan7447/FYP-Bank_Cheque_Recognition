const asyncHandler = require("express-async-handler");
const accountM = require("../models/accountModel");

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

module.exports = { getAccountDetails };
