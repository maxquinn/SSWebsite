var mongoose = require('mongoose');
Schema = mongoose.Schema;

var productSchema = new Schema({
    _id: Number,
    title: String,
    description: String,
    category: String,

    image: {
        data: Buffer,
        contentType: String
    },

    pricing: {
        price: Number,
        discountPercentage: { type: Number, default: 0 }
    },

    hasVariation: Boolean,
    stock: Number,
    variations: [{ type: Schema.Types.ObjectId, ref: 'Variation' }]
},
    { collection: 'products' });


var productVariationSchema = new Schema({
    _creator: { type: Number, ref: 'Products' },
    color: String,
    size: String,
    stock: Number
},
    { collection: 'variations' });

module.exports = mongoose.model('Products', productSchema);
module.exports = mongoose.model('Variation', productVariationSchema);