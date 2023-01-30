var myApp = angular.module('myApp',
  [
    'ui.router',
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
  ]);


// myApp.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
//   $rootScope.$state = $state;
//   $rootScope.$stateParams = $stateParams;

//   $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
//     document.body.scrollTop = document.documentElement.scrollTop = 0;

//     $rootScope.previousState_name = fromState.name;
//     $rootScope.previousState_params = fromParams;

//     $rootScope.back = function () {
//       event.preventDefault();
//       $state.go($rootScope.previousState_name, $rootScope.previousState_params);
//     };

myApp.run(['$state', '$window', function ($state, $window) {


  $window.onpopstate = function (event) {

    var stateName = $state.current.name,
      pathname = $window.location.pathname.split('/')[1],
      routeParams = {};  // i.e.- $state.params 

    console.log($state.current.name, pathname); // 'main', 'folder'

    if ($state.current.name.indexOf(pathname) === -1) {
      // Optionally set option.notify to false if you don't want 
      // to retrigger another $stateChangeStart event
      $state.go(
        $state.current.name,
        routeParams,
        { reload: true, notify: false }
      );
    }
  };
}]);



myApp.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when("", "/parent/sub/home");

  $stateProvider
    .state("parent", {
      url: "/parent",
      abstract: true,
      templateUrl: "component/parentPage.html",
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

    })

    .state("parent.sub.shareissuedash", {
      url: "/shareissuedash",
      templateUrl: "src/shareissuedash.html",
      controller: 'shareissuedashCtrl as vm',

    })


})