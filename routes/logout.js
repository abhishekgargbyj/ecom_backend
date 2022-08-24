const express = require('express');
const router = express.Router();
const User = require("../models/user");

router.get('/:user_id', async(req,res)=>{
    const id = req.params.user_id;
    try{
    const foundUser = await User.find({_id : id });
    if(!foundUser) {
        return res.sendStatus(204);
    }

    if(foundUser.refreshToken === false) {
         return res.status(204).send({message : "No refresh token found"});
    }

    const deletingToken = await User.updateOne({_id : id}, {refreshToken : "false"});
    if(deletingToken.modifiedCount ===1){
        return res.status(200).send({message : "User is logged out"})
    }
    }
    catch(err)
    {
        console.log(err);
        res.status(400).send({message : "Internal server error"})
    }
});

module.exports = router;