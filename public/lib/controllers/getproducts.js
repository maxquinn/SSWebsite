var storeApp = angular.module('shopApp', []);

angular.module('shopApp').controller('ProductsController', ['$http', '$scope', function($http, $scope) {
    $http.get('./shop.json').then(function(res) {
        $scope.productsArr = res.data;
    });
}]);