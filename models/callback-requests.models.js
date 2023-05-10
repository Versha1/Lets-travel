let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let callBackRequestSchema = new Schema({
    id: String,
    phoneNumber:String,
    date: Date
});

let CallbackRequest = mongoose.model("CallbackRequest",callBackRequestSchema,'callback-requests');
module.exports ={ CallbackRequest }