
var myApp = angular.module('myApp');
myApp.controller('memberreqCtrl', ['$scope', '$state', 'ajax', 'R1Util', '$filter', 'myprovider',
    function ($scope, $state, ajax, R1Util, $filter, myprovider) {
        var vm = this;
        vm.entity = {};
        vm.reference = {};
        vm.entity.format = 1;
        vm.entity.edt = new Date();
        vm.entity.sdt = new Date();


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
       

       

        $scope.getMemberRequestdetail = function () {
            if (vm.entity.regCode) {
                var param = {
                    id: vm.entity.regCode,
                }

                $(".loading").show();
                ajax.get('MemberRequest/get', null, param).then(function (res) {
                    vm.entity.req = res;
                    if (res.regCodeNavigation.cityName) {
                        vm.entity.regCodeNavigation.cityCodeNavigation = {};
                        vm.entity.regCodeNavigation.cityCodeNavigation.cityName = vm.entity.regCodeNavigation.cityName;
                    }
                    $(".loading").hide();

                }, function (err) {
                  $(".loading").hide();
                    R1Util.createAlert($scope, "Error", err.msg, null);
                })
            }


        }

        $scope.getMemberRequests = function () {
            vm.MemberRequests = [];
            if (!vm.memberRequest)
                ajax.get("MemberRequest/getMemReqlist").then(function (res) {
                    vm.MemberRequests = res;
                }, function (err) {
                    var e = err;
                })
        }

        $scope.memberReq_coldef = [
            {
                field: "regCode",
                displayName: "अ. स. नंबर",
                style: { "width": "20%", "overflow": "hidden", "text-align": "left" },

            },
            {
                field: "shName",
                displayName: "अ. स. नांव ",
                style: { "width": "60%", "overflow": "hidden", "text-align": "left" },

            },
            {
                field: "cityName",
                displayName: "गांव",
                style: { "width": "20%", "overflow": "hidden", "text-align": "left" },

            },
        ];

            $scope.show = function () {
            // var params = {
            //     id: vm.entity.regCode,
            //     sdt:  $filter('date')(vm.entity.sdt, 'yyyy-MM-dd'),
            //     edt:  $filter('date')(vm.entity.edt, 'yyyy-MM-dd'),
            //     // RegCodeNavigation: vm.entity.regCode,
            //     // CityName:vm.entity.req.cityCodeNavigation.cityName,
            //     // format: (vm.entity.format==1 ? "PDF" :"EXCEL"),


            // }
            var params = "id=" + vm.entity.regCode
            params += "&edt=" + $filter('date')(vm.entity.edt, 'yyyy-MM-dd')
            params += "&sdt=" + $filter('date')(vm.entity.sdt, 'yyyy-MM-dd')
            params += "&format=" + (vm.entity.format == 1 ? "PDF" : "EXCEL")
          
            window.open(myprovider.appserver + "Report/ledger1?" + params);

        }
        

    }])



