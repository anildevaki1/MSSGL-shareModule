var myApp = angular.module('myApp');
myApp.controller('placedashCtrl', ['$scope', '$state', 'ajax', 'R1Util', 'invalid',
    function ($scope, $state, ajax, R1Util, invalid) {

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
                field: 'serialNo',
                displayName: 'अनुक्रमांक',
                enableSorting: true,
                type: 'string',
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "10%"

            },

            {
                field: 'cityName',
                displayName: 'गावाचे नाव',
                enableSorting: true,
                type: 'string',
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "10%"

            },
            {
                field: 'taluka',
                displayName: 'तालुका',
                enableSorting: true,
                type: 'string',
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "15%"

            },
            {
                field: 'district',
                displayName: 'जिल्हा  ',
                enableSorting: true,
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "15%"

            },
            {
                field: 'state',
                displayName: 'राज्य',
                enableSorting: true,
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "20%"
            },
            {
                field: 'area.areaName',
                displayName: 'गटाचे नाव ',
                enableSorting: true,
                type: 'string',
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
                id: row.entity.cityCode
            };
            $state.go('parent.sub.place', param);
        };

        vm.remove = function (grid, row) {
            if (row.entity.cityCode) {
                $scope.grid = grid;
                $scope.param = { "id": row.entity.cityCode };
                $scope.index = vm.serviceGrid.data.indexOf(row.entity);

                R1Util.createAlert($scope, "Warning", "Do You Want Delete Row", $scope.iConfirmFn);

            }
        }

        $scope.iConfirmFn = function () {
            ajax.delete('place', null, $scope.param).then(function (res) {
                $scope.grid.appScope.vm.serviceGrid.data.splice($scope.index, 1);
            })

        }

        vm.getRecords = function () {

            ajax.get('place/list', null).then(function (res) {
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

        vm.getRecords()

    }


])

myApp.controller('placeCtrl', ['$scope', '$stateParams', '$q', '$rootScope', 'R1Util', 'ajax', 'Master', 'invalid',
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
            if ($scope.placeform.$valid) {
                $(".loading").show();
                if (!vm.entity.cityCode)
                    ajax.post('place/insert', vm.entity).then(function (res) {

                        vm.entity.cityCode = res.cityCode;
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
                    ajax.put('place/update', vm.entity, { id: vm.entity.cityCode }).then(function (res) {

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
                var fields = invalid.Error($scope.placeform);
                R1Util.createAlert($scope, "Error", fields, null);
                
            }


        }




        vm.newrecord = function () {
            pastEntity = vm.entity;
            vm.entity = {};
            // vm.reference.areas=[];


        }

        getExistEntity = function () {

            ajax.get('place/get', null, { id: vm.reference.areaCode }).then(function (res) {
                vm.entity = res;
                pastEntity = vm.entity;
            }, function (err) {

            })

        }

        // $scope.init = function () {
        //     vm.entity = {};
        //     var q = $q.defer();

        //         q.resolve();

        //     return q.promise;


        // }



        var getareas = function () {
            ajax.get("Area/list").then(function (res) {
                // vm.areas= res;
                // vm.entity.areaCode=1;
                vm.reference.areas = res;
                vm.entity.areaCode = res[0].areaCode;

            }, function (err) {
                var e = err;
            })
        }


        // getExistEntity = function () {

        //     ajax.get('area/get', null, { id: vm.entity.areaCode }).then(function (res) {
        //         vm.entity = res;

        //     }, function (err) {

        //     })

        // }

        $scope.init = function () {
            vm.entity = {};
            vm.reference = {};
            var q = $q.defer();

            var p = getareas();
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
                vm.reference.areaCode = $stateParams.id;
                getExistEntity();
            }

        });
    }
])


