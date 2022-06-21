var app = angular.module('fridgeDetail', ['ngRoute', 'ui.bootstrap'])

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
app.controller('ingredientController', function ($scope) {
    $scope.tempIngredientList = [];
    $scope.ingredient = {
        name: "",
        readonly: true
    };
    $scope.getIngredient = function () {
        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                const response = JSON.parse(this.response)
                $scope.ingredients = response;
                $scope.$apply();
            }
        });

        xhr.open("GET", "https://api.spoonacular.com/food/ingredients/autocomplete?query=" + $scope.ingredient.name + "&apiKey=c41e117a8ec343168d08c412fd210144");

        xhr.send();
    }
    $scope.selectTypeAhead = function ($item) {

        $scope.ingredient.name = $item.name;

        console.log($scope.ingredient.name);
        console.log($scope.fridgeName);

    };


});

app.controller('addIngredientController', function ($scope) {
    
    $scope.addIngredient = function (item) {
        $scope.tempIngredientList.push($scope.ingredient.name);
       // $scope.$apply();
        console.log(tempIngredientList[0]);
    }
});
