var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var mediaPostSchema = new mongoose.Schema({
    title: String,
    video: String,
    vidDesc: String,
    dateTime: {type: Date, default: Date.now},
    //dateTime: String,
},
    {collection : 'data'});

mediaPostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('MediaPost', mediaPostSchema);