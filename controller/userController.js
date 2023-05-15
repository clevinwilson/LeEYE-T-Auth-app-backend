const e = require('express');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const maxAge = 3 * 24 * 60 * 60;
const secret_key = "authapp secret ukey";

//handle database error
const handleError = (err) => {
    let errors = { name: "", password: "" }
    if (err.code === 11000) {
        return "Name is already exists";

    }

    if (err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach((properties) => {
            return properties.message
        })
    }
}

const createTocken = (id) => {
    return jwt.sign({ id }, 'authapp secret ukey', {
        expiresIn: maxAge
    });
}

module.exports.doSignup = async (req, res) => {
    try {
        req.files.userImage[0].path = req.files.userImage[0].path.replace('public\\', "");
        let { name, password, address } = req.body;
        const user = await User.create({ name, password, address, image: req.files.userImage[0] });
        const token = createTocken(user._id);

        res.status(201).json({ user: { id: user._id, name: user.name }, token, created: true });

    } catch (err) {
        const errors = handleError(err);
        res.status(500).json({ serverError: true, message: errors })
    }
}

module.exports.getUserDetails = async (req, res) => {
    try {

        const authHeader = req.headers.authorization;
        console.log(authHeader);
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secret_key, async (err, decoded) => {

            let user = await User.find({ _id: decoded.id }, { password: 0 });
            if (user) {
                res.status(201).json({ user: user[0] });
            } else {
                throw new Error("User not Exist")
            }
        });
    } catch (err) {
        res.json({ status: false, message: err.message });
    }
}

module.exports.updateProfile = async (req, res) => {
    try {
        let image;
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];

        //taking userid from jwt token
        jwt.verify(token, secret_key, async (err, decoded) => {

            let userDetails = await User.find({ _id: decoded.id }, { password: 0 });

            if (req.files.userImage) {
                req.files.userImage[0].path = req.files.userImage[0].path.replace('public\\', "");
                image = req.files.userImage[0];
            } else {
                image = userDetails.image;
            }

            let user = await User.updateOne({ _id: decoded.id }, {
                $set: {
                    name: req.body.name,
                    address: req.body.address,
                    image
                }
            })
            if (user) {
                res.status(201).json({ message: "User details updated successfully" });
            } else {
                throw new Error("Update Error")
            }
        });

    } catch (err) {
        res.json({ status: false, message: err.message });
    }
}