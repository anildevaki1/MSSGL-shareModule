var myApp = angular.module('myApp');
myApp.controller('paymentdashCtrl', ['$scope', '$state', 'ajax', 'R1Util','$filter',
    function ($scope, $state, ajax, R1Util,$filter) {

        var vm = this;
          vm.entity={};
          vm.entity.edt=new Date();
          vm.entity.sdt=new Date();



        vm.serviceGrid = {
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,
            enableSorting: true,
            enableFiltering: true,
            enableGridMenu: true,
            paginationPageSizes: [30, 50, 100, 70],

        };


        vm.serviceGrid.columnDefs = [

            {
                field: 'vchId',
                displayName: 'नंबर',
                enableSorting: true,
                type: 'string',
                enableCellEdit: false,
                cellClass: 'alignLgrid',

                width: "15%"
            },

            {
                field: 'vchDate',
                displayName: 'तारीख',
                enableSorting: true,
                type: 'date',
                enableCellEdit: false,
                cellFilter: 'date:\'dd/MM/yyyy\'',
                cellClass: 'alignLgrid',
                width: "15%"

            },
            {
                field: 'regCode',
                displayName: 'नंबर',
                enableSorting: true,
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "10%"

            },
            {
                field: 'regCodeNavigation.shName',
                displayName: 'अ. स. नांव',
                enableSorting: true,
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "20%"

            },
            {
                field: 'amt',
                displayName: 'रक्कम',
                enableSorting: true,
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "20%"

            },

            {
                name: 'Action ',
                enableSorting: false,
                enableCellEdit: false,
                width: "20%",
                cellTemplate: '<center><a role="button" ng-click="grid.appScope.vm.edit(grid, row)"><i class="bi bi-eye"></i></a>&nbsp &nbsp <a  role="button" ng-click="grid.appScope.vm.remove(grid, row)"><i class="bi bi-trash3"></i></a></center>'
            }
        ];


        vm.edit = function (grid, row) {
            var param = {
                action: 'view',
                id: row.entity.vchId
            };
            $state.go('parent.sub.payment', param);
        };

        vm.remove = function (grid, row) {
            if (row.entity.vchId) {
                $scope.grid = grid;
                $scope.param = { "id": row.entity.vchId};
                $scope.index = vm.serviceGrid.data.indexOf(row.entity);
                R1Util.createAlert($scope, "Warning", "Do You Want Delete Row", $scope.iConfirmFn);
            }
        }

        $scope.iConfirmFn = function () {
            ajax.delete('payment', null, $scope.param).then(function (res) {
                $scope.grid.appScope.vm.serviceGrid.data.splice($scope.index, 1);
            })

        }

        // vm.getRecords = function () {

        //     ajax.get('Payment/list', null).then(function (res) {
        //         if (res) {
        //             vm.serviceGrid.data = res;
        //         }
        //         else {
        //             var error = "Error";
        //             if (res.error)
        //                 if (res.error.message)
        //                     error = res.error.message;
        //             R1Util.createAlert($scope, "Error", error, null);
        //         }
        //         $(".loading").hide();
        //     })
        // }

        // vm.getRecords()

         
        $scope.show = function (){
            $(".loading").show();
           var params = {
            "sdt": $filter('date')(new Date(vm.entity.sdt), 'yyyy/MM/dd'),
            "edt": $filter('date')(new Date(vm.entity.edt), 'yyyy/MM/dd'),
           }
           ajax.get('Payment/list',null,params).then(function(res){
            if(res){
                vm.serviceGrid.data = res;
            }
            else {
                var error = "Error";
                if(res.error)
                if (res.error.message)
                error = res.error.message;
                R1Util.createAlert($scope,"Error",error,null);
            }
            $(".loading").hide();
      })
    
        }


        $scope.refreshData = function (){
            $(".loading").show();
            var params = {
                "sdt": $filter('date')(new Date(vm.entity.sdt), 'yyyy/MM/dd'),
                "edt": $filter('date')(new Date(vm.entity.edt), 'yyyy/MM/dd'),
            }
            ajax.get('Payment/list',null,params).then(function (res) {
                if (res) {
                    vm.serviceGrid.data = res;
                }
                else {
                    var error = "Error";
                    if (res.error)
                        if (res.error.message)
                            error = res.error.message;
                    R1Util.createAlert($scope, "Error", error, null);
                }
                $(".loading").hide();
            },)
        }



    }


])

