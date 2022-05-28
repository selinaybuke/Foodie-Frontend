var app = angular.module('preferencesApp', [])
app.controller('checkPreferencesController', ['$scope', function ($scope) {
    $scope.preferences = {
        Dairy: false,
        Gluten: false,
        Vegan: false,
        Vegetarian: false,
        Healthy: false,

    };

    $scope.savePreferences = function () {
        var data = JSON.stringify({
            "vegetarian": $scope.preferences.Vegetarian,
            "vegan": $scope.preferences.Vegan,
            "glutenFree": $scope.preferences.Gluten,
            "dairyFree": $scope.preferences.Dairy,
            "veryHealthy": $scope.preferences.Healthy,
            "appUser": {
                "id": localStorage.getItem("userId")
            }
        });
        var xhr = new XMLHttpRequest();



        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
            }
        });

        xhr.open("POST", "http://localhost:8080/api/preferences/create");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);

    };
    $scope.allergenChange = function () {
        var xhr = new XMLHttpRequest();
        //$scope.allergens.length = 0

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                const response = JSON.parse(this.response)
                console.log(response[2])

                $scope.allergens = response;
                $scope.$apply();
            }
        });

        xhr.open("GET", "https://api.spoonacular.com/food/ingredients/autocomplete?query=" + $scope.allergen + "&number=5&apiKey=c41e117a8ec343168d08c412fd210144");
        //TODO API KEYİ UNUTMA

        xhr.send();
    };
    $scope.allergyList = [];

 
    $scope.allergy = function (item) {
        $scope.allergyList.push(item.name)
        console.log($scope.allergyList)
        



    };
 
    /*
    $scope.saveAllergenList = function () { 
        var dataList = [];
        for (var i=0;i<$scope.allergyList.length;i++) {
            var data = JSON.stringify(
                {
                  "name": $scope.allergyList[i],
                  "spoonId": 32,
                  "user": {
                    "id": localStorage.getItem("userId")
                  }
                }
              );
              dataList.push(data)



        }
        

     
          
          var xhr = new XMLHttpRequest();
          
          xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
              console.log(this.responseText);
            }
          });
          
          xhr.open("POST", "http://localhost:8080/api/allergen/save");
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.send(data)

    }
    */

}]);