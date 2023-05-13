const mongoose = require("mongoose")

const Schema = mongoose.Schema

const reqString = {
    type: String,
    required: true,
}

const resturantSchema = new Schema({ 
    name: reqString,
    address: reqString,
    imgUrl: reqString,
    resturantRating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    resturantUpvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    resturantDownvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

}, {timestamps: true})


module.exports = mongoose.model("Resturant", resturantSchema)

