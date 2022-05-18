angular.module('LoginApp', [])
    .controller('LoginController', ['$scope', function ($scope) {
        $scope.login = {
            name: '',
            password: ''
        };
        $scope.loginUser = function () {
            var name = $scope.login.name;
            var password = $scope.login.password;

            var data = JSON.stringify({
                "username": name,
                "password": password,
              });
              
              var xhr = new XMLHttpRequest();
              
              xhr.addEventListener("readystatechange", function() {
                if(this.readyState === 4) {
                  console.log(this.responseText);
                }
              });
              
              xhr.open("POST", "http://localhost:8080/api/auth/login");
              xhr.setRequestHeader("Content-Type", "application/json");
              
              xhr.send(data);
            console.log(name)
            console.log(password)


        };
    }]);