myApp.controller('paymentCtrl', ['$scope', '$stateParams', '$q', '$rootScope', 'R1Util', 'ajax', 'Master','invalid',
    function ($scope, $stateParams, $q, $rootScope, R1Util, ajax, Master,invalid) {

        var vm = this;
        $scope.Master = Master;
        vm.mode = 'new';
        var pastEntity = {};
        var NoViewing = true;
        if ($stateParams.action)
            vm.mode = $stateParams.action;

        vm.action = function () {
            var deffered = $q.defer();

            vm.navaction(function (res) {
                if (res == "OK")
                    deffered.resolve(res)
                else
                    deffered.reject(res)
            })
            return deffered.promise;
        }

        vm.navaction = function (fn) {
            switch (vm.mode) {
                case 'new':
                    vm.newrecord();
                    fn("OK")
                    break;
                case 'edit':

                    if (vm.entity.vch_id != undefined) {
                        if (NoViewing == true)
                            getExistEntity();

                    }
                    fn("OK")
                    break;

                case 'save':
                    $scope.save(function (res) {
                        fn(res)
                    });
                    break;

                case 'undo':
                    if (pastEntity)
                        vm.entity = angular.copy(pastEntity);
                    fn("OK")

                    break;

                case 'close':
                    fn("OK")
                    $rootScope.back();
                    break;



                default:
                    fn("OK")
                    break;
            }
        };




        $scope.save = function (fn) {
            if ($scope.paymentform.$valid) {
                $(".loading").show();
                if (!vm.entity.vchId)
                    ajax.post('payment/insert', vm.entity).then(function (res) {


                        vm.entity.vchId = res.vchId;
                        $(".loading").hide();

                        $scope.message = "Record Saved Sucessfully";
                        R1Util.createAlert($scope, "Success", $scope.message, null);
                        pastEntity = angular.copy(vm.entity);
                        fn("OK");

                    },
                        function (err) {
                            vm.mode = 'edit';
                            fn("CANCEL")
                            R1Util.createAlert($scope, "Error", err.msg, null);
                        })
                else {
                    ajax.put('payment/update', vm.entity, { id: vm.entity.vchId }).then(function (res) {

                        $(".loading").hide();

                        $scope.message = "Record Saved Sucessfully";
                        R1Util.createAlert($scope, "Success", $scope.message, null);
                        pastEntity = angular.copy(vm.entity);
                        fn("OK");




                    },
                        function (err) {
                            $(".loading").hide();
                            vm.mode = 'edit';
                            fn("CANCEL")
                            R1Util.createAlert($scope, "Error", err.msg, null);
                        })
                }

            }
            else
            {
                vm.mode = 'edit';
                var fields = invalid.Error($scope.paymentform);
                R1Util.createAlert($scope, "Error", fields, null);
                // $(".loading").hide();
                // R1Util.createAlert($scope, "Error", err.msg, null);
                // fn("CANCEL")
            }



        }


        vm.newrecord = function () {
            pastEntity = vm.entity;
            vm.entity = {};
            vm.entity.vchDate = new Date();


        }

        $scope.init = function () {
            vm.entity = {};
            var q = $q.defer();

           
                q.resolve();
         return q.promise;


        }


        getExistEntity = function () {

            ajax.get('payment/get', null, { id: vm.entity.vchId }).then(function (res) {
                vm.entity = res;
                vm.entity.vchDate = new Date(vm.entity.vchDate);
                pastEntity = angular.copy(vm.entity);
            }, function (err) {
                R1Util.createAlert($scope, "Error", err.msg, null);
            })

        }


        $scope.init().then(function (res) {
            vm.action();
            if ($stateParams.id) {
                vm.entity.vchId = $stateParams.id;
                getExistEntity();
            }

        });



        $scope.getMemberRequestdetail = function () {
            if (vm.entity.regCode) {
                var param = {
                    id: vm.entity.regCode
                  }
                $(".loading").show();
                ajax.get('MemberRequest/get', null, param).then(function (res) {
                   vm.entity.regCodeNavigation = res;
                        if (regCodeNavigation.cityName) {
                            vm.entity.regCodeNavigation.cityCodeNavigation = {};
                            vm.entity.regCodeNavigation.cityCodeNavigation.cityName = vm.entity.regCodeNavigation.cityName;
                        }
                        $(".loading").hide();
                   
                },function(err){
                    $(".loading").hide();
                    R1Util.createAlert($scope, "Error", err.msg, null);
                })
            }
            else{
                vm.entity.regCodeNavigation={};
            }



        }

        $scope.getMemberRequests = function () {
            vm.MemberRequests = [];
            if (!vm.memberRequest)
                ajax.get("MemberRequest/getMemReqlist").then(function (res) {
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




    }
])


myApp.controller('mempaymentdashCtrl', ['$scope', '$state', 'ajax', 'R1Util','$filter',
    function ($scope, $state, ajax, R1Util,$filter) {

        var vm = this;
        vm.entity={};
        vm.entity.sdt= new Date();
        vm.entity.edt= new Date();

   vm.serviceGrid = {
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,
            enableSorting: true,
            enableFiltering: true,
            enableGridMenu: true,
            paginationPageSizes: [30, 50, 100, 70],

        };


        vm.serviceGrid.columnDefs = [

            {
                field: 'vchId',
                displayName: 'नंबर',
                enableSorting: true,
                type: 'string',
                enableCellEdit: false,
                cellClass: 'alignLgrid',

                width: "20%"
            },

            {
                field: 'vchDate',
                displayName: 'तारीख',
                enableSorting: true,
                type: 'date',
                enableCellEdit: false,
                cellFilter: 'date:\'dd/MM/yyyy\'',
                cellClass: 'alignLgrid',
                width: "20%"

            },
            {
                field: 'regCode',
                displayName: 'नंबर',
                enableSorting: true,
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "10%"

            },
            {
                field: 'regCodeNavigation.shName',
                displayName: 'पू . स. नांव',
                enableSorting: true,
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "20%"

            },
            {
                field: 'amt',
                displayName: 'रक्कम',
                enableSorting: true,
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "20%"

            },
            {
                name: 'Action ',
                enableSorting: false,
                enableCellEdit: false,
                width: "10%",
                cellTemplate: '<center><a role="button" ng-click="grid.appScope.vm.edit(grid, row)"><i class="bi bi-eye"></i></a>&nbsp &nbsp <a  role="button" ng-click="grid.appScope.vm.remove(grid, row)"><i class="bi bi-trash3"></i></a></center>'
            }
        ];


        vm.edit = function (grid, row) {
            var param = {
                action: 'view',
                id: row.entity.vchId
            };
            $state.go('parent.sub.memberpayment', param);
        };

        vm.remove = function (grid, row) {
            if (row.entity.vchId) {
                $scope.grid = grid;
                $scope.param = {"id": row.entity.vchId};
                $scope.index = vm.serviceGrid.data.indexOf(row.entity);

                R1Util.createAlert($scope, "Warning", "Do You Want Delete Row", $scope.iConfirmFn);

            }
        }

        $scope.iConfirmFn = function () {
            ajax.delete('MemberPayment', null, $scope.param).then(function (res) {
                $scope.grid.appScope.vm.serviceGrid.data.splice($scope.index, 1);
            })

        }

        $scope.show = function (){
            $(".loading").show();
           var params = {
            "sdt": $filter('date')(new Date(vm.entity.sdt), 'yyyy/MM/dd'),
            "edt": $filter('date')(new Date(vm.entity.edt), 'yyyy/MM/dd'),
           }
           ajax.get('MemberPayment/list',null,params).then(function(res){
            if(res){
                vm.serviceGrid.data = res;
            }
            else {
                var error = "Error";
                if(res.error)
                if (res.error.message)
                error = res.error.message;
                R1Util.createAlert($scope,"Error",error,null);
            }
            $(".loading").hide();
      })
    
        }
        $scope.refreshData = function (){
            $(".loading").show();
            var params = {
                "sdt": $filter('date')(new Date(vm.entity.sdt), 'yyyy/MM/dd'),
                "edt": $filter('date')(new Date(vm.entity.edt), 'yyyy/MM/dd'),
            }
            ajax.get('MemberPayment/list',null,params).then(function (res) {
                if (res) {
                    vm.serviceGrid.data = res;
                }
                else {
                    var error = "Error";
                    if (res.error)
                        if (res.error.message)
                            error = res.error.message;
                    R1Util.createAlert($scope, "Error", error, null);
                }
                $(".loading").hide();
            },)
        }


        // vm.getRecords = function () {

        //     ajax.get('MemberReceipt/list', null).then(function (res) {
        //         if (res) {
        //             vm.serviceGrid.data = res;
        //         }
        //         else {
        //             var error = "Error";
        //             if (res.error)
        //                 if (res.error.message)
        //                     error = res.error.message;
        //             R1Util.createAlert($scope, "Error", error, null);
        //         }
        //         $(".loading").hide();
        //     })
        // }

        // vm.getRecords()
        // vm.getRecords = function () {

        //     ajax.get('MemberReceipt/list', null).then(function (res) {
        //         if (res) {
        //             vm.serviceGrid.data = res;
        //         }
        //         else {
        //             var error = "Error";
        //             if (res.error)
        //                 if (res.error.message)
        //                     error = res.error.message;
        //             R1Util.createAlert($scope, "Error", error, null);
        //         }
        //         $(".loading").hide();
        //     },)
        // }

        // vm.getRecords();



    }


])


myApp.controller('mempaymentCtrl', ['$scope', '$stateParams', '$q', '$rootScope', 'R1Util', 'ajax', 'Master','invalid',
    function ($scope, $stateParams, $q, $rootScope, R1Util, ajax, Master,invalid) {

        var vm = this;
        $scope.Master = Master;
        vm.mode = 'new';
        var pastEntity = {};
        var NoViewing = true;
        if ($stateParams.action)
            vm.mode = $stateParams.action;

        vm.action = function () {
            var deffered = $q.defer();

            vm.navaction(function (res) {
                if (res == "OK")
                    deffered.resolve(res)
                else
                    deffered.reject(res)
            })
            return deffered.promise;
        }

        vm.navaction = function (fn) {
            switch (vm.mode) {
                case 'new':
                    vm.newrecord();
                    fn("OK")
                    break;
                case 'edit':

                    if (vm.entity.vch_id != undefined) {
                        if (NoViewing == true)
                            getExistEntity();

                    }
                    fn("OK")
                    break;

                case 'save':
                    $scope.save(function (res) {
                        fn(res)
                    });
                    break;

                case 'undo':
                    if (pastEntity)
                        vm.entity = angular.copy(pastEntity);
                    fn("OK")

                    break;

                case 'close':
                    fn("OK")
                    $rootScope.back();
                    break;



                default:
                    fn("OK")
                    break;
            }
        };

  $scope.save = function (fn) {
            if ($scope.memberpaymentform.$valid) {
                $(".loading").show();
                if (!vm.entity.vchId)
                    ajax.post('MemberPayment/insert', vm.entity).then(function (res) {


                        vm.entity.vchId = res.vchId;
                        $(".loading").hide();

                        $scope.message = "Record Saved Sucessfully";
                        R1Util.createAlert($scope, "Success", $scope.message, null);
                        pastEntity = angular.copy(vm.entity);
                        fn("OK");

                    },
                        function (err) {
                            vm.mode = 'edit';
                            fn("CANCEL")
                            R1Util.createAlert($scope, "Error", err.msg, null);
                        })
                else {
                    ajax.put('MemberPayment/update', vm.entity, { id: vm.entity.vchId }).then(function (res) {

                        $(".loading").hide();

                        $scope.message = "Record Saved Sucessfully";
                        R1Util.createAlert($scope, "Success", $scope.message, null);
                        pastEntity = angular.copy(vm.entity);
                        fn("OK");




                    },
                        function (err) {
                            $(".loading").hide();
                            vm.mode = 'edit';
                            fn("CANCEL")
                            R1Util.createAlert($scope, "Error", err.msg, null);
                        })
                }

            }
            else
            {
                vm.mode = 'edit';
                var fields = invalid.Error($scope.paymentform);
                R1Util.createAlert($scope, "Error", fields, null);
                // $(".loading").hide();
                // R1Util.createAlert($scope, "Error", err.msg, null);
                // fn("CANCEL")
            }



        }


        vm.newrecord = function () {
            pastEntity = vm.entity;
            vm.entity = {};
            vm.entity.vchDate = new Date();


        }









        $scope.init = function () {
            vm.entity = {};
            var q = $q.defer();

           
                q.resolve();
             

            return q.promise;


        }


        getExistEntity = function () {

            ajax.get('MemberPayment/get', null, { id: vm.entity.vchId }).then(function (res) {
                vm.entity = res;
                vm.entity.vchDate = new Date(vm.entity.vchDate);
                pastEntity = angular.copy(vm.entity);
            }, function (err) {
                R1Util.createAlert($scope, "Error", err.msg, null);
            })

        }


        $scope.init().then(function (res) {
            vm.action();
            if ($stateParams.id) {
                vm.entity.vchId = $stateParams.id;
                getExistEntity();
            }

        });



        // $scope.getMemberdetail = function () {
        //     if (vm.entity.regCode) {
        //         var param = {
        //             id: vm.entity.regCode
        //           }
        //         $(".loading").show();
        //         ajax.get('Member/get', null, param).then(function (res) {
        //            vm.entity.regCodeNavigation = res;
        //                 if (regCodeNavigation.cityName) {
        //                     vm.entity.regCodeNavigation.cityCodeNavigation = {};
        //                     vm.entity.regCodeNavigation.cityCodeNavigation.cityName = vm.entity.regCodeNavigation.cityName;
        //                 }
        //                 $(".loading").hide();
                   
        //         },function(err){
        //             $(".loading").hide();
        //             R1Util.createAlert($scope, "Error", err.msg, null);
        //         })
        //     }
        //     else{
        //         vm.entity.regCodeNavigation={};
        //     }



        // }
        $scope.getMemberdetail = function () {
            if (vm.entity.regCode) {
                var param = {
                    id: vm.entity.regCode

                }
                $(".loading").show();
                ajax.get('member/get', null, param).then(function (res) {
                    vm.entity.regCodeNavigation = res;
                        if ( vm.entity.regCodeNavigationcityName) {
                            vm.entity.regCodeNavigation.cityCodeNavigation = {};
                            vm.entity.regCodeNavigation.cityCodeNavigation.cityName = vm.entity.regCodeNavigation.cityName;
                        }
                    
                    $(".loading").hide();
                },function(err){
                    var error =  err.msg
                    if (err.error)
                        if (err.error.message)
                            error = err.error.message;
                    R1Util.createAlert($scope, "Error", error, null);
                })
            }
            else{
                
                vm.entity.regCodeNavigation= {};
            }


        }



    


        
        $scope.getMembers = function () {
            vm.Members = [];
            if (!vm.member)
                ajax.get("Member/getMemlist").then(function (res) {
                    vm.Members = res;
                }, function (err) {
                    var e = err;
                })
        }
        $scope.memberReq_coldef = [
            {
                field: "regCode",
                displayName: "पू . स. नंबर",
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




    }
])

