var app = angular.module('mealDetailsApp', [])

app.controller('DetailMealController', ['$scope', function ($scope) {
    $scope.getMeal = function () {
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


    $scope.updataFridge = function () {
        var data = "";
        var x = [];
        $scope.mealDetail.extendedIngredients.forEach(element => {
            if(element.unit==""){
                return;
            }
            data += JSON.stringify(
                {
                    "name": element.name,
                    "spoonID": 2,
                    "fridgeID": localStorage.getItem("fridgeId"),
                    "amount": element.amount,
                    "possibleUnit": element.unit
                }

            )
            data += ",";
        });
        data = data.slice(0, -1)
        data = "[" + data + "]";
        console.log($scope.mealDetail.extendedIngredients)
        console.log(data)

        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                const response = JSON.parse(this.response);

                if (response.message == "Dolaptan malzemeler azaldı.") {
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
app.controller('mealDetailsController', ['$scope', function ($scope) {
    $scope.fridgeName;
    $scope.init = function () {
        // preferences();
        // allergens();
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

}]);