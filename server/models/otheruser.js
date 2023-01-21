const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
	matchtype: { type: String, required: true },
	expireAt: {
		type: Date,
		default: Date.now,
		// index: { expires: '1m' },
	  },
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const OtherUser = mongoose.model("otheruser", userSchema);

const othervalidate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		matchtype: Joi.string().required().label("Match Type"),
	});
	return schema.validate(data);
};

module.exports = { OtherUser, othervalidate };
