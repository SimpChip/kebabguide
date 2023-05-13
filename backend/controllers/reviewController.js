const Review = require("../models/reviewModel")

const User = require("../models/userModel")

const Resturant = require("../models/resturantModel")

const Item = require("../models/itemModel")

const mongoose = require("mongoose")


// get all Reviews by Resturant
const getReviewsByResturant= async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Resturant id is not valid"})

    }
    const reviews = await Review.find({resturantId: id}).populate('userId').sort({createdAt: -1})

    res.status(200).json(reviews)
}

// get all Reviews by Item
const getReviewsByItem= async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Item id is not valid"})

    }
    const reviews = await Review.find({itemId: id}).sort({createdAt: -1})

    res.status(200).json(reviews)
}

// get all Reviews by User
const getReviewsByUser = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "User id is not valid"})

    }
    const reviews = await Review.find({userId: id}).sort({createdAt: -1})

    res.status(200).json(reviews)
}



// create a new Review
const createReview = async (req, res) => {
    const {userId, resturantId, itemId,  comment, reviewRating, reviewUpvotes, reviewDownvotes} = req.body


    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({error: "User id is not valid"})

    }

    if (!mongoose.Types.ObjectId.isValid(resturantId)) {
      return res.status(404).json({error: "Resturant id is not valid"})

    }

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(404).json({error: "Item id is not valid"})

    }

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(400).json({ error: 'User dont exist' });
    }

    const resturantExists = await Resturant.findById(resturantId);
    if (!resturantExists) {
      return res.status(400).json({ error: 'Resturant dont exist' });
    }

    const itemExists = await Item.findById(itemId);
    if (!itemExists) {
      return res.status(400).json({ error: 'Item dont exist' });
    }
    // add doc to db
    
    try {
      const review = await Review.create({userId, resturantId, itemId, reviewRating, comment, reviewUpvotes, reviewDownvotes})

      res.status(200).json(review)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}

const voteReview = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No suck review"})
    }

    if (!mongoose.Types.ObjectId.isValid(req.body.userId)) {
        return res.status(404).json({error: "User id is not valid"})
    }

    const userExists = await User.findById(req.body.userId);
    if (!userExists) {
      return res.status(400).json({ error: 'User dont exist' });
    }

   const review = await Review.findById(id);
    if (!review) {
        return res.status(404).json({error: "No suck Resturant"})
    }


    const isUpvoted = review.reviewUpvotes.includes(req.body.userId);
    const isDownvoted = review.reviewDownvotes.includes(req.body.userId);

    let newUpvotesArray = review.reviewUpvotes;
    let newDownvotesArray = review.reviewDownvotes;

    if ((isUpvoted && req.body.vote) || !req.body.vote ) {
      newUpvotesArray = newUpvotesArray.filter((userId) => userId !== req.body.userId);
    } else if (req.body.vote) {
      newUpvotesArray.push(req.body.userId);
    }

    if ((isDownvoted && !req.body.vote) || req.body.vote ) {
      newDownvotesArray = newDownvotesArray.filter((userId) => userId !== req.body.userId);
    } else if (!req.body.vote) {
      newDownvotesArray.push(req.body.userId);
    }


    const updatedReview = await Review.findOneAndUpdate({_id: id}, {
        reviewUpvotes: newUpvotesArray,
        reviewDownvotes: newDownvotesArray,
    })

    if (!updatedReview) {
        return res.status(404).json({error: "No suck review"})
    }
    return res.status(200).json(updatedReview)
}


const updateReview = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No suck user"})
    }

    const review = await Review.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!review) {
        return res.status(404).json({error: "No suck review"})
    }
    return res.status(200).json(review)
}





module.exports = {
    getReviewsByResturant,
    getReviewsByItem,
    getReviewsByUser,
    voteReview,
    updateReview,
    createReview,
}

