var app = angular.module('myFridge', [])

app.controller('currentFridgeController', ['$scope', function ($scope) {
    $scope.init = function () {

        var xhr = new XMLHttpRequest();


        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                const response = JSON.parse(this.response)
                $scope.fridges = response;
                console.log($scope.fridges)
                $scope.$apply();
            }
        });

        xhr.open("GET", "http://localhost:8080/api/fridge/getRelationByUserId?id=" + localStorage.getItem("userId"));

        xhr.send();
    };

    $scope.createFridge = function () {
        window.location.href = 'http://127.0.0.1:5501/FOODIE/HTML/createFridge.html';
    };
}]);

app.controller("acceptFridgeController", ["$scope", function ($scope) {
    $scope.init = function () {

        var xhr = new XMLHttpRequest();


        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                const response = JSON.parse(this.response)
                $scope.fridgeRequests = response;
                console.log($scope.fridgeRequests)
                $scope.$apply();
            }
        });

        xhr.open("GET", "http://localhost:8080/api/fridge/getRelationFridgeRequestByStatus?id=" + localStorage.getItem("userId"));

        xhr.send();
    };
}]);