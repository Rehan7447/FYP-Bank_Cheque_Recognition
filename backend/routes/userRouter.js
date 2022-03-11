const express = require("express");
const { getAccountDetails, findAccount, editAccount, findAccountByAccountNumber } = require("../controller/accountController");
const { createTransfer, editTransferRequest } = require("../controller/moneyTransferController");
const router = express.Router();
const { registerUser, authorizeUser } = require("../controller/userController");
// const notes = require("../data/notes");

router.post("/", registerUser);
router.post("/login", authorizeUser);
router.get("/account", getAccountDetails);
router.post("/transferRequest", createTransfer);
router.get("/findBankAccount/:id", findAccount);
router.put("/updateAccount/:id", editAccount);
router.put("/editMoneyTransfer/:id", editTransferRequest);
router.get("/findAccountByAccountNumber", findAccountByAccountNumber)


module.exports = router;
