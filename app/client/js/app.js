const app = angular.module("myApp", []);
const baseUrl = "http://127.0.0.1:8000"

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
        $http.defaults.headers.common.Authorization = 'Token ' + token;
        console.log(token)
        $http.get(baseUrl + '/api/recipe/').then(function (res) {
            console.log(res)
            $scope.navs = res.data
        });

        $scope.getIngredients = function () {
            //TODO ingredients list ის წამოღება
            $http.get(baseUrl + '/api/recipe/ingredients/').then(function (res) {
                console.log(res)
            });
        }

        $scope.getRecipes = function () {
            //TODO tags list ის წამოღება
            $http.get(baseUrl + '/api/recipe/recipes/').then(function (res) {
                console.log(res)
            });
        }

        $scope.getTags = function () {
            //TODO recipes list ის წამოღება
            $http.get(baseUrl + '/api/recipe/tags/').then(function (res) {
                console.log(res)
            });
        }

        $scope.addIngredient = function () {
            //TODO ინგრედიენტის დამატება
            //ენდპოინტი არ მახსოვს მაგრამ
            let ingredientData = {
                "name": $scope.name
                //მოდელის რაც გადაეცემა ფორმიდან
                //ხო დამატების ღილაკზე ჯერ ფორმა უნდა გავაკეთოთ
                //ხვალ გავაკეთოთ

            }
            $http.post(baseUrl + 'endpont',)
        }
    }

})

