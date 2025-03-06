const express = require('express');
const router = express.Router();
const Post = require('../models/postSchema')

router.post('/home', async (req, res) => {
    try {
        const { users, content } = req.body;

        const newPost = new Post({ content: content, users: users })

        await newPost.save()

        res.status(201).send({ status: true ,data: newPost});


    }catch(err){
        console.log(err)

        res.status(400).send({status: false})
    }

   
})

router.post('/display', async (req, res) => {
    try {
        const display = await Post.find()
            .populate("users", "name username") 
            .exec(); 

        res.status(200).send({ status: true, data: display });
        
    }catch(err){
        console.log(err)

        res.status(400).send({status: false})
    }

})

module.exports = router;