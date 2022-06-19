var app = angular.module('friendApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

app.controller('friendController', function ($scope) {
    $scope.friend = {
        id: null,
        username: "",
        readonly: true
    };
    $scope.friends = [];


    $scope.getFriends = function () {
        var xhr = new XMLHttpRequest();


        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                const response = JSON.parse(this.response)
                $scope.friends = response;
                $scope.$apply();
            }
        });

        xhr.open("GET", "http://localhost:8080/api/auth/contains?username=" + $scope.friend.username);

        xhr.send();
    }

    $scope.selectTypeAhead = function ($item) {

        $scope.friend.id = $item.id;
        console.log($scope.friend.id);

    };
    $scope.saveFriend = function () {
        // WARNING: For POST requests, body is set to null by browsers.
        var data = JSON.stringify({
            "appUser": {
                "id": $scope.friend.id
            },
            "fridge": {
                "id": localStorage.getItem("fridgeId")
            },
            "status": false
        });

        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                window.location.href = 'http://127.0.0.1:5501/FOODIE/HTML/fridgeDetail.html'
            }
        });

        xhr.open("POST", "http://localhost:8080/api/fridge/createRelation");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }
});
