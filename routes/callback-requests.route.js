let uniqId = require('uniqid');
let CallbackRequest = require('../models/callback-requests.models').CallbackRequest;

let express = require('express');
let router = express.Router();
let authMiddleware = require('../middleware/auth')

router.get('/',authMiddleware, async (req,resp) => {
    let cr = await CallbackRequest.find();
     resp.send(cr);

})

router.post('/', async (req,resp) => {
    let reqBody = req.body;
    let newRequest = new CallbackRequest({
        id: uniqId(),
        phoneNumber: reqBody.phoneNumber,
        date: new Date()
    })
    await newRequest.save();
    resp.send("request saved");
})

router.delete('/:id',authMiddleware,async (req,resp) => {
    await CallbackRequest.deleteOne({id: req.params.id});
    resp.send(' Request Deleted')
})

module.exports = router;
