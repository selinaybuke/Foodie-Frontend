var app = angular.module('mealDetailsApp', [])

app.controller('mealDetailsController', ['$scope', function ($scope) {
    $scope.init = function () {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                const response = JSON.parse(this.response)
                $scope.mealDetail = response;
                console.log($scope.mealDetail)
                $scope.$apply();
            }
        });

        xhr.open("GET", "https://api.spoonacular.com/recipes/" + localStorage.getItem("spoonID") + "/information?includeNutrition=false&apiKey=c41e117a8ec343168d08c412fd210144");
        xhr.send();
    };
}]);