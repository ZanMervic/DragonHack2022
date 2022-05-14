const express = require("express");
const router = express.Router();
const Post = require("../models/post");


//tle naredimo GET request v DB (dobimo vse poste) ------ to bomo mi rabili
router.get("/", async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({message:err});
    }
});


//Dobimo specificen post
// router.get("/:postId", async (req, res) => {
//     try{
//         const post = await Post.findById(req.params.postId);
//         res.json(post);
//     }catch(err){
//         res.json({message: err});
//     }
// })


//tle sprejemamo POST requeste in jih posiljamo v DB ------ to bomo mi rabili
router.post("/", async (req,res) => {
    console.log(req.body.lng);
    const post = new Post({
        lat: req.body.lat,
        lng: req.body.lng,
        status: req.body.status,
        username: req.body.username,
        password: req.body.password,
        // description: req.body.description,
        date: req.body.date
    });
    try{
        const savedPost = await post.save()
        res.json(savedPost);
    }catch(err){
        res.json({message: err});
    }
});


//Delete specific post ---- to mogoce rabimo (da zbrisemo ociscena podrocja)
router.delete("/:postId", async (req,res) => {
    try{
        const removedPost = await Post.remove({_id: req.params.postId})
        res.json(removedPost);
    }catch(err){
        res.json({message:err});
    }

});


//Updatamo status (npr. ko so smeti ociscene)
router.patch("/:postId", async (req,res) => {
    try{
        const updatedPost = await Post.updateOne(
            {_id: req.params.postId}, 
            { $set : { status: req.body.status }});
        res.json(updatedPost);
    }catch(err){
        res.json({message: err});
    }
})

module.exports = router;