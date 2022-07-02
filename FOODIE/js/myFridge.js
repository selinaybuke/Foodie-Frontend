var app = angular.module('myFridge', ['ngRoute', 'ui.bootstrap'])

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

    $scope.getFridge = function (item) {
        localStorage.setItem("fridgeId", item)
        window.location.href = 'http://127.0.0.1:5501/FOODIE/HTML/fridgeDetail.html'
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

    $scope.acceptFridge = function (item) {

        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                location.reload();
            }
        });

        xhr.open("PUT", "http://localhost:8080/api/fridge/acceptFridge?relationId=" + item);

        xhr.send();
    };

    $scope.deleteFridge = function (item) {

        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                location.reload();
            }
        });

        xhr.open("POST", "http://localhost:8080/api/fridge/declineFridge?relationId=" + item);

        xhr.send();
    }
}]);


app.controller('nav', ['$scope', function ($scope) {
    $scope.recipe = {
        id: null,
        name: "",
        spoonId: "",
        readonly: true
    };
    $scope.recipes = [];


    $scope.recipeSearch = function () {
    var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                const response = JSON.parse(this.response)
                $scope.recipes = response;
                console.log($scope.recipes)
                $scope.$apply();
            }
        });

        xhr.open("GET", "https://api.spoonacular.com/recipes/autocomplete?number=10&query="+$scope.recipe.name+"&apiKey=c41e117a8ec343168d08c412fd210144");

        xhr.send();
    }
    $scope.selectTypeAhead = function ($item) {

        $scope.recipe.id = $item.id;
       localStorage.setItem("spoonID",$scope.recipe.id);
       window.location.href="http://127.0.0.1:5501/FOODIE/HTML/mealDetails.html"

    };
}]);