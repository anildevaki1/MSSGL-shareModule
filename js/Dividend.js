var myApp = angular.module('myApp');
myApp.controller('DividendCtrl', ['$scope', '$state', 'ajax', 'R1Util',
    function ($scope, $state, ajax, R1Util) {
        var vm = this;
        vm.serviceGrid = {
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,
            enableSorting: true,
            enableFiltering: true,
            enableGridMenu: true,
            showColumnFooter: true,
            paginationPageSizes: [30, 50, 100, 70],

        };

        var sumcramt2 = function () {

            var sum = 0;
            vm.serviceGrid.data.forEach(function (item) {
              sum = sum + item.cramt2;
            });
            return sum;
          };
        

        vm.serviceGrid.columnDefs = [
 {
                field: 'regCode',
                displayName: 'नंबर',
                enableSorting: true,
                enableCellEdit: false,
                cellClass: 'alignLgrid',

                width: "20%"

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
                field: 'noOfShares',
                displayName: 'एकूण शेअर्स',
                enableSorting: true,
                enableCellEdit: false,
                type: 'number',
                cellFilter: 'number:2',
                cellClass: 'alignRgrid',
                width: "15%"
            },
            {
                field: 'cramt1',
                displayName: 'किंमत',
                enableSorting: true,
                enableCellEdit: false,
                type: 'number',
                cellFilter: 'number:2',
                cellClass: 'alignRgrid',
                 footerCellTemplate: '<div class="ui-grid-cell-contents" >एकूण:</div>' ,
                width: "20%"
            },
            {
                field: 'cramt2',
                displayName: 'लाभांश',
                enableSorting: true,
                enableCellEdit: false,
                type: 'number',
                cellFilter: 'number:2',
                cellClass: 'alignRgrid',
                aggregationType: sumcramt2,
                footerCellTemplate: '<div class="ui-grid-cell-contents"  style="text-align: right;">{{col.getAggregationValue() | INR }}</div>',
                aggregationHideLabel: true,
                width: "15%"
            },


            // {
            //     field: 'cramt2',
            //     displayName: 'एकूण',
            //     enableSorting: true,
            //     enableCellEdit: false,
            //     type: 'number',
            //     cellFilter: 'number:2',
            //     cellClass: 'alignRgrid',
            //     aggregationType: sumcramt2,
            //     footerCellTemplate: '<div class="ui-grid-cell-contents"  style="text-align: right;">{{col.getAggregationValue() | INR }}</div>',
            //     aggregationHideLabel: true,
                
            //     width: "15%"
            // },


           
        ];

        // vm.edit = function (grid, row) {
        //     var param = {
        //         action: 'view',
        //         id: row.entity.vchId
        //     };
        //     $state.go('parent.sub.Divident', param);
        // };


        // vm.remove = function (grid, row) {
        //     if (row.entity.vchId) {
        //         $scope.grid = grid;
        //         $scope.param = { "id": row.entity.vchId };
        //         $scope.index = vm.serviceGrid.data.indexOf(row.entity);

        //         R1Util.createAlert($scope, "Warning", "Do You Want Delete Row", $scope.iConfirmFn);

        //     }
        // }

        // $scope.iConfirmFn = function () {
        //     ajax.delete('Dividend', null, $scope.param).then(function (res) {
        //         $scope.grid.appScope.vm.serviceGrid.data.splice($scope.index, 1);
        //     })

        // }

//         vm.getRecords = function () {

// var params={

//     year:
// }

//             ajax.get('Dividend/list',params).then(function (res) {
//                 if (res) {
//                     vm.serviceGrid.data = res;
//                 }
//                 else {
//                     var error = "Error";
//                     if (res.error)
//                         if (res.error.message)
//                             error = res.error.message;
//                     R1Util.createAlert($scope, "Error", error, null);
//                 }
//                 $(".loading").hide();
//             },)
//         }

        // vm.getRecords()


        // $scope.save = function (fn) {
        //     if ($scope.divopenform.$valid) {
        //         $(".loading").show();
        //         if (!vm.entity.vchId)
        //             ajax.post('Dividend/insert', vm.entity).then(function (res) {
        //                 if (res) {

        //                     vm.entity.vchId = res.vchId;
        //                     $(".loading").hide();

        //                     $scope.message = "Record Saved Sucessfully";
        //                     R1Util.createAlert($scope, "Success", $scope.message, null);
        //                     pastEntity = angular.copy(vm.entity);
        //                     fn("OK");
        //                 }
        //                 else {
        //                     var error = "An Error has occured while saving record!";

        //                     if (res.error)
        //                         if (res.error.message)
        //                             error = res.error.message;

        //                     vm.mode = 'edit';
        //                     $(".loading").hide();
        //                     R1Util.createAlert($scope, "Error", error, null);
        //                     fn("CANCEL")
        //                 }
        //             },
        //                 function (err) {
        //                     console.log(err);
        //                 })
        //         else {
        //             ajax.put('payment/update', vm.entity, { id: vm.entity.vchId }).then(function (res) {
        //                 if (res) {
        //                     $(".loading").hide();

        //                     $scope.message = "Record Saved Sucessfully";
        //                     R1Util.createAlert($scope, "Success", $scope.message, null);
        //                     pastEntity = angular.copy(vm.entity);
        //                     fn("OK");
        //                 }
        //                 else {
        //                     var error = "An Error has occured while saving record!";

        //                     if (res.error)
        //                         if (res.error.message)
        //                             error = res.error.message;

        //                     vm.mode = 'edit';
        //                     $(".loading").hide();
        //                     R1Util.createAlert($scope, "Error", error, null);
        //                     fn("CANCEL")
        //                 }




        //             })
        //         }

        //     }




        // }

 $scope.showfn = function(){
    if($scope.divopenform.$valid)
    {
    ajax.post('Dividend/insert',null,{yr:vm.entity.yr,divRate: vm.entity.divRate}).then(function (res) {
       vm.serviceGrid.data=res;
    },function(err)
    {
        alert(err);
    })
}
    else
    alert("Validation Failed")
 }



 $scope.remove=function(){
    R1Util.createAlert($scope, "Warning", "Do You Want Delete Row", $scope.iConfirmFn);
    
 }

 $scope.iConfirmFn=()=>{

    ajax.delete('Dividend',null,{yr:vm.entity.yr}).then(function (res) {
      
    },function(err)
    {
        alert(err);
    })



 }


    }])
    // myApp.controller('DividentCtrl', [ '$scope', '$stateParams', '$q', '$rootScope', 'R1Util', 'ajax', 'Master',
    // function ($scope, $stateParams, $q, $rootScope, R1Util, ajax, Master) {

    //     var vm = this;
    //     $scope.Master = Master;
    //     vm.mode = 'new';
    //     var pastEntity = {};


    //     if ($stateParams.action)
    //     vm.mode = $stateParams.action;

    //     vm.action = function () {
    //         var deffered = $q.defer();

    //         vm.navaction(function (res) {
    //             if (res == "OK")
    //                 deffered.resolve(res)
    //             else
    //                 deffered.reject(res)
    //         })
    //         return deffered.promise;
    //     }

    //     vm.navaction = function (fn) {
    //         switch (vm.mode) {
    //             case 'new':
    //                 vm.newrecord();
    //                 fn("OK")
    //                 break;
    //             case 'edit':

    //                 if (vm.entity.vch_id != undefined) {
    //                     if (NoViewing == true)
    //                         callbackEdit();
    //                     if (vm.entity.sh012.length != 0 || vm.entity.sh016.length != 0) {
    //                         vm.mode = 'undo'
    //                         R1Util.createAlert($scope, "WarningOk", "Can Not Edit a record Auto Generated by Share Issue ", null);
    //                     }
    //                 }
    //                 fn("OK")
    //                 break;

    //             case 'save':
    //                 $scope.save(function (res) {
    //                     fn(res)
    //                 });
    //                 break;

    //             case 'undo':
    //                 if (pastEntity)
    //                     vm.entity = angular.copy(pastEntity);
    //                 fn("OK")

    //                 break;

    //             case 'close':
    //                 fn("OK")
    //                 $rootScope.back();
    //                 break;



    //             default:
    //                 fn("OK")
    //                 break;
    //         }
    //     };


        
    //     $scope.save = function (fn) {
    //         if ($scope.dividentform.$valid) {
    //             $(".loading").show();
    //             if (!vm.entity.vchId)
    //                 ajax.post('Dividend/insert', vm.entity).then(function (res) {
    //                     if (res) {

    //                         vm.entity.vchId = res.vchId;
    //                         $(".loading").hide();

    //                         $scope.message = "Record Saved Sucessfully";
    //                         R1Util.createAlert($scope, "Success", $scope.message, null);
    //                         pastEntity = angular.copy(vm.entity);
    //                         fn("OK");
    //                     }
    //                     else {
    //                         var error = "An Error has occured while saving record!";

    //                         if (res.error)
    //                             if (res.error.message)
    //                                 error = res.error.message;

    //                         vm.mode = 'edit';
    //                         $(".loading").hide();
    //                         R1Util.createAlert($scope, "Error", error, null);
    //                         fn("CANCEL")
    //                     }
    //                 },
    //                     function (err) {
    //                         console.log(err);
    //                     })
    //             else {
    //                 ajax.put('Dividend/update', vm.entity, { id: vm.entity.vchId }).then(function (res) {
    //                     if (res) {
    //                         $(".loading").hide();

    //                         $scope.message = "Record Saved Sucessfully";
    //                         R1Util.createAlert($scope, "Success", $scope.message, null);
    //                         pastEntity = angular.copy(vm.entity);
    //                         fn("OK");
    //                     }
    //                     else {
    //                         var error = "An Error has occured while saving record!";

    //                         if (res.error)
    //                             if (res.error.message)
    //                                 error = res.error.message;

    //                         vm.mode = 'edit';
    //                         $(".loading").hide();
    //                         R1Util.createAlert($scope, "Error", error, null);
    //                         fn("CANCEL")
    //                     }




    //                 })
    //             }

    //         }




    //     }


    //     vm.newrecord = function () {
    //         pastEntity = vm.entity;
    //         vm.entity = {};
    //         // vm.entity.member = {};
    //         vm.entity.regCodeNavigation = {};
    //         vm.entity.vchDate = new Date();


    //     }
    //     $scope.init = function () {
    //         vm.entity = {};
    //         var q = $q.defer();
  
    //             q.resolve();
            
    //         return q.promise;
    //     }
        
    //     getExistEntity = function () {

    //         ajax.get('Dividend/get', null, { id: vm.entity.vchId }).then(function (res) {
    //             vm.entity = res;
    //             vm.entity.vchDate = new Date(vm.entity.vchDate);

    //         }, function (err) {

    //         })

    //     }

    //     $scope.init().then(function (res) {
    //         vm.action();
    //         if ($stateParams.id) {
    //             vm.entity.vchId = $stateParams.id;
    //             getExistEntity();
    //         }

    //     });

    //     $scope.getMemberdetail = function () {
    //         if (vm.entity.regCode) {
    //             var param = {
    //                 id: vm.entity.regCode

    //             }
    //             $(".loading").show();
    //             ajax.get('member/get', null, param).then(function (res) {
    //                 if (res) {
    //                     vm.entity.regCodeNavigation = res;
    //                     if ( vm.entity.regCodeNavigation.cityName) {
    //                         vm.entity.regCodeNavigation.cityCodeNavigation = {};
    //                         vm.entity.regCodeNavigation.cityCodeNavigation.cityName = vm.entity.regCodeNavigation.cityName;
    //                     }
    //                 }
    //                 else {
    //                     var error = "Error";
    //                     if (res.error)
    //                         if (res.error.message)
    //                             error = res.error.message;
    //                     R1Util.createAlert($scope, "Error", error, null);
    //                 }
    //                 $(".loading").hide();
    //             },)
    //         }


    //     }

    //     $scope.getMembers = function () {
    //         vm.Members = [];
    //         if (!vm.member)
    //             ajax.get("Member/list").then(function (res) {
    //                 vm.Members = res;
    //             }, function (err) {
    //                 var e = err;
    //             })
    //     }

    //     $scope.memberReq_coldef = [
    //         {
    //             field: "regCode",
    //             displayName: "अ. स. नंबर",
    //             style: { "width": "20%", "overflow": "hidden", "text-align": "left" },

    //         },
    //         {
    //             field: "shName",
    //             displayName: "पु. स. नांव ",
    //             style: { "width": "60%", "overflow": "hidden", "text-align": "left" },

    //         },
    //         {
    //             field: "cityName",
    //             displayName: "गांव",
    //             style: { "width": "20%", "overflow": "hidden", "text-align": "left" },

    //         },
    //     ];


    // }])