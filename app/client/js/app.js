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
            $window.location.href = "http://" + $window.location.host + "/recipe-app-api/app/client/view/recipes.html";
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
        $scope.showInput = false;
        $scope.showRecipeInput = false;
        $scope.showTag = false;
        $scope.isIngredient = true;
        $scope.isTags = false;
        $scope.isRecipes = false;

        $http.get(baseUrl + '/api/recipe/ingredients/').then(function (res) {
            $scope.ingredients = res.data
        });
        $http.get(baseUrl + '/api/recipe/tags/').then(function (res) {
            $scope.tags = res.data;
        });

        $scope.getIngredients = function () {
            //TODO ingredients list ის წამოღება

            $scope.isIngredient = true;
            $scope.isTags = false;
            $scope.isRecipes = false;
            $http.get(baseUrl + '/api/recipe/ingredients/').then(function (res) {
                $scope.ingredients = res.data
                console.log($scope.ingredients)
            });
        }


        $scope.getRecipes = function () {
            $scope.isIngredient = false;
            $scope.isTags = false;
            $scope.isRecipes = true;
            $http.get(baseUrl + '/api/recipe/recipes/').then(function (res) {
                $scope.recipes = res.data
                console.log(res)
            });
        }

        $scope.getTagList = function () {
            //TODO tags list ის წამოღება
            $scope.isIngredient = false;
            $scope.isTags = true;
            $scope.isRecipes = false;
            $http.get(baseUrl + '/api/recipe/tags/').then(function (res) {
                $scope.tags = res.data;
            });
        }
        $scope.addIngredient = function () {
            $scope.showInput = !$scope.showInput;
            //TODO ინგრედიენტის დამატება
            //ენდპოინტი არ მახსოვს მაგრამ
            $http.post(baseUrl + '/api/recipe/ingredients/', {"name": $scope.ingredientName}).then(function (res) {
                console.log(res)
                $scope.ingredientName = null
                $scope.getIngredients()
            }).catch(function (res) {
                console.log(res)
            })
        }

        $scope.addRecipe = function () {
            $scope.showRecipeInput = !$scope.showRecipeInput;
            //TODO რეცეპტის დამატება
            //ენდპოინტი არ მახსოვს მაგრამ

            let ingr = []
            let t = []
            ingr.push($scope.ingRec.id)
            t.push($scope.tagRecipe.id)
            $http.post(baseUrl + '/api/recipe/recipes/', {
                "title": $scope.title,
                "ingredients": ingr,
                "tags": t,
                "time_minutes": $scope.time,
                "price": $scope.price.toString(),
                "link": $scope.link
            }).then(function (res) {
                console.log(res)
                $scope.recipeName = null
                $scope.getRecipes()
                // $scope.getRecipes()
            }).catch(function (res) {
                console.log(res)
            })
        }

        $scope.addTag = function () {
            $scope.showTag = !$scope.showTag;
            //TODO რეცეპტის დამატება
            //ენდპოინტი არ მახსოვს მაგრამ
            $http.post(baseUrl + '/api/recipe/tags/', {"name": $scope.tagName}).then(function (res) {
                console.log(res)
                $scope.recipeName = null
                $scope.getTagList()
            }).catch(function (res) {
                console.log(res)
            })
        }
    }

})

