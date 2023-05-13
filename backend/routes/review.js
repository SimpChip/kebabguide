const express = require("express")

const {
    getReviewsByResturant,
    getReviewsByItem,
    getReviewsByUser,
    createReview,
    voteReview,
    updateReview
} = require("../controllers/reviewController")

const router = express.Router()

// GET all reviews by Resturant
router.get("/resturant/:id" , getReviewsByResturant)

// GET all reviews by Item
router.get("/item/:id" , getReviewsByItem)

// GET all reviews by user
router.get("/user/:id" , getReviewsByUser)

// POST a new review by kebabplace
router.post("/", createReview)

// UPDATE a review
router.patch("/:id", updateReview)

// upvote review
router.patch("/vote/:id", voteReview)



module.exports = router