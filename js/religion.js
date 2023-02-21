var myApp = angular.module('myApp');
myApp.controller('religiondashCtrl', ['$scope', '$state',  'ajax', 'R1Util',
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
                field: 'castName',
                displayName: 'जात',
                enableSorting: true,
                type: 'string',
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "30%"

            },
 
            {
                field: 'religionName',
                displayName: 'धर्म',
                enableSorting: true,
                type: 'string',
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "20%"

            },
            {
                field: 'scCodeNavigation.scName',
                displayName: 'अनुसूचित जाती/जमाती',
                enableSorting: true,
                type: 'string',
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "30%"

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
                id: row.entity.castCode
            };
            $state.go('parent.sub.religion', param);
        };

        vm.remove = function (grid, row) {
            if (row.entity.castCode) {
                $scope.grid = grid;
                $scope.param = { "id": row.entity.castCode };
                $scope.index = vm.serviceGrid.data.indexOf(row.entity);

                R1Util.createAlert($scope, "Warning", "Do You Want Delete Row", $scope.iConfirmFn);

            }
        }

        $scope.iConfirmFn = function () {
            ajax.delete('religion', null, $scope.param).then(function (res) {
                $scope.grid.appScope.vm.serviceGrid.data.splice($scope.index, 1);
            })

        }

        vm.getRecords = function () {
            $(".loading").show();
            ajax.get('religion/list', null).then(function (res) {
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

myApp.controller('religionCtrl', ['$scope', '$stateParams', '$q', '$rootScope',  'R1Util',  'ajax', 'Master',
    function ($scope, $stateParams, $q, $rootScope, R1Util, ajax,Master) {

        var vm = this;
        $scope.Master = Master;
        vm.mode = 'new';
        var pastEntity={};
        var  NoViewing=true;


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
    
                    if (vm.entity.castCode != undefined) {
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
                if ($scope.religionform.$valid) {
                    $(".loading").show();
                    if (!vm.entity.castCode)
                        ajax.post('Religion/insert', vm.entity).then(function (res) {
                            if (res) {
                                vm.entity.castCode = res.castCode;
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
                        ajax.put('religion/update', vm.entity, { id: vm.entity.castCode }).then(function (res) {
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
    
                } else
                {
                    vm.mode = 'edit';
                    $(".loading").hide();
                    R1Util.createAlert($scope, "Error", err.msg, null);
                    fn("CANCEL")
                }


            }


           

            vm.newrecord = function () {
                pastEntity = angular.copy(vm.entity);
                vm.entity = {};
                vm.reference.ScheduldCasts=[];
              
    
            }


            var getScheduldCasts = function () {
                ajax.get("ScheduldCast/list").then(function (res) {
                    // vm.ScheduldCasts = res;
                    // vm.entity.scCode=1;
                    vm.reference.ScheduldCasts=res;
                    vm.entity.scCode=res[0].scCode;
                
                }, function (err) {
                    var e = err;
                })
            }


           
        getExistEntity = function () {

            ajax.get('Religion/get', null,{id: vm.entity.castCode} ).then(function (res) {
                vm.entity = res;
              
                pastEntity = angular.copy(vm.entity);
            }, function (err) {
                R1Util.createAlert($scope, "Error", err.msg, null);
            })

        }

    

        $scope.init = function () {
            vm.entity = {};
            vm.reference={};
            var q = $q.defer();

            var p = getScheduldCasts();
            var s=getExistEntity()
            $q.all([p,s]).then(function (res) {

                q.resolve();
            }, function (err) {

                q.reject();

            })

            return q.promise;


        }

      
        $scope.init().then(function (res) {
            vm.action();
            if ($stateParams.id) {
                vm.entity.castCode = $stateParams.id;
                getExistEntity();
            }

        });


    

    }
])