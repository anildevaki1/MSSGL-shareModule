var myApp = angular.module('myApp', [
  'LocalStorageModule',
  'ngAnimate',
  'ngTouch',
  'ngOnload',
  'ngSanitize',
  'ngFileSaver',
  'ui.router',
  'ui.router.state.events',
  'ngLocale',
  'ngRoute',
  'oc.lazyLoad',
  'ncy-angular-breadcrumb',
  'angular-loading-bar',
  'ui.grid',
  'ui.grid.cellNav',
  'ui.grid.moveColumns',
  'ui.grid.selection',
  'ui.grid.resizeColumns',
  'ui.grid.edit',
  'ui.grid.pagination',
  'ui.grid.autoResize',
  'ui.grid.exporter',
  'ui.grid.grouping',
  'ui.grid.expandable',
  'ui.grid.pinning',
  'ui.select',
  'ui.bootstrap',
  'angularUtils.directives.dirPagination',
  'ngCookies',
  'angular-uuid',
  'ngImageCompress'

])
  .value('version', "0.0.1")
  .value('servers', true)
  .run(["$locale", function ($locale) {
    $locale.NUMBER_FORMATS.PATTERNS[1].gSize = 2;
    $locale.NUMBER_FORMATS.PATTERNS[0].gSize = 2;
  }])
  .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;

    cfpLoadingBarProvider.latencyThreshold = 500;

  }])
  .config(['$httpProvider', '$compileProvider', 'localStorageServiceProvider', function ($httpProvider, $compileProvider, localStorageServiceProvider) {
    $httpProvider.interceptors.push('httpTimeout');
    $httpProvider.interceptors.push('httpInterceptor');
    $compileProvider.debugInfoEnabled(true);
    localStorageServiceProvider.setPrefix('ls');
  }])
  .config(["envServiceProvider", function (envServiceProvider) {
    envServiceProvider.set('development');
  }])
// .config(["$provide", "$logProvider", "envServiceProvider", function ($provide, $logProvider, envServiceProvider) {

//   $provide.decorator('$http', ["$delegate", "$q", function ($delegate, $q) {
//     var pendingRequests = {},
//       $http = $delegate,
//       $duplicateRequestsFilter;

//     function hash(str) {
//       var h = 0, strlen = str.length, i, n;

//       if (strlen === 0) {
//         return h;
//       }

//       for (i = 0; i < strlen; i = i + 1) {
//         n = str.charCodeAt(i);
//         h = ((h << 5) - h) + n;
//         h = h & h;
//       }

//       return h >>> 0;
//     }

//     function getRequestIdentifier(config) {
//       var str = config.method + config.url;

//       if (config.params && typeof config.params === 'object') {
//         str += angular.toJson(config.params);
//       }

//       if (config.data && typeof config.data === 'object') {
//         str += angular.toJson(config.data);
//       }

//       return hash(str);
//     }

//     $duplicateRequestsFilter = function (config) {

//       //Ignore for this request?
//       if (config.ignoreDuplicateRequest) {
//         return $http(config);
//       }

//       //Get unique request identifier
//       var identifier = getRequestIdentifier(config);

//       //Check if such a request is pending already
//       if (pendingRequests[identifier]) {
//         if (config.rejectDuplicateRequest) {
//           return $q.reject({
//             data: '',
//             headers: {},
//             status: config.rejectDuplicateStatusCode || 400,
//             config: config
//           });
//         }
//         return pendingRequests[identifier];
//       }

//       //Create promise using $http and make sure it's reset when resolved
//       pendingRequests[identifier] = $http(config)['finally'](function () {
//         delete pendingRequests[identifier];
//       });

//       //Return promise
//       return pendingRequests[identifier];
//     };

//     //Map rest of methods
//     Object.keys($http).filter(function (key) {
//       return (typeof $http[key] === 'function');
//     }).forEach(function (key) {
//       $duplicateRequestsFilter[key] = $http[key];
//     });

//     //Return it
//     return $duplicateRequestsFilter;
//   }]);

//   if (envServiceProvider.get() === 'production') {
//     $logProvider.debugEnabled(false);
//   }

//   if (envServiceProvider.get() === 'development') {
//     $logProvider.debugEnabled(true);
//   }

//   $provide.decorator('$log', ["$delegate", function ($delegate) {
//     var debugFn = $delegate.debug,
//       warnFn = $delegate.warn,
//       errFn = $delegate.error,
//       infoFn = $delegate.info,
//       logFn = $delegate.log,
//       supplant = function (template, values, pattern) {
//         pattern = pattern || /\{([^\{\}]*)\}/g;
//         return template.replace(pattern, function (a, b) {
//           var p = b.split('.'),
//             r = values,
//             s;
//           try {
//             for (s in p) {
//               if (p.hasOwnProperty(s)) {
//                 r = r[p[s]];
//               }
//             }
//           } catch (e) {
//             r = e;
//           }
//           return (typeof r === 'string' || typeof r === 'number') ? r : a;
//         });
//       };

