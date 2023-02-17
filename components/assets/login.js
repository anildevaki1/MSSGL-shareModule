var myApp = angular.module('myApp');
myApp.controller('loginCtrl', ['$scope', '$state', 'ajax', 'R1Util','cache',
    function ($scope, $state, ajax, R1Util,cache) {
        $scope.login = function () {
            ajax.get("UserInfo/login", null, { username: $scope.username, psw: $scope.psw }).then((res) => {
                if (res == "success")
                {
                cache.set("username",$scope.username)
                    $state.go("parent.sub.home");
                }
                else
                    R1Util.createAlert($scope, "error", "Invalid User Name or Password");
            }, (err) => {

                R1Util.createAlert($scope, "error", "Something Went Wrong");
            });

        }

        $scope.forgetpass=()=>{
            R1Util.createAlert($scope, "Warning", "Are you sure, Do you want to reset password", $scope.iConfirmFn);
        }
        $scope.iConfirmFn=()=>{
            ajax.get("UserInfo/forgotPassword", null, { id: $scope.username}).then((res) => {
                if (!res == "success")
                    R1Util.createAlert($scope, "error", "Invalid User Name");
            }, (err) => {

                R1Util.createAlert($scope, "error", "Something Went Wrong");
            });
        }
    }])