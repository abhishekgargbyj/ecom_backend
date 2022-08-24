const express = require("express");
const router= express.Router();
const User = require("../models/user");
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.get("/:user_id",async(req,res) => {
    const id = req.params.user_id;

    const foundUser = await User.find({_id : user_id });
    if (!foundUser) return res.status(403).send({message : "USer not found"}); //Forbidden 

    const refreshToken = foundUser.refreshToken;
    if(refreshToken === "false"){
        return res.status(204).send({message : "No refresh Token found"})
    }
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { "email": decoded.email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '5m' }
            );
            res.json({ accessToken })
        }
    );
});

module.exports =router;