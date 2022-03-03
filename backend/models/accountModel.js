const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
	accountHolder: {
		type: mongoose.Types.ObjectId,
		ref: "User",
		required: true,
	},
	IBAN: {
		type: String,
		required: true,
	},
	bankName: {
		type: String,
		required: true,
	},
	bankCode: {
		type: String,
		required: true,
	},
	branchCode: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		default: "active",
	},
	balance: {
		type: String,
		default: "0",
	},
});

const account = mongoose.model("Account", accountSchema);

module.exports = account;
