var app = angular.module('mealistApp', [])

app.controller('mealListController', ['$scope', function ($scope) {
    $scope.fridgeName;
    $scope.preference;
    $scope.allergen;

    $scope.init = function () {
        getMeal();
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





    var getMeal = function () {
        var current = JSON.parse(localStorage.getItem("currentFridge"));
        var allergen = JSON.parse(localStorage.getItem("allergen"));
        var fridgeString = "";
        for (let i = 0; i < current.length; i++) {
            if (current[i].isSelected) {
                fridgeString += current[i].name + ",";
            }

        }
        console.log(allergen);
        var x = "";

        for (let i = 0; i < allergen.length; i++) {
            x += allergen[i].name + ";";
        }
        console.log(x);
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
        console.log(preferences);
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
        xhr.open("GET", "https://api.spoonacular.com/recipes/complexSearch?apiKey=c41e117a8ec343168d08c412fd210144&iet=" + prefString + "&intolerances=" + prefGluten + "&includeIngredients=" + fridgeString + "&&ignorePantry=true&excludeIngredients=" + x);

        xhr.send();

        /*xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                const response = JSON.parse(this.response)
                $scope.mealDetail = response;
                console.log($scope.mealDetail)
                console.log("halil")
                $scope.$apply();
            }
        });
        var x = JSON.parse(localStorage.getItem("currentFridge"))
        for (let index = 0; index < x.length; index++) {
            element = element + "+" + x[index].name;
        }
        console.log(element)
        //console.log(x.Ingredient.name);

        xhr.open("GET", "https://api.spoonacular.com/recipes/findByIngredients?number=5&apiKey=c41e117a8ec343168d08c412fd210144&ingredients=" + element);

        xhr.send();*/
    }
    // 3.bir mealDetailGerekebilir.
    $scope.getDetailRecipe = function (item) {
        localStorage.setItem("spoonID", item.id);
        window.location.href = 'http://127.0.0.1:5501/FOODIE/HTML/mealDetailsOnlist.html'
    }


}]);

async function test() {
    console.log('start timer');
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('after 1 second');
}


