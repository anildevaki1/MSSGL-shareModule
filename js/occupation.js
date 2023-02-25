var myApp = angular.module('myApp');
myApp.controller('occupationdashCtrl', ['$scope', '$state',  'ajax', 'R1Util',
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
                field: 'ocpName',
                displayName: 'व्यवसायाचे नाव',
                enableSorting: true,
                type: 'string',
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "70%"

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
                id: row.entity.ocpCode
            };
            $state.go('parent.sub.occupation', param);
        };

        vm.remove = function (grid, row) {
            if (row.entity.ocpCode) {
                $scope.grid = grid;
                $scope.param = { "id": row.entity.ocpCode };
                $scope.index = vm.serviceGrid.data.indexOf(row.entity);

                R1Util.createAlert($scope, "Warning", "Do You Want Delete Row", $scope.iConfirmFn);

            }
        }

        $scope.iConfirmFn = function () {
            ajax.delete('occupation', null, $scope.param).then(function (res) {
                $scope.grid.appScope.vm.serviceGrid.data.splice($scope.index, 1);
            })

        }


        vm.getRecords = function () {
         
            ajax.get('occupation/list', null).then(function (res) {
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

myApp.controller('occupationCtrl', ['$scope', '$stateParams', '$q', '$rootScope',  'R1Util',  'ajax', 'Master','invalid',
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
    
                    if (vm.entity.ocpCode != undefined) {
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
                if ($scope.occupationform.$valid) {
                    $(".loading").show();
                    if (!vm.entity.ocpCode)
                        ajax.post('occupation/insert', vm.entity).then(function (res) {
                        
                                vm.entity.ocpCode = res.ocpCode;
                                $(".loading").hide();
    
                                $scope.message = "Record Saved Sucessfully";
                                R1Util.createAlert($scope, "Success", $scope.message, null);
                                pastEntity = angular.copy(vm.entity);
                                fn("OK");
    
                            } ,
                            function (err) {
                                $(".loading").hide();
                                vm.mode = 'edit';
                                fn("CANCEL")
                                R1Util.createAlert($scope, "Error", err.msg, null);
                            })
                    else {
                        ajax.put('occupation/update', vm.entity, { id: vm.entity.ocpCode}).then(function (res) {
                          
                                $(".loading").hide();
                                $scope.message = "Record Saved Sucessfully";
                                R1Util.createAlert($scope, "Success", $scope.message, null);
                                pastEntity = angular.copy(vm.entity);
                                fn("OK");
                            } , function (err) {
                                $(".loading").hide();
                                vm.mode = 'edit';
                                fn("CANCEL")
                                R1Util.createAlert($scope, "Error", err.msg, null);
        
                            })
                    }
    
                } else {
                    // R1Util.createAlert($scope, "Error", "Validation Failed", null);
                    // invalid.Error($scope.occupationform);
                    vm.mode = 'edit';
                    var fields = invalid.Error($scope.occupationform);
                    R1Util.createAlert($scope, "Error", fields, null);
                }
            }

            vm.newrecord =function(){
                pastEntity = angular.copy(vm.entity);
                vm.entity = {};
             
            }

            getExistEntity = function () {

                ajax.get('occupation/get', null, { id: vm.entity.ocpCode}).then(function (res) {
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
                    vm.entity.ocpCode = $stateParams.id;
                    getExistEntity();
                }
    
            });
    

     

    }
])