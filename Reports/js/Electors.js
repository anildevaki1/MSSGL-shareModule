var myApp = angular.module('myApp');


myApp.controller('electorslistCtrl', ['ajax', '$scope','$filter','myprovider','$http',
    function (ajax, $scope,$filter,myprovider,$http) {
        var vm = this;
        vm.entity = {};
        vm.reference = {};
        vm.entity.edt = new Date();
      


   


        vm.ALLplace = {
            'cityName': 'सर्व',
            'cityCode': ''
        }

        vm.reference.Places = [];
        ajax.get('place/list').then(function (res) {
            // res.splice(0, 0, vm.ALLplace);
            vm.reference.Places = res;
            vm.reference.Places.push(vm.ALLplace);
            vm.entity.cityCode = "";
        }, function (err) {

        })

        vm.ALLarea = {
            'areaName': 'सर्व',
            'areaCode': ''
        }


        vm.reference.areas = [];
        vm.reference.selectedarea = {};
        ajax.get("Area/list").then(function (res) {
            //res.splice(0, 0, vm.ALLarea);
            vm.reference.areas = res;
            vm.reference.areas.push(vm.ALLarea);
            vm.entity.areaCode = "";
        }, function (err) {
        })


        vm.format = [
            {
                "value": 1,
                "name": "Pdf"
            },
            {
                "value": 2,
                "name": "Excel"
            },

        ]
        vm.entity.format = 1;


        vm.index = [
            {
                "value": 1,
                "name": "सभासद नंबर"
            },
            {
                "value": 2,
                "name": "सभासद नाव"
            },
            {
                "value": 3,
                "name": "गाव"
            },
            {
                "value": 4,
                "name": "गट क्रमांक"
            },
            {
                "value": 5,
                "name": "गट"
            },
        ]
        vm.entity.index = 1;

        vm.group = [
            {
                "value": 0,
                // "name": "[All]"
                "name": "None"
            },
            {
                "value": 1,
                "name": "गाव"
            },
            {
                "value": 2,
                "name": "गट"
            },


        ]
        vm.entity.group = 0;


        $scope.show = function () {
            var params = {
                edt:  $filter('date')(vm.entity.edt, 'yyyy-MM-dd'),
                placeId: vm.entity.cityCode,
                areaId: vm.entity.areaCode,
                format: (vm.entity.format==1 ? "PDF" :"EXCEL"),
                groupBy: vm.entity.group,
                orderBy: vm.entity.index,
                pagebreak: (vm.entity.break||"false")
            }
        //     $http.get(myprovider.appserver+"report/electors",{params:params},{'responseType': 'arraybuffer'} ).then(function(res){
        // //    ajax.get("report/electors",null,params).then(function(res){
                
        //         var contentType = "application/pdf"
        //         if (vm.entity.format != 1)
        //             contentType = "application/vnd.ms-excel";

        //         var blob = new Blob([res.data], { type: contentType });
        //         var objectUrl = URL.createObjectURL(blob);
        //         window.open(objectUrl,"f");

        //     // },function(err){
        //     //     alert(err);
        //     })


         var params= "edt="+ $filter('date')(vm.entity.edt, 'yyyy-MM-dd')
             params +="&placeId="+vm.entity.cityCode
             params +="&areaId="+vm.entity.areaCode
             params +="&format="+ (vm.entity.format==1 ? "PDF" :"EXCEL")
             params +="&groupBy="+vm.entity.group
             params +="&orderBy="+vm.entity.index
             params +="&pagebreak="+(vm.entity.break||"false")

          window.open(myprovider.appserver+"report/electors?"+params);
      
    }

    }])




    myApp.controller('recregCtrl', ['ajax', '$scope','$filter','myprovider','$http',
    function (ajax, $scope,$filter,myprovider,$http) {
        var vm = this;
        vm.entity = {};
        vm.reference = {};
        vm.entity.edt = new Date();
        vm.entity.sdt = new Date();
//    vm.entity.sdt = monthsAgo(vm.entity.sdt)
   

     

        vm.format = [
            {
                "value": 1,
                "name": "Pdf"
            },
            {
                "value": 2,
                "name": "Excel"
            },

        ]
        vm.entity.format = 1;


        vm.index = [
            {
                "value": 1,
                "name": "सभासद नंबर"
            },
            {
                "value": 2,
                "name": "सभासद नाव"
            },
            {
                "value": 3,
                "name": "गाव"
            },
         
        ]
        vm.entity.index = 1;

      
   

        $scope.show = function () {
            var params = {
                sdt:  $filter('date')(vm.entity.sdt, 'yyyy-MM-dd'),
                edt:  $filter('date')(vm.entity.edt, 'yyyy-MM-dd'),
                format: (vm.entity.format==1 ? "PDF" :"EXCEL"),
                orderBy: vm.entity.index,
               
            }
      
         var params= "edt="+ $filter('date')(vm.entity.edt, 'yyyy-MM-dd')
             params+= "&sdt="+ $filter('date')(vm.entity.sdt, 'yyyy-MM-dd')
             params +="&format="+ (vm.entity.format==1 ? "PDF" :"EXCEL")
             params +="&orderBy="+vm.entity.index
          

          window.open(myprovider.appserver+"report/recreg?"+params);
      
    }

    }])