// require("dotenv").config()

const express = require("express")
const cookieParser = require("cookie-parser")
const path = require("path")
const Blog = require("./models/blog")


const mongoose = require("mongoose")

const userRoute = require("./routes/user")
const blogRoute = require("./routes/blog")

// const PORT = process.env.PORT || 8000;
const PORT = 8000

const { checkForAuthenticationCookie } = require("./middlewares/auth")
// mongoose.connect(process.env.MONGO_URL)
mongoose.connect("mongodb://127.0.0.1:27017/blogApp")
.then(()=>{console.log("MongoDB successfully connected!")})
.catch((err)=>{console.log(err)})

const app = express()

app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve("./public")))

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.get("/", async(req, res)=>{

    const allBlogs = await Blog.find({})

    return res.render("home",{
        user: req.user,
        blogs: allBlogs
    })
})

app.use("/user", userRoute)
app.use("/blog", blogRoute)



app.listen(PORT, ()=>{
    console.log("Server Started!!")
})