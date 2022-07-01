var app = angular.module('fridgeMealDetail', [])

app.controller('mealDetailsController', ['$scope', function ($scope) {
    $scope.fridgeName;
    $scope.preference;
    $scope.allergen;

    $scope.init = function () {
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
}]);

app.controller('DetailMealController', ['$scope', function ($scope) {
    $scope.getMeal = function () {
        var current = JSON.parse(localStorage.getItem("currentFridge"));
        var allergen = JSON.parse(localStorage.getItem("allergen"));
        // console.log(allergen);
        //console.log(current);
        var fridgeString = "";
        for (let i = 0; i < current.length; i++) {
            if (current[i].isSelected) {
                fridgeString += current[i].name + ",";
            }

        }
        var x = "";
        for (let i = 0; i < allergen.length; i++) {
            x += allergen[i].name + ";";
        }
        console.log(x);

        console.log(fridgeString);
        var prefGluten = "";
        var preferences = JSON.parse(localStorage.getItem("preference"));
        var prefString = "";
        if (preferences.glutenFree) {
            prefString += "glutenFree,"
        }
        if (preferences.vegetarian) {
            prefString += "vegetarian,"
        }
        if (preferences.vegan) {
            prefString += "vegan"
        }

        if (preferences.dairyFree) {
            prefGluten = "Dairy";
        }
        //  console.log(preferences);
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                const response = JSON.parse(this.response)
                $scope.mealDetail = response;
                console.log($scope.mealDetail)
                var xhr = new XMLHttpRequest();
                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                        //  console.log(this.responseText);
                        const response = JSON.parse(this.response)
                        $scope.mealDetailD = response;
                        console.log($scope.mealDetailD.instructions)
                        $scope.$apply();
                    }
                });

                xhr.open("GET", "https://api.spoonacular.com/recipes/" + $scope.mealDetail.results[0].id + "/information?includeNutrition=false&apiKey=c41e117a8ec343168d08c412fd210144");
                xhr.send();

                console.log("halil")
                $scope.$apply();
            }



        });
        xhr.open("GET", "https://api.spoonacular.com/recipes/complexSearch?apiKey=c41e117a8ec343168d08c412fd210144&iet=" + prefString + "&intolerances=" + prefGluten + "&includeIngredients=" + fridgeString + "&&ignorePantry=true&excludeIngredients=" + x);

        xhr.send();
    }

}]);
