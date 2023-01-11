var myApp = angular.module('myApp', ['ui.router']);


myApp.config(function ($stateProvider, $urlRouterProvider) {


    $urlRouterProvider.when("", "/home");

    $stateProvider
        .state("parent", {
            url: "/parent",
            templateUrl: "component/parent.html"
        })
        .state("PageTab.Page1", {
            url:"/Page1",
            templateUrl: "Page-1.html"
        })

})