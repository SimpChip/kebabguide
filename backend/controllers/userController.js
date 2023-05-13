const User = require("../models/userModel")

const mongoose = require("mongoose")

// get all users
const getUsers = async (req, res) => {
    const user = await User.find({}).sort({createdAt: -1})

    res.status(200).json(user)
}

// get a single user
const getUser = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No suck user"})
    }
    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({error: "No suck user"})
    }

    res.status(200).json(user)
}

// create a new user
const createUser = async (req, res) => {
    const {firstName, lastName, email, password, phone} = req.body


    const numberExists = await User.findOne({ phone: req.body.phone });
    if (numberExists) {
        return res.status(400).json({ error: 'Number already in use' });
    }

    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
        return res.status(400).json({ error: 'Email already in use' });
    }

    // add doc to db
    try {
        const user = await User.create({firstName, lastName, email, password, phone})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
} 

// delete a user
const deleteUser = async (req, res) => {
    const {id} = res.params

    

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No suck user"})
    }

    const user = await User.findOneAndDelete({_id: id})

    if (!user) {
        return res.status(404).json({error: "No suck user"})
    }
    return res.status(200).json(user)
}

// update a workout

const updateUser = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No suck user"})
    }

    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!user) {
        return res.status(404).json({error: "No suck user"})
    }
    return res.status(200).json(user)
}



module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
}

