const mongoose = require("mongoose");
const userM = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res, next) => {
	const { name, email, phoneNumber, address, CNIC, dob, password, pic } =
		req.body;
	const userExists = await userM.findOne({ email });
	if (userExists) {
		res.status(400);
		var err = new Error("User with this email already exists");
		return next(err);
	}
	const user = await userM.create({
		name,
		email,
		phoneNumber,
		address,
		CNIC,
		dob,
		password,
		pic,
	});

	if (user) {
		res.status(201);
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			phoneNumber: user.phoneNumber,
			address: user.address,
			CNIC: user.CNIC,
			dob: user.dob,
			pic: user.pic,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Error while creating user!");
	}
});

const authorizeUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await userM.findOne({ email });
	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			pic: user.pic,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Email or Password doesnt exist");
	}
});

module.exports = { registerUser, authorizeUser };
