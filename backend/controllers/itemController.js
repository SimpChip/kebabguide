const Item = require("../models/itemModel")

const mongoose = require("mongoose")

// get all Items
const getItems= async (req, res) => {
    const items = await Item.find({}).sort({createdAt: -1})

    res.status(200).json(items)
}


// get all Items by Resturant
const getItemsByResturant = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Resturant id is not valid"})

    }
    const items = await Item.find({resturantId: id}).sort({createdAt: -1})

    res.status(200).json(items)
}


// get a single Item

const getItem = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No suck Item"})
    }
    
    const item = await Item.findById(id)

    if (!item) {
        return res.status(404).json({error: "No suck Item"})
    }

    res.status(200).json(item)
}



// create a new Item
const createItem = async (req, res) => {
    const {name, price, meat, imgUrl, resturantId, itemRating, itemUpvotes, itemDownvotes} = req.body

    // add doc to db
    try {
        const item = await Item.create({name, price, meat, imgUrl, resturantId, itemRating, itemUpvotes, itemDownvotes})
        res.status(200).json(item)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
} 

// delete a Item
const deleteItem = async (req, res) => {
    const {id} = req.params


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Item id is not valid"})
    }

    const item = await Item.findOneAndDelete({_id: id})

    if (!item) {
        return res.status(404).json({error: "No suck item"})
    }

    return res.status(200).json(item)
}

// update a Item

const updateItem = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Item id is not valid"})
    }

    const item = await Item.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!item) {
        return res.status(404).json({error: "No suck item"})
    }
    return res.status(200).json(item)
}



module.exports = {
    getItems,
    getItemsByResturant,
    getItem,
    createItem,
    deleteItem,
    updateItem,
}

