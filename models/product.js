var mongoose = require('mongoose');
Schema = mongoose.Schema;

var productSchema = new Schema({
    title: String,
    category: String,
    description: String,
    secretID: String,

    pricing: {
        price: Number,
        discountPercentage: { type: Number, default: 0 }
    },

    hasVariation: Boolean,

    stock: Number,
    image: String,

    variations: [{ type: Schema.Types.ObjectId, ref: 'Variations' }]
},
    { collection: 'products' });

module.exports = mongoose.model('Products', productSchema);