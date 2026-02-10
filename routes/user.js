const User = require("../models/user.js")

const { Router } = require("express")
const router = Router()

router.get("/signin", (req, res) => {
    res.render("signin")
})

router.get("/signup", (req, res) => {
    res.render("signup")
})

router.post("/signin", async(req,res)=>{
    const {email, password} = req.body
    const user = User.matchPassword(email,password)
    console.log("User",user)
    return res.redirect("/")

})

router.post("/signup", async (req, res, next) => {
    const { fullName, email, password } = req.body
    await User.create({
        fullName, email, password

    })

    res.redirect("/")
})
module.exports = router