require('dotenv').config();
const router = require("express").Router();
const User  = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error) {
			return res.status(400).send({ message: error.details[0].message });
		}
		
		const user = await User.findOne({ email: req.body.email });
		if (user=={} || user==null){
			return res.status(401).send({ message: "User doesn't exist. Please Signup" });}

		const user_id = user._id;
		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(402).send({ message: "Invalid Email or Password" });

		if(validPassword){
			const accessToken =jwt.sign(
				{"email" : user.email},
				process.env.ACCESS_TOKEN_SECRET,
				{expiresIn : '5m'}
			)
			const refreshToken =jwt.sign(
				{"email" : user.email},
				process.env.REFRESH_TOKEN_SECRET,
				{expiresIn : '1d'}
			)

			const savedToken = await User.updateOne({email:req.body.email},{refreshToken : refreshToken})
			res.json({ accessToken , user_id});// userid
		}	
	} catch (error) {
		console.log(error);
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;