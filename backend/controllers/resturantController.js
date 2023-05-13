const Resturant = require("../models/resturantModel")

const mongoose = require("mongoose")

// get all Resturants
const getResturants = async (req, res) => {
    const resturants = await Resturant.find({}).sort({createdAt: -1})

    res.status(200).json(resturants )
}

const getNewResturants = async (req, res) => {
    const resturants = await Resturant.find({}).sort({updatedAt: -1}).limit(10);

    res.status(200).json(resturants)
}


// get a single Resturant

const getResturant = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Resturant id is not valid"})
    }
    
    const resturant = await Resturant.findById(id)

    if (!resturant) {
        return res.status(404).json({error: "No suck Resturant"})
    }

    res.status(200).json(resturant)
}



// create a new Resturant
const createResturant = async (req, res) => {
    const {name, address, imgUrl, resturantRating, resturantUpvotes, resturantDownvotes} = req.body

    // add doc to db
    try {
        const resturant = await Resturant.create({name, address, imgUrl, resturantRating, resturantUpvotes, resturantDownvotes})
        res.status(200).json(resturant)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
} 

// delete a Resturant
const deleteResturant= async (req, res) => {
    const {id} = res.params

    

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Resturant id is not valid"})
    }

    const resturant = await Resturant.findOneAndDelete({_id: id})

    if (!resturant) {
        return res.status(404).json({error: "No suck Resturant"})
    }
    return res.status(200).json(resturant)
}

// update a resturant

const updateResturant = async (req, res) => {
    const {id} = res.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Resturant id is not valid"})
    }

    const resturant = await Resturant.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!resturant) {
        return res.status(404).json({error: "No suck Resturant"})
    }
    return res.status(200).json(resturant)
}



module.exports = {
    getResturants,
    getNewResturants,
    getResturant,
    createResturant,
    deleteResturant,
    updateResturant,
}

