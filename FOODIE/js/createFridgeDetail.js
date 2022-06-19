var app = angular.module('fridgeDetail', [])

app.controller('fridgeInitController', ['$scope', function ($scope) {
    $scope.init = function () {

        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                const response = JSON.parse(this.response)
                $scope.fridgeName = response;
               // console.log($scope.fridgeName[0].fridge.name)
                $scope.$apply();
                
            }
        });
        xhr.open("GET", "http://localhost:8080/api/fridge/getRelationByFridgeId?id=" + localStorage.getItem("fridgeId"));
        xhr.send();
    };





}]);