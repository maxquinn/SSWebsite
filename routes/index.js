var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var storeItem = require('../models/product.js');
var variationOfProduct = require('../models/variation.js');
var Cart = require('../models/cart.js');

router.get('/', function (req, res) {
    return res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

router.get('/kvka', function (req, res) {
    return res.sendFile(path.join(__dirname, '../views', 'kvka.html'));
});

router.get('/samgat', function (req, res) {
    return res.sendFile(path.join(__dirname, '../views', 'samgat.html'));
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
    res.render('./shop', { message: req.flash('cartinfo') });
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
                req.flash('cartinfo', 'Out of stock items removed from cart - please try again');
                res.redirect('/shop');
            }
            else {
                //proceed to payments page
            }
        });

    });

    // Return message: Out of stock items removed
    // req.session.cart = cart;
    //check stockMissMatch else proceed to checkout page
});

module.exports = router;