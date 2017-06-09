var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var storeItem = require('../models/product.js');
var variationOfProduct = require('../models/variation.js');
var Cart = require('../models/cart.js');
var Order = require('../models/order.js');

router.get('/', function (req, res) {
    return res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

router.get('/KVKA', function (req, res) {
    return res.sendFile(path.join(__dirname, '../views', 'kvka.html'));
});

router.get('/DENZ1', function (req, res) {
    return res.sendFile(path.join(__dirname, '../views', 'denz1.html'));
});

router.get('/Samuel-Gatara', function (req, res) {
    return res.sendFile(path.join(__dirname, '../views', 'samuelgatara.html'));
});

router.get('/David-Argue', function (req, res) {
    return res.sendFile(path.join(__dirname, '../views', 'davidargue.html'));
});

router.get('/Contact', function (req, res) {
    return res.sendFile(path.join(__dirname, '../views', 'contact.html'));
});

router.get('/login', function (req, res) {
    res.render('./login', { message: req.flash('error') });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login',
    failureFlash: '*Invalid username or password.'
}));

router.get('/register', function (req, res) {
    res.render('./register', {});
});

router.post('/register', function (req, res) {
    Account.register(new Account({ username: req.body.username }), req.body.password, function (err, account) {
        if (err) {
            return res.render('./register', { account: account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/shop', function (req, res) {
    res.render('./shop', { message: req.flash('cartinfo')[0] });
});

router.get('/shop.json', function (req, res, next) {
    storeItem.find(function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(docs);
        }
    });
});

router.get('/shop/products/:productid', function (req, res) {
    storeItem.findOne({ _id: req.params.productid }, function (err, product) {
        if (err) {
            console.log(err);
        }
        else {
            if (product.hasVariation) {
                res.render('./productvariations');
            }
            else {
                res.render('./product');
            }
        }
    });
});

router.get('/shop/products/:productid/getjson', function (req, res) {
    storeItem.findOne({ _id: req.params.productid }, function (err, product) {
        if (err) {
            console.log(err);
        }
        else {
            if (product.hasVariation) {
                //populate the variations array
                storeItem.findOne({ _id: req.params.productid })
                    .populate('variations')
                    .exec(function (err, populatedProduct) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.json(populatedProduct);
                        }
                    });
            }
            else {
                res.json(product);
            }
        }
    });
});

router.get('/addtocart/:id', function (req, res) {
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    var productId = req.params.id;

    storeItem.findById(productId, function (err, product) {
        if (err) {
            return console.log(err);
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        req.flash('cartinfo', 'Cart Updated');
        res.redirect('/shop');
    });
});

router.get('/addvariationtocart/:id/:variationId/:sizeId', function (req, res) {
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    var parentItem;

    function findSizeObject(obj) {
        return obj._id == req.params.sizeId;
    }

    //find variation
    variationOfProduct.findById(req.params.variationId, function (err, returnedVaritaion) {
        if (err) {
            console.log(err);
        }
        var variationItem = [];
        variationItem.push(returnedVaritaion);

        //change variation stockLevels field to selected size
        variationItem[0].stockLevels = variationItem[0].stockLevels.find(findSizeObject);

        //find base item and assign variation
        storeItem.findById(req.params.id, function (err, product) {
            if (err) {
                console.log(err);
            }
            parentItem = product;
            parentItem.variations = variationItem;

            cart.add(parentItem, parentItem.id + "-" + parentItem.variations[0].id + "-" + parentItem.variations[0].stockLevels[0].id);
            req.session.cart = cart;
            req.flash('cartinfo', 'Cart Updated');
            res.redirect('/shop');
        });
    });
});

router.get('/updatecart.json', function (req, res) {
    if (!req.session.cart) {
        return res.json(null);
    }
    var cart = new Cart(req.session.cart);
    res.json(cart.generateArray());
});

router.get('/minus-cart-item-qty.json/:id', function (req, res) {
    if (!req.session.cart) {
        return res.json(null);
    }
    var cart = new Cart(req.session.cart);
    var cartItemId = req.params.id;
    cart.remove(cartItemId);
    req.session.cart = cart;
    res.json(cart.generateArray());
});

router.get('/session-cart-to-scope', function (req, res) {
    if (!req.session.cart) {
        return res.json(null);
    }
    res.json(req.session.cart);
});

router.get('/shop/checkout', function (req, res) {
    if (!req.session.cart || req.session.cart.totalQty === 0) {
        req.flash('cartinfo', 'Please add some items to the cart before checkout');
        return res.redirect('/shop');
    }
    res.render('./checkout', { message: req.flash('error') });
});

router.get('/shop/checkout/stockcheck', function (req, res) {
    if (!req.session.cart || req.session.cart.totalQty === 0) {
        req.flash('cartinfo', 'Please add some items to the cart before checkout');
        res.redirect('/shop');
    }
    var cart = new Cart(req.session.cart);
    var cartItemArray = cart.generateArray();
    var stockMissMatch = false;
    var variationCartItemIds = [];
    var baseCartItemIds = [];

    //check stock
    for (var i = 0; i < cartItemArray.length; i++) {
        // cartItemIds.push(cartItemArray[i].item._id);
        if (cartItemArray[i].item.hasVariation) {
            variationCartItemIds.push(cartItemArray[i].item.variations[0]._id);
        }
        else {
            baseCartItemIds.push(cartItemArray[i].item._id);
        }

    }
    //check standalones for stock discrepancies
    storeItem.find({
        '_id': {
            $in: baseCartItemIds
        }
    }, function (err, matchingBaseItems) {
        for (var i = 0; i < cartItemArray.length; i++) {
            if (!cartItemArray[i].item.hasVariation) {
                for (var j = 0; j < matchingBaseItems.length; j++) {
                    if (cartItemArray[i].item._id == matchingBaseItems[j]._id) {
                        //if missmatch: remove items that arent in stock 
                        if (matchingBaseItems[j].stock < cartItemArray[i].qty) {
                            var reduceItemBy = cartItemArray[i].qty - matchingBaseItems[j].stock;
                            cart.remove(cartItemArray[i].uniqueid, reduceItemBy);
                            stockMissMatch = true;
                        }
                        else {
                            //remove stock from item to be saved if there is no mismatches
                            matchingBaseItems[j].stock -= cartItemArray[i].qty;
                        }
                        break;
                    }
                }
            }
        }
        //check variations for stock discrepancies
        variationOfProduct.find({
            '_id': {
                $in: variationCartItemIds
            }
        }, function (err, matchingVariationItems) {
            for (var i = 0; i < cartItemArray.length; i++) {
                if (cartItemArray[i].item.hasVariation) {
                    var variationItemIds = cartItemArray[i].uniqueid.split("-");
                    // variationItemIds index 0 = base, 1 = variation, 2 = size 
                    for (var j = 0; j < matchingVariationItems.length; j++) {
                        if (variationItemIds[1] == matchingVariationItems[j]._id) {
                            for (var k = 0; k < matchingVariationItems[j].stockLevels.length; k++) {
                                if (variationItemIds[2] == matchingVariationItems[j].stockLevels[k]._id) {
                                    //if missmatch: remove items that arent in stock 
                                    if (matchingVariationItems[j].stockLevels[k].stock < cartItemArray[i].qty) {
                                        var reduceItemBy = cartItemArray[i].qty - matchingVariationItems[j].stockLevels[k].stock;
                                        cart.remove(cartItemArray[i].uniqueid, reduceItemBy);
                                        stockMissMatch = true;
                                    }
                                    else {
                                        //remove stock from item to be saved if there is no mismatches
                                        matchingVariationItems[j].stockLevels[k].stock -= cartItemArray[i].qty;
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
            }

            if (stockMissMatch) {
                // assign session updated cart & redirect back to shop
                req.session.cart = cart;
                res.sendStatus(205);
            }
            else {
                //save updated db items 
                storeItem.create(matchingBaseItems).then(function () {
                    variationOfProduct.create(matchingVariationItems).then(function () {
                        //safe to charge
                        req.session.stockTaken = true;
                        res.sendStatus(202);
                    });
                });
            }
        });

    });
});

router.get('/shop/checkout/stocktaken', function (req, res) {
    res.send(req.session.stockTaken);
});

router.post('/shop/checkout', function (req, res) {
    if (!req.session.cart || req.session.cart.totalQty === 0) {
        req.flash('cartinfo', 'Please add some items to the cart before checkout');
        res.redirect('/shop');
    }
    var cart = new Cart(req.session.cart);
    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here: https://dashboard.stripe.com/account/apikeys
    var stripe = require("stripe")("sk_test_FF15LDRffzdXem3srpqXMy9Z");

    // Token is created using Stripe.js or Checkout!
    // Get the payment token submitted by the form:
    var token = req.body.stripeToken; // Using Express

    //calculate shipping cost
    var shippingCost = 6.5;
    if (req.body.address_country != 'NZL') {
        shippingCost = 18;
    }
    //get shipping details
    var shippingAddress = req.body.address_line1;
    if (req.body.address_line2 !== '') {
        shippingAddress += (', ' + req.body.address_line2);
    }
    shippingAddress += (', ' + req.body.address_city + ', ' + req.body.address_zip + ', ' + req.body.address_country);
    //get charge description for receipt
    var chargeDescription = '';
    var cartItems = cart.generateArray();
    cartItems.forEach(function (element, index, array) {
        if (index === array.length - 1) {
            chargeDescription += (element.item.title + ' x' + element.qty + '.');
        }
        else {
            chargeDescription += (element.item.title + ' x' + element.qty + ', ');
        }
    });

    // Charge the user's card:
    var charge = stripe.charges.create({
        amount: (cart.totalPrice + shippingCost) * 100,
        currency: "nzd",
        description: chargeDescription,
        receipt_email: req.body.cardholder_email,
        source: token,
    }, function (err, charge) {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/shop/checkout');
        }
        var order = new Order({
            name: req.body.cardholder_name,
            email: req.body.cardholder_email,
            cart: cart,
            address: shippingAddress,
            paymentId: charge.id,
            totalPaid: (charge.amount / 100)
        });
        order.save(function (err, result) {
            req.flash('cartinfo', 'Order completed successfully');
            req.session.cart = null;
            req.session.stockTaken = false;
            res.redirect('/shop');
        });
    });
});

module.exports = router;