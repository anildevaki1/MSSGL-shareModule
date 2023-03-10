var myApp = angular.module('myApp');
myApp.controller('castdashCtrl', ['$scope',  '$stateParams','$q',
    function ($scope,  $stateParams ,$q,) {

        var vm = this;
       // vm.entity = {};
        vm.mode = 'new';

        if ($stateParams.action)
            vm.mode = $stateParams.action;

        vm.serviceGrid = {
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,
            enableSorting: true,
            enableFiltering: true,
            enableGridMenu: true,
            paginationPageSizes: [30, 50, 100, 70],
            paginationPageSize: 10
        };


        vm.serviceGrid.columnDefs = [

            {
                field: ' ',
                displayName: 'अनुक्रमांक',
                enableSorting: true,
                type: 'number',
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "20%"
            },
            {
                field: ' ',
                displayName: 'जात',
                enableSorting: true,
                type: 'string',
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "20%"

            },
            {
                field: 'cat_name',
                displayName: 'पोटजात ',
                enableSorting: true,
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "20%"

            },
            {
                field: 'member_name',
                displayName: 'वर्ग ',
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
                cellTemplate: '<center><a role="button" ng-click="grid.appScope.vm.edit(grid, row)"><i class="fa fa-eye fa-md"></i></a>&nbsp &nbsp <a  role="button" ng-click="grid.appScope.vm.remove(grid, row)"><i class="fa fa-trash fa-md"></i></a></center>'
            }
        ];



        // vm.serviceGrid.onRegisterApi = function (gridApi) {

        // $scope.gridApi = gridApi;
    
        //     gridApi.cellNav.on.navigate($scope, function (newRowCol, oldRowCol) {
        //         $scope.gridApi.selection.selectRow(newRowCol.row.entity);
        //     });
        // };

        // vm.action = function () {
        //     var deffered = $q.defer();

        //     vm.navaction(function (res) {
        //         if (res == "OK")
        //             deffered.resolve(res)
        //         else
        //             deffered.reject(res)
        //     })
        //     return deffered.promise;
        // }

        // vm.navaction = function (fn) {
        //     switch (vm.mode) {
        //         case 'new':

        //             $scope.newrecord();
        //             fn("OK")
        //             break;
        //         case 'edit':

        //             if (vm.entity.vch_id != undefined) {
        //                 if (NoViewing == true)
        //                     callbackEdit();
        //                 if (vm.entity.sh012.length != 0 || vm.entity.sh016.length != 0) {
        //                     vm.mode = 'undo'
        //                     R1Util.createAlert($scope, "WarningOk", "Can Not Edit a record Auto Generated by Share Issue ", null);
        //                 }
        //             }
        //             fn("OK")
        //             break;

        //             case 'save':
        //                 $scope.save(function (res) {
        //                     fn(res)
        //                 });
        //             break;

        //         // case 'save':
        //         //     if (vm.pagefor == "APPROVAL")
        //         //         $scope.approval();

        //         //     else {
        //         //         $scope.save(function (res) {
        //         //             vm.params.postdatedchallan = null;
        //         //             //     vm.params.rtgschallan = null;
        //         //             fn(res)
        //         //         });
        //         //     }
        //         //     break;
        //         case 'undo':
        //             vm.params.postdatedchallan = null;
        //             //  vm.params.rtgschallan = null;
        //             fn("OK")

        //             break;


        //         case 'close':
        //             fn("OK")
        //             // $rootScope.back();
        //            $window.history.back();
        //             $state.go("parent.sub.cast");
        //             break;

        //         // case 'close':
        //         //     fn("OK")
        //         //     $rootScope.back();
        //         //     break;

        //         default:
        //             fn("OK")
        //             break;
        //     }
        // };

        // $scope.myarray = [];
        // $scope.save = function (fn) {

        //     $scope.myarray.push(vm.entity);

        //    // vm.serviceGrid.data = $scope.myarray;
        //     vm.serviceGrid.data = res.data;

        // };
       

        // $scope.close = function () {
        //     $state.go('parent.sub.cast', { action: 'close' });
        // }

    }


])



myApp.controller('castCtrl', ['$scope', '$stateParams','$q','$window',
    function ($scope, $stateParams,$q,$window) {

        var vm = this;
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

                    
                // case 'save':
                //     if (vm.pagefor == "APPROVAL")
                //         $scope.approval();

                //     else {
                //         $scope.save(function (res) {
                //             vm.params.postdatedchallan = null;
                //             //     vm.params.rtgschallan = null;
                //             fn(res)
                //         });
                //     }
                //     break;
                case 'undo':
                    vm.params.postdatedchallan = null;
                    //  vm.params.rtgschallan = null;
                    fn("OK")

                    break;


                case 'close':
                    fn("OK")
                  //  $rootScope.back();
                  $window.history.back();
                
                    break;

                // case 'close':
                //     fn("OK")
                //     $rootScope.back();
                //     break;

                default:
                    fn("OK")
                    break;
            }
        };

        $scope.myarray = [];
        $scope.save = function (fn) {

            $scope.myarray.push(vm.entity);
            vm.serviceGrid = $scope.myarray;
            fn("OK")
            
        };

     
    }
])