myApp.controller('memberrepCtrl', ['$scope', '$state', 'ajax', 'R1Util','$filter', 'myprovider',
    function ($scope, $state, ajax, R1Util, $filter, myprovider) {


        var vm = this;
        vm.entity = {};
        vm.reference = {};
        vm.entity.edt = new Date();
        vm.entity.sdt = new Date();


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
                    var error = err.msg;
                        if (res.error)
                            if (res.error.message)
                                error = res.error.message;
                        R1Util.createAlert($scope, "Error", error, null);
                })
            }


        }


        $scope.getMembers = function () {
            vm.Members = [];
            if (!vm.member)
                ajax.get("Member/getMemlist").then(function (res) {
                    vm.Members = res;
                }, function (err) {
                    var e = err;
                })
        }


        $scope.memberReq_coldef = [
            {
                field: "regCode",
                displayName: "अ. स. नंबर",
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



        $scope.show = function () {
         
            var params = "id=" + vm.entity.regCode
            params += "&edt=" + $filter('date')(vm.entity.edt, 'yyyy-MM-dd')
            params += "&sdt=" + $filter('date')(vm.entity.sdt, 'yyyy-MM-dd')
            params += "&format=" + (vm.entity.format == 1 ? "PDF" : "EXCEL")
          
           window.open(myprovider.appserver + "Report/ledger2?" + params);

        }



    }])



  myApp.controller('memberlistCtrl', ['$scope', '$state', 'ajax', 'R1Util','$filter', 'myprovider',
    function ($scope, $state, ajax, R1Util, $filter, myprovider) {


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




        
        // vm.ALLbankBranche = {
        //     'branchName': 'सर्व',
        //     'branchCode': ''
        // }


        // vm.reference.BankBranches = [];
        // vm.reference.selectedbankBranche = {};
        // ajax.get("BankBranch/list").then(function (res) {
        //     //res.splice(0, 0, vm.ALLarea);
        //     vm.reference.BankBranches = res;
        //     vm.reference.BankBranches.push(vm.ALLbankBranche);
        //     vm.entity.branchCode = "";
        // }, function (err) {
        // })





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
                "name": "सभासद नंबरप्रमाणे "
            },
           
            {
                "value": 2,
                "name": "गावाप्रमाणे"
            },
            {
                "value": 3,
                "name": "नावाप्रमाणे"
            },
        
        ]
        vm.entity.index = 1;

    
        $scope.isChecked="1";


        $scope.show = function () {
         
            //  params = "id=" + vm.entity.regCode
            
            var  params ="&placeId="+vm.entity.cityCode
            params += "&edt=" + $filter('date')(vm.entity.edt, 'yyyy-MM-dd')
            params +="&areaId="+vm.entity.areaCode
            // params +="&areaId="+vm.entity.branchCode
            params +="&orderBy="+vm.entity.index
            params += "&membertype=" +  $scope.isChecked
            params += "&format=" + (vm.entity.format == 1 ? "PDF" : "EXCEL")

            
          
           window.open(myprovider.appserver + "Report/memberlist?" + params);

        }



    }])


    
    myApp.controller('membersnshiptCtrl', ['$scope', '$state', 'ajax', 'R1Util','$filter', 'myprovider',
    function ($scope, $state, ajax, R1Util, $filter, myprovider) {


        var vm = this;
        vm.entity = {};
      
        vm.reference = {};
        vm.entity.edt = new Date();
       
     

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

        vm.group = [
            {
                "value": 1,
                // "name": "[All]"
                "name": "गाव"
            },
            {
                "value": 2,
                "name": "गट"
            },
            {
                "value": 3,
                "name": "गट+गांव"
            },
            {
                "value": 4,
                "name": "बँक"
            },
            {
                "value": 5,
                "name": "गाव/तालुका"
            },

        ]
        vm.entity.group = 1;

    


        $scope.show = function () {
         
            
            var  params = "&edt=" + $filter('date')(vm.entity.edt, 'yyyy-MM-dd')
         
            params +="&groupby="+vm.entity.group
        
            params += "&format=" + (vm.entity.format == 1 ? "PDF" : "EXCEL")

            
          
           window.open(myprovider.appserver + "Report/shareReg?" + params);

        }


    //     $scope.show = function () {
    //         var params = {
              
    //             edt:  $filter('date')(vm.entity.edt, 'yyyy-MM-dd'),
    //             // placeId: vm.entity.cityCode,
    //             format: (vm.entity.format==1 ? "PDF" :"EXCEL"),
    //             groupby: vm.entity.group,
               
    //         }
      
    //      var params= "edt="+ $filter('date')(vm.entity.edt, 'yyyy-MM-dd')
           
    //           params +="&placeId="+vm.entity.cityCode
    //          params +="&format="+ (vm.entity.format==1 ? "PDF" :"EXCEL")
    //          params +="&groupby="+vm.entity.group
          

    //       window.open(myprovider.appserver+"report/shareReg?"+params);
      
    // }


    }])


    myApp.controller('BoardMembersCtrl', ['$scope', '$state', 'ajax', 'R1Util','$filter', 'myprovider',
    function ($scope, $state, ajax, R1Util, $filter, myprovider) {


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

    
    


        $scope.show = function () {
         

              var params ="&edt="+ $filter('date')(vm.entity.edt, 'yyyy-MM-dd')
          
                 params +="&faceValue="+vm.entity.shareQty
                 params += "&mgrcharges="+vm.entity.mbrCharges
                 params += "&format=" + (vm.entity.format == 1 ? "PDF" : "EXCEL")

            
          
           window.open(myprovider.appserver + "Report/OnBoardMembers?" + params);

        }


   
    


    }])


    myApp.controller('placelistCtrl', ['$scope', '$state', 'ajax', 'R1Util','$filter', 'myprovider',
    function ($scope, $state, ajax, R1Util, $filter, myprovider) {


        var vm = this;
        vm.entity = {};
      
        vm.reference = {};
        vm.entity.edt = new Date();


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

    

    

        $scope.show = function () {
         
            var params= "&AreaCode="+vm.entity.areaCode
                params +="&format="+ (vm.entity.format==1 ? "PDF" :"EXCEL")
       
    
         window.open(myprovider.appserver+"Report/placelist?"+params);
        }


    }])

    myApp.controller('placememberlistCtrl', ['$scope','$state','ajax','R1Util','$filter','myprovider',
    function ($scope, $state, ajax, R1Util, $filter, myprovider) {


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

    

    

        $scope.show = function () {
         
            
            var params= "&placeId="+vm.entity.cityCode
         
          
         
            params += "&format=" + (vm.entity.format == 1 ? "PDF" : "EXCEL")

            window.open(myprovider.appserver+"Report/placememberlist?"+params);

        }


    }])


    myApp.controller('chequereturnlistCtrl', ['$scope', '$state', 'ajax', 'R1Util','$filter', 'myprovider',
    function ($scope, $state, ajax, R1Util, $filter, myprovider) {


        var vm = this;
        vm.entity = {};
      
        vm.reference = {};
       

        vm.ALLplace = {
            'cityName': 'सर्व',
            'cityCode': ''
        }

        vm.reference.Places = [];
        ajax.get('place/list').then(function (res) {
            vm.reference.Places = res;
            vm.reference.Places.push(vm.ALLplace);
            vm.entity.cityCode ="";
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

    
      $scope.show = function () {
         

            var  params ="&yr="+vm.entity.year
                 params +="&CityCode="+vm.entity.cityCode
                 params += "&format=" + (vm.entity.format == 1 ? "PDF" : "EXCEL")
    
    
    
                window.open(myprovider.appserver + "Report/chequereturn?" + params);
    
        }
        
      



    }])
     

    myApp.controller('scsamplelistCtrl',['$scope', '$state', 'ajax', 'R1Util','$filter', 'myprovider',
    function ($scope, $state, ajax, R1Util, $filter, myprovider){

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
            vm.reference.Places = res;
            vm.reference.Places.push(vm.ALLplace);
            vm.entity.cityCode ="";
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

        $scope.show = function () {
         

        var  params ="&edt="+ $filter('date')(vm.entity.edt, 'yyyy-MM-dd')
             params +="&CityCode="+vm.entity.cityCode 
             params += "&format=" + (vm.entity.format == 1 ? "PDF" : "EXCEL")



            window.open(myprovider.appserver + "Report/scsamplelist?" + params);

    }

 }])

 myApp.controller('sharecertregCtrl', ['$scope', '$state', 'ajax', 'R1Util','$filter', 'myprovider',
 function ($scope, $state, ajax, R1Util, $filter, myprovider) {


     var vm = this;
     vm.entity = {};
   
     vm.reference = {};
     vm.entity.edt = new Date();
    
 

   

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

 
 


     $scope.show = function () {
      

           var params ="&edt="+ $filter('date')(vm.entity.edt, 'yyyy-MM-dd')
          params += "&format=" + (vm.entity.format == 1 ? "PDF" : "EXCEL")

         
       
        window.open(myprovider.appserver + "Report/sharecertreg?" + params);

     }



 


 }])

 myApp.controller('sharecapitalcertCtrl', ['$scope', '$state', 'ajax', 'R1Util','$filter', 'myprovider',
 function ($scope, $state, ajax, R1Util, $filter, myprovider) {


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
            "name": "गावं"
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
            // areaId:vm.entity.areaCode,
            // placeId: vm.reference.selectedplace.cityCode,
            areaId: vm.reference.selectedarea.areaCode,
            format: (vm.entity.format==1 ? "PDF" :"EXCEL"),
            groupBy: vm.entity.group,
            orderBy: vm.entity.index,
            pagebreak: (vm.entity.break||"false")
        }
     

     var params= "edt="+ $filter('date')(vm.entity.edt, 'yyyy-MM-dd')
         params +="&placeId="+vm.entity.cityCode
         params +="&areaId="+vm.entity.areaCode
         params +="&format="+ (vm.entity.format==1 ? "PDF" :"EXCEL")
         params +="&groupBy="+vm.entity.group
         params +="&orderBy="+vm.entity.index
         params +="&pagebreak="+(vm.entity.break||"false")

      window.open(myprovider.appserver+"report/sharecapitalcert?"+params);
  
}

 


 }])








