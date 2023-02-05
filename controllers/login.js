const User         = require('../model/user');
const asyncWrapper = require('../middleware/async')
const bcrypt       = require('bcrypt') 
const jwt          = require('jsonwebtoken')

const verifyPassword = async(password, hashedPassword) => {
    console.log(password);
    console.log(hashedPassword);
    let areTheyEqual = await bcrypt.compare(password,hashedPassword).then((res)=>
    {
        return res;
    }).catch(err => console.log(err));
    return areTheyEqual;
}


const loginUser = asyncWrapper(async(req,res)=>{
    const {email, password} = req.body
    if(!email ||  !password) return res.status(400).json({ 'message': 'Username and password requried '})
    const user     = await User.findOne({ email: req.body.email })
    if(!user){
        res.status(404).json({"message": "username not found"})
    }
    const isPasswordCorrect = await verifyPassword(req.body.password,user.password);
    if(isPasswordCorrect){
        let roles =  Object.values(user.roles).filter(Boolean);
        const accessToken = jwt.sign(
           {
                "UserInfo": {
                    "email": user.email,
                    "roles": roles
                }
           },
           process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '600s'}
        )

        const refreshToken = jwt.sign(
            { "email": user.email},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );
        user.refreshToken = refreshToken;
        const result = await user.save();
        res.cookie('jwt', refreshToken, { secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
        console.log("login", roles)
        res.json({roles,accessToken})
    }else{
        res.sendStatus(401);    
    }
})

module.exports = {loginUser}