const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const matchSchema = new mongoose.Schema({
	firstteam: { type: String, required: true },
	secondteam: { type: String, required: true },
	assignuser: { type: String, required: true }
});

matchSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const match = mongoose.model("match", matchSchema);

const matchvalidate = (data) => {
	const schema = Joi.object({
		firstteam: Joi.string().required().label("firstteam"),
		secondteam: Joi.string().required().label("secondteam"),
		assignuser: Joi.string().required().label("assignuser"),
	});
	return schema.validate(data);
};

module.exports = { match, matchvalidate };
