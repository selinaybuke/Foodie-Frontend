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
        possibleUnit: "",
        amount: "",
        fridgeId: localStorage.getItem("fridgeId"),
        spoonID: "",
        check: false

    };
    $scope.getIngredient = function () {
        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                // console.log(this.responseText);
                const response = JSON.parse(this.response)
                $scope.ingredients = response;
                // $scope.$apply();
            }
        });

        xhr.open("GET", "https://api.spoonacular.com/food/ingredients/autocomplete?query=" + $scope.ingredient.name + "&apiKey=c41e117a8ec343168d08c412fd210144");

        xhr.send();


    }
    $scope.selectTypeAhead = function ($item) {
        $scope.ingredient.name = $item.name;
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                const response = JSON.parse(this.response)
                $scope.ingredientsDetail = response;

                var xhr = new XMLHttpRequest();

                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                        // console.log(this.responseText);
                        const response = JSON.parse(this.response)
                        $scope.ingredientUnits = response;

                        $scope.$apply();
                        console.log($scope.tempIngredientList);

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
        $scope.tempIngredientList.push($scope.ingredient);
        console.log($scope.tempIngredientList);
    }


    $scope.saveIngredientNosql = function () {
        var data = JSON.stringify([
            {
                "name": $scope.ingredient.name,
                "spoonID": "",
                "fridgeID": $scope.ingredient.fridgeId,
                "amount": $scope.ingredient.amount,
                "possibleUnit": $scope.ingredient.possibleUnit
            }
        ]);
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
            }
        });

        xhr.open("POST", "http://localhost:8080/api/nosql/addList");
        xhr.setRequestHeader("Content-Type", "application/json");
        console.log($scope.ingredient);
        xhr.send(data);

    }
});




//----------------------
app.controller('fridgeInitNosqlController', ['$scope', function ($scope) {
    $scope.init = function () {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log("halil")
                const response = JSON.parse(this.response)
                $scope.FridgeCurrent = response;
                $scope.$apply();
                console.log($scope.FridgeCurrent.Ingredient[0].name);
            }
        });

        xhr.open("GET", "http://localhost:8080/api/nosql/getList?username=" + localStorage.getItem("fridgeId"));

        xhr.send();
    };
    $scope.LuckyMeal = function () {
        //console.log($scope.x)
        localStorage.setItem("currentFridge", JSON.stringify($scope.FridgeCurrent.Ingredient))
        preferences();
        allergens();
        window.location.href = 'http://127.0.0.1:5501/FOODIE/HTML/fridgeMealDetails.html';
    }

    $scope.MealList = function () {
        localStorage.setItem("currentFridge", JSON.stringify($scope.FridgeCurrent.Ingredient))
        preferences();
        allergens();
        window.location.href = 'http://127.0.0.1:5501/FOODIE/HTML/mealist.html';
    }

    var preferences = function () {
        console.log("halil")
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                const response = JSON.parse(this.response)
                $scope.preference = response;
                localStorage.setItem("preference", JSON.stringify($scope.preference))
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
                localStorage.setItem("allergen", JSON.stringify($scope.allergen))

            }
        });

        xhr.open("GET", "http://localhost:8080/api/allergen/getAllergenByUserId?id=" + localStorage.getItem("userId"));

        xhr.send();

    }
}]);








