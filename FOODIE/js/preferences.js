var app = angular.module('preferencesApp', ['ngRoute', 'ui.bootstrap']);
app.controller('checkPreferencesController', ['$scope', function ($scope) {
    $scope.preferences = {
        Dairy: false,
        Gluten: false,
        Vegan: false,
        Vegetarian: false,
        Healthy: false,

    };

    $scope.go = function () {
        console.log("HAlil")
        window.location.href = 'http://127.0.0.1:5501/FOODIE/HTML/myfridge.html';
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
    $scope.allergen = {
        id: null,
        name: "",
        spoonId: "",
        readonly: true
    };
    $scope.allergens = [];
    $scope.allergenChange = function () {

        var xhr = new XMLHttpRequest();


        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                const response = JSON.parse(this.response)
                $scope.allergens = response;
                console.log($scope.allergens);
                $scope.$apply();
            }
        });
        console.log($scope.allergen)
        xhr.open("GET", "https://api.spoonacular.com/food/ingredients/autocomplete?query=" + $scope.allergen.name + "&number=5&apiKey=c41e117a8ec343168d08c412fd210144");

        xhr.send();
    }

    $scope.selectTypeAhead = function ($item) {

        $scope.allergen.name = $item.name;
        console.log($scope.allergen.name);

    };

    /* $scope.allergenChange = function () {
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
 
         xhr.open("GET", "https://api.spoonacular.com/food/ingredients/autocomplete?query=" + $scope.allergen + "&number=5&apiKey=451e4340a6274c60ad61d133ef6798a0");
         //TODO API KEY?? UNUTMA
 
         xhr.send();
     };
     $scope.allergyList = [];
 
 
     $scope.allergy = function (item) {
         $scope.allergyList.push(item.name)
         console.log(item.name);
 
     };*/


    /*  $scope.saveAllergenList = function () {
          var data = ""
          for (var i = 0; i < $scope.allergyList.length; i++) {
              var temp = $scope.allergyList[i];
  
              data += JSON.stringify(
                  {
                      "name": temp,
                      "spoonId": 32,
                      "user": {
                          "id": localStorage.getItem("userId")
                      }
                  }
              );
              data += ","
  
          }
          data = data.slice(0, -1)
          data = "[" + data + "]";
          var xhr = new XMLHttpRequest();
  
          xhr.addEventListener("readystatechange", function () {
              if (this.readyState === 4) {
                  console.log(this.responseText);
              }
          });
  
          xhr.open("POST", "http://localhost:8080/api/allergen/save");
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.send(data)
  
          window.location.href = 'http://127.0.0.1:5501/FOODIE/HTML/myfridge.html';
  
      }*/
    $scope.saveAllergenList = function () {
        var data = JSON.stringify(
            {
                "name": $scope.allergen.name,
                "spoonId": 32,
                "user": {
                    "id": localStorage.getItem("userId")
                }
            }
        );
        data = "[" + data + "]";
        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                const response = JSON.parse(this.responseText)
               // alert(response[0].name+" Allergens add")
                
                window.location.href = 'http://127.0.0.1:5501/FOODIE/HTML/myfridge.html';
            }
        });

        xhr.open("POST", "http://localhost:8080/api/allergen/save");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data)
    }

}]);