let uniqId = require('uniqid');
let Post = require('../models/post.models').Post;

let express = require('express');
let router = express.Router();
let authMiddleware = require('../middleware/auth')


router.get('/',async (req,resp) => {
    let posts = await Post.find();
    resp.send(posts);
})

router.get('/:id',async (req,resp) => {
    let id = req.params.id;
    let post = await Post.findOne({id: id});
    resp.send(post);
})

router.post('/',authMiddleware,async (req,resp) => {
    let reqBody = req.body;
    let imgPath;
    if(reqBody.imageUrl){
        imgPath = reqBody.imageUrl;
    }else{
        let filePath = req.file.path;
        imgPath = filePath.substring(6,filePath.length);
        
    }
    let newPost = new Post({
        
        id: uniqId(),
        title: reqBody.title,
        date: new Date(),
        description: reqBody.description,
        text: reqBody.text,
        country: reqBody.country,
        imageUrl: imgPath
   });
  await newPost.save();
  resp.send('Created');
})

router.delete('/:id', authMiddleware,async(req,resp)=>{
    let id = req.params.id;
   await Post.deleteOne({id: id});
    resp.send('Post Deleted');
    
})

router.put('/:id', authMiddleware,async(req,resp)=>{
    let id = req.params.id;
   await Post.updateOne({id: id},req.body);
    resp.send('Post Updated');
    
})


module.exports = router;