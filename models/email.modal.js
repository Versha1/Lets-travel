let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let emailSchema = new Schema({
    id: String,
    name:String,
    email:String,
    message:String,
    date: Date
});

let Email = mongoose.model("Email",emailSchema,'emails');
module.exports ={ Email }