var myApp = angular.module('myApp');
myApp.controller('loginCtrl', ['$scope', '$state',  'ajax', 'R1Util',
    function ($scope,$state,ajax, R1Util) {

      


        $scope.login=function(){
            $state.go("parent.sub.home");
        }

    }])