//     $delegate.debug = function () {
//       var args = [].slice.call(arguments),
//         now = moment().format('DD-MM-YYYY hh:mm:ss A');
//       //console.log([].slice.call(arguments))

//       if (typeof args[0] === 'object') {
//         args[1] = now;
//       } else {
//         args[0] = supplant("{0} - {1}", [now, args[0]]);
//       }
//       if ($logProvider.debugEnabled()) {
//         debugFn.apply(null, args);
//       }
//     };

//     $delegate.warn = function () {
//       var args = [].slice.call(arguments),
//         now = moment().format('DD-MM-YYYY hh:mm:ss A');
//       if (typeof args[0] === 'object') {
//         args[1] = now;
//       } else {
//         args[0] = supplant("{0} - {1}", [now, args[0]]);
//       }
//       if ($logProvider.debugEnabled()) {
//         warnFn.apply(null, args);
//       }
//     };

//     $delegate.error = function () {
//       var args = [].slice.call(arguments),
//         now = moment().format('DD-MM-YYYY hh:mm:ss A');
//       if (typeof args[0] === 'object') {
//         args[1] = now;
//       } else {
//         args[0] = supplant("{0} - {1}", [now, args[0]]);
//       }
//       if ($logProvider.debugEnabled()) {
//         errFn.apply(null, args);
//       }
//     };

//     $delegate.log = function () {
//       var args = [].slice.call(arguments),
//         now = moment().format('DD-MM-YYYY hh:mm:ss A');
//       if (typeof args[0] === 'object') {
//         args[1] = now;
//       } else {
//         args[0] = supplant("{0} - {1}", [now, args[0]]);
//       }
//       if ($logProvider.debugEnabled()) {
//         logFn.apply(null, args);
//       }
//     };

//     $delegate.info = function () {
//       var args = [].slice.call(arguments),
//         now = moment().format('DD-MM-YYYY hh:mm:ss A');
//       if (typeof args[0] === 'object') {
//         args[1] = now;
//       } else {
//         args[0] = supplant("{0} - {1}", [now, args[0]]);
//       }
//       if ($logProvider.debugEnabled()) {
//         infoFn.apply(null, args);
//       }
//     };

//     return $delegate;

//   }]);

// }])
myApp.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    //document.body.scrollTop = document.documentElement.scrollTop = 0;

    $rootScope.previousState_name = fromState.name;
    $rootScope.previousState_params = fromParams;

    $rootScope.back = function () {
      event.preventDefault();
      $state.go($rootScope.previousState_name, $rootScope.previousState_params);
    };


  })
  $rootScope.$on('cfpLoadingBar:started', function () {
    $(".loading").show();
  });
  $rootScope.$on('cfpLoadingBar:completed', function () {
    $(".loading").hide();

  });
}]);

// myApp.run(['$state', '$window', function ($state, $window) {


//   $window.onpopstate = function (event) {

//     var stateName = $state.current.name,
//       pathname = $window.location.pathname.split('/')[1],
//       routeParams = {};  // i.e.- $state.params 

//     console.log($state.current.name, pathname); // 'main', 'folder'

//     if ($state.current.name.indexOf(pathname) === -1) {
//       // Optionally set option.notify to false if you don't want 
//       // to retrigger another $stateChangeStart event
//       $state.go(
//         $state.current.name,
//         routeParams,
//         { reload: true, notify: false }
//       );
//     }
//   };
// }]);



