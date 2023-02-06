var myApp = angular.module('myApp', ['ui.router']);


myApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/parent/home");

    $stateProvider
        .state("parent", {
            url: "/parent",
            abstract: true,
            templateUrl: "components/parentPage.html"
        })


        .state("parent.home", {
            url:"/home",
            templateUrl: "src/home.html"
        })

})