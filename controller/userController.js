const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const maxAge = 3 * 24 * 60 * 60;

//handle database error
const handleError = (err) => {
    let errors = { name: "", password: "" }
    if (err.code === 11000) {
        return "Name is already exists";
         
    }

    if (err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach((properties) => {
            return  properties.message
        })
    }
}

const createTocken = (id) => {
    return jwt.sign({ id }, 'authapp secret ukey', {
        expiresIn: maxAge
    });
}

module.exports.doSignup=async(req,res)=>{
    try{
        req.files.userImage[0].path = req.files.userImage[0].path.replace('public\\', "");
        let { name,password,address } = req.body;
        const user = await User.create({ name,password,address,image:req.files.userImage[0]});
        const token = createTocken(user._id);

        res.status(201).json({ user: { id: user._id, name: user.name }, token, created: true });

    }catch(err){
        console.log(err);
        const errors = handleError(err);
        res.status(500).json({ serverError: true, message: errors })
    }
}