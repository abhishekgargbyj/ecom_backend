const router = require("express").Router();
const User = require("../models/user");
const validateUser = require("../validate/validateUser");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		const { error } = validateUser(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		const newUser = {
			name: req.body.name,
			email : req.body.email,
			password :hashPassword,
			phone : req.body.phone,
			address :{
				houseNumber : req.body.houseNumber,
				area : req.body.area,
				street : req.body.street,
				city : req.body.city,
				pincode : req.body.pincode
			}
		}

		await new User(newUser).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;