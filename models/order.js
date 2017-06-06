var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    cart: {type: Object, required: true},
    address: {type: String, required: true},
    paymentId: {type: String, required: true},
    totalPaid: {type: Number, required: true}
},
    {collection : 'orders'});

module.exports = mongoose.model('Order', orderSchema);