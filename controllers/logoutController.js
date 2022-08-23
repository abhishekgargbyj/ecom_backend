const User = require("../models/user");

const handleLogout = async(req,res) =>{
    console.log("In logout");
    console.log(req.header("set-cookie"));
    const cookies = res.cookies;
    console.log(cookies);
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    console.log(refreshToken);

    const foundUser = User.find({refreshToken : refreshToken });
    console.log(foundUser);
    if (!foundUser){
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(205);
    }

    const deletingToken = await User.updateOne({refreshToken : refreshToken},{refreshToken : "false"})
    console.log(deletingToken);
    if(deletingToken) console.log("removed");


    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

module.exports=  {handleLogout}