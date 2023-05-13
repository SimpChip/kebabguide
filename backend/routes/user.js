const express = require("express")

const {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser
} = require("../controllers/userController")

const router = express.Router()

// GET all Users
router.get("/" , getUsers)

// GET a single User
router.get("/:id" , getUser)

// POST a new User
router.post("/", createUser)

// DELETE a user
router.delete("/:id", deleteUser)

// UPDATE a user
router.patch("/:id", updateUser)

module.exports = router