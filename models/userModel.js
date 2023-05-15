const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User name is required"],
        unique: true
    },
    address: {
        type: String,
        required: [true, "Address  is required"],

    },
    image: {
        type: Object,
        required: [true, "Image  is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    
})

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);

})

module.exports = mongoose.model("Users", userSchema);