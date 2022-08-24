const router = require("express").Router();
const User  = require("../models/user");

const allRoutes = {
    getUsers : "/getUsers",
    getUser : "/getUser/:email",
    addUser : "/addUser",
    updateUser : "/updateUser/:email",
    deleteUser : "/deleteUser/:email"
 }

router.get(allRoutes.getUsers, async (req,res) => {

    try{
        console.log("in try block");
        const results = await User.find({});
        
        res.status(200);
        res.json(results);
    }
    catch(error){
        console.log(error);
        return res.status(401).send({message : "cant get users"});
    }

});

router.get(allRoutes.getUser, async (req,res) => {

    try{
        const results = await User.findOne({email:req.params.email});
        res.status(200);
        res.json(results);
    }
    catch(error){
        console.log(error);
        return res.status(401).send({message : "cant get user"});
    }

});

router.post(allRoutes.addUser, (req,res) => {

    try{
        const data = {
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
        const newUser = new User(data);
        newUser.save();
        res.status(200);
    }
    catch(error){
        console.log(error);
        return res.send(401).send({message : "cant save user"});
    }
});

router.put(allRoutes.updateUser, async (req,res) => {

    try{
        const currentUser = await User.findOne({email : req.params.email});
        const updateUser = req.body;
       const updation = await User.updateMany({email : req.params.email}, {$set : updateUser});
        if(updation)
            res.send("done")
        else console.log("error");
    }
    catch(error){
        console.log(error);
    }
});

router.delete(allRoutes.deleteUser,async (req,res) => {

    try{
        console.log(req.params.email);
        const deleteSuccessful = await User.deleteOne({email: req.params.email});
        console.log(deleteSuccessful);
        if(deleteSuccessful)  return res.status(200).send({message : "User deleted"})
    }
    catch(error){
        console.log(error);
        return res.send(401).send({message : "cant delete user"});
    }
});

module.exports = router;