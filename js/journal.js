
// var myApp = angular.module('myApp');
// myApp.controller('journaldashCtrl', ['$scope', '$state', 'ajax', 'R1Util','$filter',
//     function ($scope, $state, ajax, R1Util,$filter) {

//         var vm = this;
//         vm.entity = {};
//         vm.entity.sdt = new Date();
//         vm.entity.edt = new Date();

//         vm.serviceGrid = {
//             enableRowSelection: true,
//             enableRowHeaderSelection: false,
//             multiSelect: false,
//             enableSorting: true,
//             enableFiltering: true,
//             enableGridMenu: true,
//             paginationPageSizes: [30, 50, 100, 70],

//         };


//         vm.serviceGrid.columnDefs = [




//             {
//                 field: 'certNo',
//                 displayName: 'सर्टिफिकेट नंबर',
//                 enableSorting: true,
//                 type: 'string',
//                 enableCellEdit: false,
//                 cellClass: 'alignLgrid',
//                 width: "10%"
//             },
//             {
//                 field: 'vchDate',
//                 displayName: 'तारीख',
//                 enableSorting: true,
//                 type: 'date',
//                 enableCellEdit: false,
//                 cellFilter: 'date:\'dd/MM/yyyy\'',
//                 cellClass: 'alignLgrid',
//                 width: "10%"

//             },
//             {
//                 field: 'memberId',
//                 displayName: 'सभासद नंबर',
//                 enableSorting: true,
//                 type: 'string',
//                 enableCellEdit: false,
//                 cellClass: 'alignLgrid',
//                 width: "10%"
//             },
//             {
//                 field: 'member.shName',
//                 displayName: 'सभासद नाव',
//                 enableSorting: true,
//                 type: 'string',
//                 enableCellEdit: false,
//                 cellClass: 'alignLgrid',
//                 width: "20%"
//             },
          
//             {
//                 field: 'totalAmt',
//                 displayName: 'एकूण रक्कम',
//                 enableSorting: true,
//                 type: 'number',
//                 enableCellEdit: false,
//                 cellClass: 'alignRgrid',
//                 width: "10%"

//             },
//             {
//                 name: 'Action ',
//                 enableSorting: false,
//                 enableCellEdit: false,
//                 width: "10%",
//                 cellTemplate: '<center><a role="button" ng-click="grid.appScope.vm.edit(grid, row)"><i class="bi bi-eye"></i></a>&nbsp &nbsp <a  role="button" ng-click="grid.appScope.vm.remove(grid, row)"><i class="bi bi-trash3"></i></a></center>'
//             }
//         ];

//         vm.edit = function (grid, row) {
//             var param = {
//                 action: 'view',
//                 id: row.entity.vchId
//             };
//             $state.go('parent.sub.journal', param);
//         };

//         vm.remove = function (grid, row) {
//             if (row.entity.vchId) {
//                 $scope.grid = grid;
//                 $scope.param = { "id": row.entity.vchId };
//                 $scope.index = vm.serviceGrid.data.indexOf(row.entity);

//                 R1Util.createAlert($scope, "Warning", "Do You Want Delete Row", $scope.iConfirmFn);

//             }
//         }

//         $scope.iConfirmFn = function () {
//             ajax.delete('ShareIssue', null, $scope.param).then(function (res) {
//                 $scope.grid.appScope.vm.serviceGrid.data.splice($scope.index, 1);
//             })

//         }

//         $scope.show = function (){
//             $(".loading").show();
//            var params = {
//             "sdt": $filter('date')(new Date(vm.entity.sdt), 'yyyy/MM/dd'),
//             "edt": $filter('date')(new Date(vm.entity.edt), 'yyyy/MM/dd'),
//            }
//            ajax.get('ShareIssue/list',null,params).then(function(res){
//             if(res){
//                 vm.serviceGrid.data = res;
//             }
//             else {
//                 var error = "Error";
//                 if(res.error)
//                 if (res.error.message)
//                 error = res.error.message;
//                 R1Util.createAlert($scope,"Error",error,null);
//             }
//             $(".loading").hide();
        
