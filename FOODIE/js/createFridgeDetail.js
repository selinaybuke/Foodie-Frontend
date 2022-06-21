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
                // console.log(this.responseText);
                const response = JSON.parse(this.response)
                $scope.ingredients = response;
                $scope.$apply();
            }
        });

        xhr.open("GET", "https://api.spoonacular.com/food/ingredients/autocomplete?query=" + $scope.ingredient.name + "&apiKey=c41e117a8ec343168d08c412fd210144");

        xhr.send();


    }
    $scope.selectTypeAhead = function ($item) {
        document.getElementById("kg/piece").innerHTML = "";
        $scope.ingredient.name = $item.name;
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                const response = JSON.parse(this.response)
                $scope.ingredientsDetail = response;
                console.log($scope.ingredientsDetail.results[0].id);
                $scope.$apply();

                var xhr = new XMLHttpRequest();

                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                        console.log(this.responseText);
                        const response = JSON.parse(this.response)
                        $scope.ingredientUnits = response;
                        console.log($scope.ingredientUnits.possibleUnits);
                        console.log($scope.ingredientUnits);
                        $scope.$apply();
                    }
                });

                xhr.open("GET", "https://api.spoonacular.com/food/ingredients/" + $scope.ingredientsDetail.results[0].id + "/information?apiKey=c41e117a8ec343168d08c412fd210144");

                xhr.send();
            }
        });

        xhr.open("GET", "https://api.spoonacular.com/food/ingredients/search?query=" + $scope.ingredient.name + "&apiKey=c41e117a8ec343168d08c412fd210144");
        xhr.send();

    };
    $scope.addIngredient = function () {
        $scope.tempIngredientList.push($scope.ingredient.name);
        document.getElementById("kg/piece").innerHTML = "";
        console.log($scope.tempIngredientList);
        $scope.$eval();
    }
});





