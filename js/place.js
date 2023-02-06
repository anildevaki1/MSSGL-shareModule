var myApp = angular.module('myApp');
myApp.controller('placedashCtrl', ['$scope', '$state',  'ajax', 'R1Util',
    function ($scope,$state,ajax, R1Util) {

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
                field: 'cityCode',
                displayName: 'नंबर',
                enableSorting: true,
                type: 'number',
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "15%"
            },
            {
                field: 'areaCode',
                displayName: 'नंबर',
                enableSorting: true,
                type: 'string',
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "15%"

            },
            {
                field: 'cityName',
                displayName: 'गावाचे नाव',
                enableSorting: true,
                type: 'string',
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "15%"

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
                width: "15%"
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
                $scope.param = { "id": row.entity.cityCode};
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
            $(".loading").show();
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
            },)
        }

        vm.getRecords()
     
    }


])

myApp.controller('placeCtrl', ['$scope', '$stateParams', '$q', '$rootScope',  'R1Util',  'ajax', 'Master',
function ($scope, $stateParams, $q, $rootScope, R1Util, ajax,Master)
   {

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
    
                        $scope.newrecord();
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
                if ($scope.placeform.$valid) {
                    $(".loading").show();
                    if (!vm.entity.cityCode)
                        ajax.post('place/insert', vm.entity).then(function (res) {
                            if (res) {
                                vm.entity.cityCode = res.cityCode;
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
                    else {
                        ajax.put('place/update', vm.entity, { id: vm.entity.cityCode }).then(function (res) {
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
    
                                vm.mode ='edit';
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
    
            }

            getExistEntity = function () {

                ajax.get('place/get', null, { id: vm.entity.cityCode}).then(function (res) {
                    vm.entity = res;
    
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
                if ($stateParams.id) {
                    vm.entity.cityCode = $stateParams.id;
                    getExistEntity();
                }
    
            });
    

    

    }
])