//            })
//         }

//         $scope.refreshData = function (){
//             $(".loading").show();
//             var params = {
//                 "sdt": $filter('date')(new Date(vm.entity.sdt), 'yyyy/MM/dd'),
//                 "edt": $filter('date')(new Date(vm.entity.edt), 'yyyy/MM/dd'),
//              }
    
//            ajax.get('ShareIssue/list', null,params).then(function (res) {
//                 if (res) {
//                     vm.serviceGrid.data = res;
//                 }
//                 else {
//                     var error = "Error";
//                     if (res.error)
//                         if (res.error.message)
//                             error = res.error.message;
//                     R1Util.createAlert($scope, "Error", error, null);
//                 }
//                 $(".loading").hide();
//             })
//          }
        
//         // vm.getRecords = function () {

//         //     ajax.get('ShareIssue/list', null).then(function (res) {
//         //         if (res) {
//         //             vm.serviceGrid.data = res;
//         //         }
//         //         else {
//         //             var error = "Error";
//         //             if (res.error)
//         //                 if (res.error.message)
//         //                     error = res.error.message;
//         //             R1Util.createAlert($scope, "Error", error, null);
//         //         }
//         //         $(".loading").hide();
//         //     })
//         // }

//         // vm.getRecords()

//     }


// ])
// myApp.controller('journalCtrl', ['$scope', '$stateParams', '$q', '$rootScope', 'R1Util', 'ajax', 'Master', 'invalid',
//     function ($scope, $stateParams, $q, $rootScope, R1Util, ajax, Master, invalid) {

//         var vm = this;
//         $scope.Master = Master;
//         vm.mode = 'new';
//         var pastEntity = {};

//         var NoViewing = true;
//         if ($stateParams.action)
//             vm.mode = $stateParams.action;



//         vm.action = function () {
//             var deffered = $q.defer();

//             vm.navaction(function (res) {
//                 if (res == "OK")
//                     deffered.resolve(res)
//                 else
//                     deffered.reject(res)
//             })
//             return deffered.promise;
//         }

//         vm.navaction = function (fn) {
//             switch (vm.mode) {
//                 case 'new':

//                     vm.newrecord();
//                     fn("OK")
//                     break;
//                 case 'edit':

//                     if (vm.entity.vch_id != undefined) {
//                         if (NoViewing == true)
//                             getExistEntity();

//                     }
//                     fn("OK")
//                     break;

//                 case 'save':
//                     $scope.save(function (res) {
//                         fn(res)
//                     });
//                     break;

//                 case 'undo':
//                     if (pastEntity)
//                         vm.entity = angular.copy(pastEntity);
//                     fn("OK")

//                     break;

//                 case 'close':
//                     fn("OK")
//                     $rootScope.back();
//                     break;



//                 default:
//                     fn("OK")
//                     break;
//             }
//         };


//         $scope.save = function (fn) {
//             if ($scope.journalform.$valid) {
//                 $(".loading").show();
//                 if (!vm.entity.vchId)
//                     ajax.post('Journal/insert', vm.entity).then(function (res) {
//                         vm.entity.vchId = vm.entity.vchId;
//                         $(".loading").hide();
//                         $scope.message = "Record Saved Sucessfully";
//                         R1Util.createAlert($scope, "Success", $scope.message, null);
//                         pastEntity = angular.copy(vm.entity);
//                         fn("OK");
//                     }, function (err) {
//                         $(".loading").hide();
//                         vm.mode = 'edit';
//                         fn("CANCEL")
//                         R1Util.createAlert($scope, "Error", err.msg, null);
//                     })

//                 else {
//                     ajax.put('Journal/update', vm.entity, { id: vm.entity.vchId }).then(function (res) {

