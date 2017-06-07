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

    $scope.search = function (item) {
        return (angular.lowercase(item.description).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
                angular.lowercase(item.title).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
                angular.lowercase(item.category).indexOf(angular.lowercase($scope.query) || '') !== -1);
    };
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
            if (res.data === null) {
                $scope.cart_session_qty = 0;
                $scope.cart_session_price = 0;
            }
            else {
                $scope.cart_session_qty = res.data.totalQty;
                $scope.cart_session_price = res.data.totalPrice;
            }
        });
    };

    $scope.getShippingCost = function () {
        if ($scope.selectedCoutry == 'NZL') {
            $scope.shippingCost = 6.5;
        }
        else {
            $scope.shippingCost = 18;
        }

    };

    $scope.updateCart();
    $scope.updateCartStats();

    if ($('#payments-page')) {
        $scope.selectedCoutry = 'NZL';
        $scope.getShippingCost();
    }
}]);

angular.module('shopApp').controller('PaymentController', ['$scope', function ($scope) {
    
}]);