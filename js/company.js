

myApp.controller('companyCtrl', ['$scope', '$stateParams', '$q', '$rootScope', 'R1Util', 'ajax', 'Master',

    function ($scope, $stateParams, $q, $rootScope, R1Util, ajax, Master) {

        var vm = this;
        $scope.Master = Master;
        vm.mode = 'new';

        if ($stateParams.action)
            vm.mode = $stateParams.action;



        vm.getRecords = function () {

            $(".loading").show();
            ajax.get('Company/get').then(function (res) {
                if (res) {
                    vm.entity = res;
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

        $scope.close = function () {
            $rootScope.back();
        }

        $scope.save = function (fn) {
            if ($scope.companyform.$valid) {
                $(".loading").show();
                // vm.entity.compCode = 2;
                if (!vm.entity.compCode) {
                    ajax.post('Company/insert', vm.entity).then(function (res) {
                        if (res) {
                            vm.entity.compCode = res.compCode;
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
                } else {
                    ajax.put('Company/update', vm.entity, { id: vm.entity.compCode }).then(function (res) {
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

                            vm.mode = 'edit';
                            $(".loading").hide();
                            R1Util.createAlert($scope, "Error", error, null);
                            fn("CANCEL")
                        }

                    })
                }

            }
        }

        // var getPlaces = function () {
        //     ajax.get("Place/list").then(function (res) {
        //         vm.Places = res;
        //     }, function (err) {
        //         var e = err;
        //     })
        // }

        var getPlaces = function () {
            ajax.get("Place/list").then(function (res) {
                // vm.Places = res;
                // vm.entity.cityCode = 1;
                vm.reference.Places = res;
             
            }, function (err) {
                var e = err;
            })
        }

        getExistEntity = function () {

            ajax.get('company/Get', null, { id: $stateParams.id }).then(function (res) {
                vm.entity = res;

            }, function (err) {

            })

        }


        $scope.init = function () {
            vm.entity = {};
            vm.reference = {};
            var q = $q.defer();


            var r = getPlaces();

            var t = getExistEntity();
            $q.all([r, t]).then(function (res) {

                q.resolve();
            }, function (err) {

                q.reject();

            })

            return q.promise;


        }

        $scope.init().then(function (res) {
            vm.action();
            if ($stateParams.id) {
                vm.entity.compCode = $stateParams.id;
                getExistEntity();
            }

        });


        $scope.company = function () {
            $state.go("parent.sub.company");
        }

    }
])