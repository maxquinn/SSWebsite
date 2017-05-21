var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var storeItems = require('../models/product.js');

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
    res.render('./shop');
});

router.get('/shop.json', function (req, res, next) {
    storeItems.find(function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(docs);
        }
    });
});

router.get('/shop/products/:productid', function (req, res) {
    storeItems.findOne({ _id: req.params.productid }, function (err, product) {
        if (err) {
            console.log(err);
        }
        else {
            if (product.hasVariation) {
                //populate the variations array
                storeItems.findOne({ _id: req.params.productid })
                .populate('variations')
                .exec(function (err, popProduct) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        //res.render('./productvariations', { item: product });
                        console.log(popProduct.variations[1]);
                    }
                });
            }
            else {
                res.render('./product', { item: product });
            }
        }
    });
});

module.exports = router;