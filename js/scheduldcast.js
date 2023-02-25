var myApp = angular.module('myApp');
myApp.controller('schedulddashCtrl', ['$scope', '$state',  'ajax', 'R1Util',
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
                field: 'scCode',
                displayName: 'नंबर',
                enableSorting: true,
                type: 'number',
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "35%"
            },
            {
                field: 'scName',
                displayName: 'वर्गाचे नाव',
                enableSorting: true,
                type: 'number',
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "35%"
            },
          
            {
                name: 'Action ',
                enableSorting: false,
                enableCellEdit: false,
                width: "30%",
                cellTemplate: '<center><a role="button" ng-click="grid.appScope.vm.edit(grid, row)"><i class="bi bi-eye"></i></a>&nbsp &nbsp <a  role="button" ng-click="grid.appScope.vm.remove(grid, row)"><i class="bi bi-trash3"></i></a></center>'
            }
        ];



        vm.edit = function (grid, row) {
            var param = {
                action: 'view',
                id: row.entity.scCode
            };
            $state.go('parent.sub.scheduldcast', param);
        };

        vm.remove = function (grid, row) {
            if (row.entity.scCode) {
                $scope.grid = grid;
                $scope.param = { "id": row.entity.scCode };
                $scope.index = vm.serviceGrid.data.indexOf(row.entity);

                R1Util.createAlert($scope, "Warning", "Do You Want Delete Row", $scope.iConfirmFn);

            }
        }

        $scope.iConfirmFn = function () {
            ajax.delete('scheduldcast', null, $scope.param).then(function (res) {
                $scope.grid.appScope.vm.serviceGrid.data.splice($scope.index, 1);
            })

        }

        vm.getRecords = function () {
         
            ajax.get('scheduldcast/list', null).then(function (res) {
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

myApp.controller('scheduldcastCtrl', ['$scope', '$stateParams', '$q', '$rootScope',  'R1Util',  'ajax', 'Master','invalid',
    function ($scope, $stateParams, $q, $rootScope, R1Util, ajax,Master,invalid) {

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
    
                       if (vm.entity.scCode != undefined) {
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
                if ($scope.scheduldcastform.$valid) {
                    $(".loading").show();
                    if (!vm.entity.scCode)
                        ajax.post('scheduldcast/insert', vm.entity).then(function (res) {

                                vm.entity.scCode = res.scCode;
                                $(".loading").hide();
    
                                $scope.message = "Record Saved Sucessfully";
                                R1Util.createAlert($scope, "Success", $scope.message, null);
                                pastEntity = angular.copy(vm.entity);
                                fn("OK");
    
                            },  function (err) {
                                $(".loading").hide();
                                vm.mode = 'edit';
                                fn("CANCEL")
                                R1Util.createAlert($scope, "Error", err.msg, null);
                            }) 
    
                          
                       
                    else {
                        ajax.put('scheduldcast/update', vm.entity, { id: vm.entity.scCode}).then(function (res) {
                        
                                $(".loading").hide();
                                $scope.message = "Record Saved Sucessfully";
                                R1Util.createAlert($scope, "Success", $scope.message, null);
                                pastEntity = angular.copy(vm.entity);
                                fn("OK");
                            } ,function (err) {
                                $(".loading").hide();
                                vm.mode = 'edit';
                                fn("CANCEL")
                                R1Util.createAlert($scope, "Error", err.msg, null);
        
                            })
                    }
    
                }  else {
                    vm.mode = 'edit';
                    var fields= invalid.Error($scope.scheduldcastform);
                     R1Util.createAlert($scope, "Error", fields, null);
                    // R1Util.createAlert($scope, "Error", "Validation Failed", null);
                }
            }
            vm.newrecord = function () {
                pastEntity = angular.copy(vm.entity);
                vm.entity = {};
    
            }

            getExistEntity = function () {

                ajax.get('scheduldcast/get', null, { id: vm.entity.scCode}).then(function (res) {
                    vm.entity = res;
                    pastEntity = angular.copy(vm.entity);
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
            vm.entity.scCode = $stateParams.id;
            getExistEntity();
        }

    });





     
    }
])