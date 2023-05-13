const mongoose = require("mongoose")

const Schema = mongoose.Schema

const reqString = {
    type: String,
    required: true,
}

const reviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    resturantId: {
        type: Schema.Types.ObjectId,
        ref: 'KebabPlace',
        required: true,
    },
    itemId: {
        type: Schema.Types.ObjectId,
        ref: 'Kebab',
        required: true,

    },
    comment: reqString,
    reviewRating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    reviewUpvotes: [{
        type: String,
        
    }],
    reviewDownvotes: [{
        type: String
    }],

}, {timestamps: true})

module.exports = mongoose.model("Review", reviewSchema)