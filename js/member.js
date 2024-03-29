var myApp = angular.module('myApp');
myApp.controller('memberdashCtrl', ['$scope', '$state', 'ajax', 'R1Util','$filter',
    function ($scope, $state, ajax, R1Util,$filter) {

        var vm = this;

        vm.entity = {};

        vm.entity.to_date=new Date();
        vm.entity.from_date=new Date();
       
        vm.entity.from_date= new Date(vm.entity.to_date.getFullYear() - 1,3,1);
        

        // vm.entity.to_date=new Date();
        // vm.entity.from_date=new Date();

        // function addOneYear(date) {
            // Making a copy with the Date() constructor
            // const dateCopy =  vm.entity.from_date;
          // getfullyear = vm.to_date-1 func for full year
            // dateCopy.setFullYear(dateCopy.getFullYear() - 1);
          //inbuild function 
        //     return dateCopy;
        //   }
             
        //   const date = new Date('vm.entity.to_date');      
        //   const newDate = addOneYear(date);
          
        // vm.entity.sdt=new Date();
        // vm.entity.edt=new Date();

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
                field: 'regCode',
                displayName: 'सभासद नंबर',
                enableSorting: true,
                type: 'number',
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "10%"
            },
            {
                field: 'shName',
                displayName: 'सभासद नाव',
                enableSorting: true,
                type: 'string',
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "20%"

            },
            {
                field: 'gender',
                displayName: 'पु./स्त्री',
                enableSorting: true,
                type: 'string',
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "5%"

            },
            {
                field: 'age',
                displayName: 'वय',
                enableSorting: true,
                type: 'string',
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "5%"

            },
            {
                field: 'cityName',
                displayName: 'गांव',
                enableSorting: true,
                type: 'string',
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "15%"

            },

            {
                field: 'reqDt',
                displayName: 'रजि.तारीख',
                enableSorting: true,
                type: 'date',
                cellFilter: 'date:\'dd/MM/yyyy\'',
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "10%"

            },
            {
                field: 'branchName',
                displayName: 'बँक',
                enableSorting: true,
                type: 'string',
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "15%"

            },
            {
                field: 'bankAccNo',
                displayName: 'बँक खाते न.',
                enableSorting: true,
                type: 'string',
                enableCellEdit: false,
                cellClass: 'alignLgrid',
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

        $scope.show = function () {
            $(".loading").show();
            var params = {
                "sdt": $filter('date')(new Date(vm.entity.sdt), 'yyyy/MM/dd'),
                "edt": $filter('date')(new Date(vm.entity.edt), 'yyyy/MM/dd'),
         }
       ajax.get('MemberRequest/list',null,params).then(function (res) {
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
    
        $scope.refreshData = function (){
            $(".loading").show();
            var params = {
                "sdt": $filter('date')(new Date(vm.entity.sdt), 'yyyy/MM/dd'),
                "edt": $filter('date')(new Date(vm.entity.edt), 'yyyy/MM/dd'),
             }
    
            ajax.get('MemberRequest/list',null,params).then(function (res) {
                if (res) {
                    vm.serviceGrid.data = res;
                }
                else {
                    var error ="Error";
                    if (res.error)
                        if (res.error.message)
                            error = res.error.message;
                    R1Util.createAlert($scope, "Error", error, null);
                }
                $(".loading").hide();
            },)
         }


        vm.edit = function (grid, row) {
            var param = {
                action: 'view',
                id: row.entity.regCode
            };
            $state.go('parent.sub.member', param);
        };


        vm.remove = function (grid, row) {

            if (row.entity.regCode) {
                $scope.grid = grid;
                $scope.param = { "id": row.entity.regCode };

                $scope.index = vm.serviceGrid.data.indexOf(row.entity);

                R1Util.createAlert($scope, "Warning", "Do You Want Delete Row", $scope.iConfirmFn);
            }
        }

        $scope.iConfirmFn = function () {
            ajax.delete('MemberRequest', null, $scope.param).then(function (res) {
                $scope.grid.appScope.vm.serviceGrid.data.splice($scope.index, 1);
            })

        }


        $scope.show = function () {
            $(".loading").show();
            var params = {

                "fromdate": $filter('date')(new Date(vm.entity.from_date), 'yyyy/MM/dd'),
                "todate": $filter('date')(new Date(vm.entity.to_date), 'yyyy/MM/dd'),
         
            
            }


     


            // const currentYear = new Date().getFullYear(); // 2020

            // const previousYear = currentYear - 1;

            // console.log(previousYear); // 2019

            // new Date(new Date().setFullYear(new Date().getFullYear() + 1))


            ajax.get('MemberRequest/list', null, params).then(function (res) {
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


      



        $scope.refreshData = function () {
            $(".loading").show();
            var params = {
                "fromdate": $filter('date')(new Date(vm.entity.from_date), 'yyyy/MM/dd'),
                "todate": $filter('date')(new Date(vm.entity.to_date), 'yyyy/MM/dd'),
            }

            ajax.get('MemberRequest/list', null, params).then(function (res) {
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

        // vm.getRecords = function () {
        //     $(".loading").show();
        //     ajax.get('MemberRequest/list', null).then(function (res) {
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

myApp.controller('memberCtrl', ['$scope', '$stateParams', '$q', '$rootScope', 'R1Util', 'ajax', 'Master','invalid',
    function ($scope, $stateParams, $q, $rootScope, R1Util, ajax, Master,invalid) {

        var vm = this;
        $scope.Master = Master;
        vm.mode = 'new';
        var pastEntity={};
        var NoViewing=true;
        $scope.Gender = [];
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

                    if (vm.entity.regCode != undefined) {
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
            if ($scope.memberrequestform.$valid) {
                $(".loading").show();

                ajax.put('MemberRequest/update', vm.entity).then(function (res) {
                    vm.entity.regCode = res.regCode;
                    $(".loading").hide();
                    $scope.message = "Record Saved Sucessfully";
                    R1Util.createAlert($scope, "Success", $scope.message, null);
                    pastEntity = angular.copy(vm.entity);
                    fn("OK");


                }, function (err) {
                    vm.mode = 'edit';
                    fn("CANCEL")
                    R1Util.createAlert($scope, "Error", err.msg, null);

                })
            }
            else {
                vm.mode = 'edit';
                // fn("CANCEL")
                // R1Util.createAlert($scope, "Error", 'Validation Failed ', null);
                var fields = invalid.Error($scope.memberrequestform);
                R1Util.createAlert($scope, "Error", fields, null);
            }


        }




        vm.newrecord = function () {
            pastEntity = angular.copy(vm.entity);
            vm.entity = {};
            vm.entity.reqDt = new Date();
            vm.entity.gender = 1;
 }


        var getDesignations = function () {
            ajax.get("Designation/list").then(function (res) {
                // vm.Designations = res;
                // vm.entity.dsgnCode=2;
                vm.reference.Designations = res;
                //vm.entity.dsgnCode = res[0].dsgnCode;
            }, function (err) {
                var e = err;
            })
        }
        var getShareTypes = function () {
            ajax.get("sharetype/list").then(function (res) {
                // vm.ShareTypes = res;
                // vm.entity.shType=1;
                vm.reference.shares = res;
                //vm.entity.shType = res[0].shTypeCode;
            }, function (err) {
                var e = err;
            })
        }



        var getReligions = function () {
            ajax.get("religion/list").then(function (res) {
                // vm.Religions = res;
                //     vm.entity.castCode=1;
                vm.reference.Religions = res;
              //  vm.entity.castCode = res[0].castCode;

            }, function (err) {
                var e = err;
            })
        }




        var getOccupations = function () {
            ajax.get("Occupation/list").then(function (res) {
                // vm.Occupations = res;
                // vm.entity.ocpName=1;
                vm.reference.Occupations = res;
               // vm.entity.ocpCode = res[0].ocpCode;
            }, function (err) {
                var e = err;
            })
        }








 

        var getPlaces = function () {
            ajax.get("Place/list").then(function (res) {
                // vm.Places = res;
                // vm.entity.cityCode=1;
                vm.reference.Places = res;
                //vm.entity.cityCode = res[0].cityCode;
            }, function (err) {
                var e = err;
            })
        }




        var getBankBranches = function () {
            ajax.get("BankBranch/list").then(function (res) {
                
                vm.reference.BankBranches = res;
                //vm.entity.bankCode = res[0].branchCode;
                // vm.entity.bankCode=res[1].bankCode;

            }, function (err) {
                var e = err;
            })
        }

        getExistEntity = function () {

            ajax.get('MemberRequest/Get', null, { id: vm.entity.regCode }).then(function (res) {
              
                vm.entity = res;
                vm.entity.reqDt = new Date(vm.entity.reqDt);
                pastEntity = angular.copy(vm.entity);
            }, function (err) {

            })

        }

        $scope.init = function () {
            vm.entity = {};
            vm.reference = {};
            var q = $q.defer();

            var p = getBankBranches();
            var y = getDesignations();
            var a = getOccupations();
            var g = getReligions();
            var r = getPlaces();
            var x = getShareTypes();
           

            $q.all([p, y, a, g, r, x]).then(function (res) {
                

                q.resolve();
            }, function (err) {

                q.reject();

            })

            return q.promise;


        }

        $scope.init().then(function (res) {
            vm.action();
            if ($stateParams.id) {
                vm.entity.regCode = $stateParams.id;
                getExistEntity();
            }

        });



        $scope.Gender = [
            {
                "value": 0,
                "name": "पुरुष"
            },
            {
                "value": 1,
                "name": "स्त्री"
            },


        ]


    }
])