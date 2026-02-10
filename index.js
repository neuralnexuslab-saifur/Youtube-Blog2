const express = require("express")
const path = require("path")
const mongoose = require(
    "mongoose"
)

const app = express()
const PORT = 8000
const userRoute = require("./routes/user.js")

mongoose.connect("mongodb://localhost:27017/blogify").then((e => console.log("Mongo connected")))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.get("/", (req, res) => {
    res.render("home")
})

app.use("/user", userRoute)
app.listen(PORT, () => console.log("Server started for Youtube Blog @", PORT))