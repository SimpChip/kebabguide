const express = require("express")

const {
    getItems,
    getItemsByResturant,
    getItem,
    createItem,
    deleteItem,
    updateItem,
} = require("../controllers/itemController")

const router = express.Router()

// GET all Items
router.get("/" , getItems)

// GET all Items by Resturant
router.get("/resturant/:id" , getItemsByResturant)

// GET a single Item
router.get("/:id" , getItem)

// POST a new Item
router.post("/", createItem)

// DELETE a Item
router.delete("/:id", deleteItem)

// UPDATE a Item
router.patch("/:id", updateItem)

module.exports = router