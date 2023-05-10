let uniqId = require('uniqid');
let Email = require('../models/email.modal').Email;

let express = require('express');
let router = express.Router();
let authMiddleware = require('../middleware/auth')

router.get('/',authMiddleware,async (req,resp) => {
    let emails = await Email.find();
     resp.send(emails);

})

router.post('/',async (req,resp) => {
    let reqBody = req.body;
    let newEmail = new Email({
        id: uniqId(),
        name: reqBody.name,
        email: reqBody.email,
        message: reqBody.message,
        date: new Date()
    })
    await newEmail.save();
    resp.send("request saved");
})

router.delete('/:id',authMiddleware,async (req,resp) => {
    await Email.deleteOne({id: req.params.id});
    resp.send(' Email Deleted')
})

module.exports = router;
