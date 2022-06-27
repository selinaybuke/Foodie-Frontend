var app = angular.module('mealistApp', [])

app.controller('mealListController', ['$scope', function ($scope) {
    $scope.fridgeName;
    $scope.preference;
    $scope.allergen;

    $scope.init = function () {
        preferences();
        allergens();
        //  getMeal();
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                const response = JSON.parse(this.response)
                $scope.fridgeName = response;
                $scope.$apply();

            }
        });
        xhr.open("GET", "http://localhost:8080/api/fridge/getRelationByFridgeId?id=" + localStorage.getItem("fridgeId"));
        xhr.send();
    };

    var preferences = function () {
        console.log("halil")
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                const response = JSON.parse(this.response)
                $scope.preference = response;
                console.log($scope.preference)
            }
        });

        xhr.open("GET", "http://localhost:8080/api/preferences/getPreferenceById?id=" + localStorage.getItem("userId"));

        xhr.send();
    }

    var allergens = function () {

        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                const response = JSON.parse(this.response)
                $scope.allergen = response;
                console.log($scope.allergen)
            }
        });

        xhr.open("GET", "http://localhost:8080/api/allergen/getAllergenByUserId?id=" + localStorage.getItem("userId"));

        xhr.send();
    }
    $scope.getMeal = function () {
        var element = "";
        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                const response = JSON.parse(this.response)
                $scope.mealDetail = response;
                console.log($scope.mealDetail)
                console.log("halil")
                $scope.$apply();
            }
        });
        var x = JSON.parse(localStorage.getItem("currentFridge"))
        for (let index = 0; index < x.Ingredient.length; index++) {
            element = element + "+" + x.Ingredient[index].name;
        }
        console.log(element)
        //console.log(x.Ingredient.name);

        xhr.open("GET", "https://api.spoonacular.com/recipes/findByIngredients?number=5&apiKey=c41e117a8ec343168d08c412fd210144&ingredients=" + element);

        xhr.send();
    }
    // 3.bir mealDetailGerekebilir.
    $scope.getDetailRecipe=function (item) {
        localStorage.setItem("spoonID",item.id);
        window.location.href = 'http://127.0.0.1:5501/FOODIE/HTML/mealDetailsOnlist.html'
    }


}]);
