
var myApp = angular.module('myApp');
myApp.controller('shareissuedashCtrl', ['$scope', '$state', 'ajax', 'R1Util',
    function ($scope, $state, ajax, R1Util) {

        var vm = this;


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
                width: "12%"
            },
            {
                field: 'memberId',
                displayName: 'सभासद नंबर',
                enableSorting: true,
                type: 'string',
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "12  %"
            },
            {
                field: 'member.shName',
                displayName: 'संभासदाचे नांव',
                enableSorting: true,
                type: 'string',
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "20%"
            },
            {
                field: 'shareQty',
                displayName: 'शेअर संख्या',
                enableSorting: true,
                type: 'number',
                enableCellEdit: false,
                cellClass: 'alignRgrid',
                width: "10 %"

            },
            {
                field: 'mbrCharges',
                displayName: 'सभासद शुल्क',
                enableSorting: true,
                type: 'number',
                enableCellEdit: false,
                cellFilter: 'number:2',
                cellClass: 'alignRgrid',
                width: "12 %"

            },
            {
                field: 'shareAmt',
                displayName: 'शेअर रक्कम ',
                enableSorting: true,
                type: 'number',
                cellFilter: 'number:2',
                enableCellEdit: false,
                cellClass: 'alignRgrid',
                width: "10%"

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
                width: "10%",
                cellTemplate: '<center><a role="button" ng-click="grid.appScope.vm.edit(grid, row)"><i class="bi bi-eye"></i></a>&nbsp &nbsp <a  role="button" ng-click="grid.appScope.vm.remove(grid, row)"><i class="bi bi-trash3"></i></a></center>'
            }
        ];

        vm.edit = function (grid, row) {
            var param = {
                action: 'view',
                id: row.entity.vchId
            };
            $state.go('parent.sub.shareissue', param);
        };

        vm.remove = function (grid, row) {
            if (row.entity.vchId) {
                $scope.grid = grid;
                $scope.param = { "id": row.entity.vchId };
                $scope.index = vm.serviceGrid.data.indexOf(row.entity);

                R1Util.createAlert($scope, "Warning", "Do You Want Delete Row", $scope.iConfirmFn);

            }
        }

        $scope.iConfirmFn = function () {
            ajax.delete('ShareIssue', null, $scope.param).then(function (res) {
                $scope.grid.appScope.vm.serviceGrid.data.splice($scope.index, 1);
            })

        }

        vm.getRecords = function () {
            $(".loading").show();
            ajax.get('ShareIssue/list', null).then(function (res) {
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

        vm.getRecords()






    }


])
myApp.controller('shareissueCtrl', ['$scope', '$stateParams', '$q', '$rootScope', 'R1Util', 'ajax', 'Master',
    function ($scope, $stateParams, $q, $rootScope, R1Util, ajax, Master) {

        var vm = this;
        $scope.Master = Master;
        vm.mode = 'new';

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
                            callbackEdit();
                        if (vm.entity.sh012.length != 0 || vm.entity.sh016.length != 0) {
                            vm.mode = 'undo'
                            R1Util.createAlert($scope, "WarningOk", "Can Not Edit a record Auto Generated by Share Issue ", null);
                        }
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
            if ($scope.shareissueform.$valid) {
                $(".loading").show();
                if (!vm.entity.vchId)
                    ajax.post('ShareIssue/insert', vm.entity).then(function (res) {
                        if (res) {
                            vm.entity.vchId = vm.entity.vchId;
                            $(".loading").hide();

                            $scope.message = "Record Saved Sucessfully";
                            R1Util.createAlert($scope, "Success", $scope.message, null);
                            pastEntity = angular.copy(vm.entity);
                            fn("OK");

                        } else {
                            var error = "An Error has occured while saving record!";

                            if (res.error)
                                if (res.error.message)
                                    error = res.error.message;

                            vm.mode = 'edit';
                            $(".loading").hide();
                            R1Util.createAlert($scope, "Error", error, null);
                            fn("CANCEL")
                        }

                    }, function (err) {
                        alert(err);
                    })

                else {
                    ajax.put('ShareIssue/update', vm.entity, { id: vm.entity.vchId }).then(function (res) {
                        if (res) {
                            $(".loading").hide();
                            $scope.message = "Record Saved Sucessfully";
                            R1Util.createAlert($scope, "Success", $scope.message, null);
                            pastEntity = angular.copy(vm.entity);
                            fn("OK");
                        } else {
                            var error = "An Error has occured while saving record!";

                            if (res.error)
                                if (res.error.message)
                                    error = res.error.message;

                            vm.mode = 'edit';
                            $(".loading").hide();
                            R1Util.createAlert($scope, "Error", error, null);
                            fn("CANCEL")
                        }

                    })
                }

            }
        }



        vm.newrecord = function () {
            vm.entity = {};
           vm.entity.vchDate = new Date();
        }



        $scope.amount = function () {


            vm.entity.shareAmt = parseFloat(vm.entity.shareQty * vm.entity.shareRate)
        }


        $scope.totalamount = function () {

            vm.entity.totalAmt = parseFloat(vm.entity.shareAmt) + parseFloat(vm.entity.mbrCharges);

        }


        var getMembers = function () {
            ajax.get("Member/list").then(function (res) {
                vm.Members = res;
            }, function (err) {
                var e = err;
            })
        }

        // $scope.init = function () {
        //     vm.entity = {};
        //     var q = $q.defer();

         
        //     var r = getMembers();

        //     // var t = getExistEntity();
        //     $q.all([p,]).then(function (res) {

        //         q.resolve();
        //     }, function (err) {

        //         q.reject();

        //     })

        //     return q.promise;


        // }



        var getBankBranches = function () {
            ajax.get("BankBranch/list").then(function (res) {
                vm.BankBranches = res;
            }, function (err) {
                var e = err;
            })
        }



        getExistEntity = function () {

            ajax.get('ShareIssue/get', null, { id: vm.entity.vchId }).then(function (res) {
                vm.entity = res;
                vm.entity.vchDate=new Date(res.vchDate);
            }, function (err) {

            })

        }

        $scope.init = function () {
            vm.entity = {};
            var q = $q.defer();

            var p = getBankBranches();
            var r = getMembers();

             var t = getExistEntity();
            $q.all([p,r,t]).then(function (res) {

                q.resolve();
            }, function (err) {

                q.reject();

            })

            return q.promise;


        }


        $scope.init().then(function (res) {
            vm.action();
            if ($stateParams.id != null) {
                vm.entity.vchId = $stateParams.id;
                getExistEntity();
            }

        });


    }
])


