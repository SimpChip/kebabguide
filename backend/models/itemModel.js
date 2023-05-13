const mongoose = require("mongoose")

const Schema = mongoose.Schema

const reqString = {
    type: String,
    required: true,
}

const itemSchema = new Schema ({
    name: reqString,

    price: {
        type: Number,
        required: true
    },
    meat : {
        type: String,
        required: true
    },
    resturantId: {
        type: Schema.Types.ObjectId,
        ref: 'ItemPlace',
        required: true,
    },
    imgUrl: {
        type: String, 
        required: false
    },
    itemRating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    itemUpvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    itemDownvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
})


module.exports = mongoose.model("Item", itemSchema)