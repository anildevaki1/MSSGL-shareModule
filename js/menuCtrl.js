var myApp = angular.module('myApp');


myApp.controller('menuCtrl', ['$scope', '$state', 'cache', 'R1Util', function ($scope, $state, cache, R1Util) {

    $scope.myarray = [
        {
            icon: 'bi bi-person-circle', name: "अपूर्ण सभासद", path: 'parent.sub.memberdash',
        },
        {
            icon: "bi bi-person-circle",
            name: 'पूर्ण सभासद',
            path: 'parent.sub.purnmemberdash',
            params: { action: '', mode: true },

        },

        {
            icon: 'bi bi-mastodon', name: "मास्टर", path: 'masterchild',


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




            ]


        },


        {
            icon: 'bi bi-receipt', name: "जमा पावती(अ.सभासद)", path: 'parent.sub.receiptdash',
        },


        {
            icon: 'bi bi-receipt-cutoff', name: "पेमेंट (अ. सभासद)", path: 'parent.sub.paymentdash',


        },
        {
            icon: "bi bi-share-fill",
            name: 'शेअर वाटप',
            path: 'parent.sub.shareissuedash',
            params: { action: '', mode: true },
        },
        {
            icon: "bi bi-share-fill",
            name: 'शेअर परत',
            path: 'parent.sub.sharereturndash',
            params: { action: '', mode: true },
        },
        {
            icon: "bi bi-envelope-check",
            name: 'चेक काढणे',
            path: 'parent.sub.chequeissuedash',
            params: { action: '', mode: true },
        },
        {
            icon: "bi bi-check",
            name: 'चेक परत',
            path: 'parent.sub.Chequereturndash',
            params: { action: '', mode: true },
        },

        {
            icon: "bi bi-person",
            name: 'संपूर्ण माहिती',
            path: 'parent.sub.userinfodash',
            params: { action: '', mode: true },
        },
        // {
        //     icon: 'bi bi-mastodon', name: "कंपनी", path: 'parent.sub.company',
        // }


    ]
    $scope.stateGo = function (path, params) {
        $state.go(path);
    }


    $scope.UserLongName = cache.get('username');


    $scope.logout = function () {
        $scope.iConfirmlogout = function () {
            cache.clearAll();
            $state.go("login")
        };
        R1Util.createAlert($scope, "Warning", "Are your Sure , Do you want to log out", $scope.iConfirmlogout);
    }

}])


