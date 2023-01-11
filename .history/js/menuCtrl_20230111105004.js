var myApp = angular.module('myApp');


myApp.controller('menuCtrl', ['$scope', '$state', function ($scope, $state) {



    $scope.myarray = [
        {
            icon: "fa fa-home",
            name: 'Product Info',
            path: 'productmaster',
            params: { action: '', mode: true }
        },
         
        // {
        //   name: 'Admin',
        //   content: [
        //     { name: 'Profile' },
        //     { name: 'Settings' },
        //     { name: 'Permissions' },
        //   ]
        // },
        // {
        //   icon: 'fa fa-user', name: "Account Info", path: 'master/accountinfomaster'
        // },
        {
            icon: 'fa fa-building', name: "Firm", path: 'master/firmmaster'
        },
        {
            icon: 'fa fa-shopping-cart', name: "Sales Order", path: 'salesorderchild'
        }

    ]


    $scope.stateGo = function (path, params) {
        $state.go(path);
    }

}])
