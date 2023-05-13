const mongoose = require("mongoose")

const Schema = mongoose.Schema

const reqString = {
    type: String,
    required: true,
}

const userSchema = new Schema ({
    firstName: reqString,
    lastName: {
        type: String,
        default: null 
    },
    email: reqString,
    password: reqString,
    phone: {
        ISD: reqString,
        number: reqString,
    },
    
})


module.exports = mongoose.model("User", userSchema)