var express = require('express');
var router = express.Router();
var mediaPost = require('../models/media.js');
var baseProduct = require('../models/product.js');
var productVariation = require('../models/variation.js');

router.get('/', verifyAuth, function (req, res) {
    res.render('../views/admin.pug');
});

function verifyAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
}

router.post('/submitpost', function (req, res) {
    var post = new mediaPost();
    post.title = req.body.title;
    post.video = req.body.video;
    post.vidDesc = req.body.vidDesc;

    post.save(function (err) {
        if (err)
            res.send(err);
        res.json({ message: 'Post Created' });
    });
});

router.post('/submitproduct', function (req, res) {
    if (req.body.prodHasVariations) {
        var newBaseProduct = new baseProduct({
            title: req.body.prodTitle,
            category: req.body.prodCategory,
            description: req.body.prodDescription,
            pricing: {
                price: req.body.prodPricing.basePrice,
                discountPercentage: req.body.prodPricing.discountPercentage
            },
            hasVariation: true,
        });
        if (req.body.secretID) {
            newBaseProduct.secretID = req.body.secretID;
        }
        newBaseProduct.save(function (err) {
            if (err)
                res.send(err);
            res.json({ message: 'Base item created' });
        });

        //create placeholder array of variations and push to DB 
        var variationsPlaceholder = [];
        for (var i = 0; i < req.body.variations.length; i++) {
            var newProductVariation = new productVariation({
                _creator: newBaseProduct._id,
                variatonColor: req.body.variations[i].color,
                variationImage: req.body.variations[i].filename,
            });
            for (var j = 0; j < req.body.variations[i].subVariationsObj.length; j++) {
                newProductVariation.stockLevels.push({ size: req.body.variations[i].subVariationsObj[j].varSize, stock: req.body.variations[i].subVariationsObj[j].varStockLevel });
            }
            variationsPlaceholder.push(newProductVariation);
        }
        productVariation.create(variationsPlaceholder, function (err) {
            if (err)
                console.log(err);
            res.json({ message: 'Variations added' });
        });
    }
    else if (req.body.prodHasVariations === false) {
        var newProduct = new baseProduct({
            title: req.body.prodTitle,
            category: req.body.prodCategory,
            description: req.body.prodDescription,
            pricing: {
                price: req.body.prodPricing.basePrice,
                discountPercentage: req.body.prodPricing.discountPercentage
            },
            hasVariation: false,
            stock: req.body.stock,
            image: req.body.filename
        });
        newProduct.variations = undefined;
        if (req.body.secretID) {
            newProduct.secretID = req.body.secretID;
        }
        newProduct.save(function (err) {
            if (err)
                res.send(err);
            res.json({ message: 'Standalone product created' });
        });
    }

});

router.delete('/delete/:id', function (req, res) {
    mediaPost.remove({
        _id: req.params.id
    }, function (err, post) {
        if (err) res.send(err);
        res.json({ message: 'Successfully deleted' });
    });
});

module.exports = router;