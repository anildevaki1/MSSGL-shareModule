var myApp = angular.module('myApp');
myApp.controller('bulkchequeissueCtrl', ['$scope', '$state', 'ajax', 'R1Util', '$filter', 'myprovider',
    function ($scope, $state, ajax, R1Util, $filter, myprovider) {

        var vm = this;
        vm.entity = {};

        vm.reference = {};
        vm.entity.edt = new Date();
        vm.entity.chDt = new Date();
      
        vm.ALLplace = {
            'cityName': 'सर्व',
            'cityCode': ''
        }

        vm.reference.Places = [];
        ajax.get('place/list').then(function (res) {
            vm.reference.Places = res;
            vm.reference.Places.push(vm.ALLplace);
            vm.entity.cityCode = "";
        }, function (err) {

        })


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

        vm.serviceGrid.columnDefs = [

            {
                field: 'chNo',
                displayName: 'चेक नंबर',
                enableSorting: true,
                enableCellEdit: false,
                cellClass: 'alignLgrid',

                width: "10%"

            },
            {
                field: 'chDt',
                displayName: 'चेक तारीख',
                enableSorting: true,
                type: 'date',
                cellFilter: 'date:\'dd/MM/yyyy\'',
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "10%"
            },
            {
                field: 'regCode',
                displayName: ' सभासद नंबर',
                enableSorting: true,
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "10%"
            },
            {
                field: 'regCodeNavigation.shName',
                displayName: 'सभासदाचे नांव',
                enableSorting: true,
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                footerCellTemplate: '<div class="ui-grid-cell-contents" >एकूण:</div>',
                width: "20%"
            },
            {
                field: 'regCodeNavigation.cityCodeNavigation.cityName',
                displayName: 'गाव',
                enableSorting: true,
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "20%"

            },
            {
                field: 'bankName',
                displayName: 'बँक',
                enableSorting: true,
                enableCellEdit: false,
                cellClass: 'alignLgrid',
                width: "15%"

            },


            {
                field: 'chAmt',
                displayName: 'रक्कम ',
                enableSorting: true,
                enableCellEdit: false,
                type: 'number',
                cellFilter: 'number:2',
                cellClass: 'alignRgrid',
                width: "15%"
            },




        ];



  
        $scope.showfn=function(){
            var params= {
                edt:vm.entity.edt,
                sno:vm.entity.chNo,
                effDate:vm.entity.chDt,
                city_code:vm.entity.cityCode,
                bankName:vm.entity.bankName
            }
            ajax.post('ChequeIssue/Bulkinsert', null,params).then(function (res) {
                      vm.serviceGrid.data=res;
                
                    //    vm.entity.regCode=res.regCode;
                    //    vm.entity.regcode=res.vm.entity.regCodeNavigation.shName;
                    // //   vm.entity.rreg{edt:vm.entity.edt,sno:vm.entity.chNo,effDate:vm.entity.chDt,city_code:cityCode,bankName:vm.entity.bankName}
                    //  // vm.entity.regCode=res.memberId;
                    //  // // vm.entity.shareQty=res.shareQty;
                    // vm.entity.regCodeNavigation = res.RegCodeNavigation.ShName;
                    //   vm.entity.chAmt=res.chAmt;
                    //    vm.entity.chDt=res.chDt;

                   
                });
        }


    }])



