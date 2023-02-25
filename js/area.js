var myApp = angular.module('myApp');
myApp.controller('areadashCtrl', ['$scope', 'ajax', '$state', 'R1Util',
    function ($scope, ajax, $state, R1Util) {

        var vm = this;

        vm.serviceGrid = {
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,
            enableSorting: true,
            enableFiltering: true,
            enableGridMenu: true,
            paginationPageSizes: [30, 50, 100]

        };


        vm.serviceGrid.columnDefs = [

            {
                field: 'areaCode',
                displayName: 'नंबर ',
                enableSorting: true,
                type: 'number',
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "10%"
            },
            {
                field: 'areaName',
                displayName: 'गटाचे नाव',
                enableSorting: true,
                type: 'string',
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "50%"
            },
            {
                field: 'panchayatName',
                displayName: 'पंचायत',
                enableSorting: true,
                type: 'string',
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "30%"
            },

            {
                name: 'Action',
                enableSorting: false,
                enableCellEdit: false,
                width: "10%",
                cellTemplate: '<center><a role="button" ng-click="grid.appScope.vm.edit(grid, row)"><i class="bi bi-eye"></i></a>&nbsp &nbsp <a  role="button" ng-click="grid.appScope.vm.remove(grid, row)"><i class="bi bi-trash3"></i></a></center>'
            }
        ];



        vm.edit = function (grid, row) {
            var param = {
                action: 'view',
                id: row.entity.areaCode
            };

            $state.go('parent.sub.area', param);
        };


        vm.remove = function (grid, row) {

            if (row.entity.areaCode) {
                $scope.grid = grid;
                $scope.param = { "id": row.entity.areaCode };

                $scope.index = vm.serviceGrid.data.indexOf(row.entity);

                R1Util.createAlert($scope, "Warning", "Do You Want Delete Row", $scope.iConfirmFn);
            }
        }

        $scope.iConfirmFn = function () {
            ajax.delete('area', null, $scope.param).then(function (res) {
                $scope.grid.appScope.vm.serviceGrid.data.splice($scope.index, 1);
            })

        }

        vm.getRecords = function () {

            ajax.get('area/list', null).then(function (res) {
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

        vm.getRecords();



    }

])

myApp.controller('areaCtrl', ['$scope', '$stateParams', '$q', 'ShareData', 'ajax', 'R1Util', 'Master', '$rootScope','invalid',
    function ($scope, $stateParams, $q, shareData, ajax, R1Util, Master, $rootScope,invalid) {

        var vm = this;
        $scope.Master = Master;

        vm.mode = 'new';
        var pastEntity = {};
        var NoViewing = true;

        if ($stateParams.action)
            vm.mode = $stateParams.action;

        vm.panchayats = [];


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

                    if (vm.entity.areaCode != undefined) {
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
            if ($scope.areaform.$valid) {
                $(".loading").show();
                if (!vm.entity.areaCode)
                    ajax.post('area/insert', vm.entity).then(function (res) {


                        vm.entity.areaCode = res.areaCode;

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

                else {
                    ajax.put('area/update', vm.entity, { id: vm.entity.areaCode }).then(function (res) {





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
                // R1Util.createAlert($scope, "Error", "Validation Failed", null);
                
                // invalid.Error($scope.areaform);
                vm.mode = 'edit';
                var fields = invalid.Error($scope.areaform);
                R1Util.createAlert($scope, "Error", fields, null);
            }
        }
        vm.newrecord = function () {
            pastEntity = angular.copy(vm.entity);
            vm.entity = {};
            // vm.reference = {};


            // getPanchayats();

        }


      
        var getPanchayats = function () {
            ajax.get("panchayat/list").then(function (res) {
                // vm.panchayats = res;
                vm.reference.areas = res;
                // vm.entity.panchayatCode = res[0].panchayatCode;
                // vm.entity.panchayatCode=1;

            }, function (err) {
                var e = err;
            })
        }

      
        getExistEntity = function () {

            ajax.get('area/get', null, { id: vm.entity.areaCode }).then(function (res) {
                vm.entity = res;
                pastEntity = angular.copy(vm.entity);
            }, function (err) {

            })

        }

        $scope.init = function () {
            vm.entity = {};
            vm.reference = {};
            var q = $q.defer();

            var p = getPanchayats();
            $q.all([p]).then(function (res) {

                q.resolve();
            }, function (err) {

                q.reject();

            })

            return q.promise;


        }

        $scope.init().then(function (res) {
            vm.action();
            if ($stateParams.id) {
                vm.entity.areaCode = $stateParams.id;
                getExistEntity();
            }

        });



    }
])