const User         = require('../model/user');
const asyncWrapper = require('../middleware/async')
const bcrypt      = require('bcrypt') 

const hashPassword = async(password) => {
    let saltRounds        = 4;
    let hashedPassword    = bcrypt
    .genSalt(saltRounds)
    .then(salt => {
      return bcrypt.hash(password, salt)
    })
    .catch(err => console.error(err.message));
    return hashedPassword;
}

let validateEmail = (email) => {
    let regular_expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regular_expression.test(email)
}


const getAllUser = asyncWrapper(async(req,res) =>{
    const user = await User.find({});
    res.status(200).json({ user });
});

const registerUser = asyncWrapper(async(req,res) =>{
    const user = req.body;
    if(!user.email || !user.password || !user.first_name || !user.last_name){
        return res.status(400).json({ 'message': 'Any of the one requried credeitials are not mentioned' });
    }
    let hashedPassword = await hashPassword(user.password);
    user.password =  hashedPassword;
    await User.create(user); 
    res.status(201).json({user});
})

const getUser = asyncWrapper(async(req,res)=>{
    const {id: UserID} = req.params
    const user = await User.findOne({ _id : UserID })
    if(!user){
        res.send(`No User with id: ${id}`);
    }
    res.status(200).json({user});
})
const getUserByEmail = asyncWrapper(async(req,res)=>{
    const emailId=req.query.emailId;
    const user = await User.find({ email:emailId})
    if(!user){
        res.send(`No User `);
    }
    res.status(200).json({user});
})

const updateUser = asyncWrapper(async(req,res)=>{
    const {id: UserID} = req.params
    const user = await User.findOneAndUpdate({ _id: UserID}, req.body, {
        new: true, 
        runValidators: true,
    })
    if(!user){
        res.send(`No User with id: ${id}`);
    }
    res.status(200).json({user});
})

const deleteUser =  asyncWrapper(async(req,res)=>{
    const {id: UserID} = req.params
    const user = await User.findOneAndDelete({ _id: UserID});
    if(!user){
        res.send(`No User with id: ${id}`);
    }
    res.status(200).json({user});
})

module.exports = {
    getAllUser, 
    registerUser,
    getUser,
    updateUser,
    deleteUser,
    getUserByEmail,
}