//                         $(".loading").hide();
//                         $scope.message = "Record Saved Sucessfully";
//                         R1Util.createAlert($scope, "Success", $scope.message, null);
//                         pastEntity = angular.copy(vm.entity);
//                         fn("OK");


//                     }, function (err) {
//                         $(".loading").hide();
//                         vm.mode = 'edit';
//                         fn("CANCEL")
//                         R1Util.createAlert($scope, "Error", err.msg, null);
//                     })
//                 }

//             }
//             else {
//                 vm.mode = 'edit';
//                 var fields = invalid.Error($scope.journalform);
//                 R1Util.createAlert($scope, "Error", fields, null);
//             }
//         }



//         vm.newrecord = function () {
//             pastEntity = vm.entity;
//             vm.entity = {};
//             vm.entity.member = {};
//             vm.entity.vchDate = new Date();
//         }



   



//         $scope.getMembers = function () {
//             ajax.get("Member/list").then(function (res) {
//                 vm.Members = res;
//             }, function (err) {
//                 var e = err;
//             })
//         }








//         getExistEntity = function () {

//             ajax.get('ShareIssue/get', null, { id: vm.entity.vchId }).then(function (res) {
//                 vm.entity = res;
//                 vm.entity.vchDate = new Date(res.vchDate);
//                 pastEntity = vm.entity;
//             }, function (err) {

//             })

//         }

//         $scope.init = function () {
//             vm.entity = {};
//             var q = $q.defer();


//             q.resolve();


//             return q.promise;


//         }


//         $scope.init().then(function (res) {
//             vm.action();
//             if ($stateParams.id != null) {
//                 vm.entity.vchId = $stateParams.id;
//                 getExistEntity();
//             }

//         });

//         $scope.getMemberdetail = function () {
//             if (vm.entity.memberId != null) {
//                 var param = {
//                     id: vm.entity.memberId
//                 }
//                 $(".loading").show();
//                 ajax.get('member/get', null, param).then(function (res) {
//                     vm.entity.member = res;
//                     if (vm.entity.member.cityName) {
//                         vm.entity.member.cityCodeNavigation = {};
//                         vm.entity.member.cityCodeNavigation.cityName = vm.entity.member.cityName;
//                     }
//                     setOtherinfo(res);
//                     $(".loading").hide();
//                 }, function (err) {
//                     $(".loading").hide();
//                     R1Util.createAlert($scope, "Error", err.msg, null);

//                 })
//             }
//             else {
//                 vm.entity.member = {};
//             }
//         }


//         $scope.getMemberRequestdetail = function () {
//             if (vm.entity.reqId) {
//                 var param = {
//                     id: $scope.datasource || vm.entity.reqId
//                 }

//                 ajax.get('MemberRequest/getbalance', null, param).then(function (res) {

//                     vm.entity.req = Object.assign({}, res);
//                     if (vm.entity.req) {

//                         //vm.entity.member = vm.entity.member;
//                         if (vm.entity.req.member) {
//                             vm.entity.member = vm.entity.req.member;
//                             vm.entity.memberId = vm.entity.req.member.regCode;
//                             //vm.entity.memberId = vm.entity.member.regCode;
//                             // setOtherinfo(vm.entity.req.member);
//                         }

//                     }
//                     if (vm.mode == 'new') {
//                         vm.entity.balance = res.balance;
//                     }
//                 }, function (err) {
//                     vm.entity.req = undefined;
//                     var error = err.msg;
//                     if (err.error)
//                         if (err.error.message)
//                             error = err.error.message;
//                     R1Util.createAlert($scope, "Error", error, null);
//                 }
//                 )
//             }
//             else {
//                 vm.entity.req = {};
//             }

//         }

//         $scope.getMemberRequests = function () {
//             vm.MemberRequests = [];
//             if (!vm.memberRequest)
//                 ajax.get("MemberRequest/list").then(function (res) {
//                     vm.MemberRequests = res;
//                 }, function (err) {
//                     var e = err;
//                 })
//         }

