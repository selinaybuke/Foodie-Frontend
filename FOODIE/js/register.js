angular.module('RegisterApp', [])
    .controller('RegisterController', ['$scope', function ($scope) {
        $scope.register = {
            name: '',
            email: '',
            password: ''
        };
        $scope.saveUser = function () {
            var name = $scope.register.name;
            var email = $scope.register.email;
            var password = $scope.register.password;

            var data = JSON.stringify({
                "username": name,
                "password": password,
                "email": email
              });
              
              var xhr = new XMLHttpRequest();
              
              xhr.addEventListener("readystatechange", function() {
                if(this.readyState === 4) {
                  console.log(this.responseText);
                  const response =JSON.parse(this.responseText)
                  alert(response.message)
                }
              });
              
              xhr.open("POST", "http://localhost:8080/api/auth/register");
              xhr.setRequestHeader("Content-Type", "application/json");
              
              xhr.send(data);
            console.log(name)
            console.log(email)
            console.log(password)


        };
    }]);






