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

        var currentARR = Object.values(current);

        console.log(allergen);



        var fridgeString = "";
        for (let i = 0; i < currentARR.length; i++) {
            if (currentARR[i].isSelected) {
                fridgeString += currentARR[i].name + ",";
            }

        }
        var x = "";
        for (let i = 0; i < allergen.length; i++) {
            x += allergen[i].name + ";";
        }
        // console.log(x);

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

                xhr.open("GET", "https://api.spoonacular.com/recipes/" + $scope.mealDetail.results[0].id + "/information?includeNutrition=false&apiKey=451e4340a6274c60ad61d133ef6798a0");
                xhr.send();

                console.log("halil")
                // console.log(fridgeString);
                $scope.$apply();
            }



        });
        console.log("https://api.spoonacular.com/recipes/complexSearch?apiKey=451e4340a6274c60ad61d133ef6798a0&diet=" + prefString + "&intolerances=" + prefGluten + "&includeIngredients=" + fridgeString + "&&ignorePantry=true&excludeIngredients=" + x)
        xhr.open("GET", "https://api.spoonacular.com/recipes/complexSearch?apiKey=451e4340a6274c60ad61d133ef6798a0&diet=" + prefString + "&intolerances=" + prefGluten + "&includeIngredients=" + fridgeString + "&&ignorePantry=true&excludeIngredients=" + x);

        xhr.send();
    }


    $scope.updataFridge = function () {
        var data = "";
        $scope.mealDetailD.extendedIngredients.forEach(element => {
            data = JSON.stringify([
                {
                    "name": element.name,
                    "spoonID": 2,
                    "fridgeID": localStorage.getItem("fridgeId"),
                    "amount": element.amount,
                    "possibleUnit": element.unit
                }
            ]);
            data += data;
        });

        console.log(data)

        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                const response = JSON.parse(this.response);
                if (response.statusCode == 200) {
                    window.location.href = "http://127.0.0.1:5501/FOODIE/HTML/fridgeDetail.html"
                } else {
                    alert(response.message);
                }
            }
        });

        xhr.open("POST", "http://localhost:8080/api/nosql/checkAndUpdateList");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }
}]);
