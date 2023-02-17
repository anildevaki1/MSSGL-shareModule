var myApp = angular.module('myApp');
myApp.controller('changepswCtrl', ['$scope', '$state', 'ajax', 'R1Util','cache',
    function ($scope, $state, ajax, R1Util,cache) {
        $scope.user = {};
        $scope.username = cache.get('username'); 
        $scope.submit = function () {

            var params = {
                'username':$scope.username,
                'exist': $scope.user.oldpassword,
                'current': $scope.user.newpassword
            }
    
            ajax.get('UserInfo/change', null, params).then(function (res) {
    
           
                // if (res.status_cd) {
                //     $scope.message = "Passward Updated Sucessfully";
                //     R1Util.createAlert($scope, "Success", $scope.message, $scope.iConfirmFn);
                // }
                // else {
                //     var error = "An Error has occured while changing password!";
    
                //     if (res.error)
                //         if (res.error.message)
                //             error = res.error.message;
    
                //     $scope.user = {};
    
                //     $(".loading").hide();
                //     R1Util.createAlert($scope, "Error", error, null);
    
                // }
            
                    if (res == "success"){
                        R1Util.createAlert($scope, "Success"," Passward Updated Sucessfully");
                    }
               else
               R1Util.createAlert($scope, "Warning"," Please Cheak Old Passward");
          
        })
        }

    }])