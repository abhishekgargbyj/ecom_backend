const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");


const validate = (data) => {
	const schema = Joi.object({
		name: Joi.string().required().label("Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		phone: Joi.number().required().label("Phone"),
		houseNumber : Joi.string().allow("").label("houseNumber"),
		street : Joi.string().allow("").label("street"),
		city : Joi.string().allow("").label("city"),
		area : Joi.string().allow("").label("area"),
		pincode : Joi.number().allow("").label("houseNumber"),
	});
	return schema.validate(data);
};



module.exports = validate;