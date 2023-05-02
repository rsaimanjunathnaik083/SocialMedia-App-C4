const express = require("express");
const { PostModel } = require("../models/Post.model");

const postsRouter = express.Router();

// GET Router
postsRouter.get("/", async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.send(posts);
  } catch (err) {
    console.log(err);
  }
});

// POST Router
postsRouter.post("/create", async (req, res) => {
  const payload = req.body;

  try {
    const new_post = new PostModel(payload);
    await new_post.save();
    res.send({ msg: "Your Post has been Created" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something Went Wrong" });
  }
});

// PATCH Router
// postsRouter.patch("/update/:id", async (req, res) => {
//   const payload = req.body;
//   const id = req.params.id;
//   const post = await PostModel.find({ _id: id });
//   const userID_in_post = post[0].userID;
//   const userID_making_req = req.body.userID;

//   try {
//     if (userID_making_req !== userID_in_post) {
//       res.send({ msg: "You Are Not Authorised" });
//     } else {
//       await PostModel.findByIdAndUpdate({ _id: id }, payload);
//       res.send("Your post has updated successfully");
//     }
//   } catch (err) {
//     res.send({ msg: "Something Went Wrong" });
//   }
// });

//DELETE Router
postsRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await PostModel.findByIdAndDelete({_id: id});
    res.send("Your post has Deleted successfully");
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something Went Wrong" });
  }
});

module.exports = {
    postsRouter,
};