myApp.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when("", "/parent/sub/home");

  $stateProvider
    .state("parent", {
      url: "/parent",
      abstract: true,
      templateUrl: "components/parentPage.html",
      controller: 'menuCtrl'
    })


    .state("parent.sub", {
      url: "/sub",
      template: '<ui-view></ui-view>',
    })

    .state("parent.sub.home", {
      url: "/home",
      templateUrl: 'src/home.html',
    })

    //   .state("parent.sub.dashboard", {
    //     url: "/css/img/erp1.jpg",  
    // })



    // .state('parent.sub.dashboard', {
    //   url: "/css/img/erp1.jpg",
    //   // template: "<div class='erpImage'></div>",

    //   //page title goes here
    //   ncyBreadcrumb: {
    //     label: 'Home',
    //   },
    // })


    // .state("parent.sub.cast", {
    //   url: "/cast",
    //   templateUrl: "src/cast.html",
    //   controller: 'castCtrl as vm',
    //   params: { action: null, id: null, firm_code: null, tom: null, grp: null },
    // })

    // .state("parent.sub.castdash", {
    //   url: "/castDash",
    //   templateUrl: "src/castdash.html",
    //   controller: 'castdashCtrl as vm',
    // })


    .state("parent.sub.scheduldcast", {
      url: "/scheduldcast",
      templateUrl: "src/scheduldcast.html",
      controller: 'scheduldcastCtrl as vm',
      params: { id: null,action:null }
    })

    .state("parent.sub.schedulddash", {
      url: "/schedulddash",
      templateUrl: "src/schedulddash.html",
      controller: 'schedulddashCtrl as vm',
    })


    .state("parent.sub.place", {
      url: "/place",
      templateUrl: "src/place.html",
      controller: 'placeCtrl as vm',
      params: { id: null,action:null }
    })

    .state("parent.sub.placedash", {
      url: "/placedash",
      templateUrl: "src/placedash.html",
      controller: 'placedashCtrl as vm',

    })

    .state("parent.sub.area", {
      url: "/area",
      templateUrl: "src/area.html",
      controller: 'areaCtrl as vm',
      params: { id: null,action:null }


    })

    .state("parent.sub.areadash", {
      url: "/areadash",
      templateUrl: "src/areadash.html",
      controller: 'areadashCtrl as vm',
    })
    .state("parent.sub.bankbranch", {
      url: "/bankbranch",
      templateUrl: "src/bankbranch.html",
      controller: 'bankbranchCtrl as vm',
      params: { id: null,action:null }

    })

    .state("parent.sub.bankdash", {
      url: "/bankdash",
      templateUrl: "src/bankdash.html",
      controller: 'bankCtrl as vm',


    })

    .state("parent.sub.designation", {
      url: "/designation",
      templateUrl: "src/designation.html",
      controller: 'designationCtrl as vm',
      params: { id: null,action:null }

    })

    .state("parent.sub.designationdash", {
      url: "/designationdash",
      templateUrl: "src/designationdash.html",
      controller: 'designationdashCtrl as vm',

    })


    .state("parent.sub.occupation", {
      url: "/occupation",
      templateUrl: "src/occupation.html",
      controller: 'occupationCtrl as vm',
      params: { id: null,action:null }

    })

    .state("parent.sub.occupationdash", {
      url: "/occupationdash",
      templateUrl: "src/occupationdash.html",
      controller: 'occupationdashCtrl as vm',

    })

    .state("parent.sub.sharetype", {
      url: "/sharetype",
      templateUrl: "src/sharetype.html",
      controller: 'sharetypeCtrl as vm',
      params: { id: null,action:null }

    })

    .state("parent.sub.sharetypedash", {
      url: "/sharetypedash",
      templateUrl: "src/sharetypedash.html",
      controller: 'sharetypedashCtrl as vm',

    })



    .state("parent.sub.panchayat", {
      url: "/panchayat",
      templateUrl: "src/panchayat.html",
      controller: 'panchayatCtrl as vm',
      params: { id: null,action:null }
    })

    .state("parent.sub.panchayatdash", {
      url: "/panchayatdash",
      templateUrl: "src/panchayatdash.html",
      controller: 'panchayatdashCtrl as vm',
    })


    .state("parent.sub.religion", {
      url: "/religion",
      templateUrl: "src/religion.html",
      controller: 'religionCtrl as vm',
      params: { id: null,action:null }

    })

    .state("parent.sub.religiondash", {
      url: "/religiondash",
      templateUrl: "src/religiondash.html",
      controller: 'religiondashCtrl as vm',

    })
    .state("parent.sub.member", {
      url: "/member",
      templateUrl: "src/member.html",
      controller: 'memberCtrl as vm',
      params: { id: null,action:null }

    })


    .state("parent.sub.memberdash", {
      url: "/memberdash",
      templateUrl: "src/memberdash.html",
      controller: 'memberdashCtrl as vm',

    })

    .state("parent.sub.purnmember", {
      url: "/purnmember",
      templateUrl: "src/purnmember.html",
      controller: 'purnmemberCtrl as vm',
      params: { id: null,action:null }

    })

    .state("parent.sub.purnmemberdash", {
      url: "/purnmemberdash",
      templateUrl: "src/purnmemberdash.html",
      controller: 'purnmemberdashCtrl as vm',

    })



    .state("parent.sub.company", {
      url: "/company",
      templateUrl: "src/company.html",
      controller: 'companyCtrl as vm',

    })

    // .state("parent.sub.companydash", {
    //   url: "/companydash",
    //   templateUrl: "src/companydash.html",
    //   controller: 'companydashCtrl as vm',

    // })

    .state("parent.sub.receipt", {
      url: "/receipt",
      templateUrl: "src/receipt.html",
      controller: 'receiptCtrl as vm',
      params: { id: null,action:null }

    })

    .state("parent.sub.receiptdash", {
      url: "/receiptdash",
      templateUrl: "src/receiptdash.html",
      controller: 'receiptdashCtrl as vm',

    })

    .state("parent.sub.shareissue", {
      url: "/shareissue",
      templateUrl: "src/shareissue.html",
      controller: 'shareissueCtrl as vm',
      params: { id: null,action:null }
    })

    .state("parent.sub.shareissuedash", {
      url: "/shareissuedash",
      templateUrl: "src/shareissuedash.html",
      controller: 'shareissuedashCtrl as vm',

    })



    .state("parent.sub.payment", {
      url: "/payment",
      templateUrl: "src/payment.html",
      controller: 'paymentCtrl as vm',
      params: { id: null,action:null }
    })


    .state("parent.sub.paymentdash", {
      url: "/paymentdash",
      templateUrl: "src/paymentdash.html",
      controller: 'paymentdashCtrl as vm',

    })


})