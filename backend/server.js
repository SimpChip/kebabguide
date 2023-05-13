require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")

// import routes
const userRoutes = require("./routes/user")
const resturantRoutes = require("./routes/resturant")
const itemRoutes = require("./routes/item")
const reviewRoutes = require("./routes/review")

// express app
const app = express()

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use("/api/user",userRoutes)
app.use("/api/resturant",resturantRoutes)
app.use("/api/item",itemRoutes)
app.use("/api/review",reviewRoutes)

// connect to db

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests 
        app.listen(process.env.PORT, ( ) => {
        console.log("connected to db and listening on port", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

