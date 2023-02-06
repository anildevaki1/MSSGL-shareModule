var myApp = angular.module('myApp', ['ui.router']);


myApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/parent/sub/home");

    $stateProvider
        .state("parent", {
            url: "/parent",
            abstract: true,
            templateUrl: "components/parentPage.html"
        })

        
        .state("parent.sub", {
            url: "/sub",
            template: '<ui-view></ui-view>',
        })

        .state("parent.sub.home", {
            url:"/home",
            templateUrl: "src/home.html"
        })

})