var app = angular.module('fridgeDetail', [])

app.controller('fridgeInitController', ['$scope', function ($scope) {
    $scope.init = function () {

        var data = JSON.stringify({
            "appUser": {
              "id": localStorage.getItem("userId")
            },
            "fridge": {
              "id": localStorage.getItem("fridgeId")
            },
            "status": true
          });
          
          var xhr = new XMLHttpRequest();
         
          
          xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
            
            }
          });
          
          xhr.open("POST", "http://localhost:8080/api/fridge/createRelation");
          xhr.setRequestHeader("Content-Type", "application/json");
          
          xhr.send(data);

    };


       
}]);