var myApp = angular.module('myApp');
myApp.controller('chequeissuedashCtrl', ['$scope', '$state', 'ajax', 'R1Util',
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
                field: 'vchId',
                displayName: 'नंबर',
                enableSorting: true,
                type: 'string',
                enableCellEdit: false,
                cellClass: 'alignLgrid',

                width: "11%"
            },

            {
                field: 'vchDate',
                displayName: 'तारीख',
                enableSorting: true,
                type: 'date',
                enableCellEdit: false,
                cellFilter: 'date:\'dd/MM/yyyy\'',
                cellClass: 'alignLgrid',
                width: "11%"

            },

            {
                field: 'regCode',
                displayName: 'नंबर',
                enableSorting: true,
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "11%"

            },
            {
                field: 'regCodeNavigation.shName',
                displayName: 'सभासदाचे नांव',
                enableSorting: true,
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "30%"

            },

            {
                field: 'chNo',
                displayName: 'नंबर',
                enableSorting: true,
                type: 'string',
                enableCellEdit: false,
                cellClass: 'alignLgrid',

                width: "11%"
            },


            {
                field: 'chAmt',
                displayName: 'चेक इश्यू रक्कम ',
                enableSorting: true,
                enableCellEdit: false,
                type: 'number',
                cellFilter: 'number:2',
                cellClass: 'alignRgrid',
                width: "16%"
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
            $state.go('parent.sub.chequeissue', param);
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
            ajax.delete('ChequeIssue', null, $scope.param).then(function (res) {
                $scope.grid.appScope.vm.serviceGrid.data.splice($scope.index, 1);
            })

        }

        vm.getRecords = function () {

            ajax.get('ChequeIssue/list').then(function (res) {
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



    }])

myApp.controller('chequeissueCtrl', [ '$scope', '$stateParams', '$q', '$rootScope', 'R1Util', 'ajax', 'Master','invalid',
    function ($scope, $stateParams, $q, $rootScope, R1Util, ajax, Master,invalid) {
        var vm = this;
        $scope.Master = Master;
        vm.mode = 'new';
         var pastEntity = {};
        var NoViewing=true;
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

                    if (vm.entity.vchId != undefined) {
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
            if ($scope.chequeissueform.$valid) {
                $(".loading").show();
                if (!vm.entity.vchId) {
                   
                    ajax.post('ChequeIssue/insert', vm.entity).then(function (res) {
                       

                            vm.entity.vchId = res.vchId;
                            $(".loading").hide();

                            $scope.message = "Record Saved Sucessfully";
                            R1Util.createAlert($scope, "Success", $scope.message, null);
                            pastEntity = angular.copy(vm.entity);
                            fn("OK");
                        
                    },
                        function (err) {
                            vm.mode = 'edit';
                            $(".loading").hide();
                            fn("CANCEL")
                            R1Util.createAlert($scope, "Error", err.msg, null);
                        })
                } else {
                    ajax.put('ChequeIssue/update', vm.entity, { id: vm.entity.vchId }).then(function (res) {
                     
                            $(".loading").hide();

                            $scope.message = "Record Saved Sucessfully";
                            R1Util.createAlert($scope, "Success", $scope.message, null);
                            pastEntity = angular.copy(vm.entity);
                            fn("OK");
                         




                    }, function (err) {
                        vm.mode = 'edit';
                        $(".loading").hide();
                        fn("CANCEL")
                        R1Util.createAlert($scope, "Error", err.msg, null);
                    })
                }

            }
            else
            {
                vm.mode = 'edit';
                var fields = invalid.Error($scope.chequeissueform);
                R1Util.createAlert($scope, "Error", fields, null);
                // $(".loading").hide();
                // R1Util.createAlert($scope, "Error", err.msg, null);
                // fn("CANCEL")
            }




        }

        vm.newrecord = function () {
             pastEntity = vm.entity;
            vm.entity = {};
            vm.entity.regCodeNavigation = {};
            vm.entity.vchDate = new Date();
            vm.entity.chDt = new Date();
        }

     


        $scope.init = function () {
            vm.entity = {};
            var q = $q.defer();
           
           
            q.resolve();
            

            return q.promise;


        }

        getExistEntity = function () {

            ajax.get('ChequeIssue/get', null, { id: vm.entity.vchId }).then(function (res) {
                vm.entity = res;
                vm.entity.vchDate = new Date(vm.entity.vchDate);
                vm.entity.chDt = new Date(vm.entity.chDt);
                pastEntity = vm.entity;
            }, function (err) {

            })

        }


        $scope.init().then(function (res) {
            vm.action();
            if ($stateParams.id) {
                vm.entity.vchId = $stateParams.id;
                getExistEntity();
            }

        });

        

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
                    
                        var error = err.msg
                        if (err.error)
                            if (err.error.message)
                                error = err.error.message;
                        R1Util.createAlert($scope, "Error", error, null);
                    
                })
            }
            else
            {
                vm.entity.regCodeNavigation ={};
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
                displayName: " स. नंबर",
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






    }])