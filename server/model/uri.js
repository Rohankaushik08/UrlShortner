const mongoose = require('mongoose');
const mySchema = new mongoose.Schema(
    {
        shortUrl : String,
        orgUrl : String,
        createdAt : Date,
        clicks : Number
    }
)
module.exports = mongoose.model("Url",mySchema);