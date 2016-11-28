var mongoose = require('mongoose');

var mediaPostSchema = new mongoose.Schema({
    title: String,
    video: String,
    vidDesc: String,
    dateTime: {type: Date, default: Date.now},
    //dateTime: String,
},
    {collection : 'data'});

module.exports = mongoose.model('MediaPost', mediaPostSchema);