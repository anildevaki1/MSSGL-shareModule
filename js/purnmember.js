myApp.controller('purnmemberdashCtrl', ['$scope', '$state', 'ajax', 'R1Util',
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
                field: 'regDt',
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
                width: "12%"

            },
            {
                field: 'bankAccNo',
                displayName: 'बँक खाते न.',
                enableSorting: true,
                type: 'string',
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "8%"

            },
            {
                field: 'reqCode',
                displayName: ' अ.स. खाते न.',
                enableSorting: true,
                type: 'string',
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "7%"

            },

            {
                name: 'Action ',
                enableSorting: false,
                enableCellEdit: false,
                width: "8%",
                cellTemplate: '<center><a role="button" ng-click="grid.appScope.vm.edit(grid, row)"><i class="bi bi-eye"></i></a>&nbsp &nbsp <a  role="button" ng-click="grid.appScope.vm.remove(grid, row)"><i class="bi bi-trash3"></i></a></center>'
            }
        ];


        vm.edit = function (grid, row) {
            var param = {
                action: 'view',
                id: row.entity.regCode
            };
            $state.go('parent.sub.purnmember', param);
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
            ajax.delete('Member', null, $scope.param).then(function (res) {
                $scope.grid.appScope.vm.serviceGrid.data.splice($scope.index, 1);
            })

        }

        vm.getRecords = function () {
            $(".loading").show();
            ajax.get('Member/list', null).then(function (res) {

                vm.serviceGrid.data = res;

                $(".loading").hide();
            }, function (err) {
                R1Util.createAlert($scope, "Error", err.msg, null);
            })
        }

        vm.getRecords()


    }


])

myApp.controller('purnmemberCtrl', ['$scope', '$stateParams', '$q', '$rootScope', 'R1Util', 'ajax', 'Master', 'invalid',
    function ($scope, $stateParams, $q, $rootScope, R1Util, ajax, Master, invalid) {

        var vm = this;
        $scope.Master = Master;
        vm.mode = 'new';
        vm.entity = {};
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

                    if (vm.entity.vch_id != undefined) {
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

        $scope.getMemberRequestdetail = function () {
            if (vm.entity.reqCode) {
                var param = {
                    id: vm.entity.reqCode
                }
                $(".loading").show();
                ajax.get('MemberRequest/get', null, param).then(function (res) {

                    vm.entity.reqCode = res.regCode;
                    vm.entity.shName = res.shName;
                    vm.entity.shType = res.shType;
                    vm.entity.cityCode = res.cityCode;
                    vm.entity.dsgnCode = res.dsgnCode;
                    vm.entity.ocpCode = res.ocpCode;
                    vm.entity.shAddress = res.shAddress;
                    vm.entity.shNominee = res.shNominee;
                    vm.entity.shNomineeRelation = res.shNomineeRelation;
                    vm.entity.gender = res.gender;
                    vm.entity.age = res.age;
                    vm.entity.castCode = res.castCode;
                    vm.entity.bankCode = res.bankCode;
                    vm.entity.bankAccNo = res.bankAccNo;
                    // vm.entity.regDt= new Date(res.reqDt);

                    $(".loading").hide();
                }, function (err) {

                    R1Util.createAlert($scope, "Error", err.msg, null);

                })
            }


        }

        $scope.save = function (fn) {
            if ($scope.memberform.$valid) {
                $(".loading").show();

                ajax.put('Member/update', vm.entity).then(function (res) {
                     $(".loading").hide();
                    $scope.message = "Record Saved Sucessfully";
                    R1Util.createAlert($scope, "Success", $scope.message, null);
                    vm.entity.regCode = res.regCode;
                    pastEntity = angular.copy(vm.entity);
                    fn("OK");

                },function (err) {
                    vm.mode = 'edit';
                    fn("CANCEL");
                    R1Util.createAlert($scope, "Error", err.msg, null);
                })

            }
            else {
                vm.mode = 'edit';
                var fields = invalid.Error($scope.memberform);
                R1Util.createAlert($scope, "Error", fields, null);
            }
        }


        vm.newrecord = function () {
            pastEntity = vm.entity;
            vm.entity = {};
            vm.entity.gender = 1;
            vm.entity.regDt = new Date();
            vm.entity.deathDate = new Date();
        }

        var getDesignations = function () {
            ajax.get("Designation/list").then(function (res) {
               
                vm.reference.Designations = res;

            }, function (err) {
                var e = err;
            })
        }




        var getOccupations = function () {
            ajax.get("Occupation/list").then(function (res) {

                vm.reference.Occupations = res;

            }, function (err) {
                var e = err;
            })
        }

        var getReligions = function () {
            ajax.get("religion/list").then(function (res) {

                vm.reference.Religions = res;

            }, function (err) {
                var e = err;
            })
        }



        var getShareTypes = function () {
            ajax.get("sharetype/list").then(function (res) {
                vm.reference.shares = res;


            }, function (err) {
                var e = err;
            })
        }

        var getPlaces = function () {
            ajax.get("Place/list").then(function (res) {
                // vm.Places = res;
                // vm.entity.cityCode = 1;
                vm.reference.Places = res;

            }, function (err) {
                var e = err;
            })
        }




        var getBankBranches = function () {
            ajax.get("BankBranch/list").then(function (res) {
                // vm.BankBranches = res;
                // vm.entity.bankCode=1;
                vm.reference.BankBranches = res;

            }, function (err) {
                var e = err;
            })
        }

        getExistEntity = function () {

            ajax.get('Member/Get', null, { id: vm.entity.regCode }).then(function (res) {

                vm.entity = res;
                vm.entity.regDt = new Date(vm.entity.regDt);
                vm.entity.deathDate = new Date(vm.entity.deathDate);
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