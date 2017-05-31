var shopApp = angular.module('shopApp', ['ngSanitize'], function ($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false,
        rewriteLinks: false
    });
});

shopApp.filter('newlineToP', function () {
    return function (text) {
        text = String(text).trim();
        return (text.length > 0 ? '<p>' + text.replace(/[\r\n]+/g, '</p><p>') + '</p>' : null);
    };
});

angular.module('shopApp').controller('ProductsController', ['$http', '$scope', function ($http, $scope) {
    $http.get('./shop.json').then(function (res) {
        $scope.productsArr = res.data;
    });
}]);

angular.module('shopApp').controller('ItemController', ['$http', '$scope', '$location', function ($http, $scope, $location) {
    $http.get($location.path() + '/getjson').then(function (res) {
        //set scope object to retrived data
        $scope.item = res.data;

        //set initital selected variation
        $scope.selectedVariation = $scope.item.variations[0];

        //remove sizes without stock
        $scope.item.variations.forEach(function (element) {
            var newSizeList = [];
            element.stockLevels.forEach(function (sizes) {
                if (sizes.stock !== 0) {
                    newSizeList.push(sizes);
                }
            });
            element.stockLevels = newSizeList;
        });

        //set initital selected size
        if ($scope.selectedVariation !== undefined) {
            $scope.selectedSize = $scope.selectedVariation.stockLevels[0];
        }
    });
}]);

angular.module('shopApp').controller('CartController', ['$http', '$scope', function ($http, $scope) {
    $scope.updateCart = function () {
        $http.get('/updatecart.json').then(function (res) {
            $scope.cart_items = res.data;
            $scope.updateCartStats();
        });
    };

    $scope.removeItemFromCart = function (id) {
        $http.get('/minus-cart-item-qty.json/' + id).then(function (res) {
            $scope.cart_items = res.data;
            $scope.updateCartStats();
        });
    };

    $scope.updateCartStats = function () {
        $http.get('/session-cart-to-scope').then(function (res) {
            $scope.cart_session_qty = res.data.totalQty;
            $scope.cart_session_price = res.data.totalPrice;
        });
    };

    $scope.updateCart();
    $scope.updateCartStats();
}]);