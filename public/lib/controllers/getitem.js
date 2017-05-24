var itemApp = angular.module('itemApp', ['ngSanitize'], function ($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false,
        rewriteLinks: false
    });
});

itemApp.filter('newlineToP', function () {
    return function(text){
        text = String(text).trim();
        return (text.length > 0 ? '<p>' + text.replace(/[\r\n]+/g, '</p><p>') + '</p>' : null);
    }
});

angular.module('itemApp').controller('ItemController', ['$http', '$scope', '$location', function ($http, $scope, $location) {
    $http.get($location.path()+'/getjson').then(function(res) {
        //set scope object to retrived data
        $scope.item = res.data;

        //set initital selected variation
        $scope.selectedVariation = $scope.item.variations[0];

        //remove sizes without stock
        $scope.item.variations.forEach(function(element) {
            var newSizeList = [];
            element.stockLevels.forEach(function(sizes) {
                if (sizes.stock !== 0) {
                    newSizeList.push(sizes);
                }
            });
            element.stockLevels = newSizeList;
        });
    });
}]);
