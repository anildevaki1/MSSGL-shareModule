myApp.controller('blukchequeissueCtrl',['$scope', '$state', 'ajax', 'R1Util','$filter', 'myprovider',
function ($scope, $state, ajax, R1Util, $filter, myprovider){

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


}])