const app = angular.module("myApp", []);
const baseUrl = "http://127.0.0.1:8000"
let globalToken = ''
//რეგისტრაცია
app.controller("register", function ($scope, $http) {
    $scope.registerUser = function () {
        console.log('ძალიან')
        console.log(baseUrl)
        $scope.isError = false
        let sendData = {
            "email": $scope.email,
            "password": $scope.password,
            "name": $scope.name
        }
        $http.post(baseUrl + "/api/user/create/", sendData).then(function (res) {
            console.log(res)
            alert("მომხმარებელი წარმატებით დარეგისტრირდა")
            // $scope.user = res.data
        }).catch(function (res) {
            console.log("test");
            $scope.isError = true;
        })
    }

})


//ავტორიზაცია
app.controller("login", function ($scope, $http, $window) {

    $scope.getToken = function () {

        $scope.isError = false
        let sendData = {
            "email": $scope.email,
            "password": $scope.password
        }
        $http.post(baseUrl + "/api/user/token/", sendData).then(function (res) {
            console.log(res)
            console.log($window)
            $window.localStorage.setItem('token', res.data.token);
        }).catch(function (res) {
            console.log(res)
        })
    }

})

//main
app.controller("main", function ($scope, $http, $window) {
    //TODO რეცეპტების გვერდი,ჰედერი სამი მენიუს აითემით, tags,ingredients,recipes
    const token = $window.localStorage.getItem('token');
    if (token === undefined || token === null || token === "") {
        $window.location.href = "http://" + $window.location.host + "/recipe-app-api/app/client/view/index.html";
    } else {

        $http.get(baseUrl + '/api/recipe/').then(function (res) {
            console.log(res)
        });
    }

})

