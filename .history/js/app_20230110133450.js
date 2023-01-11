var myApp = angular.module('myApp', ['ui.router']);


myApp.config(function ($stateProvider, $urlRouterProvider) {


    $urlRouterProvider.when("", "/home");

    $stateProvider
        .state("parent", {
            url: "/parent",
            templateUrl: "component/parentPage.html"
        })
        .state("parent.home", {
            url:"/Page1",
            templateUrl: "Page-1.html"
        })

})