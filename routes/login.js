require('dotenv').config();
const router = require("express").Router();
const User  = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

router.post("/", async (req, res) => {
	console.log("into login file");
	console.log(req.body);
	try {
		console.log("in try block");
		const { error } = validate(req.body);
		if (error) {
			
			return res.status(400).send({ message: error.details[0].message });
		}
		console.log("after if");
		console.log(req.body.email);
		const user = await User.findOne({ email: req.body.email });
		console.log(user);
		if (user=={} || user==null){
			return res.status(401).send({ message: "User doesn't exist. Please Signup" });}

		console.log(req.body.password, user.password);
		
		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		console.log(validPassword);
		
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

			console.log(refreshToken);


			
			const savedToken = await User.updateOne({email:req.body.email},{refreshToken : refreshToken})
			if(savedToken) console.log(savedToken);
			res.cookie("jwt", refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
			res.json({ accessToken });
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