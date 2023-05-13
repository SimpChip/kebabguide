const express = require("express")

const {
    createResturant,
    getResturants,
    getNewResturants,
    getResturant,
    deleteResturant,
    updateResturant
} = require("../controllers/resturantController")

const router = express.Router()

// GET all Resturants
router.get("/" , getResturants)

// GET all Resturants
router.get("/new" , getNewResturants)


// GET a single Resturant
router.get("/:id" , getResturant)

// POST a new Resturant
router.post("/", createResturant)

// DELETE a Resturant
router.delete("/:id", deleteResturant)

// UPDATE a Resturant
router.patch("/:id", updateResturant)

module.exports = router