const User = require('../models/userModel');


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

module.exports.doSignup=async(req,res)=>{
    try{
        req.files.userImage[0].path = req.files.userImage[0].path.replace('public\\', "");
        let { name,password,address } = req.body;
        const user = await User.create({ name,password,address,image:req.files.userImage[0]});
        res.status(201).json({ user: { id: user._id, name: user.name }, created: true });

    }catch(err){
        const errors = handleError(err);
        res.status(500).json({ serverError: true, message: errors })
    }
}