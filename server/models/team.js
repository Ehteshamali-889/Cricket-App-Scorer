const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const teamSchema = new mongoose.Schema({
	name: { type: String, required: true }
});

teamSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const team = mongoose.model("team", teamSchema);

const teamvalidate = (data) => {
	const schema = Joi.object({
		name: Joi.string().required().label("Name")
	});
	return schema.validate(data);
};

module.exports = { team, teamvalidate };
