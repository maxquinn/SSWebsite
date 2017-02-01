var mongoose = require('mongoose');
Schema = mongoose.Schema;

var productSchema = new Schema({
    title: String,
    description: String,
    category: String,
    
    image: {
        data: Buffer,
        contentType: String
    },

    pricing: {
        price: Number,
        discountPercentage: {type: Number, default: 0}
    },

    variation: {
        sizes: {
            size: String,
            stock: Number
        },
        colors: {
            color: String,
            stock: Number
        }
    }
},
    {collection : 'products'});

module.exports = mongoose.model('products', productSchema);