
var myApp = angular.module('myApp');
myApp.controller('memberreqCtrl', ['$scope', '$state', 'ajax', 'R1Util', '$filter', 'myprovider',
    function ($scope, $state, ajax, R1Util, $filter, myprovider) {
        var vm = this;
        vm.entity = {};
        vm.reference = {};
        vm.entity.format = 1;
        vm.entity.edt = new Date();
        vm.entity.sdt = new Date();


        vm.format = [
            {
                "value": 1,
                "name": "Pdf"
            },
            {
                "value": 2,
                "name": "Excel"
            },

        ]
       

       

        $scope.getMemberRequestdetail = function () {
            if (vm.entity.regCode) {
                var param = {
                    id: vm.entity.regCode,
                }

                $(".loading").show();
                ajax.get('MemberRequest/get', null, param).then(function (res) {
                    vm.entity.req = res;
                    if (res.regCodeNavigation.cityName) {
                        vm.entity.regCodeNavigation.cityCodeNavigation = {};
                        vm.entity.regCodeNavigation.cityCodeNavigation.cityName = vm.entity.regCodeNavigation.cityName;
                    }
                    $(".loading").hide();

                }, function (err) {
                  $(".loading").hide();
                    R1Util.createAlert($scope, "Error", err.msg, null);
                })
            }


        }

        $scope.getMemberRequests = function () {
            vm.MemberRequests = [];
            if (!vm.memberRequest)
                ajax.get("MemberRequest/list").then(function (res) {
                    vm.MemberRequests = res;
                }, function (err) {
                    var e = err;
                })
        }

        $scope.memberReq_coldef = [
            {
                field: "regCode",
                displayName: "अ. स. नंबर",
                style: { "width": "20%", "overflow": "hidden", "text-align": "left" },

            },
            {
                field: "shName",
                displayName: "अ. स. नांव ",
                style: { "width": "60%", "overflow": "hidden", "text-align": "left" },

            },
            {
                field: "cityName",
                displayName: "गांव",
                style: { "width": "20%", "overflow": "hidden", "text-align": "left" },

            },
        ];

            $scope.show = function () {
            // var params = {
            //     id: vm.entity.regCode,
            //     sdt:  $filter('date')(vm.entity.sdt, 'yyyy-MM-dd'),
            //     edt:  $filter('date')(vm.entity.edt, 'yyyy-MM-dd'),
            //     // RegCodeNavigation: vm.entity.regCode,
            //     // CityName:vm.entity.req.cityCodeNavigation.cityName,
            //     // format: (vm.entity.format==1 ? "PDF" :"EXCEL"),


            // }
            var params = "id=" + vm.entity.regCode
            params += "&edt=" + $filter('date')(vm.entity.edt, 'yyyy-MM-dd')
            params += "&sdt=" + $filter('date')(vm.entity.sdt, 'yyyy-MM-dd')
            params += "&format=" + (vm.entity.format == 1 ? "PDF" : "EXCEL")
          
          
 


            window.open(myprovider.appserver + "Report/ledger1?" + params);

        }
        

    }])



myApp.controller('memberrepCtrl', ['$scope', '$state', 'ajax', 'R1Util','$filter', 'myprovider',
    function ($scope, $state, ajax, R1Util, $filter, myprovider) {


        var vm = this;
        vm.entity = {};
        vm.reference = {};
        vm.entity.edt = new Date();
        vm.entity.sdt = new Date();


        vm.format = [
            {
                "value": 1,
                "name": "Pdf"
            },
            {
                "value": 2,
                "name": "Excel"
            },

        ]
        vm.entity.format = 1;

        $scope.getMemberdetail = function () {
            if (vm.entity.regCode) {
                var param = {
                    id: vm.entity.regCode

                }
                $(".loading").show();
                ajax.get('member/get', null, param).then(function (res) {
                   
                        vm.entity.regCodeNavigation = res;
                        if ( vm.entity.regCodeNavigation.cityName) {
                            vm.entity.regCodeNavigation.cityCodeNavigation = {};
                            vm.entity.regCodeNavigation.cityCodeNavigation.cityName = vm.entity.regCodeNavigation.cityName;
                        }
                    
                    $(".loading").hide();
                },function(err){
                    var error = err.msg;
                        if (res.error)
                            if (res.error.message)
                                error = res.error.message;
                        R1Util.createAlert($scope, "Error", error, null);
                })
            }


        }


        $scope.getMembers = function () {
            vm.Members = [];
            if (!vm.member)
                ajax.get("Member/list").then(function (res) {
                    vm.Members = res;
                }, function (err) {
                    var e = err;
                })
        }


        $scope.memberReq_coldef = [
            {
                field: "regCode",
                displayName: "अ. स. नंबर",
                style: { "width": "20%", "overflow": "hidden", "text-align": "left" },

            },
            {
                field: "shName",
                displayName: "पु. स. नांव ",
                style: { "width": "60%", "overflow": "hidden", "text-align": "left" },

            },
            {
                field: "cityName",
                displayName: "गांव",
                style: { "width": "20%", "overflow": "hidden", "text-align": "left" },

            },
        ];



        $scope.show = function () {
         
            var params = "id=" + vm.entity.regCode
            params += "&edt=" + $filter('date')(vm.entity.edt, 'yyyy-MM-dd')
            params += "&sdt=" + $filter('date')(vm.entity.sdt, 'yyyy-MM-dd')
            params += "&format=" + (vm.entity.format == 1 ? "PDF" : "EXCEL")
          
           window.open(myprovider.appserver + "Report/ledger2?" + params);

        }



    }])


