const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const playerSchema = new mongoose.Schema({
	name: { type: String, required: true },
    teamname:{type: String, required: true}
});

playerSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const player = mongoose.model("player", playerSchema);

const playervalidate = (data) => {
	const schema = Joi.object({
		name: Joi.string().required().label("Name"),
        teamname: Joi.string().required().label("TeamName")
	});
	return schema.validate(data);
};

module.exports = { player, playervalidate };
