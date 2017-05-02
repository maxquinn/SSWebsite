var mongoose = require('mongoose');
Schema = mongoose.Schema;

var productVariationSchema = new Schema({
    _creator: { type: Schema.ObjectId, ref: 'Products' },
    variatonColor: String,

    variationImage: String,

    stockLevels: [{
        size: String,
        stock: Number
    }]
},
    { collection: 'variations' });

module.exports = mongoose.model('Variations', productVariationSchema);