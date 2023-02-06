// BY Sohan Patil 
// 16-07-2021
var myapp = angular.module('myApp');
myapp.service('myprovider', [function () {
  // default Visual Studio
  var apiServer    = "http://localhost:5292/";
  var ssrsServer   = "http://localhost:62668/";

  this.ifscService = "https://ifsc.razorpay.com/";
  
  //DSS Host

  // apiServer = "http://192.168.1.117:4100/pi";
// ssrsServer = "http://192.168.1.161:4100/ssrs/";                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
  // ssrsServer = "http://localhost:62668/"; 
  
  // Patil-PC
  // apiServer = "http://192.168.1.20:4100/pi";
  // ssrsServer = "http://192.168.1.20:4100/ssrs/";

  // KGS SERVER
  // apiServer  = "https://kgscoop.co.in/whtms.api/";
  // ssrsServer = "https://www.kgscoop.co.in/whtms.ssrs/";




  // var sci = localStorageService.get("serverConnectionInfo");

  // var cacheConnection = null;

  // if (sci)
  //   cacheConnection = sci.data;

  // var connectionInfo = {
  //   api: apiServer,
  //   ssrs: ssrsServer
  // };

  // var saveToLocal = function () {
  //   var cacheData = {
  //     data: connectionInfo,
  //     timestamp: new Date().getTime(),
  //     ttl: 3 * 60 * 60 * 1000
  //   }

  //   localStorageService.set('serverConnectionInfo', cacheData);

  //   cacheConnection = connectionInfo;

  // }

   

  // if (!cacheConnection) {
  //   saveToLocal();
  // }
  // else {
  //   connectionInfo = cacheConnection;
  // }


  // this.server = connectionInfo.api;
  // this.reportserver = connectionInfo.ssrs;

   this.appserver = apiServer;

  // this.tokenbase = true;


}]);
  
