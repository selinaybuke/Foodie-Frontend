var app = angular.module('favouriteApp', [])

app.controller('favouriteController', ['$scope', function ($scope) {
    $scope.init = function () {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                const response = JSON.parse(this.response)
                $scope.favs = response;
                console.log($scope.favs)
                $scope.$apply();
            }
        });
        xhr.open("GET", "http://localhost:8080/api/fav/favList?id=" + localStorage.getItem("userId"));
        xhr.send();
    };

    $scope.removeItemFAV = function (item) {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                location.reload();
            }
        });

        xhr.open("DELETE", "http://localhost:8080/api/fav/delete?id=" + item.id);

        xhr.send();
    }

    $scope.getDetailRecipe=function (item) {
        localStorage.setItem("spoonID",item.spoonApiId);
        window.location.href = 'http://127.0.0.1:5501/FOODIE/HTML/mealDetails.html'
    }





}]);