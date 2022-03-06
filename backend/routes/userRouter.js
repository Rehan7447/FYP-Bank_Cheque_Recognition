const express = require("express");
const { getAccountDetails } = require("../controller/accountController");
const router = express.Router();
const { registerUser, authorizeUser } = require("../controller/userController");
// const notes = require("../data/notes");

router.post("/", registerUser);
router.post("/login", authorizeUser);
router.get("/account", getAccountDetails);

module.exports = router;
