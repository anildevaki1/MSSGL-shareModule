var myApp = angular.module('myApp');


myApp.controller('menuCtrl', ['$scope', '$state', function ($scope, $state) {



    $scope.myarray = [
        // {
        //     icon: "fa fa-home",
        //     name: 'Product Info',
        //     path: 'productmaster',
        //     params: { action: '', mode: true }
        // },

        // {
        //   name: 'Admin',
        //   content: [
        //     { name: 'Profile' },
        //     { name: 'Settings' },
        //     { name: 'Permissions' },
        //   ]
        // },



        {
            icon: 'bi bi-mastodon', name: "Master ", path: 'salesorderchild',


            content: [

                {
                    icon: "bi bi-cast",
                    name: 'वर्ग (जात )',
                    path: 'parent.sub.schedulddash',
                    params: { action: '', mode: true },

                },

                {
                    icon: "bi bi-house-fill",
                    name: 'गाव',
                    path: 'parent.sub.placedash',
                    params: { action: '', mode: true },

                },
                {
                    icon: "bi bi-people-fill",
                    name: 'गट',
                    path: 'parent.sub.areadash',
                    params: { action: '', mode: true },

                },
                {
                    icon: "bi bi-bank2",
                    name: 'बँक शाखा  ',
                    path: 'parent.sub.bankdash',
                    params: { action: '', mode: true },

                },
                {
                    icon: "bi bi-people-fill",
                    name: 'हुद्दा',
                    path: 'parent.sub.designationdash',
                    params: { action: '', mode: true },

                },
                {
                    icon: "bi bi-buildings",
                    name: 'व्यवसाय',
                    path: 'parent.sub.occupationdash',
                    params: { action: '', mode: true },

                },
                {
                    icon: "bi bi-share",
                    name: 'शेअरचे प्रकार',
                    path: 'parent.sub.sharetypedash',
                    params: { action: '', mode: true },

                },

                {
                    icon: "bi bi-houses",
                    name: 'पंचायत',
                    path: 'parent.sub.panchayatdash',
                    params: { action: '', mode: true },
                },

                {
                    icon: "bi bi-r-circle-fill",
                    name: 'धर्म(जात)',
                    path: 'parent.sub.religiondash',
                    params: { action: '', mode: true },
                },

                {
                    icon: "bi bi-person-circle",
                    name: 'अपूर्ण सभासद',
                    path: 'parent.sub.memberdash',
                    params: { action: '', mode: true },

                },
                {
                    icon: "bi bi-person-circle",
                    name: 'पूर्ण सभासद',
                    path: 'parent.sub.purnmemberdash',
                    params: { action: '', mode: true },

                },

                {
                    icon: "bi bi-building-fill",
                    name: 'कंपनी',
                    path: 'parent.sub.company',
                    params: { action: '', mode: true },

                },
                {
                    icon: "bi bi-receipt",
                    name: 'पावती',
                    path: 'parent.sub.receiptdash',
                    params: { action: '', mode: true },

                },
                {
                    icon: "bi bi-share-fill",
                    name: 'शेअर वाटप',
                    path: 'parent.sub.shareissuedash',
                    params: { action: '', mode: true },
                },

                {
                    icon: "bi bi-receipt",
                    name: 'पगार',
                    path: 'parent.sub.paymentdash',
                    params: { action: '', mode: true },
                },

            ]

        },

    ]
    $scope.stateGo = function (path, params) {
        $state.go(path);
    }

}])


