var myApp = angular.module('myApp', ['ui.router']);


myApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/parent");

    $stateProvider
        .state("parent", {
            url: "/parent",
            templateUrl: "component/parentPage.html"
        })
        .state("parent.home", {
            url:"/home",
            templateUrl: "src/home.html"
        })

})