//         $scope.memberReq_coldef = [
//             {
//                 field: "regCode",
//                 displayName: "अ. स. नंबर",
//                 style: { "width": "20%", "overflow": "hidden", "text-align": "left" },

//             },
//             {
//                 field: "shName",
//                 displayName: "अ. स. नांव ",
//                 style: { "width": "60%", "overflow": "hidden", "text-align": "left" },

//             },
//             {
//                 field: "cityName",
//                 displayName: "गांव",
//                 style: { "width": "20%", "overflow": "hidden", "text-align": "left" },

//             },
//         ];

    

//     }
// ])


var myApp = angular.module('myApp');
myApp.controller('journaldashCtrl', ['$scope', '$state', 'ajax', 'R1Util','$filter',
    function ($scope, $state, ajax, R1Util,$filter) {

        var vm = this;
        vm.entity = {};
        vm.entity.sdt = new Date();
        vm.entity.edt = new Date();

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
                field: 'certNo',
                displayName: 'सर्टिफिकेट नंबर',
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
                field: 'memberId',
                displayName: 'सभासद नंबर',
                enableSorting: true,
                type: 'string',
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "15%"
            },
            {
                field: 'member.shName',
                displayName: 'सभासद नांव',
                enableSorting: true,
                type: 'string',
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "20%"
            },
          
          
           


            {
                field: 'totalAmt',
                displayName: 'एकूण रक्कम',
                enableSorting: true,
                type: 'number',
                enableCellEdit: false,
                cellClass: 'alignRgrid',
                width: "10%"

            },
            {
                name: 'Action ',
                enableSorting: false,
                enableCellEdit: false,
                width: "15%",
                cellTemplate: '<center><a role="button" ng-click="grid.appScope.vm.edit(grid, row)"><i class="bi bi-eye"></i></a>&nbsp &nbsp <a  role="button" ng-click="grid.appScope.vm.remove(grid, row)"><i class="bi bi-trash3"></i></a></center>'
            }
        ];

        vm.edit = function (grid, row) {
            var param = {
                action: 'view',
                id: row.entity.vchId
            };
            $state.go('parent.sub.journal', param);
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
            ajax.delete('Journal', null, $scope.param).then(function (res) {
                $scope.grid.appScope.vm.serviceGrid.data.splice($scope.index, 1);
            })

        }

        $scope.show = function (){
            $(".loading").show();
           var params = {
            "sdt": $filter('date')(new Date(vm.entity.sdt), 'yyyy/MM/dd'),
            "edt": $filter('date')(new Date(vm.entity.edt), 'yyyy/MM/dd'),
           }
           ajax.get('Journal/list',null,params).then(function(res){
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
    
           ajax.get('Journal/list', null,params).then(function (res) {
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
            })
         }
        
        // vm.getRecords = function () {

        //     ajax.get('ShareIssue/list', null).then(function (res) {
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

    }


])
myApp.controller('journalCtrl', ['$scope', '$stateParams', '$q', '$rootScope', 'R1Util', 'ajax', 'Master', 'invalid',
    function ($scope, $stateParams, $q, $rootScope, R1Util, ajax, Master, invalid) {

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
            if ($scope.journalform.$valid) {
                $(".loading").show();
                if (!vm.entity.vchId)
                    ajax.post('Journal/insert', vm.entity).then(function (res) {
                        vm.entity.vchId = vm.entity.vchId;
                        $(".loading").hide();
                        $scope.message = "Record Saved Sucessfully";
                        R1Util.createAlert($scope, "Success", $scope.message, null);
                        pastEntity = angular.copy(vm.entity);
                        fn("OK");
                    }, function (err) {
                        $(".loading").hide();
                        vm.mode = 'edit';
                        fn("CANCEL")
                        R1Util.createAlert($scope, "Error", err.msg, null);
                    })

                else {
                    ajax.put('Journal/update', vm.entity, { id: vm.entity.vchId }).then(function (res) {

                        $(".loading").hide();
                        $scope.message = "Record Saved Sucessfully";
                        R1Util.createAlert($scope, "Success", $scope.message, null);
                        pastEntity = angular.copy(vm.entity);
                        fn("OK");


                    }, function (err) {
                        $(".loading").hide();
                        vm.mode = 'edit';
                        fn("CANCEL")
                        R1Util.createAlert($scope, "Error", err.msg, null);
                    })
                }

            }
            else {
                vm.mode = 'edit';
                var fields = invalid.Error($scope.journalform);
                R1Util.createAlert($scope, "Error", fields, null);
            }
        }



        vm.newrecord = function () {
            pastEntity = vm.entity;
            vm.entity = {};
            vm.entity.member = {};
            vm.entity.vchDate = new Date();
        }

        getExistEntity = function () {

            ajax.get('Journal/get', null, { id: vm.entity.vchId }).then(function (res) {
                vm.entity = res;
                vm.entity.vchDate = new Date(res.vchDate);
                pastEntity = vm.entity;
            }, function (err) {

            })

        }

        $scope.init = function () {
            vm.entity = {};
            var q = $q.defer();


            q.resolve();


            return q.promise;


        }


        $scope.init().then(function (res) {
            vm.action();
            if ($stateParams.id != null) {
                vm.entity.vchId = $stateParams.id;
                getExistEntity();
            }

        });

        $scope.getMemberdetail = function () {
            if (vm.entity.memberId != null) {
                var param = {
                    id: vm.entity.memberId
                }
                $(".loading").show();
                ajax.get('member/get', null, param).then(function (res) {
                    vm.entity.member = res;
                    // vm.entity.member = res.data;
                    if (vm.entity.member.cityName) {
                        vm.entity.member.cityCodeNavigation = {};
                        vm.entity.member.cityCodeNavigation.cityName = vm.entity.member.cityName;
                    }
                    setOtherinfo(res);
                    $(".loading").hide();
                }, function (err) {
                    $(".loading").hide();
                    R1Util.createAlert($scope, "Error", err.msg, null);

                })
            }
            else {
                vm.entity.member = {};
            }
        }

        $scope.getMemberRequestdetail = function () {
            if (vm.entity.reqId) {
                var param = {
                    id: $scope.datasource || vm.entity.reqId
                }

                ajax.get('MemberRequest/getbalance', null, param).then(function (res) {

                    vm.entity.req = Object.assign({}, res);
                    if (vm.entity.req) {

                        //vm.entity.member = vm.entity.member;
                        if (vm.entity.req.member) {
                            vm.entity.member = vm.entity.req.member;
                            vm.entity.memberId = vm.entity.req.member.regCode;
                            //vm.entity.memberId = vm.entity.member.regCode;
                            setOtherinfo(vm.entity.req.member);
                        }

                    }
                    if (vm.mode == 'new') {
                        vm.entity.balance = res.balance;
                    }
                }, function (err) {
                    vm.entity.req = undefined;
                    var error = err.msg;
                    if (err.error)
                        if (err.error.message)
                            error = err.error.message;
                    R1Util.createAlert($scope, "Error", error, null);
                }
                )
            }
            else {
                vm.entity.req = {};
            }

        
            
        }

        setOtherinfo = (res) => {
            vm.entity.nomineeName = res.shNominee;
            vm.entity.nomeeneAddress = res.shAddress;
            vm.entity.nomineeRelation = res.shNomineeRelation;
            vm.entity.bankCode = res.bankCode;
            vm.entity.bankAccNo = res.bankAccNo;
            vm.entity.bankCodeNavigation = res.bankCodeNavigation;
        }

         
        $scope.getMembers = function () {
            ajax.get("Member/getmemlist").then(function (res) {
                vm.Members = res;
            }, function (err) {
                var e = err;
            })
        }

        $scope.getMemberRequests = function () {
            vm.MemberRequests = [];
            if (!vm.memberRequest)
                ajax.get("MemberRequest/getmemReqlist").then(function (res) {
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
