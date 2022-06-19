var app = angular.module('createFridge', [])

app.controller('createFridgeController', ['$scope', function ($scope) {
    $scope.fridgeName = ""
    $scope.saveFridge = function () {
        console.log($scope.fridgeName)

        var data = JSON.stringify({
            "name": $scope.fridgeName
        });

        var xhr = new XMLHttpRequest();


        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                const response = JSON.parse(this.response)
                localStorage.setItem("fridgeId", response.id)
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
                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                        window.location.href = 'http://127.0.0.1:5501/FOODIE/HTML/fridgeDetail.html';

                    }
                });
                xhr.open("POST", "http://localhost:8080/api/fridge/createRelation");
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(data);

            }
        });

        xhr.open("POST", "http://localhost:8080/api/fridge/create");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);





    }






}]);