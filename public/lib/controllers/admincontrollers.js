// Services
angular.module('adminApp').factory('MediaPost', ['$http', function ($http) {
    var MediaPost = function () {
        this.items = [];
        this.busy = false;
        this.pageNum = 1;
        this.postsPerPage = 4;
        this.finished = false;
    };


    MediaPost.prototype.loadMore = function () {
        if (this.busy) return;
        this.busy = true;
        var config = {
            params: {
                pageToLoad: this.pageNum,
                perPage: this.postsPerPage
            }
        };

        $http.get('/media/posts', config).success(function (data) {
            var item = data.docs;
            if (this.pageNum * this.postsPerPage > this.items.length + this.postsPerPage) {
                this.finished = true;
            }
            for (var i = 0; i < item.length; i++) {
                this.items.push(item[i]);
            }
            this.pageNum++;
            if (!this.finished) {
                this.busy = false;
            }
        }.bind(this));
    };

    return MediaPost;
}]);

// controllers
angular.module('adminApp').controller('MediaController', ['$scope', '$sce', 'MediaPost', function ($scope, $sce, MediaPost) {
    $scope.mediaPostsArr = new MediaPost();
}]);