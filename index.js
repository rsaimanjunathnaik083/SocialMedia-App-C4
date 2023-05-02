const express = require("express");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/User.routes")
const { postsRouter } = require("./routes/Posts.routes")
const { authenticate } = require("./middlewares/authentication.middleware") 
const cors = require("cors")
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors({origin: "*",}));
app.get("/", (req,res)=> { res.send("Welcome to the Social Media APP")});

app.use("/users", userRouter);
app.use(authenticate);
app.use("/posts", postsRouter);

app.listen(process.env.port, async() => {
    try {
        await connection;
        console.log("Connected to the Data Base");
    } catch (err) {
        console.log(err);
    }
    console.log(`Server is running at port : ${process.env.port}`);
})