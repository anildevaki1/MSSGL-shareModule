var myApp = angular.module('myApp');


myApp.controller('menuCtrl', ['$scope', '$state', function ($scope, $state) {



    $scope.myarray = [
        {
            icon: "fa fa-home",
            name: 'Product Info',
            path: 'productmaster',
            params: { action: '', mode: true }
        },
        {
            icon: 'fa fa-database',
            name: "Masters",
            content: [
                {
                    icon: 'fas fa-user', name: "Account", subContent: [
                        { icon: 'fa fa-user', name: "Account", path: 'master/accountinfomaster' },
                        { icon: 'fa fa-users', name: "Group", path: 'master/subgroup' },
                        { icon: 'fa fa-users', name: "Primary Group", path: 'master/groupmaster' },
                        { icon: 'fa fa-building', name: "Firm Type", path: 'master/firmtype' },
                    ]
                },
                {
                    icon: 'fas fa-map-marker', name: "Place", subContent: [
                        { icon: 'fas fa-area-chart', name: "District", path: 'master/district' },
                        { icon: 'fas fa-city', name: "Taluka", path: 'master/taluka' },
                        { icon: 'fas fa-map-marker', name: "Place", path: 'master/place' },
                    ]
                },
                {
                    icon: 'fa fa-product-hunt', name: "Product", subContent: [
                        { icon: 'fa fa-product-hunt', name: "Product Group", path: 'master/productgroup' },
                        { icon: 'fa fa-balance-scale', name: "Unit", path: 'master/unitmaster' },
                        { icon: 'fa fa-industry', name: "Manufacturer", path: 'master/menufacturer' },
                        { icon: 'fa fa-list', name: "Technical/Content", path: 'master/technicalcontent' }
                    ]
                },
                // { icon: 'fa-solid fa-person-rays', name: "Sales Officer", path: 'master/salesofficer' },
                // { icon: 'fas fa-route', name: "Route", path: 'master/root' },

                // {
                //   name: "xyz",
                //   subContent: [{
                //     name: 'abcd',
                //   },
                //   {
                //     name: 'mmm',
                //   },
                //   {
                //     name: 'asdjkdf'
                //   }
                //   ]
                // }

            ]
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
