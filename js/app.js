angular.module('myapp', ['ngRoute', 'ngAnimate', 'ngCookies', 'ngMessages', 'ngResource', 'myService', 'hljs'])
  .config(['$routeProvider', 'hljsServiceProvider', function ($routeProvider, hljsServiceProvider) {

    $routeProvider
      .when('/home', {
        templateUrl: 'tpls/newHome.html',
        controller: 'homeController'
      })
      /*.when('/beta',{
       templateUrl:'tpls/beta.html',
       controller:"queryStrategy"
       })*/
      .when('/login', {
        templateUrl: 'tpls/login.html'
      })
      .when('/register', {
        templateUrl: 'tpls/register.html'
      })
      .when('/analyse', {
        templateUrl: 'tpls/analyse.html'
      })
      .when('/study', {
        templateUrl: 'tpls/study.html',
        controller: 'studyController'
      })
      .when('/mytable', {
        templateUrl: 'tpls/mytable.html',
        controller: 'tableController'
      })
      .when('/actualRes', {
        templateUrl: 'tpls/actualRes.html',
        controller: 'actualResController'
      })
      .when('/actualResForm', {
        templateUrl: 'tpls/actualResForm.html',
        controller: 'actualResController'
      })
      .when('/complie', {
        templateUrl: 'tpls/complie.html',
        controller: 'complieController'
      })
      .when('/complie/:id', {
        templateUrl: "tpls/complie.html",
        controller: 'complieItemController'
      })
      .when('/modalRes', {
        templateUrl: 'tpls/modalRes.html',
        controller: 'modalResController'
      })
      .when('/model_objects/:id', {
        templateUrl: 'tpls/modalResTemplate.html',
        controller: 'modalResItemController'
      })
      .when('/model_methods/:id', {
        templateUrl: 'tpls/modalResTemplate.html',
        controller: 'modalResItemController'
      })
      .when('/model_examples/:id', {
        templateUrl: 'tpls/modalResTemplate.html',
        controller: 'modalResItemController'
      })
      .when('/adminCenter', {
        templateUrl: 'tpls/adminCenter.html',
        controller: 'adminCenterController'
      })
      .otherwise({
        redirectTo: '/home'
      });
    hljsServiceProvider.setOptions({
      // replace tab with 4 spaces
      tabReplace: '    '
    });
  }])
  /*.config(function(hljsServiceProvider){
   hljsServiceProvider.setOptions({
   tabReplace: '    '
   });
   })*/
  .run(['$rootScope', '$location', '$window', '$route', '$templateCache', function ($rootScope, $location, $window, $route, $templateCache) {
    var wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: false,
      live: true
    });

    wow.init();
    /*var editor = ace.edit("editor");
     editor.setTheme("ace/theme/chrome");
     editor.getSession().setMode("ace/mode/java");*/
    if (($location.url() == '/study') || ($location.url() == '/home') || ($location.url() == '/mytable') || ($location.url() == '/modalRes') || ($location.url() == '/modalRes')) {
      $rootScope.isactive = false;
    }
    ;
    $(window).on('scroll', function () {
      if ((($('html').scrollTop() > 100) || ($('body').scrollTop() > 100)) && (($location.url() == '/study') || ($location.url() == '/home') || ($location.url() == '/modalRes') || ($location.url() == '/mytable'))) {
        $rootScope.isactive = true;
        $rootScope.$apply();
      } else if ((($('html').scrollTop() < 100) && ($('body').scrollTop() < 100)) && (($location.url() == '/study') || ($location.url() == '/home') || ($location.url() == '/modalRes') || ($location.url() == '/mytable'))) {
        $rootScope.isactive = false;
        $rootScope.$apply();

      }
    });
    if (($location.url() == '/analyse') || ($location.url() == '/complie') || ($location.url() == '/adminCenter')) {
      $rootScope.isactive = true;
    }
    ;
    $rootScope.$on('$routeChangeStart', function (eve, next, cur) {
      $('html,body').scrollTop(0);
      var wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: false,
        live: true
      });
      wow.init();
    });
    $rootScope.$on('$routeChangeSuccess', function (eve, next, cur) {

      if ($location.url() == '/complie') {
        console.log('/complie');
      }
      ;
      $('html,body').scrollTop(0);
      if (($location.url() == '/study') || ($location.url() == '/home') || ($location.url() == '/modalRes') || ($location.url() == '/mytable')) {
        $rootScope.isactive = false;
      }
      ;
      $(window).on('scroll', function () {
        if ((($('html').scrollTop() > 100) || ($('body').scrollTop() > 100)) && (($location.url() == '/study') || ($location.url() == '/modalRes') || ($location.url() == '/home') || ($location.url() == '/mytable'))) {
          $rootScope.isactive = true;
          $rootScope.$apply();
        } else if ((($('html').scrollTop() < 100) && ($('body').scrollTop() < 100)) && (($location.url() == '/study') || ($location.url() == '/modalRes') || ($location.url() == '/home') || ($location.url() == '/mytable'))) {
          $rootScope.isactive = false;
          $rootScope.$apply();

        }
      });
      if (($location.url() == '/analyse') || ($location.url() == '/complie') || ($location.url() == '/adminCenter')) {
        $rootScope.isactive = true;
      }
      ;
      if (typeof(cur) !== 'undefined' && (next.loadedTemplateUrl == 'tpls/complie.html') && (cur.loadedTemplateUrl == 'tpls/complie.html')) {
        $window.location.reload();
      }
      ;
    });

  }])
  .constant('constantUrl', 'http://114.55.238.82:81/')
  .value('strategysValue', {"id": 123, "author": 'abc'})
  .value('myStrategysValue', [])
  .value('modalResObjList1', [])
  .value('modalResObjList2', [])
  .value('modalResObjList3', [])
  .value('modalResObjList4', [])
  .value('modalResObjItems', {"title": '', "content": ''})
  .controller('adminCenterController', ['$scope', '$http', '$q', '$cookieStore', 'constantUrl', '$location', function ($scope, $http, $q, $cookieStore, constantUrl, $location) {
    $scope.getAllUsers = function () {
      $http.get(constantUrl + 'users/', {
        headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
      })
        .success(function (data) {
          $scope.allUsers = data;
        });
    };
    $scope.func = function (e) {
      return e["name"] != 'sv123321';
    }
    $scope.getAllUsers();
  }])
  .controller('homeController', ['$scope', '$rootScope', '$http', '$location', '$cookies', '$cookieStore', 'constantUrl', function ($scope, $rootScope, $http, $location, $cookies, $cookieStore, constantUrl) {
    $scope.$watch(function () {
      var str = null;
      var href = window.location.href;
      var index = href.indexOf('#/');
      if (index != -1) {
        str = href.substring(index);
      }
      ;
      $scope.natived = str;
    });
    $rootScope.user = $cookieStore.get('user');
    $rootScope.logout = function () {
      $cookieStore.remove('user');
      $rootScope.user = null;
      $location.path('/home');//页面跳转
    };
    $scope.complie = function () {
      $location.path('/register');
    };
    $scope.hashLocation = function (x) {
      if ($rootScope.user && $rootScope.user.is_zijin) {
        $location.path(x);
      } else if ($rootScope.user && !$rootScope.user.is_zijin) {
        Showbo.Msg.alert('未获得权限');
        $location.path('/home');
      } else if (!$rootScope.user) {
        $location.path('/login');
      }
      ;
    };

  }])
  .controller('studyController', ['$scope', 'strategyResources', 'strategyResource', '$http', '$timeout', '$cookieStore', 'constantUrl', '$location', '$rootScope', function ($scope, strategyResourcess, strategyResource, $http, $timeout, $cookieStore, constantUrl, $location, $rootScope) {
    $rootScope.user = $cookieStore.get('user');
    $scope.hisActtoryRes = function (x) {
      if ($rootScope.user && $rootScope.user.is_zijin) {
        $location.path(x);
        $('.analyse-modal-big').show();
      } else if ($rootScope.user && !$rootScope.user.is_zijin) {
        Showbo.Msg.alert('未获得权限');
        $location.path('/home');
      } else if (!$rootScope.user) {
        $location.path('/login');
      }
      ;
      /*if ($rootScope.user){
       $location.path(x);
       $('.analyse-modal-big').show();
       } else{
       $location.path('/login');
       }*/
    };
  }])
  .controller('tableController', ['$scope', 'strategyResources', 'strategyResource', '$http', '$timeout', '$cookieStore', 'constantUrl', 'strategysValue', 'myStrategysValue', '$filter', function ($scope, strategyResourcess, strategyResource, $http, $timeout, $cookieStore, constantUrl, strategysValue, myStrategysValue, $filter) {
    $scope.func = function (e) {
      return e["status"] != -3;
    };
    $scope.closeMask = function () {
      $('.zijin-table-mask').fadeOut();
    };
    $scope.allStrategys = [];

    /* 源策略 */
    $scope.openMaskSourcing = function () {
      $('.sourcing-mask').fadeIn();
    };
    $scope.getSourcingStrategys = function () {
      $http.get(constantUrl + "classs/", {
        headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
      })
        .success(function (data) {
          $scope.mySourcingStrategy = data;
        })
        .error(function (err, sta) {
          Showbo.Msg.alert('网络错误，请稍后再试。');
          //console.log(err);
          //console.log(sta);
        });
    };
    $scope.getSourcingStrategys();


    $scope.addSourcingStrategy = function () {
      var file = $scope.sourcingCode;
      var formdata = new FormData();
      formdata.append('code', file);
      formdata.append('class_name', $scope.itemSourcing.class_name);
      $http.post(constantUrl + "classs/", formdata, {
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined,
          'Authorization': 'token ' + $cookieStore.get('user').token
        }
      })
        .success(function (data) {
          $('.zijin-table-mask').fadeOut();
          //console.log(data);
          $scope.getSourcingStrategys();
          Showbo.Msg.alert('添加成功。');
        })
        .error(function (err, st) {
          //console.log(err);
          //console.log(st);
          $('.zijin-table-mask').fadeOut();
          Showbo.Msg.alert('添加失败，请稍后再试。');
        });
    };

    /* 创建实盘模拟 */
    $scope.getFirmStrategys = function () {
      $http.get(constantUrl + "strategys/", {
        headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
      })
        .success(function (data) {
          $scope.myStrategy = data;
          angular.forEach(data, function (item, index) {
            $scope.allStrategys.push(item);
          });
        })
        .error(function (err, sta) {
          Showbo.Msg.alert('网络错误，请稍后再试。');
          //console.log(err);
          //console.log(sta);
        });
    };
    $scope.getFirmStrategys();
    $scope.addFirmStrategy = function () {

      var files = $scope.files;
      var formdata = new FormData();
      formdata.append('name', $scope.firmItem.name);
      formdata.append('symbol', $scope.firmItem.symbol);
      formdata.append('class_id', strategysValue.id);
      formdata.append('author', strategysValue.author);
      formdata.append('exchange', $scope.firmItem.exchange);
      formdata.append('multiple', $scope.firmItem.multiple);
      //formdata.append('account_id', $scope.account._id);
      //修改实盘逻辑
      if (($scope.account != undefined) && ($scope.account != null)) {
        formdata.append('account_id', $scope.account._id);
      }

      if (($scope.files != undefined) && ($scope.files != null)) {
        formdata.append('file', files);
      }
      ;
      $http.post(constantUrl + "strategys/", formdata, {
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined,
          'Authorization': 'token ' + $cookieStore.get('user').token
        }
      })
        .success(function (data) {
          $('.zijin-table-mask').fadeOut();
          $scope.myStrategy = data;
          //console.log(data);
          $scope.getFirmStrategys();
          Showbo.Msg.alert('添加成功。');
        })
        .error(function (err, st) {
          //console.log(err);
          //console.log(st);
          $('.zijin-table-mask').fadeOut();
          Showbo.Msg.alert('添加失败，请稍后再试。');
        });
    };
    $scope.new =function () {
      $http.get(constantUrl + "accounts/",{headers: {'Authorization': 'token ' + $cookieStore.get('user').token}})
        .success(function (data) {
          $scope.ids = data;

         //console.log(data)
        })
        .error(function (err,sta) {
          Showbo.Msg.alert('网络错误，请稍后再试。');
        })

    }
    $scope.new();



    /* 创建历史回测 */
    $scope.hisItem = {};
    $scope.modeTickOptions = false;
    $scope.modeBarOptions = false;
    $scope.getBarList = function () {
      $scope.modeTickOptions = !$scope.modeBarOptions;
      if (!$scope.modeBarOptions) return;
      getModeList('bar');
    };
    $scope.getTickList = function () {
      $scope.modeBarOptions = !$scope.modeTickOptions;
      if (!$scope.modeTickOptions) return;
      getModeList('tick');
    };
    function getModeList(ty) {
      $http.get(constantUrl + "dates/", {
        params: {type: ty, date_type: 'data'},
        headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
      })
        .success(function (data) {
          $scope.hisItem.time = data;

        })
        .error(function (err, sta) {
          console.log(err);
          console.log(sta);
        });
    };
    $scope.addHisStrategy = function () {

      var files = $scope.files;
      var formdata = new FormData();
      if ($scope.modeBarOptions) {
        formdata.append('mode', 'bar');
      } else {
        formdata.append('mode', 'tick');
      }
      ;
      var mydate = $filter('date')(new Date((new Date($scope.hisItem.end)).setDate((new Date($scope.hisItem.end)).getDate() + 1)), 'yyyy-MM-dd');
      formdata.append('name', $scope.hisItem.name);
      formdata.append('start', $scope.hisItem.start);
      formdata.append('end', mydate);
      formdata.append('class_id', strategysValue.id);
      if (($scope.files != undefined) && ($scope.files != null)) {
        formdata.append('file', files);
      }
      ;
      $http.post(constantUrl + "btstrategys/", formdata, {
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined,
          'Authorization': 'token ' + $cookieStore.get('user').token
        }
      })
        .success(function (data) {
          $('.zijin-table-mask').fadeOut();
          $scope.myHisStrategy = data;
          //console.log(data);
          $scope.getHisStrategys();
       //   console.log(data);
          Showbo.Msg.alert('添加成功。');
        })
        .error(function (err, st) {
          //console.log(err);
          //console.log(st);
          $('.zijin-table-mask').fadeOut();
          Showbo.Msg.alert('添加失败，请稍后再试。');
        });
    };
    $scope.getHisStrategys = function () {
      $http.get(constantUrl + "btstrategys/", {
        headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
      })
        .success(function (data) {
          $scope.myHisStrategy = data;
          angular.forEach(data, function (item, index) {
            $scope.allStrategys.push(item);
          });
        })
        .error(function (err, sta) {
          Showbo.Msg.alert('网络错误，请稍后再试。');
          //console.log(err);
          //console.log(sta);
        });
    };
    $scope.getHisStrategys();


    /*getStrategys();
     function getStrategys(){
     $http.get(constantUrl+"strategys/",{
     headers:{'Authorization':'token '+$cookieStore.get('user').token}
     })
     .success(function(data){
     $scope.myStrategy=data;

     })
     .error(function(data){
     Showbo.Msg.alert('网络错误，请稍后再试。')
     });
     };
     $scope.openMask=function(){
     $('.zijin-table-mask').fadeIn();
     }

     $scope.addStrategy=function(){
     var file = $scope.code;
     var files=$scope.files;
     var formdata = new FormData();
     formdata.append('code', file);
     formdata.append('name', $scope.item.name);
     formdata.append('class', $scope.item.class);
     formdata.append('author', $scope.item.author);
     formdata.append('symbol', $scope.item.symbol);
     if (($scope.files!=undefined)&&($scope.files!=null)) {
     formdata.append('file',files);
     }
     $http.post(constantUrl+"strategys/",formdata,{
     transformRequest: angular.identity,
     headers: {'Content-Type': undefined,
     'Authorization':'token '+$cookieStore.get('user').token
     }
     })
     .success(function(data){
     $('.zijin-table-mask').fadeOut();
     getStrategys();
     Showbo.Msg.alert('添加成功。');
     })
     .error(function(err,st){
     //console.log(err);
     //console.log(st);
     Showbo.Msg.alert('添加失败，请稍后再试。');
     })
     }
     $scope.closeMask=function(){

     $('.zijin-table-mask').fadeOut();
     }*/


  }])
  .controller('userController', ['$scope', '$rootScope', '$http', '$location', '$cookies', '$cookieStore', 'constantUrl', 'myStrategysValue', '$q', function ($scope, $rootScope, $http, $location, $cookies, $cookieStore, constantUrl, myStrategysValue, $q) {
    $scope.adduser = function () {
      $http.post(constantUrl + 'users/', $scope.user)
        .success(function (data) {
          Showbo.Msg.alert('注册成功');
          $location.path('/login');
        })
        .error(function (err, sta) {
          //console.log(err);
          //console.log(sta);
          Showbo.Msg.alert('注册失败，请联系管理员。');
        });
    };

    $scope.userlogin = function () {
      function loginStep1() {
        var defer = $q.defer();
        $http.post(constantUrl + 'api-token-auth/', $scope.user)
          .success(function (data) {
            defer.resolve(data);
          })
          .error(function (err, sta) {
            defer.reject(err);
          });
        return defer.promise;
      };
      var username = $scope.user.username;
      var password = $scope.user.password;
      var token = '';
      loginStep1().then(function (data) {
        token = data.token;
        $http.get(constantUrl + 'users/' + username + '/', {
          headers: {'Authorization': 'token ' + token}
        })
          .success(function (data) {
            $cookieStore.put('user', {
              username: data.username,
              email: data.email,
              token: token,
              is_admin: data.is_admin,
              is_zijin: data.is_zijin
            });
            console.log($cookieStore.get('user'));
            $location.path('/home');
          })
          .error(function (err, sta) {
            Showbo.Msg.alert('登录失败。');
          });
      }, function () {
        Showbo.Msg.alert('登录失败。');
      });
      /*$http.post(constantUrl+'api-token-auth/',$scope.user)
       .success(function(data){
       $cookieStore.put('user',{
       username:username,
       password:password,
       token:token
       });
       $rootScope.user=$cookieStore.get('user');
       Showbo.Msg.alert('登录成功');
       $location.path('/home');
       //console.log($cookieStore.get('user'));
       })
       .error(function(err,sta){
       //console.log(err);
       //console.log(sta);
       Showbo.Msg.alert('登录失败，请联系管理员。');
       })*/
    };
  }])
  .controller('analyseController', ['$scope', '$rootScope', '$filter', '$http', 'constantUrl', '$cookieStore', 'myStrategysValue', '$q', function ($scope, $rootScope, $filter, $http, constantUrl, $cookieStore, myStrategysValue, $q) {
    $scope.closeModal = function () {
      $('.analyse-modal-big').hide();
    };
    var chartData1 = [];
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $scope.makeChart = function () {
      draw1();
      function draw1() {
        if (/{/.test($scope.analyseData)) {
          chartData1 = angular.fromJson($scope.analyseData);
        } else {
          var csvArr = ($scope.analyseData).split('format: symbol, price, volume, pos, trans_type, time');
          var csvArr1 = csvArr[1].replace(/\s/g, '');
          var csvArr2 = (csvArr1.replace(/IF/g, ' IF')).split(' ');
          console.dir(vsvArr2);
          angular.forEach(csvArr2, function (data, index) {
            if (index == 0) return;
            var arr = data.split(",");
            arr[5] = (arr[5]).replace(/(\d{4}-\d{2}-\d{2})(\d{2}:\d{2}:\d{2}\.\d{6})/, "$1 $2");
            chartData1.push({
              "name": csvArr[0],
              "price": Number(arr[1]),
              "time": (new Date(arr[5])).getTime(),
              "pos": Number(arr[3]),
              "volume": Number(arr[2]),
              "trans_type": arr[4],
              "symbol": arr[0]
            })
          })
          //console.log(chartData1);
        }
        ;
        var chartJsonData;
        var chartJsonDataArr = [];
        var chartArr = [];
        var indexShortArr = [];
        var indexBuyArr = [];
        $scope.analyseSymbol = " " + chartData1[0].symbol + ' ' + chartData1[0].name;
        angular.forEach(chartData1, function (data, index) {
          if (index == 0 && ((data.trans_type == "cover") || (data.trans_type == "sell")))
            return;
          if (index == chartData1.length - 1) return;
          if ((data.trans_type == "cover") || (data.trans_type == "sell")) return;
          if (data.trans_type == "short") {
            outer:
              for (var i = 0; i < chartData1.length; i++) {
                if (chartData1[i].trans_type == "cover") {
                  if (indexShortArr.length != 0) {
                    inter:
                      for (var j = 0; j < indexShortArr.length; j++) {
                        if (indexShortArr[j] == i) {
                          break inter;
                        } else if ((j == indexShortArr.length - 1) && (indexShortArr[j] != i)) {
                          var Earn;
                          if (data.name == 'AG_real') {
                            Earn = Number((chartData1[i].price - data.price - 0.32 * 2).toFixed(2));
                          } else {
                            Earn = Number((chartData1[i].price * (1 - 0.00003) - data.price * (1 + 0.00003)).toFixed(2));
                          }
                          ;
                          chartArr.push({
                            "volume": data.volume,
                            "direction": data.pos,
                            //"Earn":(chartData1[i].price-data.price).toFixed(2),
                            "Earn": Earn,
                            "openprice": data.price,
                            "closeprice": chartData1[i].price,
                            "opentime": data.datetime,
                            "closetime": chartData1[i].datetime,
                            "present": chartData1[i].price,
                            "name": data.name,
                            "symbol": data.symbol
                          });
                          indexShortArr.push(i);
                          break outer;
                        }
                        ;
                      }
                    ;
                  } else {
                    var Earn;
                    if (data.name == 'AG_real') {
                      Earn = $filter('number')(chartData1[i].price - data.price - 0.32 * 2, 2);
                    } else {
                      Earn = $filter('number')(chartData1[i].price * (1 - 0.00003) - data.price * (1 - 0.00003), 2);
                    }
                    ;
                    chartArr.push({
                      "volume": data.volume,
                      "direction": -1,
                      //"Earn":$filter('number')(chartData1[i].price-data.price,2),
                      "Earn": Earn,
                      "openprice": data.price,
                      "closeprice": chartData1[i].price,
                      "opentime": data.datetime,
                      "closetime": chartData1[i].datetime,
                      "present": chartData1[i].price,
                      "name": data.name,
                      "symbol": data.symbol
                    });
                    indexShortArr.push(i);
                    break outer;
                  }
                  ;
                }
                ;
              }
            ;
          }
          ;
          if (data.trans_type == "buy") {
            outer1:
              for (var i = 0; i < chartData1.length; i++) {
                if (chartData1[i].trans_type == "sell") {
                  if (indexShortArr.length != 0) {
                    inter1:
                      for (var j = 0; j < indexShortArr.length; j++) {
                        if (indexShortArr[j] == i) {
                          break inter1;
                        } else if ((j == indexShortArr.length - 1) && (indexShortArr[j] != i)) {
                          var Earn;
                          if (data.name == 'AG_real') {
                            Earn = $filter('number')(chartData1[i].price - data.price - 0.32 * 2, 2);
                          } else {
                            Earn = $filter('number')(chartData1[i].price * (1 - 0.00003) - data.price * (1 - 0.00003), 2);
                          }
                          ;
                          chartArr.push({
                            "volume": data.volume,
                            "direction": 1,
                            //"Earn":$filter('number')(chartData1[i].price-data.price,2),
                            "Earn": Earn,
                            "openprice": data.price,
                            "closeprice": chartData1[i].price,
                            "opentime": data.datetime,
                            "closetime": chartData1[i].datetime,
                            "present": chartData1[i].price,
                            "name": data.name,
                            "symbol": data.symbol
                          });
                          indexShortArr.push(i);
                          break outer1;
                        }
                        ;
                      }
                    ;
                  } else {
                    var Earn;
                    if (data.name == 'AG_real') {
                      Earn = $filter('number')(chartData1[i].price - data.price - 0.32 * 2, 2);
                    } else {
                      Earn = $filter('number')(chartData1[i].price * (1 - 0.00003) - data.price * (1 - 0.00003), 2);
                    }
                    ;
                    chartArr.push({
                      "volume": data.volume,
                      "direction": data.pos,
                      //"Earn":$filter('number')(chartData1[i].price-data.price,2),
                      "Earn": Earn,
                      "openprice": data.price,
                      "closeprice": chartData1[i].price,
                      "opentime": data.datetime,
                      "closetime": chartData1[i].datetime,
                      "present": chartData1[i].price,
                      "name": data.name,
                      "symbol": data.symbol
                    });
                    indexShortArr.push(i);
                    break outer1;
                  }
                  ;
                }
                ;
              }
            ;
          }
          ;
        });
        /* 1 */
        /*var chartArr1=[];
         angular.forEach(chartArr,function(data,index){
         if (data.closetime>1477411200000&&data.closetime<1477497599000) {
         //console.log($filter('date')(data.closetime,'yyyy-MM-dd H:mm:ss'));
         //console.log(data.Earn);
         chartArr1.push(data);
         }
         })
         if ($scope.analyseData.length>1000) {
         Showbo.Msg.alert("当前数据长度为"+$scope.analyseData.length+"条,可能加载时间过长，请稍等……")
         };*/

        /*var wealth1 = [];
         var buy1 = [];
         var totalpal1=0;
         angular.forEach(chartArr1,function(data,index){
         totalpal1=totalpal1+Number(data["Earn"]);
         if (data['direction']>0) {
         direction='看多';
         }else{
         direction='看空';
         }
         wealth1.push({
         "x":data["closetime"],
         "y":data['closeprice'],
         "pal":Number(data["Earn"]),
         "openprice":data['openprice'],
         "closeprice":data['closeprice'],
         "direction":direction,
         "totalpal":Number($filter('number')(parseFloat(totalpal1),2))
         });
         buy1.push({
         "x":data['closetime'],
         "y":data['direction']
         });
         })
         wealth1=$filter('orderBy')(wealth1,'x');*/
        /* 2 */
        var wealth1 = [];
        var wealth2 = [];
        angular.forEach(chartData1, function (data, index) {
          /*if(data.time>1477411200000&&data.time<1477497599000){*/
          if (data.trans_type == 'short' || data.trans_type == 'cover') {
            wealth1.push({
              "x": data["datetime"],
              "title": data["trans_type"]
            });
          } else if (data.trans_type == 'buy' || data.trans_type == 'sell') {
            wealth2.push({
              "x": data["datetime"],
              "title": data["trans_type"]
            });
          }
          ;
          /*}*/
        });
        wealth1 = $filter('orderBy')(wealth1, 'x');
        var wealth = [];
        var buy = [];
        var tradeItem = [];
        var direction;
        var amount = 0;
        var total = 0;
        var winrate;
        var totalWinrate = 0;
        var totalProfit = 0;
        var totalRate1 = 0;
        var totalRate2 = 0;
        var totalRate3 = 0;
        var totalRate4 = [];
        var yeildAbs;
        var totalpal = 0;
        var allTotalpal = 0;
        var allTotalyeild = 0;
        var prof = 0;
        var loss = 0;
        angular.forEach(chartArr, function (data, index) {
          console.log("data: "+data);
          totalpal = totalpal + Number(data["Earn"]);
          allTotalpal = allTotalpal + Number(data["Earn"]);
          if (data['direction'] > 0) {
            direction = '看多';
          } else {
            direction = '看空';
          }
          ;
          if (Number(data["Earn"]) > 0) {
            winrate = 100;
            yeildAbs = Math.abs((Number(data["Earn"]) * 100 / data['openprice']).toFixed(2));
            prof = prof + Number(data["Earn"]) * 100 / data['openprice'];
          } else {
            winrate = 0;
            yeildAbs = Math.abs((Number(data["Earn"]) * 100 / data['closeprice']).toFixed(2));
            loss = loss + Number(data["Earn"]) * 100 / data['openprice'];
          }
          ;
          wealth.push({
            "x": data["opentime"],
            "y": Number($filter('number')(parseFloat(totalpal), 2)),
            "pal": Number(data["Earn"]),
            "openprice": data['openprice'],
            "closeprice": data['closeprice']
          });
          buy.push({
            "x": data['opentime'],
            "y": data['direction']
          });
          tradeItem.push({
            "openprice": data['openprice'],
            "closeprice": data['closeprice'],
            "time": $filter('date')(data["opentime"], "yyyy-MM-dd H:mm:ss"),
            "pal": $filter('number')(Number(data["Earn"]), 2),
            "totalpal": $filter('number')(totalpal, 2),
            'direction': direction,
            'yeild': (Number(data["Earn"]) * 100 / data['openprice']).toFixed(2),
            'winrate': winrate,
            'yeildAbs': yeildAbs,
            'closetime': $filter('date')(data["closetime"], "yyyy-MM-dd H:mm:ss"),
            "opentime": $filter('date')(data["opentime"], "yyyy-MM-dd H:mm:ss")
          });
          totalWinrate = totalWinrate + winrate;
          total = total + Number(data["Earn"]) * 100 / data['openprice'];
          totalRate1 = totalRate1 + parseFloat(Number(data["Earn"]) * 100 / data['openprice'] - 0.0492);
          totalRate4.push(yeildAbs);
          allTotalyeild = allTotalyeild + Number(Number(data["Earn"]) * 100 / data['openprice']);
        });
        amount = tradeItem.length;
        $scope.analyseDataArr = tradeItem;
        console.log("+--------------  "+tradeItem.pal);
        /*$scope.annualized_return=parseFloat((Math.pow((1+total/100/amount),252/amount)-1)*100).toFixed(2);*/
        //$scope.annualized_return = ((allTotalyeild / amount * 250)).toFixed(2);

        $scope.average_winrate = parseFloat(totalWinrate / amount).toFixed(2);
        $scope.average_profit = parseFloat(prof / loss).toFixed(2);
        $scope.rate1 = parseFloat(totalRate1 / amount).toFixed(2);
        angular.forEach(chartArr, function (data, index) {
          totalRate2 = totalRate2 + parseFloat(Math.pow(parseFloat((Number(data["Earn"]) * 100 / data['openprice'] - 0.0492) - $scope.rate1), 2));
        });
        $scope.rate2 = Math.sqrt(parseFloat(totalRate2) / amount).toFixed(2);
        $scope.rate3 = parseFloat($scope.rate1 / $scope.rate2).toFixed(2);
        $scope.rate4 = (Math.max.apply(Math, totalRate4)).toFixed(2);
        //$scope.allTotalpal = allTotalpal;
        var total=0;
        for(var i=0;i<count;i++){
          total+=$scope.analyseDataArr[i].pal;
        }
        $scope.allTotalpal=total;
        $scope.allTotalyeild = (allTotalyeild).toFixed(2);
        $scope.averTotalyeild = (allTotalyeild / amount).toFixed(4);
        Highcharts.setOptions({
          global: {
            useUTC: false
          }
        });
        if ($scope.analyseJsonData) {
          chartJsonData = angular.fromJson($scope.analyseJsonData);
          angular.forEach(chartJsonData, function (data, index) {
            chartJsonDataArr.push({
              "x": date.datetime,
              "y": data.close,
              'low': data.low,
              'high': data.high,
              'close': data.close,
              'open': data.open,
              'volume': data.volume
            });
          });
          chartJsonDataArr = $filter('orderBy')(chartJsonDataArr, 'x');
          $('#return_map_big').highcharts('StockChart', {
            credits: {
              enabled: false
            },
            exporting: {
              enabled: false
            },
            plotOptions: {
              series: {
                turboThreshold: 0
              }
            },
            tooltip: {
              shared: true,
              useHTML: true,
              formatter: function () {
                var s = Highcharts.dateFormat('<span>%Y-%m-%d %H:%M:%S</span>', this.x);
                s += '<br />high:<b class="red">￥'
                  + Highcharts.numberFormat(this.points[0].point.high, 2)
                  + '</b><br />low:<b class="blue">￥'
                  + Highcharts.numberFormat(this.points[0].point.low, 2)
                  + '</b><br />close:<b class="green">￥'
                  + Highcharts.numberFormat(this.points[0].point.close, 2)
                  + '</b><br />open:<b class="font-black">￥'
                  + Highcharts.numberFormat(this.points[0].point.open, 2)
                  + '</b><br />volume:<b class="orange">笔 '
                  + Highcharts.numberFormat(this.points[0].point.volume, 2);
                return s;
              },
              valueDecimals: 2
            },

            legend: {
              enabled: true,
              align: 'right',
              verticalAlign: 'top',
              x: 0,
              y: 100
            },
            rangeSelector: {
              buttons: [
                {
                  type: 'minute',
                  count: 10,
                  text: '10m'
                }, {
                  type: 'minute',
                  count: 30,
                  text: '30m'
                }, {
                  type: 'hour',
                  count: 1,
                  text: '1h'
                }, {
                  type: 'day',
                  count: 1,
                  text: '1d'
                }, {
                  type: 'week',
                  count: 1,
                  text: '1w'
                }, {
                  type: 'all',
                  text: '所有'
                }],
              selected: 5,
              buttonSpacing: 2

            },
            yAxis: [{
              labels: {
                align: 'right',
                x: -3
              },
              title: {
                text: '股价'
              },

              lineWidth: 1
            }],

            series: [{
              type: 'line',
              name: '股价',
              data: chartJsonDataArr,
              lineWidth: 2,
              id: 'dataseries',
            }, {
              type: 'flags',
              data: wealth2,
              onSeries: "dataseries",
              shape: 'circlepin',
              width: 30,
              color: "#4169e1",
              fillColor: 'transparent',
              style: {
                color: '#333'
              },
              y: 24,
              name: '看多'
            }, {
              type: 'flags',
              data: wealth1,
              onSeries: "dataseries",
              shape: 'circlepin',
              width: 30,
              color: '#ff9912',
              fillColor: 'transparent',
              style: {
                color: '#333'
              },
              y: -40,
              name: '看空'
            }]
          });
        } else {
          $('#return_map_big').highcharts('StockChart', {
            credits: {
              enabled: false
            },
            exporting: {
              enabled: false
            },
            plotOptions: {
              series: {
                turboThreshold: 0
              }
            },
            tooltip: {
              shared: true,
              useHTML: true,
              formatter: function () {
                if (this.points[1].y == 1) {
                  var s = Highcharts.dateFormat('<span>%Y-%m-%d %H:%M:%S</span>', this.x);
                  s += '<br />总盈亏:<b class="white-blue">￥'
                    + Highcharts.numberFormat(this.y, 2)
                    + '</b><br />盈亏:<b class="font-black">￥'
                    + this.points[0].point.pal
                    + '</b><br />开仓价:<b class="font-black">￥'
                    + this.points[0].point.openprice
                    + '</b><br />平仓价:<b class="font-black">￥'
                    + this.points[0].point.closeprice
                    + '</b><br />方向:<span class="red">看多</span>';
                  return s;
                } else if (this.points[1].y == -1) {
                  var s = Highcharts.dateFormat('<span>%Y-%m-%d %H:%M:%S</span>', this.x);
                  s += '<br />总盈亏:<b class="white-blue">￥'
                    + this.y
                    + '</b><br />盈亏:<b class="font-black">￥'
                    + this.points[0].point.pal
                    + '</b><br />开仓价:<b class="font-black">￥'
                    + this.points[0].point.openprice
                    + '</b><br />平仓价:<b class="font-black">￥'
                    + this.points[0].point.closeprice
                    + '</b><br />方向:<span class="green">看空</span>';
                  return s;
                }
              },
              valueDecimals: 2
            },

            legend: {
              enabled: true,
              align: 'right',
              verticalAlign: 'top',
              x: 0,
              y: 100
            },
            rangeSelector: {
              buttons: [
                {
                  type: 'minute',
                  count: 10,
                  text: '10m'
                }, {
                  type: 'minute',
                  count: 30,
                  text: '30m'
                }, {
                  type: 'hour',
                  count: 1,
                  text: '1h'
                }, {
                  type: 'day',
                  count: 1,
                  text: '1d'
                }, {
                  type: 'week',
                  count: 1,
                  text: '1w'
                }, {
                  type: 'all',
                  text: '所有'
                }],
              selected: 5,
              buttonSpacing: 2

            },
            yAxis: [{
              labels: {
                align: 'right',
                x: -3
              },
              title: {
                text: '总盈亏'
              },
              height: '60%',
              lineWidth: 1
            },
              {
                labels: {
                  align: 'right',
                  x: -3
                },
                title: {
                  text: '交易方向（看多/看空）'
                },
                opposite: true,
                top: '65%',
                height: '35%',
                offset: 0,
                lineWidth: 1,
              }],

            series: [{
              type: 'line',
              name: '总盈亏',
              data: wealth,
              lineWidth: 2
            }, {
              type: 'column',
              name: '看多/看空',
              data: buy,
              yAxis: 1,
              threshold: 0,
              negativeColor: 'red',
              color: 'green'
            }]
          });
        }
        ;
      };
    };
    $scope.myFirmStrategyList = [];
    function getHisSelect() {
      $http.get(constantUrl + "btstrategys/", {
        headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
      })
        .success(function (data) {
          angular.forEach(data, function (x, y) {
            this.push({
              "name": x["name"],
              '_id': x["_id"],
              'status': x["status"],
              'exchange':x["exchange"],
              'symbol': x["symbol"],
            });
          }, $scope.myFirmStrategyList);
        });
    };

    getHisSelect();

    $scope.selecteStrategy = function () {
      $http.get(constantUrl + 'dates/', {
        params: {
          "date_type": 'transaction',
          "sty_id": $scope.myFirmStrategy._id
        },
        headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
      })
        .success(function (data) {
          $scope.myFirmDateList = data;
        })
        .error(function (err, sta) {
          if (sta == 400) {
            Showbo.Msg.alert('没有数据');
          }
          ;
        });
    };
    var nowsymbol;
    $scope.makeChart1 = function () {
      //console.log($scope.myFirmStrategy);
      //nowsymbol=$scope.myFirmStrateg;
      //console.log("当前交易合约;"+$scope.myFirmStrategy.symbol);//当前交易合约
      var mydate = $filter('date')(new Date((new Date($scope.myFirmEndDate)).setDate((new Date($scope.myFirmEndDate)).getDate() + 1)), 'yyyy-MM-dd');

      function getHisTime() {
        var defer1 = $q.defer();
        $http.get(constantUrl + 'transactions/', {
          params: {
            "sty_id": $scope.myFirmStrategy._id,
            "start": $scope.myFirmStartDate,
            "end": mydate
          },
          headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
        })
          .success(function (data) {
            defer1.resolve(data);
          })
          .error(function (err, sta) {
            defer1.reject(err);
          });
        return defer1.promise;
      };
      function getHisTransTime() {
        var defer2 = $q.defer();
        $http.get(constantUrl + 'datas/', {
          params: {
            "type": 'bar',
            "start": $scope.myFirmStartDate,
            "end": mydate

          },
          headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
        })
          .success(function (data) {
            defer2.resolve(data);
          })
          .error(function (err, sta) {
            defer2.reject(err);
          });
        return defer2.promise;
      };
      getHisTime().then(function (data) {
        var chartData11 = data;
        //console.log(data);
        getHisTransTime().then(function (data) {
          var chartJsonData = data;
          //console.log(data);
          $scope.analyse_title = {
            'name': $scope.myFirmStrategy.name,
            'time': $scope.myFirmStartDate + ' 至 ' + $scope.myFirmEndDate
          };
          draws1();

          function draws1() {
            var chartData1 = [];
            angular.forEach(chartData11, function (data, index) {
              var hour = parseInt($filter("date")(data["datetime"], "yyyy-MM-dd HH:mm:ss").slice(11, 13));
              var minute = parseInt($filter("date")(data["datetime"], "yyyy-MM-dd HH:mm:ss").slice(14, 16));
              // if (hour<9||hour>15||(hour==15&&minute>30)) {
              // }else{
              // 	this.push(data);
              // };
              if (data['name'] == 'AG_real') {
                if (hour < 6 || hour > 9) {
                  this.push(data);
                }
              } else {
                if (hour < 9 || hour > 15 || (hour == 15 && minute > 30)) {

                } else {
                  this.push(data);
                }
                ;
              }
              ;
            }, chartData1);
            /*$('#return_mapping_1').css('display','block').siblings().css('display','none');*/
            var chartJsonDataArr = [];
            var chartArr = [];
            var indexShortArr = [];
            var indexBuyArr = [];
            var buySellNum = 0;
            var buyYArr = [];
            var shortYArr = [];
            $scope.highstockAnalyseanalyseSymbol = chartData1[0].symbol + ' ' + chartData1[0].name;
            angular.forEach(chartData1, function (data, index) {
              if (index == 0 && ((data.trans_type == "cover") || (data.trans_type == "sell")))
                return;
              if (index == chartData1.length - 1) return;
              if ((data.trans_type == "cover") || (data.trans_type == "sell")) return;
              if (data.trans_type == "short") {

                outer:
                  for (var i = 0; i < chartData1.length; i++) {
                    if (chartData1[i].trans_type == "cover") {
                      if (indexShortArr.length != 0) {
                        inter:
                          for (var j = 0; j < indexShortArr.length; j++) {
                            if (indexShortArr[j] == i) {
                              break inter;
                            } else if ((j == indexShortArr.length - 1) && (indexShortArr[j] != i)) {
                              buySellNum++;
                              buyYArr.push({
                                "short": "short",
                                "text": '时间：' + $filter('date')(data.datetime, 'yyyy-MM-dd H:mm:ss') + '<br>成交价：￥' + data.price + '<br>成交量：' + data.volume,
                                "volume": data.volume,
                                "pos": data.pos,
                                "price": data.price,
                                "x": data.datetime,
                                "name": data.name,
                                "symbol": data.symbol,
                                "title": data.trans_type + ' ' + buySellNum
                              });
                              var Earn;
                              var y;
                              if (data.name == 'AG_real') {
                                Earn = Number((data.price - chartData1[i].price - 0.32 * 2).toFixed(2));
                                y = Number((data.price - chartData1[i].price - 0.32 * 2).toFixed(2));
                              } else {
                                Earn = Number((data.price * (1 - 0.00003) - chartData1[i].price * (1 + 0.00003)).toFixed(2));
                                y = Number((data.price * (1 - 0.00003) - chartData1[i].price * (1 + 0.00003)).toFixed(2));
                              }
                              ;
                              chartArr.push({
                                "x": chartData1[i].datetime,
                                //"y":Number((data.price-chartData1[i].price).toFixed(2)),
                                "y": y,
                                "volume": data.volume,
                                "direction": data.pos,
                                //"Earn":Number((data.price-chartData1[i].price).toFixed(2)),
                                "Earn": Earn,
                                "openprice": data.price,
                                "closeprice": chartData1[i].price,
                                "opentime": data.datetime,
                                "closetime": chartData1[i].datetime,
                                "present": chartData1[i].price,
                                "name": data.name,
                                "symbol": data.symbol
                              });

                              buyYArr.push({
                                "short": "short",
                                "text": '时间：' + $filter('date')(chartData1[i].datetime, 'yyyy-MM-dd H:mm:ss') + '<br>成交价：￥' + chartData1[i].price
                                + '<br>成交量：' + chartData1[i].volume,
                                "volume": chartData1[i].volume,
                                "pos": chartData1[i].pos,
                                "price": chartData1[i].price,
                                "x": chartData1[i].datetime,
                                "name": chartData1[i].name,
                                "symbol": chartData1[i].symbol,
                                "title": chartData1[i].trans_type + ' ' + buySellNum
                              });
                              indexShortArr.push(i);
                              break outer;
                            }
                            ;
                          }
                        ;
                      } else {
                        buySellNum++;
                        buyYArr.push({
                          "short": "short",
                          "text": '时间：' + $filter('date')(data.datetime, 'yyyy-MM-dd H:mm:ss') + '<br>成交价：￥' + data.price + '<br>成交量：' + data.volume,
                          "volume": data.volume,
                          "pos": data.pos,
                          "price": data.price,
                          "x": data.datetime,
                          "name": data.name,
                          "symbol": data.symbol,
                          "title": data.trans_type + ' ' + buySellNum
                        });
                        var Earn;
                        var y;
                        if (data.name == 'AG_real') {
                          Earn = Number((data.price - chartData1[i].price - 0.32 * 2).toFixed(2));
                          y = Number((data.price - chartData1[i].price - 0.32 * 2).toFixed(2));
                        } else {
                          Earn = Number((data.price * (1 - 0.00003) - chartData1[i].price * (1 + 0.00003)).toFixed(2));
                          y = Number((data.price * (1 - 0.00003) - chartData1[i].price * (1 + 0.00003)).toFixed(2));
                        }
                        ;
                        chartArr.push({

                          "x": chartData1[i].datetime,
                          //"y":Number((data.price-chartData1[i].price).toFixed(2)),
                          "y": y,
                          "volume": data.volume,
                          "direction": -1,
                          //"Earn":Number((data.price-chartData1[i].price).toFixed(2)),
                          "Earn": Earn,
                          "openprice": data.price,
                          "closeprice": chartData1[i].price,
                          "opentime": data.datetime,
                          "closetime": chartData1[i].datetime,
                          "present": chartData1[i].price,
                          "name": data.name,
                          "symbol": data.symbol
                        });
                        buyYArr.push({
                          "short": "short",
                          "text": '时间：' + $filter('date')(chartData1[i].datetime, 'yyyy-MM-dd H:mm:ss') + '<br>成交价：￥' + chartData1[i].price + '<br>成交量：' + chartData1[i].volume,
                          "volume": chartData1[i].volume,
                          "pos": chartData1[i].pos,
                          "price": chartData1[i].price,
                          "x": chartData1[i].datetime,
                          "name": chartData1[i].name,
                          "symbol": chartData1[i].symbol,
                          "title": chartData1[i].trans_type + ' ' + buySellNum
                        });
                        indexShortArr.push(i);
                        break outer;
                      }
                      ;
                    }
                    ;
                  }
                ;
              }
              ;
              if (data.trans_type == "buy") {

                outer1:
                  for (var i = 0; i < chartData1.length; i++) {
                    if (chartData1[i].trans_type == "sell") {
                      if (indexShortArr.length != 0) {
                        inter1:
                          for (var j = 0; j < indexShortArr.length; j++) {
                            if (indexShortArr[j] == i) {
                              break inter1;
                            } else if ((j == indexShortArr.length - 1) && (indexShortArr[j] != i)) {
                              buySellNum++;
                              shortYArr.push({
                                "buy": 'buy',
                                "text": '时间：' + $filter('date')(data.datetime, 'yyyy-MM-dd H:mm:ss') + '<br>成交价：￥' + data.price + '<br>成交量：' + data.volume,
                                "volume": data.volume,
                                "pos": data.pos,
                                "price": data.price,
                                "x": data.datetime,
                                "name": data.name,
                                "symbol": data.symbol,
                                "title": data.trans_type + ' ' + buySellNum
                              });
                              var Earn;
                              var y;
                              if (data.name == 'AG_real') {
                                Earn = Number((chartData1[i].price - data.price - 0.32 * 2).toFixed(2));
                                y = Number((chartData1[i].price - data.price - 0.32 * 2).toFixed(2));
                              } else {
                                Earn = Number((chartData1[i].price * (1 - 0.00003) - data.price * (1 + 0.00003)).toFixed(2));
                                y = Number((chartData1[i].price * (1 - 0.00003) - data.price * (1 + 0.00003)).toFixed(2));
                              }
                              ;
                              chartArr.push({

                                "x": chartData1[i].datetime,
                                //"y":Number((chartData1[i].price-data.price).toFixed(2)),
                                "y": y,
                                "volume": data.volume,
                                "direction": 1,
                                //"Earn":Number((chartData1[i].price-data.price).toFixed(2)),
                                "Earn": Earn,
                                "openprice": data.price,
                                "closeprice": chartData1[i].price,
                                "opentime": data.datetime,
                                "closetime": chartData1[i].datetime,
                                "present": chartData1[i].price,
                                "name": data.name,
                                "symbol": data.symbol
                              });
                              shortYArr.push({
                                "buy": 'buy',
                                "text": '时间：' + $filter('date')(chartData1[i].datetime, 'yyyy-MM-dd H:mm:ss') + '<br>成交价：￥' + chartData1[i].price + '<br>成交量：' + chartData1[i].volume,
                                "volume": chartData1[i].volume,
                                "pos": chartData1[i].pos,
                                "price": chartData1[i].price,
                                "x": chartData1[i].datetime,
                                "name": chartData1[i].name,
                                "symbol": chartData1[i].symbol,
                                "title": chartData1[i].trans_type + ' ' + buySellNum
                              });
                              indexShortArr.push(i);
                              break outer1;
                            }
                            ;
                          }
                        ;
                      } else {
                        buySellNum++;
                        shortYArr.push({
                          "buy": 'buy',
                          "text": '时间：' + $filter('date')(data.datetime, 'yyyy-MM-dd H:mm:ss') + '<br>成交价：￥' + data.price + '<br>成交量：' + data.volume,
                          "volume": data.volume,
                          "pos": data.pos,
                          "price": data.price,
                          "x": data.datetime,
                          "name": data.name,
                          "symbol": data.symbol,
                          "title": data.trans_type + ' ' + buySellNum
                        });
                        var Earn;
                        var y;
                        if (data.name == 'AG_real') {
                          Earn = Number((chartData1[i].price - data.price - 0.32 * 2).toFixed(2));
                          y = Number((chartData1[i].price - data.price - 0.32 * 2).toFixed(2));
                        } else {
                          Earn = Number((chartData1[i].price * (1 - 0.00003) - data.price * (1 + 0.00003)).toFixed(2));
                          y = Number((chartData1[i].price * (1 - 0.00003) - data.price * (1 + 0.00003)).toFixed(2));
                        }
                        ;
                        chartArr.push({

                          "x": chartData1[i].datetime,
                          //"y":Number((chartData1[i].price-data.price).toFixed(2)),
                          "y": y,
                          "volume": data.volume,
                          "direction": data.pos,
                          //"Earn":Number((chartData1[i].price-data.price).toFixed(2)),
                          "Earn": Earn,
                          "openprice": data.price,
                          "closeprice": chartData1[i].price,
                          "opentime": data.datetime,
                          "closetime": chartData1[i].datetime,
                          "present": chartData1[i].price,
                          "name": data.name,
                          "symbol": data.symbol
                        });
                        shortYArr.push({
                          "buy": 'buy',
                          "text": '时间：' + $filter('date')(chartData1[i].datetime, 'yyyy-MM-dd H:mm:ss') + '<br>成交价：￥' + chartData1[i].price + '<br>成交量：' + chartData1[i].volume,
                          "volume": chartData1[i].volume,
                          "pos": chartData1[i].pos,
                          "price": chartData1[i].price,
                          "x": chartData1[i].datetime,
                          "name": chartData1[i].name,
                          "symbol": chartData1[i].symbol,
                          "title": chartData1[i].trans_type + ' ' + buySellNum
                        });
                        indexShortArr.push(i);
                        break outer1;
                      }
                      ;
                    }
                    ;
                  }
                ;
              }
              ;
            });

            shortYArr = $filter('orderBy')(shortYArr, 'x');
            buyYArr = $filter('orderBy')(buyYArr, 'x');
            chartArr = $filter('orderBy')(chartArr, 'x');
            /*var wealth1 = [];
             var wealth2=[];
             angular.forEach(chartData1,function(data,index){
             if(data.trans_type=='short'||data.trans_type=='cover'){
             wealth1.push({
             "x":data["datetime"],
             "title":data["trans_type"]
             });
             }else if(data.trans_type=='buy'||data.trans_type=='sell'){
             wealth2.push({
             "x":data["datetime"],
             "title":data["trans_type"]
             });
             }
             })
             wealth1=$filter('orderBy')(wealth1,'x');*/
            var wealth = [];
            var buy = [];
            var tradeItem = [];
            var direction;
            var amount = 0;
            var total = 0;
            var winrate;
            var totalWinrate = 0;
            var totalProfit = 0;
            var totalRate1 = 0;
            var totalRate2 = 0;
            var totalRate3 = 0;
            var totalRate4 = [];
            var yeildAbs;
            var totalpal = 0;
            var allTotalpal = 0;
            var allTotalyeild = 0;
            var allTotalTime = 0;//总持仓时间r
            var averTotalTime = 0;//平均持仓时间
            var errorYeild = 0;//跟踪误差年化波动率
            var prof = 0;
            var loss = 0;
            var yeildArrs = [];
            //封装的计算时间的方法，这里只需要传进毫秒数 自动return HH:MM:SS 格式的时间；
            $scope.newTotalTime = function (time) {
              var hour = 0;
              //这里因为都需要把 小时数归零 所以 hour = 0 定义在外面
              var min = parseInt((time) / 1000 / 60);
              //分钟 的计算 除以 1000 是除去毫秒 之后 除以 60 计算出带小数点的分钟数 这里需要取整
              var sec = Math.ceil((((time) / 1000 / 60) - min) * 60);
              //秒 的计算 同分钟 这里用带毫秒的分钟数 减去 取整 后的分钟数 得到小数点后的 数值 之后 *60 向上取整 得到正确 秒
              if (min >= 60) {
                hour = parseInt(min / 60);
                min = min - hour * 60;
              }
              if (hour < 10) hour = "0" + hour;
              if (min < 10) min = "0" + min;
              if (sec < 10) sec = "0" + sec;
              var totalTime = hour + ":" + min + ":" + sec;
              return totalTime;
            }
            var allTotalTime1 = 0;
            var delNum = [];
            angular.forEach(chartArr, function (data, index) {
              if (data['openprice'] == 0 || data['closeprice'] == 0) {
                delNum.push(index);
              }
              ;
            });
            angular.forEach(delNum, function (data, index) {
              chartArr.splice(data, 1);
            });
            angular.forEach(chartArr, function (data, index) {
              amount = tradeItem.length + 1;
              var totalTime = $scope.newTotalTime((data['closetime'] - data['opentime']));

              allTotalTime1 += (data['closetime'] - data['opentime']);
              $scope.allTotalTime = $scope.newTotalTime(allTotalTime1);//alltotaltime是总持仓时间
              $scope.averTotalTime = $scope.newTotalTime(allTotalTime1 / amount);//averTotalTime是平均持仓时间
              totalpal = totalpal + Number(data["Earn"]);
              allTotalpal = allTotalpal + Number(data["Earn"]);
              /*console.log(data["Earn"]);*/
              if (data['direction'] > 0) {
                direction = '看多';
              } else {
                direction = '看空';
              }
              if (Number(data["Earn"]) > 0) {
                winrate = 100;
                yeildAbs = Math.abs((Number(data["Earn"]) * 100 / data['openprice']).toFixed(2));
                prof = prof + Number(data["Earn"]) * 100 / data['openprice'];
              } else {
                winrate = 0;
                yeildAbs = Math.abs((Number(data["Earn"]) * 100 / data['closeprice']).toFixed(2));
                loss = loss + Number(data["Earn"]) * 100 / data['openprice'];
              }
              wealth.push({
                "x": data["opentime"],
                "y": Number(totalpal.toFixed(2)),
                "pal": Number(data["Earn"]),
                "openprice": data['openprice'],
                "closeprice": data['closeprice']
              });
              buy.push({
                "x": data['opentime'],
                "y": data['direction']
              });

              if (data['direction'] > 0) {
                data["Earn"] = data['closeprice']*0.0035-data['openprice']*0.0035;

              } else {
                data["Earn"] = data['openprice']*0.0035-data['closeprice']*0.0035;
              }
              tradeItem.push({
                "openprice": data['openprice'],
                "closeprice": data['closeprice'],
                //"totalTime":$filter('date')(data['closetime']-data['opentime'],"H:mm:ss"),
                "totalTime": totalTime,
                "time": $filter('date')(data["opentime"], "yyyy-MM-dd HH:mm:ss"),
                "pal": Number(data["Earn"].toFixed(2)),
                // "pal":Number(a.toFixed(2)),
                //"pal":data['closeprice']-data['openprice'],
                "totalpal": Number(totalpal.toFixed(2)),
                'direction': direction,
                'yeild': Number((Number(data["Earn"]) * 100 / data['openprice']).toFixed(2)),
                'winrate': winrate,
                'yeildAbs': yeildAbs,
                'closetime': $filter('date')(data["closetime"], "yyyy-MM-dd HH:mm:ss"),
                "opentime": $filter('date')(data["opentime"], "yyyy-MM-dd HH:mm:ss")
              });
              yeildArrs.push(parseFloat((((data['closeprice'] - data['openprice']) / data['openprice']) * 100).toFixed(2)));
              totalWinrate += winrate;//总胜率
              /*allTotalTime=allTotalTime+(data['closetime']-data['opentime']);*/
              total = total + Number(data["Earn"]) * 100 / data['openprice'];
              totalRate1 = totalRate1 + parseFloat(Number(data["Earn"]) * 100 / data['openprice'] - 0.0492);
              totalRate4.push(yeildAbs);
              allTotalyeild = allTotalyeild + Number((Number(data["Earn"]) * 100 / data['openprice']));
              //allTotalyeild+=((data['closeprice']-data['openprice'])/data['openprice']);//总收益率
            });

            var symbol=$scope.myFirmStrategy.symbol[0]+$scope.myFirmStrategy.symbol[1];
            //console.log(symbol);
            var charge;
            if(symbol=="IF"||symbol=="IC"||symbol||"IH"){
              charge=0.00015;
            }
            else{
              charge=0.00035;
            }
            //封装计算手续费方法
            function gettest(i){
              if ($scope.analyseDataArr[i].direction == "看多") {
                //console.log("看多");
                var test = $scope.analyseDataArr[i].closeprice - $scope.analyseDataArr[i].openprice - ($scope.analyseDataArr[i].closeprice + $scope.analyseDataArr[i].openprice) * charge;
              }
              else {
                //console.log("看空");
                var test = $scope.analyseDataArr[i].openprice - $scope.analyseDataArr[i].closeprice - ($scope.analyseDataArr[i].openprice + $scope.analyseDataArr[i].closeprice) * charge;
              }
              test=Number((test).toFixed(6));
              return test;
            }


            var allYelidArrPow = 0;
            var maxBack = 0;//最大回撤率
            amount = tradeItem.length;
            console.log(amount);
            var count=0;
            angular.forEach(tradeItem, function (data, index) {
              allYelidArrPow = allYelidArrPow + Math.pow(data["yeild"] - allTotalyeild, 2);
              count++;
            });
            yeildArrs.sort(function (a, b) {
              return a - b;
            });
            maxBack = (yeildArrs[yeildArrs.length - 1] - yeildArrs[0]) / yeildArrs[yeildArrs.length - 1];//最大回撤
            //console.log(maxBack);
            $scope.analyseDataArr = tradeItem;
            //console.log($scope.analyseDataArr);
            /*$scope.annualized_return=Number(parseFloat((Math.pow((1+total/100/amount),252/amount)-1)*100).toFixed(2));*/
            /*$scope.average_winrate=Number(parseFloat(totalWinrate/amount).toFixed(2));*/
            $scope.average_winrate = (totalWinrate / amount).toFixed(2);
            $scope.average_profit = Number(parseFloat(prof / loss).toFixed(2));
            /*$scope.rate1=Number(parseFloat(totalRate1/amount).toFixed(2));*/
            $scope.rate1 = Number(parseFloat(allTotalyeild / amount).toFixed(2));
            /*$scope.rate2=Math.sqrt(parseFloat(totalRate2)/amount).toFixed(2);*/
            $scope.rate2 = Math.sqrt(allYelidArrPow / amount).toFixed(2);//策略收益波动率
            /*$scope.rate3=Number(parseFloat($scope.rate1/$scope.rate2).toFixed(2));*/
            $scope.rate3 = ((((allTotalyeild / amount * 250) * 100) - 1.10) / $scope.rate2).toFixed(2);//夏普比率
            $scope.rate4 = maxBack.toFixed(2);
            //$scope.allTotalpal = allTotalpal;

            /*$scope.allTotalyeild=Number(allTotalyeild.toFixed(2));*/
            //$scope.allTotalyeild = allTotalyeild.toFixed(4);
            //$scope.averTotalyeild = Number((allTotalyeild / amount).toFixed(4));
            //$scope.annualized_return = ((allTotalyeild / amount * 250)).toFixed(2);

            //回测回测回测
// maxBack=0;  //最大回撤率，最大回撤就是最低点除以之前的最高减去1
            //var down = new Array();
            var max=0;
            var min=100;
            for(var i=0;i<count;i++) {
              var test=gettest(i);
              if (test > max) {
                max=test;
              }
              if(test < min){
                min=test;
              }
            }
            maxBack=min/max-1;


            $scope.allTotalpal=0;
            for(var i=0;i<count;i++){
              $scope.allTotalpal+=$scope.analyseDataArr[i].pal;
              //console.log($scope.allTotalpal);
            }
            //收益率
            var allTotalpal= 0;
            var allTotalyeild =0;
            var oldtotal= 0;
            for(var i=0;i<count;i++){
              var test=gettest(i);
              // oldtotal+=$scope.analyseDataArr[i].pal;
              $scope.analyseDataArr[i].pal=test;
              chartArr[i].Earn = test;
              chartArr[i].y=test;
              $scope.analyseDataArr[i].yeild = test / $scope.analyseDataArr[i].openprice;
              allTotalyeild +=$scope.analyseDataArr[i].yeild;
              // console.log("盈亏:"+$scope.analyseDataArr[i].pal);
              allTotalpal+=$scope.analyseDataArr[i].pal;
              //console.log(totallv);
            }
            $scope.allTotalpal=allTotalpal;
            $scope.allTotalyeild=allTotalyeild;
            //$scope.annualized_return= 6;//年化收益率
            $scope.annualized_return= allTotalyeild*250;//年化收益率
            //$scope.annualized_return=Math.pow(allTotalyeild,250)-1;//年化收益率


            var zheng=0;
            for(var i=0;i<count;i++){
              var test=gettest(i);
              if(test>0){
                $scope.analyseDataArr[i].winrate=100;
                zheng++;
              }
              else{
                $scope.analyseDataArr[i].winrate=0;
              }
            }
            $scope.average_winrate=zheng/count*100;
            var mean=0;
            var a=0;
            for(var i=0;i<count;i++){
              var test=gettest(i);
              mean+=test;
              a+=Math.pow(test-mean,2);
            }
            mean=mean/count;//收益均值

            // 平均盈利/平均亏损
            $scope.average_profit=0;
            var yin=0;
            var kui=0;
            for(var i=0;i<count;i++){
              var test=gettest(i);
              if(test>0){
                yin+=test;
              }else{
                kui+=test;
              }
            }
            var total=0;
            var a=0;
            var b=0;
            for(var i=0;i<count;i++) {
              var test=gettest(i);

              $scope.analyseDataArr[i].yeild=test/$scope.analyseDataArr[i].openprice;

              if(test>0){
                a+=test;
              }
              else{
                b+=test;
              }
              total+= $scope.analyseDataArr[i].yeild;
            }
            $scope.average_profit=Math.abs(a/b)*100;



            var std=Math.sqrt(a);
            var nianhua=std*Math.sqrt(250);//年化标准差,std*sqrt(250)是最普通的做法，mean的部分要乘以250(策略收益波动率)
            //console.log(mean,std);
            $scope.rate1=allTotalyeild/count;
            //console.log(allTotalyeild,count);
            $scope.rate2=nianhua;
            $scope.rate3 =(mean)/std;//sharpe就每天受益平均下除以std
            $scope.errorYeild=mean/nianhua;//信息比率(策略每日收益 - 参考标准每日收益)的年化均值 / 年化标准差

            //$scope.errorYeild = ((((allTotalyeild / amount * 250) * 100) - 4.67) / $scope.rate2).toFixed(2);//跟踪误差年化波动率


            Highcharts.setOptions({
              global: {
                useUTC: false
              }
            });

            /*chartJsonData=angular.fromJson($scope.analyseJsonData);*/
            angular.forEach(chartJsonData, function (data, index) {
              chartJsonDataArr.push({
                "x": data.datetime,
                "y": data.close,
                'low': data.low,
                'high': data.high,
                'close': data.close,
                'open': data.open,
                'volume': data.volume
              });
            });
            chartJsonDataArr = $filter('orderBy')(chartJsonDataArr, 'x');
            ////////////////////////////////////////////////////////////////////////////////////
            $('#return_map_big').highcharts('StockChart', {
              credits: {
                enabled: false
              },
              exporting: {
                enabled: false
              },
              plotOptions: {
                series: {
                  turboThreshold: 0
                }
              },
              /*tooltip : {
               shared : true,
               useHTML : true,
               valueDecimals : 2 ,
               backgroundColor: 'white',
               borderWidth: 0,
               borderRadius: 0,
               formatter : function() {

               var s;
               if(this.points[0].point.high){
               $scope.highstockAnalysetime=$filter('date')(this.x,'yyyy-MM-dd H:mm:ss');
               $scope.highstockAnalysehigh=$filter('number')(this.points[0].point.high,2);
               $scope.highstockAnalyselow=$filter('number')(this.points[0].point.low,2);
               $scope.highstockAnalyseopen=$filter('number')(this.points[0].point.open,2);
               $scope.highstockAnalyseclose=$filter('number')(this.points[0].point.close,2);
               $scope.$apply();
               }
               if(this.points[0].point.direction&&this.point.text){
               s=this.point.text;
               }else if(this.points[0].point.direction&&!this.point){
               var dir=(this.points[0].point.direction>0)?'看多':'看空';
               s = Highcharts.dateFormat('<span>%Y-%m-%d %H:%M:%S</span>',this.x);
               s+= '<br />volume：<b class="red">'
               +Highcharts.numberFormat(this.points[0].point.volume,2)
               +'</b><br />Earn：<b class="font-black">￥'
               +Highcharts.numberFormat(this.points[0].point.Earn,2)
               + '</b><br />openprice：<b class="font-black">￥'
               +Highcharts.numberFormat(this.points[0].point.openprice,2)
               + '</b><br />closeprice<b class="font-black">￥'
               +Highcharts.numberFormat(this.points[0].point.closeprice,2)
               + '</b><br />direction：<b class="font-black">'
               +dir;
               }
               return s;*/
              /*var s = Highcharts.dateFormat('<span>%Y-%m-%d %H:%M:%S</span>',this.x);
               s += '<br />high：<b class="red">￥'
               +Highcharts.numberFormat(this.points[0].point.high,2)
               +'</b>&nbsp;&nbsp;|&nbsp;&nbsp;low：<b class="blue">￥'
               +Highcharts.numberFormat(this.points[0].point.low,2)
               + '</b>&nbsp;&nbsp;|&nbsp;&nbsp;close：<b class="green">￥'
               +Highcharts.numberFormat(this.points[0].point.close,2)
               + '</b>&nbsp;&nbsp;|&nbsp;&nbsp;open：<b class="font-black">￥'
               +Highcharts.numberFormat(this.points[0].point.open,2)
               + '</b>&nbsp;&nbsp;|&nbsp;&nbsp;volume：<b class="orange">'
               +Highcharts.numberFormat(this.points[0].point.volume,2)+'笔';
               return s;
               },
               positioner: function () {
               return { x: 0, y: 20 };
               },
               shadow: false
               },*/
              tooltip: {
                useHTML: true,
                xDateFormat: "%Y-%m-%d %H:%M:%S",
                valueDecimals: 2
              },
              legend: {
                enabled: true,
                align: 'right',
                verticalAlign: 'top',
                x: 0,
                y: 0
              },
              rangeSelector: {
                buttons: [
                  {
                    type: 'minute',
                    count: 10,
                    text: '10m'
                  }, {
                    type: 'minute',
                    count: 30,
                    text: '30m'
                  }, {
                    type: 'hour',
                    count: 1,
                    text: '1h'
                  }, {
                    type: 'day',
                    count: 1,
                    text: '1d'
                  }, {
                    type: 'week',
                    count: 1,
                    text: '1w'
                  }, {
                    type: 'all',
                    text: '所有'
                  }],
                selected: 5,
                buttonSpacing: 2

              },
              yAxis: [{
                labels: {
                  align: 'right',
                  x: -3
                },
                title: {
                  text: '股价'
                },
                lineWidth: 1,
                height: '60%'
              }, {
                labels: {
                  align: 'right',
                  x: -3
                },
                title: {
                  text: '盈亏'
                },
                opposite: true,
                offset: 0,
                height: '35%',
                top: '65%'
              }],
              series: [{
                type: 'line',
                name: '股价',
                data: chartJsonDataArr,
                lineWidth: 2,
                id: 'dataseries'
              }, {
                type: 'flags',
                data: shortYArr,
                onSeries: "dataseries",
                shape: 'squarepin',
                width: 36,
                color: "#4169e1",
                fillColor: 'transparent',
                style: {
                  color: '#333'
                },
                y: -40,
                name: '看多',
              }, {
                type: 'flags',
                data: buyYArr,
                onSeries: "dataseries",
                shape: 'squarepin',
                width: 36,
                color: '#ff9912',
                fillColor: 'transparent',
                style: {
                  color: '#333'
                },
                y: 20,
                name: '看空',
              }, {
                type: 'column',
                data: chartArr,
                name: '盈亏',
                /*lineWidth:2,*/
                yAxis: 1,
                threshold: 0,
                negativeColor: 'green',
                color: 'red'
                /*color:'#e3170d',*/
                /*marker:{
                 enabled:true,
                 symbol:'circle',
                 fillColor:'#0b1746',
                 radius:5
                 }*/
              }]
            });
            $('#return_map_big1').highcharts('StockChart', {
              chart:{
                width:1200,
                height:600
              },

              xAxis: {
                tickInterval: 1
              },

              yAxis: {
                type: '盈亏',
                minorTickInterval: 0.1,
                plotLines:[{
                  color:'#A25E6B',           //线的颜色
                  dashStyle:'solid',     //默认值，这里定义为实线
                  value:0,               //定义在那个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
                  width:2               //标示线的宽度，2px
                }]

              },


              rangeSelector: {
                buttons: [
                  {
                    type: 'minute',
                    count: 10,
                    text: '10m'
                  }, {
                    type: 'minute',
                    count: 30,
                    text: '30m'
                  }, {
                    type: 'hour',
                    count: 1,
                    text: '1h'
                  }, {
                    type: 'day',
                    count: 1,
                    text: '1d'
                  }, {
                    type: 'week',
                    count: 1,
                    text: '1w'
                  }, {
                    type: 'all',
                    text: '所有'
                  }],
                selected: 5,
                buttonSpacing: 2
              },

              series: [
                {
                  data: chartArr,
                  name: '盈亏'
                  /*lineWidth:2,*/

                  /*color:'#e3170d',*/
                  /*marker:{
                   enabled:true,
                   symbol:'circle',
                   fillColor:'#0b1746',
                   radius:5
                   }*/
                }]
            });

          };
        });
      }, function (err, sta) {
        Showbo.Msg.alert('没有交易数据');
      });
      /*function getTransTime(){
       var defer2=$q.defer();
       $http.get(constantUrl+'datas/',{
       params:{
       "type":'tick',
       "date":$scope.myFirmDate
       },
       headers:{'Authorization':'token '+$cookieStore.get('user').token}
       })
       .success(function(data){
       defer2.resolve(data);
       })
       .error(function(err,sta){
       defer2.reject(err);
       })
       return defer2.promise;
       };*/
      /*$q.all([getFirmTime(), getTransTime()]).then(function(dataArr){
       //console.log(dataArr[0]);
       },function(err){
       //console.log(2);
       },function(up){
       //console.log(3);
       })*/
    }
  }])
  // 历史/实盘测试
  .controller('actualResController', ['$scope', '$rootScope', '$filter', '$http', 'constantUrl', '$cookieStore', 'myStrategysValue', '$q', function ($scope, $rootScope, $filter, $http, constantUrl, $cookieStore, myStrategysValue, $q) {
    $scope.closeModal = function () {
      $('.analyse-modal-big').hide();
    };
    var chartData1 = [];
    //输入实盘交易数据，点我生成图表功能
    $scope.makeChart = function () {
      draw();
      function draw() {
        if (/{/.test($scope.analyseData)) {//?????????????????????
          chartData1 = angular.fromJson($scope.analyseData);
        } else {
          // format：格式
          // split() 方法用于把一个字符串分割成字符串数组。
          var csvArr = ($scope.analyseData).split('format: symbol, price, volume, pos, trans_type, time');
          var csvArr1 = csvArr[1].replace(/\s/g, '');
          var csvArr2 = (csvArr1.replace(/IF/g, ' IF')).split(' ');
          angular.forEach(csvArr2, function (data, index) {
            /////????????????????????????????????????????
            if (index == 0) return;
            var arr = data.split(",");
            arr[5] = (arr[5]).replace(/(\d{4}-\d{2}-\d{2})(\d{2}:\d{2}:\d{2}\.\d{6})/, "$1 $2");
            chartData1.push({
              "name": csvArr[0],
              "price": Number(arr[1]),
              "time": (new Date(arr[5])).getTime(),
              "pos": Number(arr[3]),//?????????
              "volume": Number(arr[2]),//成交量
              "trans_type": arr[4],//交易类型???
              "symbol": arr[0]//???????????????
            });
          });
          //console.log(chartData1);
        };
        var chartJsonData;//图表Json数据
        var chartJsonDataArr = [];//图表Json数据数组
        var chartArr = [];//图表数组，与画图有关
        var indexShortArr = [];//????
        var indexBuyArr = [];//????
        $scope.analyseSymbol = " " + chartData1[0].symbol + ' ' + chartData1[0].name;
        angular.forEach(chartData1, function (data, index) {
          //????????????????????????????????????????????????????????????????????
          if (index == 0 && ((data.trans_type == "cover") || (data.trans_type == "sell")))
            return;
          if (index == chartData1.length - 1) return;//到头了
          if ((data.trans_type == "cover") || (data.trans_type == "sell")) return;
          if (data.trans_type == "short") {
            outer:
              for (var i = 0; i < chartData1.length; i++) {
                if (chartData1[i].trans_type == "cover") {//???
                  if (indexShortArr.length != 0) {//???
                    inter:
                      for (var j = 0; j < indexShortArr.length; j++) {
                        if (indexShortArr[j] == i) {//???
                          break inter;
                        } else if ((j == indexShortArr.length - 1) && (indexShortArr[j] != i)) {//???
                          var Earn;
                          if (data.name == 'AG_real') {
                            Earn = $filter('number')(chartData1[i].price - data.price - 0.32 * 2, 2);
                          } else {
                            Earn = $filter('number')(chartData1[i].price * (1 - 0.00003) - data.price * (1 - 0.00003), 2);
                          };
                          //把数据push进图表数组
                          chartArr.push({
                            "volume": data.volume,//成交量
                            "direction": data.pos,//交易方向???
                            //"Earn":$filter('number')(chartData1[i].price-data.price,2),
                            "Earn": Earn,//盈亏
                            "openprice": data.price,//开仓价
                            "closeprice": chartData1[i].price,//平仓价
                            "opentime": data.datetime,//开仓时间
                            "closetime": chartData1[i].datetime,//平仓时间
                            "present": chartData1[i].price,//成交价
                            "name": data.name,//名称
                            "symbol": data.symbol//???
                          });
                          indexShortArr.push(i);//???
                          break outer;
                        };
                      };
                  } else {//???
                    var Earn;
                    if (data.name == 'AG_real') {
                      Earn = $filter('number')(chartData1[i].price - data.price - 0.32 * 2, 2);
                    } else {
                      Earn = $filter('number')(chartData1[i].price * (1 - 0.00003) - data.price * (1 - 0.00003), 2);
                    };
                    //把数据push进图表数组
                    chartArr.push({
                      "volume": data.volume,
                      "direction": -1,
                      //"Earn":$filter('number')(chartData1[i].price-data.price,2),
                      "Earn": Earn,
                      "openprice": data.price,
                      "closeprice": chartData1[i].price,
                      "opentime": data.datetime,
                      "closetime": chartData1[i].datetime,
                      "present": chartData1[i].price,
                      "name": data.name,
                      "symbol": data.symbol
                    });
                    indexShortArr.push(i);
                    break outer;
                  };
                };
              };
          };
          if (data.trans_type == "buy") {//???
            outer1:
              for (var i = 0; i < chartData1.length; i++) {
                if (chartData1[i].trans_type == "sell") {//???
                  if (indexShortArr.length != 0) {//???
                    inter1:
                      for (var j = 0; j < indexShortArr.length; j++) {
                        if (indexShortArr[j] == i) {//???
                          break inter1;
                        } else if ((j == indexShortArr.length - 1) && (indexShortArr[j] != i)) {//???
                          var Earn;
                          if (data.name == 'AG_real') {
                            Earn = $filter('number')(chartData1[i].price - data.price - 0.32 * 2, 2);
                          } else {
                            Earn = $filter('number')(chartData1[i].price * (1 - 0.00003) - data.price * (1 - 0.00003), 2);
                          };
                          chartArr.push({
                            "volume": data.volume,
                            "direction": 1,
                            //"Earn":$filter('number')(chartData1[i].price-data.price,2),
                            "Earn": Earn,
                            "openprice": data.price,
                            "closeprice": chartData1[i].price,
                            "opentime": data.datetime,
                            "closetime": chartData1[i].datetime,
                            "present": chartData1[i].price,
                            "name": data.name,
                            "symbol": data.symbol
                          });
                          indexShortArr.push(i);
                          break outer1;
                        };
                      };
                  } else {//???
                    var Earn;
                    if (data.name == 'AG_real') {
                      Earn = $filter('number')(chartData1[i].price - data.price - 0.32 * 2, 2);
                    } else {
                      Earn = $filter('number')(chartData1[i].price * (1 - 0.00003) - data.price * (1 - 0.00003), 2);
                    };
                    chartArr.push({
                      "volume": data.volume,
                      "direction": data.pos,
                      //"Earn":$filter('number')(chartData1[i].price-data.price,2),
                      "Earn": Earn,
                      "openprice": data.price,
                      "closeprice": chartData1[i].price,
                      "opentime": data.datetime,
                      "closetime": chartData1[i].datetime,
                      "present": chartData1[i].price,
                      "name": data.name,
                      "symbol": data.symbol
                    });
                    indexShortArr.push(i);
                    break outer1;
                  };
                };
              };
          };
        });
        /* 1 */
        /*var chartArr1=[];
         angular.forEach(chartArr,function(data,index){
         if (data.closetime>1477411200000&&data.closetime<1477497599000) {
         //console.log($filter('date')(data.closetime,'yyyy-MM-dd H:mm:ss'));
         //console.log(data.Earn);
         chartArr1.push(data);
         }
         })
         if ($scope.analyseData.length>1000) {
         Showbo.Msg.alert("当前数据长度为"+$scope.analyseData.length+"条,可能加载时间过长，请稍等……")
         };*/

        /*var wealth1 = [];
         var buy1 = [];
         var totalpal1=0;
         angular.forEach(chartArr1,function(data,index){
         totalpal1=totalpal1+Number(data["Earn"]);
         if (data['direction']>0) {
         direction='看多';
         }else{
         direction='看空';
         }
         wealth1.push({
         "x":data["closetime"],
         "y":data['closeprice'],
         "pal":Number(data["Earn"]),
         "openprice":data['openprice'],
         "closeprice":data['closeprice'],
         "direction":direction,
         "totalpal":Number($filter('number')(parseFloat(totalpal1),2))
         });
         buy1.push({
         "x":data['closetime'],
         "y":data['direction']
         });
         })
         wealth1=$filter('orderBy')(wealth1,'x');*/
        /* 2 */
        var wealth1 = [];//???
        var wealth2 = [];//???
        angular.forEach(chartData1, function (data, index) {
          if (data.trans_type == 'short' || data.trans_type == 'cover') {
            wealth1.push({
              "x": data["datetime"],
              "title": data["trans_type"]
            });
          } else if (data.trans_type == 'buy' || data.trans_type == 'sell') {
            wealth2.push({
              "x": data["datetime"],
              "title": data["trans_type"]
            });
          };
        });
        wealth1 = $filter('orderBy')(wealth1, 'x');//wealth1按照时间排序
        var wealth = [];//???
        var buy = [];//???
        var tradeItem = [];//???
        var direction;//交易方向
        var amount = 0;//???
        var total = 0;//???
        var winrate;//胜率
        var totalWinrate = 0;//总胜率
        var totalProfit = 0;//总利润
        var totalRate1 = 0;//???
        var totalRate2 = 0;//???
        var totalRate3 = 0;//???
        var totalRate4 = [];//???
        var yeildAbs;//???
        var totalpal = 0;//???
        var allTotalpal = 0;//???
        var allTotalyeild = 0;//???
        var prof = 0;//???
        var loss = 0;//???
        angular.forEach(chartArr, function (data, index) {
          totalpal = totalpal + Number(data["Earn"]);
          allTotalpal = allTotalpal + Number(data["Earn"]);
          if (data['direction'] > 0) {
            direction = '看多';
          } else {
            direction = '看空';
          };
          if (Number(data["Earn"]) > 0) {
            winrate = 100;
            // Math.abs() 取绝对值
            // toFixed() 方法可把 Number 四舍五入为指定小数位数的数字。
            yeildAbs = Math.abs((Number(data["Earn"]) * 100 / data['openprice']).toFixed(2));//???
            prof = prof + Number(data["Earn"]) * 100 / data['openprice'];//???
          } else {
            winrate = 0;
            yeildAbs = Math.abs((Number(data["Earn"]) * 100 / data['closeprice']).toFixed(2));//???
            loss = loss + Number(data["Earn"]) * 100 / data['openprice'];//???
          };
          wealth.push({
            "x": data["opentime"],//???
            "y": Number($filter('number')(parseFloat(totalpal), 2)),//???
            "pal": Number(data["Earn"]),
            "openprice": data['openprice'],
            "closeprice": data['closeprice']
          });
          buy.push({
            "x": data['opentime'],
            "y": data['direction']
          });
          tradeItem.push({
            "openprice": data['openprice'],
            "closeprice": data['closeprice'],
            "time": $filter('date')(data["opentime"], "yyyy-MM-dd H:mm:ss"),
            "pal": $filter('number')(Number(data["Earn"]), 2),
            "totalpal": $filter('number')(totalpal, 2),
            'direction': direction,
            'yeild': (Number(data["Earn"]) * 100 / data['openprice']).toFixed(2),
            'winrate': winrate,
            'yeildAbs': yeildAbs,
            'closetime': $filter('date')(data["closetime"], "yyyy-MM-dd H:mm:ss"),
            "opentime": $filter('date')(data["opentime"], "yyyy-MM-dd H:mm:ss")
          });
          totalWinrate = totalWinrate + winrate;//???
          total = total + Number(data["Earn"]) * 100 / data['openprice'];//???
          // parseFloat() 函数可解析一个字符串，并返回一个浮点数。
          totalRate1 = totalRate1 + parseFloat(Number(data["Earn"]) * 100 / data['openprice'] - 0.0492);
          totalRate4.push(yeildAbs);//totalRate4是一个数组
          allTotalyeild = allTotalyeild + Number((Number(data["Earn"]) * 100 / data['openprice']));
        });
        amount = tradeItem.length;//???
        $scope.analyseDataArr = tradeItem;//???
        //$scope.annualized_return = (allTotalyeild / amount * 250).toFixed(2);//???
        //$scope.annualized_return=0;
        //$scope.annualized_return= allTotalyeild*250;//年化收益率
        ////$scope.annualized_return=Math.pow(allTotalyeild,250)-1;//年化收益率

        $scope.average_winrate = parseFloat(totalWinrate / amount).toFixed(2);
        $scope.average_profit = parseFloat(prof / loss).toFixed(2);//???
        $scope.rate1 = parseFloat(totalRate1 / amount).toFixed(2);//???
        angular.forEach(chartArr, function (data, index) {
          // pow() 方法可返回 x 的 y 次幂的值。
          totalRate2 = totalRate2 + parseFloat(Math.pow(parseFloat((Number(data["Earn"]) * 100 / data['openprice'] - 0.0492) - $scope.rate1), 2));
        });
        $scope.rate2 = Math.sqrt(parseFloat(totalRate2) / amount).toFixed(2);// sqrt() 方法可返回一个数的平方根。???
        $scope.rate3 = parseFloat($scope.rate1 / $scope.rate2).toFixed(2);//???
        // math.max.apply() 取最大值
        $scope.rate4 = (Math.max.apply(Math, totalRate4)).toFixed(2);//totalRate4是一个数组
        //$scope.allTotalpal = allTotalpal;//???
        //$scope.allTotalyeild = (allTotalyeild).toFixed(2);//???
        //$scope.averTotalyeild = (allTotalyeild / amount).toFixed(4);//???
        Highcharts.setOptions({
          global: {
            useUTC: false
          }
        });
        // console.log("ssssssssssssssssssssss")
        // console.log($scope.analyseJsonData);
        if ($scope.analyseJsonData) {
          chartJsonData = angular.fromJson($scope.analyseJsonData);
          angular.forEach(chartJsonData, function (data, index) {
            chartJsonDataArr.push({
              "x": data.datetime,
              "y": data.close,
              'low': data.low,
              'high': data.high,
              'close': data.close,
              'open': data.open,
              'volume': data.volume
            });
          });
          chartJsonDataArr = $filter('orderBy')(chartJsonDataArr, 'x');
          $('#return_map_big_1').highcharts('StockChart', {
            credits: {
              enabled: false
            },
            exporting: {
              enabled: false
            },
            plotOptions: {
              series: {
                turboThreshold: 0
              }
            },
            tooltip: {
              shared: true,
              useHTML: true,
              formatter: function () {
                var s = Highcharts.dateFormat('<span>%Y-%m-%d %H:%M:%S</span>', this.x);
                s += '<br />high:<b class="red">￥'
                  + Highcharts.numberFormat(this.points[0].point.high, 2)
                  + '</b><br />low:<b class="blue">￥'
                  + Highcharts.numberFormat(this.points[0].point.low, 2)
                  + '</b><br />close:<b class="green">￥'
                  + Highcharts.numberFormat(this.points[0].point.close, 2)
                  + '</b><br />open:<b class="font-black">￥'
                  + Highcharts.numberFormat(this.points[0].point.open, 2)
                  + '</b><br />volume:<b class="orange">笔 '
                  + Highcharts.numberFormat(this.points[0].point.volume, 2);
                return s;
              },
              valueDecimals: 2
            },

            legend: {
              enabled: true,
              align: 'right',
              verticalAlign: 'top',
              x: 0,
              y: 100
            },
            rangeSelector: {
              buttons: [
                {
                  type: 'minute',
                  count: 10,
                  text: '10m'
                }, {
                  type: 'minute',
                  count: 30,
                  text: '30m'
                }, {
                  type: 'hour',
                  count: 1,
                  text: '1h'
                }, {
                  type: 'day',
                  count: 1,
                  text: '1d'
                }, {
                  type: 'week',
                  count: 1,
                  text: '1w'
                }, {
                  type: 'all',
                  text: '所有'
                }],
              selected: 5,
              buttonSpacing: 2
            },
            yAxis: [{
              labels: {
                align: 'right',
                x: -3
              },
              title: {
                text: '股价'
              },

              lineWidth: 1
            }],

            series: [{
              type: 'line',
              name: '股价',
              data: chartJsonDataArr,
              lineWidth: 2,
              id: 'dataseries',
            },
              {
              type: 'flags',
              data: wealth2,
              onSeries: "dataseries",
              shape: 'circlepin',
              width: 30,
              color: "#4169e1",
              fillColor: 'transparent',
              style: {
                color: '#333'
              },
              y: 24,
              name: '看多'
            },
              {
              type: 'flags',
              data: wealth1,
              onSeries: "dataseries",
              shape: 'circlepin',
              width: 30,
              color: '#ff9912',
              fillColor: 'transparent',
              style: {
                color: '#333'
              },
              y: -40,
              name: '看空'
            }]
          });
        } else {
          $('#return_map_big_1').highcharts('StockChart', {
            credits: {
              enabled: false
            },
            exporting: {
              enabled: false
            },
            plotOptions: {
              series: {
                turboThreshold: 0
              }
            },
            tooltip: {
              shared: true,
              useHTML: true,
              formatter: function () {
                if (this.points[1].y == 1) {
                  var s = Highcharts.dateFormat('<span>%Y-%m-%d %H:%M:%S</span>', this.x);
                  s += '<br />总盈亏:<b class="white-blue">￥'
                    + Highcharts.numberFormat(this.y, 2)
                    + '</b><br />盈亏:<b class="font-black">￥'
                    + this.points[0].point.pal
                    + '</b><br />开仓价:<b class="font-black">￥'
                    + this.points[0].point.openprice
                    + '</b><br />平仓价:<b class="font-black">￥'
                    + this.points[0].point.closeprice
                    + '</b><br />方向:<span class="red">看多</span>';
                  return s;
                } else if (this.points[1].y == -1) {
                  var s = Highcharts.dateFormat('<span>%Y-%m-%d %H:%M:%S</span>', this.x);
                  s += '<br />总盈亏:<b class="white-blue">￥'
                    + this.y
                    + '</b><br />盈亏:<b class="font-black">￥'
                    + this.points[0].point.pal
                    + '</b><br />开仓价:<b class="font-black">￥'
                    + this.points[0].point.openprice
                    + '</b><br />平仓价:<b class="font-black">￥'
                    + this.points[0].point.closeprice
                    + '</b><br />方向:<span class="green">看空</span>';
                  return s;
                }
              },
              valueDecimals: 2
            },

            legend: {
              enabled: true,
              align: 'right',
              verticalAlign: 'top',
              x: 0,
              y: 100
            },
            rangeSelector: {
              buttons: [
                {
                  type: 'minute',
                  count: 10,
                  text: '10m'
                }, {
                  type: 'minute',
                  count: 30,
                  text: '30m'
                }, {
                  type: 'hour',
                  count: 1,
                  text: '1h'
                }, {
                  type: 'day',
                  count: 1,
                  text: '1d'
                }, {
                  type: 'week',
                  count: 1,
                  text: '1w'
                }, {
                  type: 'all',
                  text: '所有'
                }],
              selected: 5,
              buttonSpacing: 2

            },
            yAxis: [{
              labels: {
                align: 'right',
                x: -3
              },
              title: {
                text: '总盈亏'
              },
              height: '60%',
              lineWidth: 1
            },
              {
                labels: {
                  align: 'right',
                  x: -3
                },
                title: {
                  text: '交易方向（看多/看空）'
                },
                opposite: true,
                top: '65%',
                height: '35%',
                offset: 0,
                lineWidth: 1,
              }],
            series: [{
              type: 'line',
              name: '总盈亏',
              data: wealth,
              lineWidth: 2
            }, {
              type: 'column',
              name: '看多/看空',
              data: buy,
              yAxis: 1,
              threshold: 0,
              negativeColor: 'red',
              color: 'green'
            }]
          });
        }
        ;
      };
    };

    $scope.myFirmStrategyList = [];
    function getSelect() {
      $http.get(constantUrl + "strategys/", {
        headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
      })
        .success(function (data) {
          angular.forEach(data, function (x, y) {
            this.push({
              "name": x["name"],
              '_id': x["_id"],
              'status': x["status"],
              'symbol': x["symbol"],
              'exchange':x["exchange"]
            });
          }, $scope.myFirmStrategyList)
        });
    };
    getSelect();

    $scope.selecteStrategy = function () {
      $http.get(constantUrl + 'dates/', {
        params: {
          "date_type": 'transaction',
          "sty_id": $scope.myFirmStrategy._id
        },
        headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
      })
        .success(function (data) {
          $scope.myFirmDateList = data;
        })
        .error(function (err, sta) {
          if (sta == 400) {
            Showbo.Msg.alert('没有数据');
          }
          ;
        });
    };
    var nowsymbol;
    $scope.makeChart1 = function () {
      //console.log("当前交易合约;"+$scope.myFirmStrategy.symbol);//当前交易合约
      nowsymbol=$scope.myFirmStrategy.symbol
      $scope.myFirmDate_end=$scope.myFirmDate;
      var mydate = $filter('date')(new Date((new Date($scope.myFirmDate_end)).setDate((new Date($scope.myFirmDate_end)).getDate() + 1)), 'yyyy-MM-dd');

      function getFirmTime() {
        var defer1 = $q.defer();//通过$q服务注册一个延迟对象 defer1
        $http.get(constantUrl + 'transactions/', {
          params: {
            "sty_id": $scope.myFirmStrategy._id,
            "start": $scope.myFirmDate,
            "end": mydate
          },
          headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
        })
          .success(function (data) {
            defer1.resolve(data);//defer1.resolve(value)  成功解决(resolve)了其派生的promise。参数value将来会被用作promise.then(successCallback(value){...}, errorCallback(reason){...}, notifyCallback(notify){...})中successCallback函数的参数。
          })
          .error(function (err, sta) {
            defer1.reject(err);//deferred.reject(reason)  未成功解决其派生的promise。参数reason被用来说明未成功的原因。此时deferred实例的promise对象将会捕获一个任务未成功执行的错误，promise.catch(errorCallback(reason){...})。补充一点，promise.catch(errorCallback)实际上就是promise.then(null, errorCallback)的简写。
          });
        return defer1.promise;//通过deferred延迟对象，可以得到一个承诺promise，而promise会返回当前任务的完成结果
      };
      function getTransTime() {
        var defer2 = $q.defer();
        /*console.log($scope.myFirmStrategy);
        console.log($scope.myFirmStrategy.exchange);
        console.log($scope.myFirmStrategy.symbol);*/
        $http.get(constantUrl + 'datas/', {
          params: {
            "type": 'bar',
            "start": $scope.myFirmDate,
            "symbol":$scope.myFirmStrategy.symbol,
            "exchange":$scope.myFirmStrategy.exchange,
            "end": mydate
          },
          headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
        })
          .success(function (data) {
            defer2.resolve(data);
          })
          .error(function (err, sta) {
            defer2.reject(err);
          });
        return defer2.promise;
      };
      ///////////////////////////////////////////////////////////////////////////
      getFirmTime().then(function (data) {
        var chartData11 = data;
        //console.log(data);

        getTransTime().then(function (data) {
          var chartJsonData = data;
          $scope.analyse_title = {
            'time': $filter('date')($scope.myFirmDate, 'yyyy-MM-dd'),
            'name': $scope.myFirmStrategy.name,
            'symbol': $scope.myFirmStrategy.symbol,

          };
          draws();
          function draws() {
            var chartData1 = [];
            angular.forEach(chartData11, function (data, index) {
              //console.log(data);
              var hour = parseInt($filter("date")(data["datetime"], "yyyy-MM-dd HH:mm:ss").slice(11, 13));
              var minute = parseInt($filter("date")(data["datetime"], "yyyy-MM-dd HH:mm:ss").slice(14, 16));
              // if (hour<9||hour>15||(hour==15&&minute>30)) {
              // }else{
              // 	this.push(data);
              // };
              if (data['name'] == 'AG_real') {
                if (hour < 6 || hour > 9) {
                  this.push(data);
                }
              } else {
                if (hour < 9 || hour > 15 || (hour == 15 && minute > 30)) {
                  this.push(data);   /*加的代码*/
                } else {
                  this.push(data);
                }
                ;
              }
              ;
            }, chartData1);
            /*$('#return_mapping_1').css('display','block').siblings().css('display','none');*/
            var chartJsonDataArr = [];
            var chartArr = [];
            var indexShortArr = [];
            var indexBuyArr = [];
            var buySellNum = 0;
            var buyYArr = [];
            var shortYArr = [];
            $scope.highstockAnalyseanalyseSymbol = chartData1[0].symbol + ' ' + chartData1[0].name;
            angular.forEach(chartData1, function (data, index) {
              if (index == 0 && ((data.trans_type == "cover") || (data.trans_type == "sell")))
                return;
              if (index == chartData1.length - 1) return;
              if ((data.trans_type == "cover") || (data.trans_type == "sell")) return;
              if (data.trans_type == "short") {

                outer:
                  for (var i = 0; i < chartData1.length; i++) {
                    if (chartData1[i].trans_type == "cover") {
                      if (indexShortArr.length != 0) {
                        inter:
                          for (var j = 0; j < indexShortArr.length; j++) {
                            if (indexShortArr[j] == i) {
                              break inter;
                            }
                            else if ((j == indexShortArr.length - 1) && (indexShortArr[j] != i)) {
                              buySellNum++;
                              buyYArr.push({
                                "short": "short",
                                "text": '时间：' + $filter('date')(data.datetime, 'yyyy-MM-dd H:mm:ss') + '<br>成交价：￥' + data.price + '<br>成交量：' + data.volume,
                                "volume": data.volume,
                                "pos": data.pos,
                                "price": data.price,
                                "x": data.datetime,
                                "name": data.name,
                                "symbol": data.symbol,
                                "title": data.trans_type + ' ' + buySellNum
                              });
                              var Earn;
                              var y;
                              if (data.name == 'AG_real') {
                                Earn = Number($filter('number')(data.price - chartData1[i].price - 0.32 * 2, 2));
                                y = Number($filter('number')(data.price - chartData1[i].price - 0.32 * 2, 2));
                              } else {
                                //Earn = data.price *0.0035-chartData1[i].price *0.0035;
                                //console.log(data.price *0.0035-chartData1[i].price *0.0035)
                                // console.log(chartData1[i].price *0.0035)
                                 Earn = Number((data.price * (1 - 0.00003) - chartData1[i].price * (1 + 0.00003)).toFixed(2));
                                y = Number($filter('number')(data.price * (1 - 0.00003) - chartData1[i].price * (1 + 0.00003), 2));
                              }
                              ;
                              //看空
                              chartArr.push({
                                "x": chartData1[i].datetime,
                                //"y":Number($filter('number')(data.price-chartData1[i].price,2)),
                                "y": y,
                                "volume": data.volume,
                                "direction": data.pos,
                                "Earn": Earn,
                                "openprice": data.price,
                                "closeprice": chartData1[i].price,
                                "opentime": data.datetime,
                                "closetime": chartData1[i].datetime,
                                "present": chartData1[i].price,
                                "name": data.name,
                                "symbol": data.symbol
                              });
                              //console.log(data.pos);


                              buyYArr.push({
                                "short": "short",
                                "text": '时间：' + $filter('date')(chartData1[i].datetime, 'yyyy-MM-dd H:mm:ss') + '<br>成交价：￥' + chartData1[i].price
                                + '<br>成交量：' + chartData1[i].volume,
                                "volume": chartData1[i].volume,
                                "pos": chartData1[i].pos,
                                "price": chartData1[i].price,
                                "x": chartData1[i].datetime,
                                "name": chartData1[i].name,
                                "symbol": chartData1[i].symbol,
                                "title": chartData1[i].trans_type + ' ' + buySellNum
                              });
                              indexShortArr.push(i);
                              break outer;
                            }
                          }
                      }
                      else {
                        buySellNum++;
                        buyYArr.push({
                          "short": "short",
                          "text": '时间：' + $filter('date')(data.datetime, 'yyyy-MM-dd H:mm:ss') + '<br>成交价：￥' + data.price + '<br>成交量：' + data.volume,
                          "volume": data.volume,
                          "pos": data.pos,
                          "price": data.price,
                          "x": data.datetime,
                          "name": data.name,
                          "symbol": data.symbol,
                          "title": data.trans_type + ' ' + buySellNum
                        });
                        var Earn;
                        var y;
                        if (data.name == 'AG_real') {
                          Earn = Number((data.price - chartData1[i].price - 0.32 * 2).toFixed(2));
                          y = Number((data.price - chartData1[i].price - 0.32 * 2).toFixed(2));
                        } else {
                          Earn = Number((data.price * (1 - 0.00003) - chartData1[i].price * (1 + 0.00003)).toFixed(2));

                          // Earn = data.price *0.0035 - chartData1[i].price *0.0035
                          y = Number((data.price * (1 - 0.00003) - chartData1[i].price * (1 + 0.00003)).toFixed(2));
                        }
                        ;
                        chartArr.push({
                          "x": chartData1[i].datetime,
                          //"y":Number((data.price-chartData1[i].price).toFixed(2)),
                          "y": y,
                          "volume": data.volume,
                          "direction": -1,
                          "Earn": Earn,
                          "openprice": data.price,
                          "closeprice": chartData1[i].price,
                          "opentime": data.datetime,
                          "closetime": chartData1[i].datetime,
                          "present": chartData1[i].price,
                          "name": data.name,
                          "symbol": data.symbol
                        });
                        buyYArr.push({
                          "short": "short",
                          "text": '时间：' + $filter('date')(chartData1[i].datetime, 'yyyy-MM-dd H:mm:ss') + '<br>成交价：￥' + chartData1[i].price + '<br>成交量：' + chartData1[i].volume,
                          "volume": chartData1[i].volume,
                          "pos": chartData1[i].pos,
                          "price": chartData1[i].price,
                          "x": chartData1[i].datetime,
                          "name": chartData1[i].name,
                          "symbol": chartData1[i].symbol,
                          "title": chartData1[i].trans_type + ' ' + buySellNum
                        });
                        indexShortArr.push(i);
                        break outer;
                      }
                      ;
                    }
                    ;
                  }
                ;
              }
              ;
              if (data.trans_type == "buy") {
                //////////////////////////////////////////////////////////////////////////////////
                outer1:
                  for (var i = 0; i < chartData1.length; i++) {
                    if (chartData1[i].trans_type == "sell") {
                      if (indexShortArr.length != 0) {
                        inter1:
                          for (var j = 0; j < indexShortArr.length; j++) {
                            if (indexShortArr[j] == i) {
                              break inter1;
                            } else if ((j == indexShortArr.length - 1) && (indexShortArr[j] != i)) {
                              buySellNum++;
                              shortYArr.push({
                                "buy": 'buy',
                                "text": '时间：' + $filter('date')(data.datetime, 'yyyy-MM-dd H:mm:ss') + '<br>成交价：￥' + data.price + '<br>成交量：' + data.volume,
                                "volume": data.volume,
                                "pos": data.pos,
                                "price": data.price,
                                "x": data.datetime,
                                "name": data.name,
                                "symbol": data.symbol,
                                "title": data.trans_type + ' ' + buySellNum
                              });
                              var Earn;
                              var y;
                              if (data.name == 'AG_real') {
                                Earn = Number((chartData1[i].price - data.price - 0.32 * 2).toFixed(2));
                                y = Number((chartData1[i].price - data.price - 0.32 * 2).toFixed(2));
                              } else {
                                 Earn = Number((chartData1[i].price * (1 - 0.00003) - data.price * (1 + 0.00003)).toFixed(2));
                                //Earn =chartData1[i].price * 0.0035 - data.price * 0.0035
                                y = Number((chartData1[i].price * (1 - 0.00003) - data.price * (1 + 0.00003)).toFixed(2));
                              }
                              ;

                              //看多
                              chartArr.push({

                                "x": chartData1[i].datetime,
                                //"y":Number((chartData1[i].price-data.price).toFixed(2)),
                                "y": y,
                                "volume": data.volume,
                                "direction": 1,
                                //"Earn":Number((chartData1[i].price-data.price).toFixed(2)),
                                "Earn": Earn,
                                "openprice": data.price,
                                "closeprice": chartData1[i].price,
                                "opentime": data.datetime,
                                "closetime": chartData1[i].datetime,
                                "present": chartData1[i].price,
                                "name": data.name,
                                "symbol": data.symbol
                              });
                              shortYArr.push({
                                "buy": 'buy',
                                "text": '时间：' + $filter('date')(chartData1[i].datetime, 'yyyy-MM-dd H:mm:ss') + '<br>成交价：￥' + chartData1[i].price + '<br>成交量：' + chartData1[i].volume,
                                "volume": chartData1[i].volume,
                                "pos": chartData1[i].pos,
                                "price": chartData1[i].price,
                                "x": chartData1[i].datetime,
                                "name": chartData1[i].name,
                                "symbol": chartData1[i].symbol,
                                "title": chartData1[i].trans_type + ' ' + buySellNum
                              });
                              indexShortArr.push(i);
                              break outer1;
                            }
                            ;
                          }
                        ;
                      } else {
                        buySellNum++;
                        shortYArr.push({
                          "buy": 'buy',
                          "text": '时间：' + $filter('date')(data.datetime, 'yyyy-MM-dd H:mm:ss') + '<br>成交价：￥' + data.price + '<br>成交量：' + data.volume,
                          "volume": data.volume,
                          "pos": data.pos,
                          "price": data.price,
                          "x": data.datetime,
                          "name": data.name,
                          "symbol": data.symbol,
                          "title": data.trans_type + ' ' + buySellNum
                        });
                        var Earn;
                        var y;
                        if (data.name == 'AG_real') {
                          Earn = Number((chartData1[i].price - data.price - 0.32 * 2).toFixed(2));
                          // console.log(Earn)
                          y = Number((chartData1[i].price - data.price - 0.32 * 2).toFixed(2));
                        } else {
                          Earn = Number((chartData1[i].price * (1 - 0.00003) - data.price * (1 + 0.00003)).toFixed(2));
                          // console.log(Earn)
                          y = Number((chartData1[i].price * (1 - 0.00003) - data.price * (1 + 0.00003)).toFixed(2));
                        }
                        ;
                        chartArr.push({

                          "x": chartData1[i].datetime,
                          //"y":Number((chartData1[i].price-data.price).toFixed(2)),
                          "y": y,
                          "volume": data.volume,
                          "direction": data.pos,
                          //"Earn":Number((chartData1[i].price-data.price).toFixed(2)),
                          "Earn": Earn,
                          "openprice": data.price,
                          "closeprice": chartData1[i].price,
                          "opentime": data.datetime,
                          "closetime": chartData1[i].datetime,
                          "present": chartData1[i].price,
                          "name": data.name,
                          "symbol": data.symbol
                        });
                        shortYArr.push({
                          "buy": 'buy',
                          "text": '时间：' + $filter('date')(chartData1[i].datetime, 'yyyy-MM-dd H:mm:ss') + '<br>成交价：￥' + chartData1[i].price + '<br>成交量：' + chartData1[i].volume,
                          "volume": chartData1[i].volume,
                          "pos": chartData1[i].pos,
                          "price": chartData1[i].price,
                          "x": chartData1[i].datetime,
                          "name": chartData1[i].name,
                          "symbol": chartData1[i].symbol,
                          "title": chartData1[i].trans_type + ' ' + buySellNum
                        });
                        indexShortArr.push(i);
                        break outer1;
                      }
                      ;
                    }
                    ;
                  }
                ;
              }
              ;
            });


            /*console.log(chartArr);
             console.log($filter('date')(1477897077000,'yyyy-MM-dd H:mm:ss'));*/
            shortYArr = $filter('orderBy')(shortYArr, 'x');
            buyYArr = $filter('orderBy')(buyYArr, 'x');
            chartArr = $filter('orderBy')(chartArr, 'x');
            /*var wealth1 = [];
             var wealth2=[];
             angular.forEach(chartData1,function(data,index){
             if(data.trans_type=='short'||data.trans_type=='cover'){
             wealth1.push({
             "x":data["datetime"],
             "title":data["trans_type"]
             });
             }else if(data.trans_type=='buy'||data.trans_type=='sell'){
             wealth2.push({
             "x":data["datetime"],
             "title":data["trans_type"]
             });
             }
             })
             wealth1=$filter('orderBy')(wealth1,'x');*/
            var wealth = [];
            var buy = [];
            var tradeItem = [];
            var direction;
            var amount = 0;
            var total = 0;
            var winrate;
            var totalWinrate = 0;
            var totalProfit = 0;
            var totalRate1 = 0;
            var totalRate2 = 0;
            var totalRate3 = 0;
            var totalRate4 = [];
            var yeildAbs;
            var totalpal = 0;
            var allTotalpal = 0;
            var allTotalyeild = 0;
            var allTotalTime = 0;//总持仓时间r
            var averTotalTime = 0;//平均持仓时间
            var errorYeild = 0;//跟踪误差年化波动率
            var prof = 0;
            var loss = 0;
            var yeildArrs = [];


            //封装的计算时间的方法，这里只需要传进毫秒数 自动return HH:MM:SS 格式的时间；
            $scope.newTotalTime = function (time) {
              var hour = 0;
              //这里因为都需要把 小时数归零 所以 hour = 0 定义在外面
              var min = parseInt((time) / 1000 / 60);
              //分钟 的计算 除以 1000 是除去毫秒 之后 除以 60 计算出带小数点的分钟数 这里需要取整
              var sec = Math.ceil((((time) / 1000 / 60) - min) * 60);
              //秒 的计算 同分钟 这里用带毫秒的分钟数 减去 取整 后的分钟数 得到小数点后的 数值 之后 *60 向上取整 得到正确 秒
              if (min >= 60) {
                hour = parseInt(min / 60);
                min = min - hour * 60;
              }
              if (hour < 10) hour = "0" + hour;
              if (min < 10) min = "0" + min;
              if (sec < 10) sec = "0" + sec;
              var totalTime = hour + ":" + min + ":" + sec;
              return totalTime;
            }
            var allTotalTime1 = 0;
            var delNum = [];
            angular.forEach(chartArr, function (data, index) {
              if (data['openprice'] == 0 || data['closeprice'] == 0) {
                delNum.push(index);
              }
              ;
            });
            angular.forEach(delNum, function (data, index) {
              chartArr.splice(data, 1);
            });
            //console.log(chartArr)
            var count;
            angular.forEach(chartArr, function (data, index) {
              amount = tradeItem.length + 1;
              var totalTime = $scope.newTotalTime((data['closetime'] - data['opentime']));

              allTotalTime1 += (data['closetime'] - data['opentime']);
              $scope.allTotalTime = $scope.newTotalTime(allTotalTime1);//alltotaltime是总持仓时间
              $scope.averTotalTime = $scope.newTotalTime(allTotalTime1 / amount);//averTotalTime是平均持仓时间
              //totalpal=totalpal+Number(data["Earn"]);
              totalpal = totalpal + Number(data["Earn"] - (data['openprice'] + data['closeprice']) / 1000 * 0.03);
              //allTotalpal=allTotalpal+Number(data["Earn"]);
               allTotalpal = allTotalpal + Number(data["Earn"] - (data['openprice'] + data['closeprice']) / 1000 * 0.03);

                //allTotalpal = allTotalpal + data["Earn"];  //自己加的代码
              //console.log(data["Earn"])

              //console.log(allTotalpal)

              // console.log(data['openprice']*0.0035)
               // console.log(Number(data["Earn"] - (data['openprice'] + data['closeprice']) / 1000 * 0.03));  //自己加的代码
              // console.log(data["Earn"])//自己加的代码
              /*console.log(data["Earn"]);*/
              if (data['direction'] > 0) {
                direction = '看多';
              } else {
                direction = '看空';
              }
              if (Number(data["Earn"]) > 0) {
                winrate = 100;
                yeildAbs = Math.abs((Number(data["Earn"]) * 100 / data['openprice']).toFixed(2));
                prof = prof + Number(data["Earn"]) * 100 / data['openprice'];
              } else {
                winrate = 0;
                yeildAbs = Math.abs((Number(data["Earn"]) * 100 / data['closeprice']).toFixed(2));
                loss = loss + Number(data["Earn"]) * 100 / data['openprice'];
              }
              wealth.push({
                "x": data["opentime"],
                "y": Number(totalpal.toFixed(2)),
                "pal": Number(data["Earn"]),
                "openprice": data['openprice'],
                "closeprice": data['closeprice']
              });
              buy.push({
                "x": data['opentime'],
                "y": data['direction']
              });
              tradeItem.push({
                "openprice": data['openprice'],
                "closeprice": data['closeprice'],
                //"totalTime":$filter('date')(data['closetime']-data['opentime'],"H:mm:ss"),
                "totalTime": totalTime,
                "time": $filter('date')(data["opentime"], "yyyy-MM-dd HH:mm:ss"),
                //"pal":Number(data["Earn"].toFixed(2)),
                //"pal":data['closeprice']-data['openprice'],
                // "pal": Number((data["Earn"] - (data['openprice'] + data['closeprice']) / 1000 * 0.03).toFixed(2)),
                "pal":data["Earn"],
                "totalpal": Number(totalpal.toFixed(2)),
                'direction': direction,
                'yeild': Number((Number(data["Earn"] - (data['openprice'] + data['closeprice']) / 1000 * 0.03) * 100 / data['openprice']).toFixed(2)),
                'winrate': winrate,
                'yeildAbs': yeildAbs,
                'closetime': $filter('date')(data["closetime"], "yyyy-MM-dd HH:mm:ss"),
                "opentime": $filter('date')(data["opentime"], "yyyy-MM-dd HH:mm:ss")
              });

             // console.log(data["Earn"])
              yeildArrs.push(parseFloat((((data['closeprice'] - data['openprice']) / data['openprice']) * 100).toFixed(2)));
              totalWinrate += winrate;//总胜率
              /*allTotalTime=allTotalTime+(data['closetime']-data['opentime']);*/
              total = total + Number(data["Earn"]) * 100 / data['openprice'];
              totalRate1 = totalRate1 + parseFloat(Number(data["Earn"]) * 100 / data['openprice'] - 0.0492);
              totalRate4.push(yeildAbs);
              //allTotalyeild=allTotalyeild+Number((Number(data["Earn"])*100/data['openprice']));
              allTotalyeild = allTotalyeild + Number((Number(data["Earn"] - (data['openprice'] + data['closeprice']) / 1000 * 0.03) * 100 / data['openprice']));
              //allTotalyeild+=((data['closeprice']-data['openprice'])/data['openprice']);//总收益率
               count=index+1;
           });
            //$http.get(constantUrl + "strategys/", {
            //      headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
            //    })
            //    .success(function (data) {
            //      angular.forEach(data, function (x, y) {
            //        this.push({
            //          "name": x["name"],
            //          '_id': x["_id"],
            //          'status': x["status"],
            //          'symbol': x["symbol"],
            //          'exchange':x["exchange"]
            //        });
            //      }, $scope.myFirmStrategyList)
            //    });
            //
            //for(var i=0;i<$scope.myFirmStrategyList.length;i++){
            //  console.log($scope.myFirmStrategyList[i].symbol);
            //}

            var allYelidArrPow = 0;
            var maxBack = 0;//最大回撤率
            amount = tradeItem.length;
            //console.log(amount);
            angular.forEach(tradeItem, function (data, index) {
              allYelidArrPow = allYelidArrPow + Math.pow(data["yeild"] - allTotalyeild, 2);
            });
            yeildArrs.sort(function (a, b) {
              return a - b;
            });
            //maxBack = (yeildArrs[yeildArrs.length - 1] - yeildArrs[0]) / yeildArrs[yeildArrs.length - 1];//最大回撤
            $scope.analyseDataArr = tradeItem;
              maxBack=0;  //最大回撤率，最大回撤就是最低点除以之前的最高减去1
              //var down = new Array();

            console.log($scope.myFirmStrategy.symbol);
            var symbol=$scope.myFirmStrategy.symbol[0]+$scope.myFirmStrategy.symbol[1];
            var charge;
            if(symbol=="IF"||symbol=="IC"||symbol||"IH"){
              charge=0.00015;
            }
            else{
              charge=0.00035;
            }
            //封装计算手续费方法
            function gettest(i){
              if ($scope.analyseDataArr[i].direction == "看多") {
                //console.log("看多");
                var test = $scope.analyseDataArr[i].closeprice - $scope.analyseDataArr[i].openprice - ($scope.analyseDataArr[i].closeprice + $scope.analyseDataArr[i].openprice) * charge;
              }
              else {
                //console.log("看空");
                var test = $scope.analyseDataArr[i].openprice - $scope.analyseDataArr[i].closeprice - ($scope.analyseDataArr[i].openprice + $scope.analyseDataArr[i].closeprice) * charge;
              }
              test=Number((test).toFixed(6));
              return test;
            }

            var max=0;
              var min=100;
              for(var i=0;i<count;i++) {
                var test=gettest(i);
              if (test > max) {
                max=test;
              }
              if(test < min){
                min=test;
              }
            }
            maxBack=min/max-1;

            //收益率
            var allTotalpal= 0;
            var allTotalyeild =0;
            var oldtotal= 0;
            for(var i=0;i<count;i++){
              var test=gettest(i);
             // oldtotal+=$scope.analyseDataArr[i].pal;
              $scope.analyseDataArr[i].pal=test;
              chartArr[i].Earn = test;
              chartArr[i].y=test;
              $scope.analyseDataArr[i].yeild = test / $scope.analyseDataArr[i].openprice;
              allTotalyeild +=$scope.analyseDataArr[i].yeild;
              // console.log("盈亏:"+$scope.analyseDataArr[i].pal);
              allTotalpal+=$scope.analyseDataArr[i].pal;
              //console.log(totallv);
            }


            $scope.allTotalpal=allTotalpal;
            $scope.allTotalyeild =allTotalyeild;
            $scope.averTotalyeild = allTotalyeild/amount;
            /*$scope.annualized_return=Number(parseFloat((Math.pow((1+total/100/amount),252/amount)-1)*100).toFixed(2));*/
            /*$scope.average_winrate=Number(parseFloat(totalWinrate/amount).toFixed(2));*/
            $scope.average_winrate = (totalWinrate / amount).toFixed(2);
            $scope.average_profit = Number(parseFloat(prof / loss).toFixed(2));
            /*$scope.rate1=Number(parseFloat(totalRate1/amount).toFixed(2));*/
            $scope.rate1 = Number(parseFloat(allTotalyeild / amount).toFixed(2));


            /*$scope.rate2=Math.sqrt(parseFloat(totalRate2)/amount).toFixed(2);*/
            //$scope.rate2 = Math.sqrt(allYelidArrPow / amount).toFixed(2);//策略收益波动率
            /*$scope.rate3=Number(parseFloat($scope.rate1/$scope.rate2).toFixed(2));*/
            //$scope.rate3 = ((((allTotalyeild / amount * 250) * 100) - 1.10) / $scope.rate2).toFixed(2);//夏普比率
            $scope.rate4 = maxBack.toFixed(2);
           // $scope.allTotalpal = allTotalpal;
            /*$scope.allTotalyeild=Number(allTotalyeild.toFixed(2));*/
            //$scope.allTotalyeild = allTotalyeild.toFixed(4);
           // $scope.averTotalyeild = Number((allTotalyeild / amount).toFixed(4));
           // $scope.annualized_return = (allTotalyeild / amount * 250).toFixed(2);

            $scope.annualized_return= allTotalyeild*250;//年化收益率
            //$scope.annualized_return=Math.pow(allTotalyeild,250)-1;//年化收益率
            //console.log(allTotalyeild,$scope.annualized_return);
            //console.log(count);




            var zheng=0;
            for(var i=0;i<count;i++){
              var test=gettest(i);
              if(test>0){
                $scope.analyseDataArr[i].winrate=100;
                zheng++;
              }
              else{
                $scope.analyseDataArr[i].winrate=0;
              }
            }
            $scope.average_winrate=zheng/count*100;
          var mean=0;
            var a=0;
            for(var i=0;i<count;i++){
              var test=gettest(i);
              mean+=test;
              a+=Math.pow(test-mean,2);
            }
            mean=mean/count;//收益均值

           // 平均盈利/平均亏损
            $scope.average_profit=0;
            var yin=0;
            var kui=0;
            for(var i=0;i<count;i++){
              var test=gettest(i);
              if(test>0){
                yin+=test;
              }else{
                kui+=test;
              }
            }
            var total=0;
            var a=0;
            var b=0;
            for(var i=0;i<count;i++) {
              var test=gettest(i);
                $scope.analyseDataArr[i].yeild=test/$scope.analyseDataArr[i].openprice;

              if(test>0){
                a+=test;
              }
              else{
                b+=test;
              }

              total+= $scope.analyseDataArr[i].yeild;
            }
            console.log(a,b);
            $scope.average_profit=Math.abs(a/b)*100;



            var std=Math.sqrt(a);
            var nianhua=std*Math.sqrt(250);//年化标准差,std*sqrt(250)是最普通的做法，mean的部分要乘以250(策略收益波动率)
            //console.log(mean,std);
            $scope.rate1=allTotalyeild/count;
            //console.log(allTotalyeild,count);
            $scope.rate2=nianhua;
            $scope.rate3 =(mean)/std;//sharpe就每天受益平均下除以std
            $scope.errorYeild=mean/nianhua;//信息比率(策略每日收益 - 参考标准每日收益)的年化均值 / 年化标准差

            //$scope.errorYeild = ((((allTotalyeild / amount * 250) * 100) - 4.67) / $scope.rate2).toFixed(2);//跟踪误差年化波动率

            Highcharts.setOptions({
              global: {
                useUTC: false
              }
            });

            /*chartJsonData=angular.fromJson($scope.analyseJsonData);*/
            angular.forEach(chartJsonData, function (data, index) {
              chartJsonDataArr.push({
                "x": data.datetime,
                "y": data.close,
                'low': data.low,
                'high': data.high,
                'close': data.close,
                'open': data.open,
                'volume': data.volume
              });
            });
            chartJsonDataArr = $filter('orderBy')(chartJsonDataArr, 'x');
            ////////////////////////////////////////////////////////////////////////////////////////

            //修改的highchart1
           // console.log(chartArr[0].Earn);

            $('#return_map_big_1').highcharts('StockChart', {
              credits: {
                enabled: false
              },
              exporting: {
                enabled: false
              },
              plotOptions: {
                series: {
                  turboThreshold: 0
                }
              },
              /*tooltip : {
               shared : true,
               useHTML : true,
               valueDecimals : 2 ,
               backgroundColor: 'white',
               borderWidth: 0,
               borderRadius: 0,
               formatter : function() {

               var s;
               if(this.points[0].point.high){
               $scope.highstockAnalysetime=$filter('date')(this.x,'yyyy-MM-dd H:mm:ss');
               $scope.highstockAnalysehigh=$filter('number')(this.points[0].point.high,2);
               $scope.highstockAnalyselow=$filter('number')(this.points[0].point.low,2);
               $scope.highstockAnalyseopen=$filter('number')(this.points[0].point.open,2);
               $scope.highstockAnalyseclose=$filter('number')(this.points[0].point.close,2);
               $scope.$apply();
               }
               if(this.points[0].point.direction&&this.point.text){
               s=this.point.text;
               }else if(this.points[0].point.direction&&!this.point){
               var dir=(this.points[0].point.direction>0)?'看多':'看空';
               s = Highcharts.dateFormat('<span>%Y-%m-%d %H:%M:%S</span>',this.x);
               s+= '<br />volume：<b class="red">'
               +Highcharts.numberFormat(this.points[0].point.volume,2)
               +'</b><br />Earn：<b class="font-black">￥'
               +Highcharts.numberFormat(this.points[0].point.Earn,2)
               + '</b><br />openprice：<b class="font-black">￥'
               +Highcharts.numberFormat(this.points[0].point.openprice,2)
               + '</b><br />closeprice<b class="font-black">￥'
               +Highcharts.numberFormat(this.points[0].point.closeprice,2)
               + '</b><br />direction：<b class="font-black">'
               +dir;
               }
               return s;*/
              /*var s = Highcharts.dateFormat('<span>%Y-%m-%d %H:%M:%S</span>',this.x);
               s += '<br />high：<b class="red">￥'
               +Highcharts.numberFormat(this.points[0].point.high,2)
               +'</b>&nbsp;&nbsp;|&nbsp;&nbsp;low：<b class="blue">￥'
               +Highcharts.numberFormat(this.points[0].point.low,2)
               + '</b>&nbsp;&nbsp;|&nbsp;&nbsp;close：<b class="green">￥'
               +Highcharts.numberFormat(this.points[0].point.close,2)
               + '</b>&nbsp;&nbsp;|&nbsp;&nbsp;open：<b class="font-black">￥'
               +Highcharts.numberFormat(this.points[0].point.open,2)
               + '</b>&nbsp;&nbsp;|&nbsp;&nbsp;volume：<b class="orange">'
               +Highcharts.numberFormat(this.points[0].point.volume,2)+'笔';
               return s;
               },
               positioner: function () {
               return { x: 0, y: 20 };
               },
               shadow: false
               },*/
              tooltip: {
                useHTML: true,
                xDateFormat: "%Y-%m-%d %H:%M:%S",
                valueDecimals: 2
              },
              legend: {
                enabled: true,
                align: 'right',
                verticalAlign: 'top',
                x: 0,
                y: 0
              },
              rangeSelector: {
                buttons: [
                  {
                    type: 'minute',
                    count: 10,
                    text: '10m'
                  }, {
                    type: 'minute',
                    count: 30,
                    text: '30m'
                  }, {
                    type: 'hour',
                    count: 1,
                    text: '1h'
                  }, {
                    type: 'day',
                    count: 1,
                    text: '1d'
                  }, {
                    type: 'week',
                    count: 1,
                    text: '1w'
                  }, {
                    type: 'all',
                    text: '所有'
                  }],
                selected: 5,
                buttonSpacing: 2
              },
              yAxis: [{
                labels: {
                  align: 'right',
                  x: -3
                },
                title: {
                  text: '股价'
                },
                lineWidth: 1,
                height: '60%'
              }, {
                labels: {
                  align: 'right',
                  x: -3
                },
                title: {
                  text: '盈亏'
                },
                opposite: true,
                offset: 0,
                height: '35%',
                top: '65%'
              }],
              series: [{
                type: 'line',
                name: '股价444',
                data: chartJsonDataArr,
                lineWidth: 2,
                id: 'dataseries'
              }, {
                type: 'flags',
                data: shortYArr,
                onSeries: "dataseries",
                shape: 'squarepin',
                width: 36,
                color: "#4169e1",
                fillColor: 'transparent',
                style: {
                  color: '#333'
                },
                y: -40,
                name: '看多',
              }, {
                type: 'flags',
                data: buyYArr,
                onSeries: "dataseries",
                shape: 'squarepin',
                width: 36,
                color: '#ff9912',
                fillColor: 'transparent',
                style: {
                  color: '#333'
                },
                y: 20,
                name: '看空',
              }, {
                type: 'column',
                data: chartArr,
                name: '盈亏333',
                /*lineWidth:2,*/
                yAxis: 1,
                threshold: 0,
                negativeColor: 'green',
                color: 'red'
                /*color:'#e3170d',*/
                /*marker:{
                 enabled:true,
                 symbol:'circle',
                 fillColor:'#0b1746',
                 radius:5
                 }*/
              }]
            });
            $('#return_map_big_form').highcharts('StockChart', {
              credits: {
                enabled: false
              },
              exporting: {
                enabled: false
              },
              plotOptions: {
                series: {
                  turboThreshold: 0
                }
              },
              /*tooltip : {
               shared : true,
               useHTML : true,
               valueDecimals : 2 ,
               backgroundColor: 'white',
               borderWidth: 0,
               borderRadius: 0,
               formatter : function() {

               var s;
               if(this.points[0].point.high){
               $scope.highstockAnalysetime=$filter('date')(this.x,'yyyy-MM-dd H:mm:ss');
               $scope.highstockAnalysehigh=$filter('number')(this.points[0].point.high,2);
               $scope.highstockAnalyselow=$filter('number')(this.points[0].point.low,2);
               $scope.highstockAnalyseopen=$filter('number')(this.points[0].point.open,2);
               $scope.highstockAnalyseclose=$filter('number')(this.points[0].point.close,2);
               $scope.$apply();
               }
               if(this.points[0].point.direction&&this.point.text){
               s=this.point.text;
               }else if(this.points[0].point.direction&&!this.point){
               var dir=(this.points[0].point.direction>0)?'看多':'看空';
               s = Highcharts.dateFormat('<span>%Y-%m-%d %H:%M:%S</span>',this.x);
               s+= '<br />volume：<b class="red">'
               +Highcharts.numberFormat(this.points[0].point.volume,2)
               +'</b><br />Earn：<b class="font-black">￥'
               +Highcharts.numberFormat(this.points[0].point.Earn,2)
               + '</b><br />openprice：<b class="font-black">￥'
               +Highcharts.numberFormat(this.points[0].point.openprice,2)
               + '</b><br />closeprice<b class="font-black">￥'
               +Highcharts.numberFormat(this.points[0].point.closeprice,2)
               + '</b><br />direction：<b class="font-black">'
               +dir;
               }
               return s;*/
              /*var s = Highcharts.dateFormat('<span>%Y-%m-%d %H:%M:%S</span>',this.x);
               s += '<br />high：<b class="red">￥'
               +Highcharts.numberFormat(this.points[0].point.high,2)
               +'</b>&nbsp;&nbsp;|&nbsp;&nbsp;low：<b class="blue">￥'
               +Highcharts.numberFormat(this.points[0].point.low,2)
               + '</b>&nbsp;&nbsp;|&nbsp;&nbsp;close：<b class="green">￥'
               +Highcharts.numberFormat(this.points[0].point.close,2)
               + '</b>&nbsp;&nbsp;|&nbsp;&nbsp;open：<b class="font-black">￥'
               +Highcharts.numberFormat(this.points[0].point.open,2)
               + '</b>&nbsp;&nbsp;|&nbsp;&nbsp;volume：<b class="orange">'
               +Highcharts.numberFormat(this.points[0].point.volume,2)+'笔';
               return s;
               },
               positioner: function () {
               return { x: 0, y: 20 };
               },
               shadow: false
               },*/
              tooltip: {
                useHTML: true,
                xDateFormat: "%Y-%m-%d %H:%M:%S",
                valueDecimals: 2
              },
              legend: {
                enabled: true,
                align: 'right',
                verticalAlign: 'top',
                x: 0,
                y: 0
              },
              rangeSelector: {
                buttons: [
                  {
                    type: 'minute',
                    count: 10,
                    text: '10m'
                  }, {
                    type: 'minute',
                    count: 30,
                    text: '30m'
                  }, {
                    type: 'hour',
                    count: 1,
                    text: '1h'
                  }, {
                    type: 'day',
                    count: 1,
                    text: '1d'
                  }, {
                    type: 'week',
                    count: 1,
                    text: '1w'
                  }, {
                    type: 'all',
                    text: '所有'
                  }],
                selected: 5,
                buttonSpacing: 2

              },
              yAxis: [{
                labels: {
                  align: 'right',
                  x: -3
                },
                title: {
                  text: '股价'
                },
                lineWidth: 1,
                height: '60%'
              }, {
                labels: {
                  align: 'right',
                  x: -3
                },
                title: {
                  text: '盈亏'
                },
                opposite: true,
                offset: 0,
                height: '35%',
                top: '65%'
              }],
              series: [{
                type: 'line',
                name: '股价',
                data: chartJsonDataArr,
                lineWidth: 2,
                id: 'dataseries'
              }, {
                type: 'flags',
                data: shortYArr,
                onSeries: "dataseries",
                shape: 'squarepin',
                width: 36,
                color: "#4169e1",
                fillColor: 'transparent',
                style: {
                  color: '#333'
                },
                y: -40,
                name: '看多',
              }, {
                type: 'flags',
                data: buyYArr,
                onSeries: "dataseries",
                shape: 'squarepin',
                width: 36,
                color: '#ff9912',
                fillColor: 'transparent',
                style: {
                  color: '#333'
                },
                y: 20,
                name: '看空',
              }, {
                type: 'column',
                data: chartArr,
                name: '盈亏',
                /*lineWidth:2,*/
                yAxis: 1,
                threshold: 0,
                negativeColor: 'green',
                color: 'red'
                /*color:'#e3170d',*/
                /*marker:{
                 enabled:true,
                 symbol:'circle',
                 fillColor:'#0b1746',
                 radius:5
                 }*/
              }]
            });
            $('#return_map_big_2').highcharts('StockChart', {
              chart:{
                width:1200,
                height:600
              },

              xAxis: {
                tickInterval: 1
              },

              yAxis: {
                type: '盈亏',
                minorTickInterval: 0.1,
                plotLines:[{
                  color:'#A25E6B',           //线的颜色
                  dashStyle:'solid',     //默认值，这里定义为实线
                  value:0,               //定义在那个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
                  width:2                //标示线的宽度，2px
                }]

              },


              rangeSelector: {
                buttons: [
                  {
                    type: 'minute',
                    count: 10,
                    text: '10m'
                  }, {
                    type: 'minute',
                    count: 30,
                    text: '30m'
                  }, {
                    type: 'hour',
                    count: 1,
                    text: '1h'
                  }, {
                    type: 'day',
                    count: 1,
                    text: '1d'
                  }, {
                    type: 'week',
                    count: 1,
                    text: '1w'
                  }, {
                    type: 'all',
                    text: '所有'
                  }],
                selected: 5,
                buttonSpacing: 2
              },

              series: [
                {
                  data: chartArr,
                  name: '盈亏'
                  /*lineWidth:2,*/

                  /*color:'#e3170d',*/
                  /*marker:{
                   enabled:true,
                   symbol:'circle',
                   fillColor:'#0b1746',
                   radius:5
                   }*/
                }]
            });

          };
        });
      });
    };


  }])
  .controller('complieController', ['$scope', '$rootScope', '$http', '$location', '$cookies', '$cookieStore', 'constantUrl', '$route', '$timeout', '$q', '$interval', '$filter', function ($scope, $rootScope, $http, $location, $cookies, $cookieStore, constantUrl, $route, $timeout, $q, $interval, $filter) {
    $scope.fate = 0;
    var editor;
    var myClassId;
    $scope.code = "# encoding: UTF-8\n"
      + "\"\"\"\n"
      + "这里的Demo是一个最简单的策略实现，并未考虑太多实盘中的交易细节，如：\n"
      + "1. 委托价格超出涨跌停价导致的委托失败\n"
      + "2. 委托未成交，需要撤单后重新委托\n"
      + "3. 断网后恢复交易状态\n"
      + "\"\"\"\n"
      + "from ctaBase import *\n"
      + "from ctaTemplate import CtaTemplate\n\n"
      + "########################################################################\n"
      + "class Demo(CtaTemplate):\n"
      + "    \"\"\"双指数均线策略Demo\"\"\"\n"
      + "    className = 'Demo'\n"
      + "    author = u'coder name'\n\n"
      + "    # 策略参数\n"
      + "    fastK = 0.9     # 快速EMA参数\n"
      + "    slowK = 0.1     # 慢速EMA参数\n"
      + "    initDays = 10   # 初始化数据所用的天数\n\n"
      + "    # 策略变量\n"
      + "    bar = None\n"
      + "    barMinute = EMPTY_STRING\n\n"
      + "    fastMa = []             # 快速EMA均线数组\n"
      + "    fastMa0 = EMPTY_FLOAT   # 当前最新的快速EMA\n"
      + "    fastMa1 = EMPTY_FLOAT   # 上一根的快速EMA\n\n"
      + "    slowMa = []             # 与上面相同\n"
      + "    slowMa0 = EMPTY_FLOAT\n"
      + "    slowMa1 = EMPTY_FLOAT\n\n"
      + "    # 参数列表，保存了参数的名称\n"
      + "    paramList = ['name',\n"
      + "                 'className',\n"
      + "                 'author',\n"
      + "                 'vtSymbol',\n"
      + "                 'fastK',\n"
      + "                 'slowK']\n\n"
      + "    # 变量列表，保存了变量的名称\n"
      + "    varList = ['inited',\n"
      + "               'trading',\n"
      + "               'pos',\n"
      + "               'fastMa0',\n"
      + "               'fastMa1',\n"
      + "               'slowMa0',\n"
      + "               'slowMa1']\n\n"
      + "    #----------------------------------------------------------------------\n"
      + "    def __init__(self, ctaEngine, setting):\n"
      + "        \"\"\"Constructor\"\"\"\n"
      + "        super(Demo, self).__init__(ctaEngine, setting)\n\n"
      + "       # 注意策略类中的可变对象属性（通常是list和dict等），在策略初始化时需要重新创建，\n"
      + "        # 否则会出现多个策略实例之间数据共享的情况，有可能导致潜在的策略逻辑错误风险，\n"
      + "        # 策略类中的这些可变对象属性可以选择不写，全都放在__init__下面，写主要是为了阅读\n"
      + "        # 策略时方便（更多是个编程习惯的选择）\n"
      + "        self.fastMa = []\n"
      + "        self.slowMa = []\n\n"
      + "    #----------------------------------------------------------------------\n"
      + "    def onInit(self):\n"
      + "        \"\"\"初始化策略（必须由用户继承实现）\"\"\"\n"
      + "        self.writeCtaLog(u'demo策略初始化')\n\n"
      + "        initData = self.loadBar(self.initDays)\n"
      + "        for bar in initData:\n"
      + "            self.onBar(bar)\n\n"
      + "        self.putEvent()\n\n"
      + "    #----------------------------------------------------------------------\n"
      + "    def onStart(self):\n"
      + "        \"\"\"启动策略（必须由用户继承实现）\"\"\"\n"
      + "        self.writeCtaLog(u'demo策略启动')\n"
      + "        self.putEvent()\n\n"
      + "    #----------------------------------------------------------------------\n"
      + "    def onStop(self):\n"
      + "        \"\"\"停止策略（必须由用户继承实现）\"\"\"\n"
      + "        self.writeCtaLog(u'demo策略停止')\n"
      + "        self.putEvent()\n\n"
      + "    #----------------------------------------------------------------------\n"
      + "    def onTick(self, tick):\n"
      + "        \"\"\"收到行情TICK推送（必须由用户继承实现）\"\"\"\n"
      + "        # 计算K线\n"
      + "        tickMinute = tick.datetime.minute\n\n"
      + "        if tickMinute != self.barMinute:\n"
      + "            if self.bar:\n"
      + "                self.onBar(self.bar)\n\n"
      + "            bar = CtaBarData()\n"
      + "            bar.vtSymbol = tick.vtSymbol\n"
      + "            bar.symbol = tick.symbol\n"
      + "            bar.exchange = tick.exchange\n\n"
      + "            bar.open = tick.lastPrice\n"
      + "            bar.high = tick.lastPrice\n"
      + "            bar.low = tick.lastPrice\n"
      + "            bar.close = tick.lastPrice\n\n"
      + "            bar.date = tick.date\n"
      + "            bar.time = tick.time\n"
      + "            bar.datetime = tick.datetime    # K线的时间设为第一个Tick的时间\n\n"
      + "            # 实盘中用不到的数据可以选择不算，从而加快速度\n\n"
      + "            #bar.volume = tick.volume\n"
      + "            #bar.openInterest = tick.openInterest\n\n"
      + "            self.bar = bar                  # 这种写法为了减少一层访问，加快速度\n"
      + "            self.barMinute = tickMinute     # 更新当前的分钟\n\n"
      + "        else:                               # 否则继续累加新的K线\n\n"
      + "            bar = self.bar                  # 写法同样为了加快速度\n\n"
      + "            bar.high = max(bar.high, tick.lastPrice)\n"
      + "            bar.low = min(bar.low, tick.lastPrice)\n"
      + "            bar.close = tick.lastPrice\n\n"
      + "    #----------------------------------------------------------------------\n\n"
      + "    def onBar(self, bar):\n"
      + "        \"\"\"收到Bar推送（必须由用户继承实现）\"\"\"\n"
      + "		\"\"\"算法核心，接受到Bar数据后算法逻辑判断\"\"\"\n\n"
      + "		# 计算快慢均线\n"
      + "        if not self.fastMa0:\n"
      + "            self.fastMa0 = bar.close\n"
      + "            self.fastMa.append(self.fastMa0)\n"
      + "        else:\n"
      + "            self.fastMa1 = self.fastMa0\n"
      + "            self.fastMa0 = bar.close * self.fastK + self.fastMa0 * (1 - self.fastK)\n"
      + "            self.fastMa.append(self.fastMa0)\n\n"
      + "        if not self.slowMa0:\n"
      + "            self.slowMa0 = bar.close\n"
      + "            self.slowMa.append(self.slowMa0)\n"
      + "        else:\n"
      + "            self.slowMa1 = self.slowMa0\n"
      + "            self.slowMa0 = bar.close * self.slowK + self.slowMa0 * (1 - self.slowK)\n"
      + "            self.slowMa.append(self.slowMa0)\n\n"
      + "        # 判断买卖\n"
      + "        crossOver = self.fastMa0>self.slowMa0 and self.fastMa1<self.slowMa1     # 金叉上穿\n"
      + "        crossBelow = self.fastMa0<self.slowMa0 and self.fastMa1>self.slowMa1    # 死叉下穿\n\n"
      + "        # 金叉和死叉的条件是互斥\n"
      + "        # 所有的委托均以K线收盘价委托（这里有一个实盘中无法成交的风险，考虑添加对模拟市价单类型的支持）\n"
      + "        if crossOver:\n"
      + "            # 如果金叉时手头没有持仓，则直接做多\n"
      + "            if self.pos == 0:\n"
      + "                self.buy(bar.close, 1)\n"
      + "            # 如果有空头持仓，则先平空，再做多\n"
      + "            elif self.pos < 0:\n"
      + "                self.cover(bar.close, 1)\n"
      + "                self.buy(bar.close, 1)\n"
      + "        # 死叉和金叉相反\n"
      + "        elif crossBelow:\n"
      + "            if self.pos == 0:\n"
      + "                self.short(bar.close, 1)\n"
      + "            elif self.pos > 0:\n"
      + "                self.sell(bar.close, 1)\n"
      + "                self.short(bar.close, 1)\n\n"
      + "        # 发出状态更新事件\n"
      + "        self.putEvent()\n\n"
      + "    #----------------------------------------------------------------------\n"
      + "    def onOrder(self, order):\n"
      + "        \"\"\"收到委托变化推送（必须由用户继承实现）\"\"\"\n"
      + "        # 对于无需做细粒度委托控制的策略，可以忽略onOrder\n"
      + "        pass\n\n"
      + "    #----------------------------------------------------------------------\n"
      + "    def onTrade(self, trade):\n"
      + "        \"\"\"收到成交推送（必须由用户继承实现）\"\"\"\n"
      + "        # 对于无需做细粒度委托控制的策略，可以忽略onOrder\n"
      + "        pass\n\n\n"
      + "########################################################################################\n"
      + "class OrderManagementDemo(CtaTemplate):\n"
      + "    \"\"\"基于tick级别细粒度撤单追单测试demo\"\"\"\n\n"
      + "    className = 'OrderManagementDemo'\n"
      + "    author = u'用Python的交易员'\n\n"
      + "    # 策略参数\n"
      + "    initDays = 10   # 初始化数据所用的天数\n\n"
      + "    # 策略变量\n"
      + "    bar = None\n"
      + "    barMinute = EMPTY_STRING\n\n\n"
      + "    # 参数列表，保存了参数的名称\n"
      + "    paramList = ['name',\n"
      + "                 'className',\n"
      + "                 'author',\n"
      + "                 'vtSymbol']\n\n"
      + "    # 变量列表，保存了变量的名称\n"
      + "    varList = ['inited',\n"
      + "               'trading',\n"
      + "               'pos']\n\n"
      + "    #----------------------------------------------------------------------\n"
      + "    def __init__(self, ctaEngine, setting):\n"
      + "        \"\"\"Constructor\"\"\"\n"
      + "        super(OrderManagementDemo, self).__init__(ctaEngine, setting)\n\n"
      + "        self.lastOrder = None\n"
      + "        self.orderType = ''\n\n"
      + "    #----------------------------------------------------------------------\n"
      + "    def onInit(self):\n"
      + "       \"\"\"初始化策略（必须由用户继承实现）\"\"\"\n"
      + "        self.writeCtaLog(u'demo策略初始化')\n\n"
      + "        initData = self.loadBar(self.initDays)\n"
      + "        for bar in initData:\n"
      + "            self.onBar(bar)\n\n"
      + "        self.putEvent()\n\n"
      + "    #----------------------------------------------------------------------\n"
      + "    def onStart(self):\n"
      + "        \"\"\"启动策略（必须由用户继承实现）\"\"\"\n"
      + "        self.writeCtaLog(u'demo策略启动')\n"
      + "        self.putEvent()\n\n"
      + "    #----------------------------------------------------------------------\n"
      + "    def onStop(self):\n"
      + "        \"\"\"停止策略（必须由用户继承实现）\"\"\"\n"
      + "        self.writeCtaLog(u'demo策略停止')\n"
      + "        self.putEvent()\n\n"
      + "    #----------------------------------------------------------------------\n"
      + "    def onTick(self, tick):\n"
      + "        \"\"\"收到行情TICK推送（必须由用户继承实现）\"\"\"\n\n"
      + "        # 建立不成交买单测试单\n"
      + "        if self.lastOrder == None:\n"
      + "            self.buy(tick.lastprice - 10.0, 1)\n\n"
      + "        # CTA委托类型映射\n"
      + "        if self.lastOrder != None and self.lastOrder.direction == u'多' and self.lastOrder.offset == u'开仓':\n"
      + "            self.orderType = u'买开'\n\n"
      + "        elif self.lastOrder != None and self.lastOrder.direction == u'多' and self.lastOrder.offset == u'平仓':\n"
      + "            self.orderType = u'买平'\n\n"
      + "        elif self.lastOrder != None and self.lastOrder.direction == u'空' and self.lastOrder.offset == u'开仓':\n"
      + "            self.orderType = u'卖开'\n\n"
      + "        elif self.lastOrder != None and self.lastOrder.direction == u'空' and self.lastOrder.offset == u'平仓':\n"
      + "            self.orderType = u'卖平'\n\n"
      + "        # 不成交，即撤单，并追单\n"
      + "        if self.lastOrder != None and self.lastOrder.status == u'未成交':\n\n"
      + "            self.cancelOrder(self.lastOrder.vtOrderID)\n"
      + "            self.lastOrder = None\n"
      + "        elif self.lastOrder != None and self.lastOrder.status == u'已撤销':\n"
      + "        # 追单并设置为不能成交\n\n"
      + "            self.sendOrder(self.orderType, self.tick.lastprice - 10, 1)\n"
      + "            self.lastOrder = None\n\n"
      + "    #----------------------------------------------------------------------\n"
      + "    def onBar(self, bar):\n"
      + "        \"\"\"收到Bar推送（必须由用户继承实现）\"\"\"\n"
      + "        pass\n\n"
      + "    #----------------------------------------------------------------------\n"
      + "    def onOrder(self, order):\n"
      + "        \"\"\"收到委托变化推送（必须由用户继承实现）\"\"\"\n"
      + "        # 对于无需做细粒度委托控制的策略，可以忽略onOrder\n"
      + "        self.lastOrder = order\n\n"
      + "    #----------------------------------------------------------------------\n\n"
      + "    def onTrade(self, trade):\n"
      + "        \"\"\"收到成交推送（必须由用户继承实现）\"\"\"\n"
      + "        # 对于无需做细粒度委托控制的策略，可以忽略onOrder\n"
      + "        pass";
    $scope.$watch('$viewContentLoaded', function () {
      editor = ace.edit("editor");
      editor.$blockScrolling = Infinity;
      editor.setFontSize(16);
      editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
      });
      editor.setTheme("ace/theme/chrome");
      editor.getSession().setMode("ace/mode/python");
      editor.setValue($scope.code);
    });
    $scope.openMask = function () {
      if (!myClassId) {
        Showbo.Msg.alert('先修改策略名（即策略类名），并保存策略。');
        return;
      }
      $('.complie-mask').fadeIn();
    };
    $scope.closeMask = function () {
      $('.complie-mask').fadeOut();
    };
    $scope.hisItem = {};
    $scope.modeTickOptions = false;
    $scope.modeBarOptions = false;
    $scope.getModeList = function (ty) {
      $http.get(constantUrl + "dates/", {
        params: {type: ty, date_type: 'data'},
        headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
      })
        .success(function (data) {
          $scope.hisItem.time = data;
        })
        .error(function (err, sta) {
          console.log(err);
          console.log(sta);
        });
      //complieService.getModeList(ty);
    };
    $scope.getBarList = function () {
      $scope.modeTickOptions = !$scope.modeBarOptions;
      if (!$scope.modeBarOptions) return;
      $scope.getModeList('bar');
      //complieService.getBarList();
    };
    $scope.getTickList = function () {
      $scope.modeBarOptions = !$scope.modeTickOptions;
      if (!$scope.modeTickOptions) return;
      $scope.getModeList('tick');
      //complieService.getTickList();
    };

    $scope.addHisStrategy = function () {
      //complieService.addHisStrategy();
      var files = $scope.files;
      var formdata = new FormData();
      if ($scope.modeBarOptions) {
        formdata.append('mode', 'bar');
      } else {
        formdata.append('mode', 'tick');
      }
      ;
      formdata.append('name', $scope.hisItem.name);
      formdata.append('start', $scope.hisItem.start);
      formdata.append('end', $scope.hisItem.end);
      formdata.append('class_id', myClassId);
      if (($scope.files != undefined) && ($scope.files != null)) {
        formdata.append('file', files);
      }
      ;
      function complieStep1() {
        var defer = $q.defer();
        $http.post(constantUrl + "btstrategys/", formdata, {
          transformRequest: angular.identity,
          headers: {
            'Content-Type': undefined,
            'Authorization': 'token ' + $cookieStore.get('user').token
          }
        })
          .success(function (data) {
            defer.resolve(data);
          })
          .error(function (err, st) {
            defer.reject(err);
          });
        return defer.promise;
      }

      complieStep1().then(function (data) {
        $('.complie-mask').fadeOut();
        var id = data._id;
        var mypromise = $interval(function () {
          $http.get(constantUrl + 'btstrategys/' + id + '/', {
            headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
          })
            .success(function (data) {

              console.log(data);
              if (data.status == '-2' || data.status == 2) {
                $interval.cancel(mypromise);
              }
              ;
              if (data.status == 2) {
                data.logs.push('push策略完成');
                $http.get(constantUrl + 'dates/', {
                  params: {
                    "date_type": 'transaction',
                    "sty_id": id
                  },
                  headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
                })
                  .success(function (data) {
                    console.log(data);
                    if (data != null) {
                      var mydate = $filter('date')(new Date((new Date(data[data.length - 1])).setDate((new Date(data[data.length - 1])).getDate() + 1)), 'yyyy-MM-dd');
                      $scope.getHisTime = function () {
                        var defer1 = $q.defer();
                        $http.get(constantUrl + 'transactions/', {
                          params: {
                            "sty_id": id,
                            "start": data[0],
                            "end": mydate
                          },
                          headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
                        })
                          .success(function (data) {
                            defer1.resolve(data);
                          })
                          .error(function (err, sta) {
                            defer1.reject(err);
                          });
                        return defer1.promise;
                      };
                      $scope.getHisTransTime = function () {
                        var defer2 = $q.defer();
                        $http.get(constantUrl + 'datas/', {
                          params: {
                            "type": 'bar',
                            "start": data[0],
                            "end": mydate
                          },
                          headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
                        })
                          .success(function (data) {
                            defer2.resolve(data);
                          })
                          .error(function (err, sta) {
                            defer2.reject(err);
                          });
                        return defer2.promise;
                      };
                      $scope.getHisTime().then(function (data) {
                        var chartData11 = data;
                        console.log(data);
                        $scope.getHisTransTime().then(function (data) {

                          var chartJsonData = data;
                          draws1();
                          function draws1() {
                            var chartData1 = [];
                            angular.forEach(chartData11, function (data, index) {
                              var hour = parseInt($filter("date")(data["datetime"], "yyyy-MM-dd HH:mm:ss").slice(11, 13));
                              var minute = parseInt($filter("date")(data["datetime"], "yyyy-MM-dd HH:mm:ss").slice(14, 16));
                              // if (hour<9||hour>15||(hour==15&&minute>30)) {
                              // }else{
                              // 	this.push(data);
                              // };
                              if (data['name'] == 'AG_real') {
                                if (hour < 6 || hour > 9) {
                                  this.push(data);
                                }
                              } else {
                                if (hour < 9 || hour > 15 || (hour == 15 && minute > 30)) {

                                } else {
                                  this.push(data);
                                }
                                ;
                              }
                              ;
                            }, chartData1);
                            var chartJsonDataArr = [];
                            var chartArr = [];
                            var indexShortArr = [];
                            var indexBuyArr = [];
                            var buySellNum = 0;
                            var buyYArr = [];
                            var shortYArr = [];
                            angular.forEach(chartData1, function (data, index) {
                              if (index == 0 && ((data.trans_type == "cover") || (data.trans_type == "sell")))
                                return;
                              if (index == chartData1.length - 1) return;
                              if ((data.trans_type == "cover") || (data.trans_type == "sell")) return;
                              if (data.trans_type == "short") {

                                outer:
                                  for (var i = 0; i < chartData1.length; i++) {
                                    if (chartData1[i].trans_type == "cover") {
                                      if (indexShortArr.length != 0) {
                                        inter:
                                          for (var j = 0; j < indexShortArr.length; j++) {
                                            if (indexShortArr[j] == i) {
                                              break inter;
                                            } else if ((j == indexShortArr.length - 1) && (indexShortArr[j] != i)) {
                                              buySellNum++;
                                              buyYArr.push({
                                                "short": "short",
                                                "text": '时间：' + $filter('date')(data.datetime, 'yyyy-MM-dd H:mm:ss') + '<br>成交价：￥' + data.price + '<br>成交量：' + data.volume,
                                                "volume": data.volume,
                                                "pos": data.pos,
                                                "price": data.price,
                                                "x": data.datetime,
                                                "name": data.name,
                                                "symbol": data.symbol,
                                                "title": data.trans_type + ' ' + buySellNum
                                              });
                                              var Earn;
                                              var y;
                                              if (data.name == 'AG_real') {
                                                Earn = Number((data.price - chartData1[i].price - 0.32 * 2).toFixed(2));
                                                y = Number((data.price - chartData1[i].price - 0.32 * 2).toFixed(2));
                                              } else {
                                                Earn = Number((data.price * (1 - 0.00003) - chartData1[i].price * (1 + 0.00003)).toFixed(2));
                                                y = Number((data.price * (1 - 0.00003) - chartData1[i].price * (1 + 0.00003)).toFixed(2));
                                              }
                                              ;
                                              chartArr.push({

                                                "x": chartData1[i].datetime,
                                                //"y":Number((data.price-chartData1[i].price).toFixed(2)),
                                                "y": y,
                                                "volume": data.volume,
                                                "direction": data.pos,
                                                "Earn": Earn,
                                                "openprice": data.price,
                                                "closeprice": chartData1[i].price,
                                                "opentime": data.datetime,
                                                "closetime": chartData1[i].datetime,
                                                "present": chartData1[i].price,
                                                "name": data.name,
                                                "symbol": data.symbol
                                              });

                                              buyYArr.push({
                                                "short": "short",
                                                "text": '时间：' + $filter('date')(chartData1[i].datetime, 'yyyy-MM-dd H:mm:ss') + '<br>成交价：￥' + chartData1[i].price
                                                + '<br>成交量：' + chartData1[i].volume,
                                                "volume": chartData1[i].volume,
                                                "pos": chartData1[i].pos,
                                                "price": chartData1[i].price,
                                                "x": chartData1[i].datetime,
                                                "name": chartData1[i].name,
                                                "symbol": chartData1[i].symbol,
                                                "title": chartData1[i].trans_type + ' ' + buySellNum
                                              });
                                              indexShortArr.push(i);
                                              break outer;
                                            }
                                            ;
                                          }
                                        ;
                                      } else {
                                        buySellNum++;
                                        buyYArr.push({
                                          "short": "short",
                                          "text": '时间：' + $filter('date')(data.datetime, 'yyyy-MM-dd H:mm:ss') + '<br>成交价：￥' + data.price + '<br>成交量：' + data.volume,
                                          "volume": data.volume,
                                          "pos": data.pos,
                                          "price": data.price,
                                          "x": data.datetime,
                                          "name": data.name,
                                          "symbol": data.symbol,
                                          "title": data.trans_type + ' ' + buySellNum
                                        });
                                        var Earn;
                                        var y;
                                        if (data.name == 'AG_real') {
                                          Earn = Number((data.price - chartData1[i].price - 0.32 * 2).toFixed(2));
                                          y = Number((data.price - chartData1[i].price - 0.32 * 2).toFixed(2));
                                        } else {
                                          Earn = Number((data.price * (1 - 0.00003) - chartData1[i].price * (1 + 0.00003)).toFixed(2));
                                          y = Number((data.price * (1 - 0.00003) - chartData1[i].price * (1 + 0.00003)).toFixed(2));
                                        }
                                        ;
                                        chartArr.push({

                                          "x": chartData1[i].datetime,
                                          //"y":Number((data.price-chartData1[i].price).toFixed(2)),
                                          "y": y,
                                          "volume": data.volume,
                                          "direction": -1,
                                          //"Earn":Number((data.price-chartData1[i].price).toFixed(2)),
                                          "Earn": Earn,
                                          "openprice": data.price,
                                          "closeprice": chartData1[i].price,
                                          "opentime": data.datetime,
                                          "closetime": chartData1[i].datetime,
                                          "present": chartData1[i].price,
                                          "name": data.name,
                                          "symbol": data.symbol
                                        });
                                        buyYArr.push({
                                          "short": "short",
                                          "text": '时间：' + $filter('date')(chartData1[i].datetime, 'yyyy-MM-dd H:mm:ss') + '<br>成交价：￥' + chartData1[i].price + '<br>成交量：' + chartData1[i].volume,
                                          "volume": chartData1[i].volume,
                                          "pos": chartData1[i].pos,
                                          "price": chartData1[i].price,
                                          "x": chartData1[i].datetime,
                                          "name": chartData1[i].name,
                                          "symbol": chartData1[i].symbol,
                                          "title": chartData1[i].trans_type + ' ' + buySellNum
                                        });
                                        indexShortArr.push(i);
                                        break outer;
                                      }
                                      ;
                                    }
                                    ;
                                  }
                                ;
                              }
                              ;
                              if (data.trans_type == "buy") {

                                outer1:
                                  for (var i = 0; i < chartData1.length; i++) {
                                    if (chartData1[i].trans_type == "sell") {
                                      if (indexShortArr.length != 0) {
                                        inter1:
                                          for (var j = 0; j < indexShortArr.length; j++) {
                                            if (indexShortArr[j] == i) {
                                              break inter1;
                                            } else if ((j == indexShortArr.length - 1) && (indexShortArr[j] != i)) {
                                              buySellNum++;
                                              shortYArr.push({
                                                "buy": 'buy',
                                                "text": '时间：' + $filter('date')(data.datetime, 'yyyy-MM-dd H:mm:ss') + '<br>成交价：￥' + data.price + '<br>成交量：' + data.volume,
                                                "volume": data.volume,
                                                "pos": data.pos,
                                                "price": data.price,
                                                "x": data.datetime,
                                                "name": data.name,
                                                "symbol": data.symbol,
                                                "title": data.trans_type + ' ' + buySellNum
                                              });
                                              var Earn;
                                              var y;
                                              if (data.name == 'AG_real') {
                                                Earn = Number((chartData1[i].price - data.price - 0.32 * 2).toFixed(2));
                                                y = Number((chartData1[i].price - data.price - 0.32 * 2).toFixed(2));
                                              } else {
                                                Earn = Number((chartData1[i].price * (1 - 0.00003) - data.price * (1 + 0.00003)).toFixed(2));
                                                y = Number((chartData1[i].price * (1 - 0.00003) - data.price * (1 + 0.00003)).toFixed(2));
                                              }
                                              ;
                                              chartArr.push({

                                                "x": chartData1[i].datetime,
                                                //"y":Number((chartData1[i].price-data.price).toFixed(2)),
                                                "y": y,
                                                "volume": data.volume,
                                                "direction": 1,
                                                "Earn": Earn,
                                                "openprice": data.price,
                                                "closeprice": chartData1[i].price,
                                                "opentime": data.datetime,
                                                "closetime": chartData1[i].datetime,
                                                "present": chartData1[i].price,
                                                "name": data.name,
                                                "symbol": data.symbol
                                              });
                                              shortYArr.push({
                                                "buy": 'buy',
                                                "text": '时间：' + $filter('date')(chartData1[i].datetime, 'yyyy-MM-dd H:mm:ss') + '<br>成交价：￥' + chartData1[i].price + '<br>成交量：' + chartData1[i].volume,
                                                "volume": chartData1[i].volume,
                                                "pos": chartData1[i].pos,
                                                "price": chartData1[i].price,
                                                "x": chartData1[i].datetime,
                                                "name": chartData1[i].name,
                                                "symbol": chartData1[i].symbol,
                                                "title": chartData1[i].trans_type + ' ' + buySellNum
                                              });
                                              indexShortArr.push(i);
                                              break outer1;
                                            }
                                            ;
                                          }
                                        ;
                                      } else {
                                        buySellNum++;
                                        shortYArr.push({
                                          "buy": 'buy',
                                          "text": '时间：' + $filter('date')(data.datetime, 'yyyy-MM-dd H:mm:ss') + '<br>成交价：￥' + data.price + '<br>成交量：' + data.volume,
                                          "volume": data.volume,
                                          "pos": data.pos,
                                          "price": data.price,
                                          "x": data.datetime,
                                          "name": data.name,
                                          "symbol": data.symbol,
                                          "title": data.trans_type + ' ' + buySellNum
                                        });
                                        var Earn;
                                        var y;
                                        if (data.name == 'AG_real') {
                                          Earn = Number((chartData1[i].price - data.price - 0.32 * 2).toFixed(2));
                                          y = Number((chartData1[i].price - data.price - 0.32 * 2).toFixed(2));
                                        } else {
                                          Earn = Number((chartData1[i].price * (1 - 0.00003) - data.price * (1 + 0.00003)).toFixed(2));
                                          y = Number((chartData1[i].price * (1 - 0.00003) - data.price * (1 + 0.00003)).toFixed(2));
                                        }
                                        ;
                                        chartArr.push({

                                          "x": chartData1[i].datetime,
                                          //"y":Number((chartData1[i].price-data.price).toFixed(2)),
                                          "y": y,
                                          "volume": data.volume,
                                          "direction": data.pos,
                                          //"Earn":Number((chartData1[i].price-data.price).toFixed(2)),
                                          "Earn": Earn,
                                          "openprice": data.price,
                                          "closeprice": chartData1[i].price,
                                          "opentime": data.datetime,
                                          "closetime": chartData1[i].datetime,
                                          "present": chartData1[i].price,
                                          "name": data.name,
                                          "symbol": data.symbol
                                        });
                                        shortYArr.push({
                                          "buy": 'buy',
                                          "text": '时间：' + $filter('date')(chartData1[i].datetime, 'yyyy-MM-dd H:mm:ss') + '<br>成交价：￥' + chartData1[i].price + '<br>成交量：' + chartData1[i].volume,
                                          "volume": chartData1[i].volume,
                                          "pos": chartData1[i].pos,
                                          "price": chartData1[i].price,
                                          "x": chartData1[i].datetime,
                                          "name": chartData1[i].name,
                                          "symbol": chartData1[i].symbol,
                                          "title": chartData1[i].trans_type + ' ' + buySellNum
                                        });
                                        indexShortArr.push(i);
                                        break outer1;
                                      }
                                      ;
                                    }
                                    ;
                                  }
                                ;
                              }
                              ;
                            });

                            shortYArr = $filter('orderBy')(shortYArr, 'x');
                            buyYArr = $filter('orderBy')(buyYArr, 'x');
                            chartArr = $filter('orderBy')(chartArr, 'x');
                            var wealth = [];
                            var buy = [];
                            var tradeItem = [];
                            var direction;
                            var amount = 0;
                            var total = 0;
                            var winrate;
                            var totalWinrate = 0;
                            var totalProfit = 0;
                            var totalRate1 = 0;
                            var totalRate2 = 0;
                            var totalRate3 = 0;
                            var totalRate4 = [];
                            var yeildAbs;
                            var totalpal = 0;
                            var allTotalpal = 0;
                            var allTotalyeild = 0;
                            var allTotalTime = 0;//总持仓时间r
                            var averTotalTime = 0;//平均持仓时间
                            var errorYeild = 0;//跟踪误差年化波动率
                            var prof = 0;
                            var loss = 0;
                            var yeildArrs = [];

                            var delNum = [];
                            angular.forEach(chartArr, function (data, index) {
                              if (data['openprice'] == 0 || data['closeprice'] == 0) {
                                delNum.push(index);
                              }
                              ;
                            });
                            angular.forEach(delNum, function (data, index) {
                              chartArr.splice(data, 1);
                            });
                            Highcharts.setOptions({
                              global: {
                                useUTC: false
                              }
                            });

                            angular.forEach(chartJsonData, function (data, index) {
                              chartJsonDataArr.push({
                                "x": data.datetime,
                                "y": data.close,
                                'low': data.low,
                                'high': data.high,
                                'close': data.close,
                                'open': data.open,
                                'volume': data.volume
                              });
                            });
                            chartJsonDataArr = $filter('orderBy')(chartJsonDataArr, 'x');
                            $('#complie-highcharts').highcharts('StockChart', {
                              credits: {
                                enabled: false
                              },
                              exporting: {
                                enabled: false
                              },
                              plotOptions: {
                                series: {
                                  turboThreshold: 0
                                }
                              },
                              /*tooltip : {
                               shared : true,
                               useHTML : true,
                               valueDecimals : 2 ,
                               backgroundColor: 'white',
                               borderWidth: 0,
                               borderRadius: 0,
                               formatter : function() {

                               var s;
                               if(this.points[0].point.high){
                               $scope.highstockAnalysetime=$filter('date')(this.x,'yyyy-MM-dd H:mm:ss');
                               $scope.highstockAnalysehigh=$filter('number')(this.points[0].point.high,2);
                               $scope.highstockAnalyselow=$filter('number')(this.points[0].point.low,2);
                               $scope.highstockAnalyseopen=$filter('number')(this.points[0].point.open,2);
                               $scope.highstockAnalyseclose=$filter('number')(this.points[0].point.close,2);
                               $scope.$apply();
                               }
                               if(this.points[0].point.direction&&this.point.text){
                               s=this.point.text;
                               }else if(this.points[0].point.direction&&!this.point){
                               var dir=(this.points[0].point.direction>0)?'看多':'看空';
                               s = Highcharts.dateFormat('<span>%Y-%m-%d %H:%M:%S</span>',this.x);
                               s+= '<br />volume：<b class="red">'
                               +Highcharts.numberFormat(this.points[0].point.volume,2)
                               +'</b><br />Earn：<b class="font-black">￥'
                               +Highcharts.numberFormat(this.points[0].point.Earn,2)
                               + '</b><br />openprice：<b class="font-black">￥'
                               +Highcharts.numberFormat(this.points[0].point.openprice,2)
                               + '</b><br />closeprice<b class="font-black">￥'
                               +Highcharts.numberFormat(this.points[0].point.closeprice,2)
                               + '</b><br />direction：<b class="font-black">'
                               +dir;
                               }
                               return s;*/
                              /*var s = Highcharts.dateFormat('<span>%Y-%m-%d %H:%M:%S</span>',this.x);
                               s += '<br />high：<b class="red">￥'
                               +Highcharts.numberFormat(this.points[0].point.high,2)
                               +'</b>&nbsp;&nbsp;|&nbsp;&nbsp;low：<b class="blue">￥'
                               +Highcharts.numberFormat(this.points[0].point.low,2)
                               + '</b>&nbsp;&nbsp;|&nbsp;&nbsp;close：<b class="green">￥'
                               +Highcharts.numberFormat(this.points[0].point.close,2)
                               + '</b>&nbsp;&nbsp;|&nbsp;&nbsp;open：<b class="font-black">￥'
                               +Highcharts.numberFormat(this.points[0].point.open,2)
                               + '</b>&nbsp;&nbsp;|&nbsp;&nbsp;volume：<b class="orange">'
                               +Highcharts.numberFormat(this.points[0].point.volume,2)+'笔';
                               return s;
                               },
                               positioner: function () {
                               return { x: 0, y: 20 };
                               },
                               shadow: false
                               },*/
                              tooltip: {
                                useHTML: true,
                                xDateFormat: "%Y-%m-%d %H:%M:%S",
                                valueDecimals: 2
                              },
                              legend: {
                                enabled: true,
                                align: 'right',
                                verticalAlign: 'top',
                                x: 0,
                                y: 0
                              },
                              rangeSelector: {
                                buttons: [
                                  {
                                    type: 'minute',
                                    count: 10,
                                    text: '10m'
                                  }, {
                                    type: 'minute',
                                    count: 30,
                                    text: '30m'
                                  }, {
                                    type: 'hour',
                                    count: 1,
                                    text: '1h'
                                  }, {
                                    type: 'day',
                                    count: 1,
                                    text: '1d'
                                  }, {
                                    type: 'week',
                                    count: 1,
                                    text: '1w'
                                  }, {
                                    type: 'all',
                                    text: '所有'
                                  }],
                                selected: 5,
                                buttonSpacing: 2

                              },
                              yAxis: [{
                                labels: {
                                  align: 'right',
                                  x: -3
                                },
                                title: {
                                  text: '股价'
                                },
                                lineWidth: 1,
                                height: '60%'
                              }, {
                                labels: {
                                  align: 'right',
                                  x: -3
                                },
                                title: {
                                  text: '盈亏'
                                },
                                opposite: true,
                                offset: 0,
                                height: '35%',
                                top: '65%'
                              }],
                              series: [{
                                type: 'line',
                                name: '股价',
                                data: chartJsonDataArr,
                                lineWidth: 2,
                                id: 'dataseries'
                              }, {
                                type: 'flags',
                                data: shortYArr,
                                onSeries: "dataseries",
                                shape: 'squarepin',
                                width: 36,
                                color: "#4169e1",
                                fillColor: 'transparent',
                                style: {
                                  color: '#333'
                                },
                                y: -40,
                                name: '看多',
                              }, {
                                type: 'flags',
                                data: buyYArr,
                                onSeries: "dataseries",
                                shape: 'squarepin',
                                width: 36,
                                color: '#ff9912',
                                fillColor: 'transparent',
                                style: {
                                  color: '#333'
                                },
                                y: 20,
                                name: '看空',
                              }, {
                                type: 'column',
                                data: chartArr,
                                name: '盈亏',
                                /*lineWidth:2,*/
                                yAxis: 1,
                                threshold: 0,
                                negativeColor: 'green',
                                color: 'red'
                                /*color:'#e3170d',*/
                                /*marker:{
                                 enabled:true,
                                 symbol:'circle',
                                 fillColor:'#0b1746',
                                 radius:5
                                 }*/
                              }]
                            });
                          };
                        });
                      }, function (err, sta) {
                        Showbo.Msg.alert('没有交易数据');
                      });
                    }
                    ;
                  })
                  .error(function (err, sta) {
                    if (sta == 400) {
                      Showbo.Msg.alert('没有交易数据');
                    }
                    ;
                  });


              }
              ;
              $scope.logs = data.logs;
              $scope.errors = data.error;
            })
            .error(function (err) {
              console.log(err);
            });
        }, 500);
      }, function (err) {
        Showbo.Msg.alert(err.error);
        $('.complie-mask').fadeOut();
      });
    };
    $scope.$watch('name', function (nv, ov) {
      if (nv != '新策略') {
        $('.zijin-complie-head  img').hide()
      }
      ;
    });
    $scope.addNew = function () {
      if ($scope.name == '新策略') {
        Showbo.Msg.alert('请修改策略名(即策略类名)');
        return;
      }
      ;
      var postInfo = 'class_name=' + encodeURIComponent($scope.name) + '&code=' + encodeURIComponent(editor.getValue());
      $http.post(constantUrl + "classs/", postInfo, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'token ' + $cookieStore.get('user').token
        }
      })
        .success(function (data) {
          Showbo.Msg.alert('添加成功,可以运行回测。');
          myClassId = data._id;
        })
        .error(function (err, st) {
          Showbo.Msg.alert(err.error);
        });
    };
  }])
  .controller('complieItemController', ['$scope', '$rootScope', '$http', '$location', '$cookieStore', 'constantUrl', '$routeParams', '$interval', '$q', '$filter', function ($scope, $rootScope, $http, $location, $cookieStore, constantUrl, $routeParams, $interval, $q, $filter) {
    $scope.fate = 1;
    var editor;
    var myClassId = $routeParams.id;
    $scope.$watch('$viewContentLoaded', function () {
      editor = ace.edit("editor");
      editor.$blockScrolling = Infinity;
      editor.setFontSize(16);
      editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
      });
      editor.setTheme("ace/theme/chrome");
      editor.getSession().setMode("ace/mode/python");
      $http.get(constantUrl + 'classs/' + $routeParams.id + '/', {
        headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
      })
        .success(function (data) {
          editor.setValue(data.code);
          $scope.name = data.class_name;
        })
        .error(function (err, sta) {
          console.log(err);
        });
    });
    $scope.openMask = function () {
      $('.complie-mask').fadeIn();
    };
    $scope.closeMask = function () {
      $('.complie-mask').fadeOut();
    };
    $scope.hisItem = {};
    $scope.modeTickOptions = false;
    $scope.modeBarOptions = false;
    $scope.getModeList = function (ty) {
      $http.get(constantUrl + "dates/", {
        params: {type: ty, date_type: 'data'},
        headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
      })
        .success(function (data) {
          $scope.hisItem.time = data;
        })
        .error(function (err, sta) {
          console.log(err);
          console.log(sta);
        });
      //complieService.getModeList(ty);
    };
    $scope.getBarList = function () {
      $scope.modeTickOptions = !$scope.modeBarOptions;
      if (!$scope.modeBarOptions) return;
      $scope.getModeList('bar');
      //complieService.getBarList();
    };
    $scope.getTickList = function () {
      $scope.modeBarOptions = !$scope.modeTickOptions;
      if (!$scope.modeTickOptions) return;
      $scope.getModeList('tick');
      //complieService.getTickList();
    };

    $scope.addHisStrategy = function () {
      //complieService.addHisStrategy();
      var files = $scope.files;
      var formdata = new FormData();
      if ($scope.modeBarOptions) {
        formdata.append('mode', 'bar');
      } else {
        formdata.append('mode', 'tick');
      }
      ;
      formdata.append('name', $scope.hisItem.name);
      formdata.append('start', $scope.hisItem.start);
      formdata.append('end', $scope.hisItem.end);
      formdata.append('class_id', myClassId);
      if (($scope.files != undefined) && ($scope.files != null)) {
        formdata.append('file', files);
      }
      ;
      function complieStep1() {
        var defer = $q.defer();
        $http.post(constantUrl + "btstrategys/", formdata, {
          transformRequest: angular.identity,
          headers: {
            'Content-Type': undefined,
            'Authorization': 'token ' + $cookieStore.get('user').token
          }
        })
          .success(function (data) {
            defer.resolve(data);
          })
          .error(function (err, st) {
            defer.reject(err);
          });
        return defer.promise;
      }

      complieStep1().then(function (data) {
        $('.complie-mask').fadeOut();
        var id = data._id;
        var mypromise = $interval(function () {
          $http.get(constantUrl + 'btstrategys/' + id + '/', {
            headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
          })
            .success(function (data) {

              console.log(data);
              if (data.status == '-2' || data.status == 2) {
                $interval.cancel(mypromise);
              }
              ;
              if (data.status == 2) {
                data.logs.push('push策略完成');
                $http.get(constantUrl + 'dates/', {
                  params: {
                    "date_type": 'transaction',
                    "sty_id": id
                  },
                  headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
                })
                  .success(function (data) {
                    console.log(data);
                    if (data != null) {
                      var mydate = $filter('date')(new Date((new Date(data[data.length - 1])).setDate((new Date(data[data.length - 1])).getDate() + 1)), 'yyyy-MM-dd');
                      $scope.getHisTime = function () {
                        var defer1 = $q.defer();
                        $http.get(constantUrl + 'transactions/', {
                          params: {
                            "sty_id": id,
                            "start": data[0],
                            "end": mydate
                          },
                          headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
                        })
                          .success(function (data) {
                            defer1.resolve(data);
                          })
                          .error(function (err, sta) {
                            defer1.reject(err);
                          });
                        return defer1.promise;
                      };
                      $scope.getHisTransTime = function () {
                        var defer2 = $q.defer();
                        $http.get(constantUrl + 'datas/', {
                          params: {
                            "type": 'bar',
                            "start": data[0],
                            "end": mydate
                          },
                          headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
                        })
                          .success(function (data) {
                            defer2.resolve(data);
                          })
                          .error(function (err, sta) {
                            defer2.reject(err);
                          });
                        return defer2.promise;
                      };
                      $scope.getHisTime().then(function (data) {
                        var chartData11 = data;
                        console.log(data);
                        $scope.getHisTransTime().then(function (data) {

                          var chartJsonData = data;
                          draws1();
                          function draws1() {
                            var chartData1 = [];
                            angular.forEach(chartData11, function (data, index) {
                              var hour = parseInt($filter("date")(data["datetime"], "yyyy-MM-dd HH:mm:ss").slice(11, 13));
                              var minute = parseInt($filter("date")(data["datetime"], "yyyy-MM-dd HH:mm:ss").slice(14, 16));
                              // if (hour<9||hour>15||(hour==15&&minute>30)) {
                              // }else{
                              // 	this.push(data);
                              // };
                              if (data['name'] == 'AG_real') {
                                if (hour < 6 || hour > 9) {
                                  this.push(data);
                                }
                              } else {
                                if (hour < 9 || hour > 15 || (hour == 15 && minute > 30)) {

                                } else {
                                  this.push(data);
                                }
                                ;
                              }
                              ;
                            }, chartData1);
                            var chartJsonDataArr = [];
                            var chartArr = [];
                            var indexShortArr = [];
                            var indexBuyArr = [];
                            var buySellNum = 0;
                            var buyYArr = [];
                            var shortYArr = [];
                            angular.forEach(chartData1, function (data, index) {
                              if (index == 0 && ((data.trans_type == "cover") || (data.trans_type == "sell")))
                                return;
                              if (index == chartData1.length - 1) return;
                              if ((data.trans_type == "cover") || (data.trans_type == "sell")) return;
                              if (data.trans_type == "short") {

                                outer:
                                  for (var i = 0; i < chartData1.length; i++) {
                                    if (chartData1[i].trans_type == "cover") {
                                      if (indexShortArr.length != 0) {
                                        inter:
                                          for (var j = 0; j < indexShortArr.length; j++) {
                                            if (indexShortArr[j] == i) {
                                              break inter;
                                            } else if ((j == indexShortArr.length - 1) && (indexShortArr[j] != i)) {
                                              buySellNum++;
                                              buyYArr.push({
                                                "short": "short",
                                                "text": '时间：' + $filter('date')(data.datetime, 'yyyy-MM-dd H:mm:ss') + '<br>成交价：￥' + data.price + '<br>成交量：' + data.volume,
                                                "volume": data.volume,
                                                "pos": data.pos,
                                                "price": data.price,
                                                "x": data.datetime,
                                                "name": data.name,
                                                "symbol": data.symbol,
                                                "title": data.trans_type + ' ' + buySellNum
                                              });
                                              var Earn;
                                              var y;
                                              if (data.name == 'AG_real') {
                                                Earn = Number((data.price - chartData1[i].price - 0.32 * 2).toFixed(2));
                                                y = Number((data.price - chartData1[i].price - 0.32 * 2).toFixed(2));
                                              } else {
                                                Earn = Number((data.price * (1 - 0.00003) - chartData1[i].price * (1 + 0.00003)).toFixed(2));
                                                y = Number((data.price * (1 - 0.00003) - chartData1[i].price * (1 + 0.00003)).toFixed(2));
                                              }
                                              ;
                                              chartArr.push({

                                                "x": chartData1[i].datetime,
                                                //"y":Number((data.price-chartData1[i].price).toFixed(2)),
                                                "y": y,
                                                "volume": data.volume,
                                                "direction": data.pos,
                                                //"Earn":Number((data.price-chartData1[i].price).toFixed(2)),
                                                "Earn": Earn,
                                                "openprice": data.price,
                                                "closeprice": chartData1[i].price,
                                                "opentime": data.datetime,
                                                "closetime": chartData1[i].datetime,
                                                "present": chartData1[i].price,
                                                "name": data.name,
                                                "symbol": data.symbol
                                              });

                                              buyYArr.push({
                                                "short": "short",
                                                "text": '时间：' + $filter('date')(chartData1[i].datetime, 'yyyy-MM-dd H:mm:ss') + '<br>成交价：￥' + chartData1[i].price
                                                + '<br>成交量：' + chartData1[i].volume,
                                                "volume": chartData1[i].volume,
                                                "pos": chartData1[i].pos,
                                                "price": chartData1[i].price,
                                                "x": chartData1[i].datetime,
                                                "name": chartData1[i].name,
                                                "symbol": chartData1[i].symbol,
                                                "title": chartData1[i].trans_type + ' ' + buySellNum
                                              });
                                              indexShortArr.push(i);
                                              break outer;
                                            }
                                            ;
                                          }
                                        ;
                                      } else {
                                        buySellNum++;
                                        buyYArr.push({
                                          "short": "short",
                                          "text": '时间：' + $filter('date')(data.datetime, 'yyyy-MM-dd H:mm:ss') + '<br>成交价：￥' + data.price + '<br>成交量：' + data.volume,
                                          "volume": data.volume,
                                          "pos": data.pos,
                                          "price": data.price,
                                          "x": data.datetime,
                                          "name": data.name,
                                          "symbol": data.symbol,
                                          "title": data.trans_type + ' ' + buySellNum
                                        });
                                        var Earn;
                                        var y;
                                        if (data.name == 'AG_real') {
                                          Earn = Number((data.price - chartData1[i].price - 0.32 * 2).toFixed(2));
                                          y = Number((data.price - chartData1[i].price - 0.32 * 2).toFixed(2));
                                        } else {
                                          Earn = Number((data.price * (1 - 0.00003) - chartData1[i].price * (1 + 0.00003)).toFixed(2));
                                          y = Number((data.price * (1 - 0.00003) - chartData1[i].price * (1 + 0.00003)).toFixed(2));
                                        }
                                        ;
                                        chartArr.push({

                                          "x": chartData1[i].datetime,
                                          //"y":Number((data.price-chartData1[i].price).toFixed(2)),
                                          "y": y,
                                          "volume": data.volume,
                                          "direction": -1,
                                          //"Earn":Number((data.price-chartData1[i].price).toFixed(2)),
                                          "Earn": Earn,
                                          "openprice": data.price,
                                          "closeprice": chartData1[i].price,
                                          "opentime": data.datetime,
                                          "closetime": chartData1[i].datetime,
                                          "present": chartData1[i].price,
                                          "name": data.name,
                                          "symbol": data.symbol
                                        });
                                        buyYArr.push({
                                          "short": "short",
                                          "text": '时间：' + $filter('date')(chartData1[i].datetime, 'yyyy-MM-dd H:mm:ss') + '<br>成交价：￥' + chartData1[i].price + '<br>成交量：' + chartData1[i].volume,
                                          "volume": chartData1[i].volume,
                                          "pos": chartData1[i].pos,
                                          "price": chartData1[i].price,
                                          "x": chartData1[i].datetime,
                                          "name": chartData1[i].name,
                                          "symbol": chartData1[i].symbol,
                                          "title": chartData1[i].trans_type + ' ' + buySellNum
                                        });
                                        indexShortArr.push(i);
                                        break outer;
                                      }
                                      ;
                                    }
                                    ;
                                  }
                                ;
                              }
                              ;
                              if (data.trans_type == "buy") {

                                outer1:
                                  for (var i = 0; i < chartData1.length; i++) {
                                    if (chartData1[i].trans_type == "sell") {
                                      if (indexShortArr.length != 0) {
                                        inter1:
                                          for (var j = 0; j < indexShortArr.length; j++) {
                                            if (indexShortArr[j] == i) {
                                              break inter1;
                                            } else if ((j == indexShortArr.length - 1) && (indexShortArr[j] != i)) {
                                              buySellNum++;
                                              shortYArr.push({
                                                "buy": 'buy',
                                                "text": '时间：' + $filter('date')(data.datetime, 'yyyy-MM-dd H:mm:ss') + '<br>成交价：￥' + data.price + '<br>成交量：' + data.volume,
                                                "volume": data.volume,
                                                "pos": data.pos,
                                                "price": data.price,
                                                "x": data.datetime,
                                                "name": data.name,
                                                "symbol": data.symbol,
                                                "title": data.trans_type + ' ' + buySellNum
                                              });
                                              var Earn;
                                              var y;
                                              if (data.name == 'AG_real') {
                                                Earn = Number((chartData1[i].price - data.price - 0.32 * 2).toFixed(2));
                                                y = Number((chartData1[i].price - data.price - 0.32 * 2).toFixed(2));
                                              } else {
                                                Earn = Number((chartData1[i].price * (1 - 0.00003) - data.price * (1 + 0.00003)).toFixed(2));
                                                y = Number((chartData1[i].price * (1 - 0.00003) - data.price * (1 + 0.00003)).toFixed(2));
                                              }
                                              ;
                                              chartArr.push({

                                                "x": chartData1[i].datetime,
                                                //"y":Number((chartData1[i].price-data.price).toFixed(2)),
                                                "y": y,
                                                "volume": data.volume,
                                                "direction": 1,
                                                //"Earn":Number((chartData1[i].price-data.price).toFixed(2)),
                                                "Earn": Earn,
                                                "openprice": data.price,
                                                "closeprice": chartData1[i].price,
                                                "opentime": data.datetime,
                                                "closetime": chartData1[i].datetime,
                                                "present": chartData1[i].price,
                                                "name": data.name,
                                                "symbol": data.symbol
                                              });
                                              shortYArr.push({
                                                "buy": 'buy',
                                                "text": '时间：' + $filter('date')(chartData1[i].datetime, 'yyyy-MM-dd H:mm:ss') + '<br>成交价：￥' + chartData1[i].price + '<br>成交量：' + chartData1[i].volume,
                                                "volume": chartData1[i].volume,
                                                "pos": chartData1[i].pos,
                                                "price": chartData1[i].price,
                                                "x": chartData1[i].datetime,
                                                "name": chartData1[i].name,
                                                "symbol": chartData1[i].symbol,
                                                "title": chartData1[i].trans_type + ' ' + buySellNum
                                              });
                                              indexShortArr.push(i);
                                              break outer1;
                                            }
                                            ;
                                          }
                                        ;
                                      } else {
                                        buySellNum++;
                                        shortYArr.push({
                                          "buy": 'buy',
                                          "text": '时间：' + $filter('date')(data.datetime, 'yyyy-MM-dd H:mm:ss') + '<br>成交价：￥' + data.price + '<br>成交量：' + data.volume,
                                          "volume": data.volume,
                                          "pos": data.pos,
                                          "price": data.price,
                                          "x": data.datetime,
                                          "name": data.name,
                                          "symbol": data.symbol,
                                          "title": data.trans_type + ' ' + buySellNum
                                        });
                                        var Earn;
                                        var y;
                                        if (data.name == 'AG_real') {
                                          Earn = Number((chartData1[i].price - data.price - 0.32 * 2).toFixed(2));
                                          y = Number((chartData1[i].price - data.price - 0.32 * 2).toFixed(2));
                                        } else {
                                          Earn = Number((chartData1[i].price * (1 - 0.00003) - data.price * (1 + 0.00003)).toFixed(2));
                                          y = Number((chartData1[i].price * (1 - 0.00003) - data.price * (1 + 0.00003)).toFixed(2));
                                        }
                                        ;
                                        chartArr.push({

                                          "x": chartData1[i].datetime,
                                          //"y":Number((chartData1[i].price-data.price).toFixed(2)),
                                          "y": y,
                                          "volume": data.volume,
                                          "direction": data.pos,
                                          //"Earn":Number((chartData1[i].price-data.price).toFixed(2)),
                                          "Earn": Earn,
                                          "openprice": data.price,
                                          "closeprice": chartData1[i].price,
                                          "opentime": data.datetime,
                                          "closetime": chartData1[i].datetime,
                                          "present": chartData1[i].price,
                                          "name": data.name,
                                          "symbol": data.symbol
                                        });
                                        shortYArr.push({
                                          "buy": 'buy',
                                          "text": '时间：' + $filter('date')(chartData1[i].datetime, 'yyyy-MM-dd H:mm:ss') + '<br>成交价：￥' + chartData1[i].price + '<br>成交量：' + chartData1[i].volume,
                                          "volume": chartData1[i].volume,
                                          "pos": chartData1[i].pos,
                                          "price": chartData1[i].price,
                                          "x": chartData1[i].datetime,
                                          "name": chartData1[i].name,
                                          "symbol": chartData1[i].symbol,
                                          "title": chartData1[i].trans_type + ' ' + buySellNum
                                        });
                                        indexShortArr.push(i);
                                        break outer1;
                                      }
                                      ;
                                    }
                                    ;
                                  }
                                ;
                              }
                              ;
                            });

                            shortYArr = $filter('orderBy')(shortYArr, 'x');
                            buyYArr = $filter('orderBy')(buyYArr, 'x');
                            chartArr = $filter('orderBy')(chartArr, 'x');
                            var wealth = [];
                            var buy = [];
                            var tradeItem = [];
                            var direction;
                            var amount = 0;
                            var total = 0;
                            var winrate;
                            var totalWinrate = 0;
                            var totalProfit = 0;
                            var totalRate1 = 0;
                            var totalRate2 = 0;
                            var totalRate3 = 0;
                            var totalRate4 = [];
                            var yeildAbs;
                            var totalpal = 0;
                            var allTotalpal = 0;
                            var allTotalyeild = 0;
                            var allTotalTime = 0;//总持仓时间r
                            var averTotalTime = 0;//平均持仓时间
                            var errorYeild = 0;//跟踪误差年化波动率
                            var prof = 0;
                            var loss = 0;
                            var yeildArrs = [];

                            var delNum = [];
                            angular.forEach(chartArr, function (data, index) {
                              if (data['openprice'] == 0 || data['closeprice'] == 0) {
                                delNum.push(index);
                              }
                              ;
                            });
                            angular.forEach(delNum, function (data, index) {
                              chartArr.splice(data, 1);
                            });
                            Highcharts.setOptions({
                              global: {
                                useUTC: false
                              }
                            });

                            angular.forEach(chartJsonData, function (data, index) {
                              chartJsonDataArr.push({
                                "x": data.datetime,
                                "y": data.close,
                                'low': data.low,
                                'high': data.high,
                                'close': data.close,
                                'open': data.open,
                                'volume': data.volume
                              });
                            });
                            chartJsonDataArr = $filter('orderBy')(chartJsonDataArr, 'x');
                            $('#complie-highcharts').highcharts('StockChart', {
                              credits: {
                                enabled: false
                              },
                              exporting: {
                                enabled: false
                              },
                              plotOptions: {
                                series: {
                                  turboThreshold: 0
                                }
                              },
                              /*tooltip : {
                               shared : true,
                               useHTML : true,
                               valueDecimals : 2 ,
                               backgroundColor: 'white',
                               borderWidth: 0,
                               borderRadius: 0,
                               formatter : function() {

                               var s;
                               if(this.points[0].point.high){
                               $scope.highstockAnalysetime=$filter('date')(this.x,'yyyy-MM-dd H:mm:ss');
                               $scope.highstockAnalysehigh=$filter('number')(this.points[0].point.high,2);
                               $scope.highstockAnalyselow=$filter('number')(this.points[0].point.low,2);
                               $scope.highstockAnalyseopen=$filter('number')(this.points[0].point.open,2);
                               $scope.highstockAnalyseclose=$filter('number')(this.points[0].point.close,2);
                               $scope.$apply();
                               }
                               if(this.points[0].point.direction&&this.point.text){
                               s=this.point.text;
                               }else if(this.points[0].point.direction&&!this.point){
                               var dir=(this.points[0].point.direction>0)?'看多':'看空';
                               s = Highcharts.dateFormat('<span>%Y-%m-%d %H:%M:%S</span>',this.x);
                               s+= '<br />volume：<b class="red">'
                               +Highcharts.numberFormat(this.points[0].point.volume,2)
                               +'</b><br />Earn：<b class="font-black">￥'
                               +Highcharts.numberFormat(this.points[0].point.Earn,2)
                               + '</b><br />openprice：<b class="font-black">￥'
                               +Highcharts.numberFormat(this.points[0].point.openprice,2)
                               + '</b><br />closeprice<b class="font-black">￥'
                               +Highcharts.numberFormat(this.points[0].point.closeprice,2)
                               + '</b><br />direction：<b class="font-black">'
                               +dir;
                               }
                               return s;*/
                              /*var s = Highcharts.dateFormat('<span>%Y-%m-%d %H:%M:%S</span>',this.x);
                               s += '<br />high：<b class="red">￥'
                               +Highcharts.numberFormat(this.points[0].point.high,2)
                               +'</b>&nbsp;&nbsp;|&nbsp;&nbsp;low：<b class="blue">￥'
                               +Highcharts.numberFormat(this.points[0].point.low,2)
                               + '</b>&nbsp;&nbsp;|&nbsp;&nbsp;close：<b class="green">￥'
                               +Highcharts.numberFormat(this.points[0].point.close,2)
                               + '</b>&nbsp;&nbsp;|&nbsp;&nbsp;open：<b class="font-black">￥'
                               +Highcharts.numberFormat(this.points[0].point.open,2)
                               + '</b>&nbsp;&nbsp;|&nbsp;&nbsp;volume：<b class="orange">'
                               +Highcharts.numberFormat(this.points[0].point.volume,2)+'笔';
                               return s;
                               },
                               positioner: function () {
                               return { x: 0, y: 20 };
                               },
                               shadow: false
                               },*/
                              tooltip: {
                                useHTML: true,
                                xDateFormat: "%Y-%m-%d %H:%M:%S",
                                valueDecimals: 2
                              },
                              legend: {
                                enabled: true,
                                align: 'right',
                                verticalAlign: 'top',
                                x: 0,
                                y: 0
                              },
                              rangeSelector: {
                                buttons: [
                                  {
                                    type: 'minute',
                                    count: 10,
                                    text: '10m'
                                  }, {
                                    type: 'minute',
                                    count: 30,
                                    text: '30m'
                                  }, {
                                    type: 'hour',
                                    count: 1,
                                    text: '1h'
                                  }, {
                                    type: 'day',
                                    count: 1,
                                    text: '1d'
                                  }, {
                                    type: 'week',
                                    count: 1,
                                    text: '1w'
                                  }, {
                                    type: 'all',
                                    text: '所有'
                                  }],
                                selected: 5,
                                buttonSpacing: 2

                              },
                              yAxis: [{
                                labels: {
                                  align: 'right',
                                  x: -3
                                },
                                title: {
                                  text: '股价'
                                },
                                lineWidth: 1,
                                height: '60%'
                              }, {
                                labels: {
                                  align: 'right',
                                  x: -3
                                },
                                title: {
                                  text: '盈亏'
                                },
                                opposite: true,
                                offset: 0,
                                height: '35%',
                                top: '65%'
                              }],
                              series: [{
                                type: 'line',
                                name: '股价',
                                data: chartJsonDataArr,
                                lineWidth: 2,
                                id: 'dataseries'
                              }, {
                                type: 'flags',
                                data: shortYArr,
                                onSeries: "dataseries",
                                shape: 'squarepin',
                                width: 36,
                                color: "#4169e1",
                                fillColor: 'transparent',
                                style: {
                                  color: '#333'
                                },
                                y: -40,
                                name: '看多',
                              }, {
                                type: 'flags',
                                data: buyYArr,
                                onSeries: "dataseries",
                                shape: 'squarepin',
                                width: 36,
                                color: '#ff9912',
                                fillColor: 'transparent',
                                style: {
                                  color: '#333'
                                },
                                y: 20,
                                name: '看空',
                              }, {
                                type: 'column',
                                data: chartArr,
                                name: '盈亏',
                                /*lineWidth:2,*/
                                yAxis: 1,
                                threshold: 0,
                                negativeColor: 'green',
                                color: 'red'
                                /*color:'#e3170d',*/
                                /*marker:{
                                 enabled:true,
                                 symbol:'circle',
                                 fillColor:'#0b1746',
                                 radius:5
                                 }*/
                              }]
                            });
                          };
                        });
                      }, function (err, sta) {
                        Showbo.Msg.alert('没有交易数据');
                      });
                    }
                    ;
                  })
                  .error(function (err, sta) {
                    if (sta == 400) {
                      Showbo.Msg.alert('没有交易数据');
                    }
                    ;
                  });


              }
              ;
              $scope.logs = data.logs;
              $scope.errors = data.error;
            })
            .error(function (err) {
              console.log(err);
            });
        }, 500);
      }, function (err) {
        Showbo.Msg.alert(err.error);
        $('.complie-mask').fadeOut();
      });
    };
    $scope.addNew = function () {
      var postInfo = 'class_name=' + encodeURIComponent($scope.name) + '&code=' + encodeURIComponent(editor.getValue());
      $http.post(constantUrl + "classs/", postInfo, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'token ' + $cookieStore.get('user').token
        }
      })
        .success(function (data) {
          Showbo.Msg.alert('添加成功,可以运行回测。');
          myClassId = data._id;
        })
        .error(function (err, st) {
          Showbo.Msg.alert(err);
        });
    };
  }])
  .controller('modalResController', ['$scope', '$rootScope', '$http', '$location', '$cookies', '$cookieStore', 'constantUrl', 'modalResObjList1', 'modalResObjList2', 'modalResObjList3', 'modalResObjList4', 'storageModalRes', 'getModalResList', 'modalResObjItems', function ($scope, $rootScope, $http, $location, $cookies, $cookieStore, constantUrl, modalResObjList1, modalResObjList2, modalResObjList3, modalResObjList4, storageModalRes, getModalResList, modalResObjItems) {
    $scope.modalResObjItem = modalResObjItems;
    $scope.username = $cookieStore.get('user').username;
    $scope.getObj = function () {
      getModalResList.getList('model_objects').then(function (data) {
        modalResObjList1 = [];
        angular.forEach(data, function (data, index) {
          angular.extend(data, {"classify": 'model_objects'});
          this.push(data);
        }, modalResObjList1);
        $scope.modalResObjList1 = modalResObjList1;
      });
    };

    $scope.getMet = function () {
      getModalResList.getList('model_methods').then(function (data) {
        modalResObjList2 = [];
        angular.forEach(data, function (data, index) {
          angular.extend(data, {"classify": 'model_methods'});
          this.push(data);
        }, modalResObjList2);
        $scope.modalResObjList2 = modalResObjList2;
      });
    };
    $scope.getExa = function () {
      getModalResList.getList('model_examples').then(function (data) {
        modalResObjList3 = [];
        angular.forEach(data, function (data, index) {
          angular.extend(data, {"classify": 'model_examples'});
          this.push(data);
        }, modalResObjList3);
        $scope.modalResObjList3 = modalResObjList3;
      });
    };
    $scope.getObj();
    $scope.getExa();
    $scope.getMet();
    /*storageModalRes.storage(str1);*/

    $scope.modalResObj = {
      title: '',
      content: ''
    };
    $scope.modalResExa = {
      title: '',
      content: ''
    };
    $scope.modalResMet = {
      title: '',
      content: ''
    };
    $scope.openModalResObj = function () {
      $('.modalRes-mask-obj').fadeIn();
      $scope.modalResObj = {
        title: '',
        content: ''
      };
    };
    $scope.openModalResMet = function () {
      $('.modalRes-mask-met').fadeIn();
      $scope.modalResMet = {
        title: '',
        content: '',
        code: ''
      };
    };
    $scope.openModalResExa = function () {
      $('.modalRes-mask-exa').fadeIn();
      $scope.modalResExa = {
        title: '',
        content: '',
        code: ''
      };
    };
    $scope.closeMask = function () {
      $('.modalRes-mask').fadeOut();
    };

    $scope.addModalResObj = function () {
      var str = "title=" + encodeURIComponent($scope.modalResObj.title) + "&content=" + encodeURIComponent($scope.modalResObj.content);
      getModalResList.addItem(str, 'model_objects').then(function () {
        $scope.getObj();
        $scope.closeMask();
      }, function (err) {
        console.log(err);
      });
    };
    $scope.addModalResMet = function () {
      var str = "title=" + encodeURIComponent($scope.modalResMet.title) + "&content=" + encodeURIComponent($scope.modalResMet.content) + '&code=' + encodeURIComponent($scope.modalResMet.code);
      getModalResList.addItem(str, 'model_methods').then(function () {
        $scope.getMet();
        $scope.closeMask();
      }, function (err) {
        console.log(err);
      });
    };
    $scope.addModalResExa = function () {
      var str = "title=" + encodeURIComponent($scope.modalResExa.title) + "&content=" + encodeURIComponent($scope.modalResExa.content) + '&code=' + encodeURIComponent($scope.modalResExa.code);
      getModalResList.addItem(str, 'model_examples').then(function () {
        $scope.getExa();
        $scope.closeMask();
      }, function (err) {
        console.log(err);
      });
    };
    /*$scope.revModalResObj=function(x){
     var url=x.classify+'/'+x._id
     if(x.code){
     var str='title='+$scope.mydata.title+'content='+$scope.mydata.content+'code'+$scope.mydata.code
     }
     console.log($scope.mydata);
     }*/
  }])
  .controller('modalResItemController', ['$scope', '$rootScope', '$http', '$location', '$cookies', '$cookieStore', 'constantUrl', '$routeParams', 'modalResObjList1', 'modalResObjList2', 'modalResObjList3', 'modalResObjList4', 'storageModalRes', 'getModalResList', function ($scope, $rootScope, $http, $location, $cookies, $cookieStore, constantUrl, $routeParams, modalResObjList1, modalResObjList2, modalResObjList3, modalResObjList4, storageModalRes, getModalResList) {
    /\/(\w*)\/(\w*)/i.exec($location.url());
    var id = RegExp.$2;
    var str = RegExp.$1;
    var url = str + '/' + id;
    getModalResList.getList(url).then(function (data) {
      $scope.mydata = data;
      /*$scope.hash=$scope.mydata._id;*/
    });
    /*switch(str){
     case 'study_object':
     $scope.title=storageModalRes.data[$routeParams.id]["name"];
     break;
     case 'study_method':
     $scope.title=modalResObjList2[$routeParams.id]["name"];
     break;
     case 'study_case':
     $scope.title=modalResObjList3[$routeParams.id]["name"];
     break;
     case 'study_data':
     $scope.title=modalResObjList4[$routeParams.id]["name"];
     break;
     }
     console.log(modalResObjList1);*/
  }])
  .factory('storageModalRes', function () {
    return {
      data: [],
      storage: function (x) {
        this.data = x;
      }
    };
  })

  .factory('getModalResList', ['$q', '$http', 'constantUrl', '$cookieStore', function ($q, $http, constantUrl, $cookieStore) {
    return {
      getList: function (url) {
        var defer = $q.defer();
        $http.get(constantUrl + url + '/', {
          headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
        })
          .success(function (data) {
            defer.resolve(data);
          })
          .error(function (err, sta) {
            defer.reject(err);
          });
        return defer.promise;
      },
      addItem: function (obj, url) {
        var defer = $q.defer();
        $http.post(constantUrl + url + '/', obj, {
          headers: {
            'Authorization': 'token ' + $cookieStore.get('user').token,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .success(function (data) {
            defer.resolve(data);
          })
          .error(function (err, sta) {
            defer.reject(err);
          });
        return defer.promise;
      },
      reviseItem: function (obj, url) {
        var defer = $q.defer();
        $http.patch(constantUrl + url + '/', obj, {
          headers: {
            'Authorization': 'token ' + $cookieStore.get('user').token,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .success(function (data) {
            defer.resolve(data);
          })
          .error(function (err, sta) {
            defer.reject(err);
          });
        return defer.promise;
      },
      del: function (url) {
        var defer = $q.defer();
        $http.delete(constantUrl + url + '/', {
          headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
        })
          .success(function (data) {
            defer.resolve(data);
          })
          .error(function (err, sta) {
            defer.reject(err);
          });
        return defer.promise;
      }
    };
  }])
  .directive('slideupDown', function () {
    return {
      restrict: 'AE',
      link: function (scope, ele, attr) {
        ele.on('click', 'p', function () {
          ele.nextAll().slideToggle();
        })
      }
    };
  })
  .directive('fileModel', ['$parse', function ($parse) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function () {
          scope.$apply(function () {
            modelSetter(scope, element[0].files[0]);
          });

        });
      }
    };
  }])
  .directive('ensureNameunique', ['$http', 'constantUrl', function ($http, constantUrl) {
    return {
      require: 'ngModel',
      link: function (scope, ele, attrs, ngModelCtrl) {

        ngModelCtrl.$parsers.push(function (val) {

          if (!val) {
            return;
          }
          ;
          $http({
            method: 'get',
            url: constantUrl + 'users/' + val + '/'
          }).success(function (data, sta) {
            if (sta == 200) {
              ngModelCtrl.$setValidity('usernameAvi', false);
            }
          }).error(function (err, sta) {
            if (sta == 404) {
              ngModelCtrl.$setValidity('usernameAvi', true);
            }
          });
          return val;
        });
      }
    };
  }])
  .directive('slideToggle', function () {
    return {
      link: function (scope, ele, attrs) {
        ele.on('click', function () {
          ele.nextAll().slideToggle();
        });
      }
    };
  })
  .directive('sourcingTable', ['$route', '$location', '$http', 'constantUrl', '$cookieStore', 'strategysValue', function ($route, $location, $http, constantUrl, $cookieStore, strategysValue) {
    return {
      link: function (scope, ele, attrs) {
        ele.on('click', '.firm-add', function () {
          $('.firm-mask').fadeIn();

          strategysValue.id = $(this).closest('tr').children().eq(0).text();
          strategysValue.author = $(this).closest('tr').children().eq(3).text();
          //console.log(strategysValue);
        });
        ele.on('click', '.his-add', function () {
          $('.his-mask').fadeIn();

          strategysValue.id = $(this).closest('tr').children().eq(0).text();
          //console.log(strategysValue);
        });
        ele.on('click', '.sour-del', function () {
          var a = confirm('确认删除吗');
          if (!a) return;
          var url = $(this).closest('tr').children().eq(0).text();
          $http.delete(constantUrl + "classs/" + url + '/', {
            headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
          })
            .success(function () {
              /*$route.reload();*/
              scope.getSourcingStrategys();
              /*Showbo.Msg.alert('删除成功。')*/
            })
            .error(function (err, sta) {
              Showbo.Msg.alert('删除失败，请稍后再试。')
            });

        });
      }
    };
  }])
  .directive('adminTable', ['$route', '$location', '$http', 'constantUrl', '$cookieStore', 'strategysValue', function ($route, $location, $http, constantUrl, $cookieStore, strategysValue) {
    return {
      link: function (scope, ele, attrs) {
        ele.on('click', '.user-pro', function () {
          console.log($(this).closest('tr').children().eq(2).text());
          if ($(this).closest('tr').children().eq(2).text() == 'true') {
            Showbo.Msg.alert('该用户已经获得权限。')
          } else {
            var name = $(this).closest('tr').children().eq(0).text();
            $http.patch(constantUrl + 'users/' + name + '/', {zijin: '1'}, {
              headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
            })
              .success(function (data) {
                scope.getAllUsers();
              });
          }
          ;
        });
        ele.on('click', '.user-min', function () {
          if (!$(this).closest('tr').children().eq(2).text()) {
            Showbo.Msg.alert('该用户权限已经被收回。')
          } else {
            var name = $(this).closest('tr').children().eq(0).text();
            $http.patch(constantUrl + 'users/' + name + '/', {zijin: '0'}, {
              headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
            })
              .success(function (data) {
                scope.getAllUsers();
              });
          }
          ;
        });
        ele.on('click', '.user-del', function () {
          var a = confirm('确认删除该用户吗？');
          if (a) {
            var name = $(this).closest('tr').children().eq(0).text();
            $http.delete(constantUrl + 'users/' + name + '/', {
              headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
            })
              .success(function (data) {
                scope.getAllUsers();
              });
          }
          ;
        });
      }
    };
  }])
  .directive('strategyTable', ['$route', '$location', '$http', 'constantUrl', '$cookieStore', function ($route, $location, $http, constantUrl, $cookieStore) {
    return {
      link: function (scope, ele, attrs) {
        /*ele.on('click','.strategy-ini',function(){
         $(this).closest('tr').children().eq(1).text();
         var url=$(this).closest('tr').children().eq(0).text();
         $http.patch(constantUrl+"strategys/"+url+'/',{status:0},{
         headers:{'Authorization':'token '+$cookieStore.get('user').token}
         })
         .success(function(){
         $route.reload();
         Showbo.Msg.alert('初始化成功。')
         })
         .error(function(err,sta){
         Showbo.Msg.alert('初始化失败，请稍后再试。')
         });
         });*/
        ele.on('click', '.strategy-start', function () {
          var url = $(this).closest('tr').children().eq(0).text();
          $http.patch(constantUrl + "strategys/" + url + '/', {status: 1}, {
            headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
          })
            .success(function () {
              /*$route.reload();*/
              scope.getFirmStrategys();

            })
            .error(function (err, sta) {
              Showbo.Msg.alert('启动失败，请稍后再试。')
            });
        });
        ele.on('click', '.strategy-pause', function () {
          var url = $(this).closest('tr').children().eq(0).text();
          $http.patch(constantUrl + "strategys/" + url + '/', {status: 2}, {
            headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
          })
            .success(function () {
              /*$route.reload();*/
              scope.getFirmStrategys();

            })
            .error(function (err, sta) {
              Showbo.Msg.alert('暂停失败，请稍后再试。')
            });
        });
        ele.on('click', '.strategy-del', function () {
          var a = confirm('确认删除吗');
          if (!a) return;
          var url = $(this).closest('tr').children().eq(0).text();
          $http.delete(constantUrl + "strategys/" + url + '/', {
            headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
          })
            .success(function () {
              /*$route.reload();*/
              scope.allStrategys = [];
              scope.getFirmStrategys();
              scope.getHisStrategys();
              /*Showbo.Msg.alert('删除成功。')*/
            })
            .error(function (err, sta) {
              console.log(err, sta);
              if (sta == 400) {
                $http.delete(constantUrl + "btstrategys/" + url + '/', {
                  headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
                })
                  .success(function () {
                    /*$route.reload();*/
                    scope.allStrategys = [];
                    scope.getFirmStrategys();
                    scope.getHisStrategys();
                    /*Showbo.Msg.alert('删除成功。')*/
                  })
                  .error(function (err, sta) {
                    Showbo.Msg.alert('删除失败，请稍后再试。')
                  });
              }
              ;
            });
        })
      }
    }
  }])
  .directive('hisTable', ['$route', '$location', '$http', 'constantUrl', '$cookieStore', function ($route, $location, $http, constantUrl, $cookieStore) {
    return {
      link: function (scope, ele, attrs) {
        ele.on('click', '.strategy-pause', function () {
          var url = $(this).closest('tr').children().eq(0).text();
          $http.patch(constantUrl + "btstrategys/" + url + '/', {status: 2}, {
            headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
          })
            .success(function () {
              scope.getHisStrategys();

            })
            .error(function (err, sta) {
              Showbo.Msg.alert('暂停失败，请稍后再试。')
            });
        });
        ele.on('click', '.strategy-del', function () {
          var a = confirm('确认删除吗');
          if (!a) return;
          var url = $(this).closest('tr').children().eq(0).text();
          $http.delete(constantUrl + "btstrategys/" + url + '/', {
            headers: {'Authorization': 'token ' + $cookieStore.get('user').token}
          })
            .success(function () {
              /*$route.reload();*/
              scope.getHisStrategys();
              /*Showbo.Msg.alert('删除成功。')*/
            })
            .error(function (err, sta) {
              Showbo.Msg.alert('删除失败，请稍后再试。')
            });
        })
      }
    }
  }])
  .directive('tooltip', function () {
    return {
      link: function (scope, ele, attrs) {
        $("[data-toggle='tooltip']").tooltip();
      }
    };
  })
  .directive('moveBox', function () {
    return {
      link: function (scope, ele, attrs) {
        ele.on('mouseenter', 'a', function () {
          var num = $(this).parent().index();
          var dist = ele.children('li').width();
          var dis = (num + 0.1) * dist + 'px';
          $('#move-box').stop(true);
          $('#move-box').addClass('infinite');
          $('#move-box').animate({
            left: dis
          }, 500, 'easeOutExpo', function () {
            $('#move-box').removeClass('infinite');
          });
        })
        /*ele.on('mouseenter',function(){
         $('#move-box').fadeIn(10);
         })
         ele.on('mouseleave',function(){
         $('#move-box').fadeOut(20);
         })*/
      }
    }
  })
  .directive('mouseShow', function ($timeout) {
    return {
      link: function (scope, ele, attrs) {
        ele.on('mouseenter', function (ev) {
          ele.children('.list-group').show();
          ev.stopPropagation();
        });
        ele.on('mouseleave', function (ev) {
          $timeout(function () {
            ele.children('.list-group').hide();
          }, 1000);
          ev.stopPropagation();
        });
      }
    };
  })
  .directive('newName', function () {
    return {
      link: function (scope, ele, attrs) {
        ele.on('click', function () {
          $(this).hide();
          ele.siblings('input').slideDown(function () {
            ele.siblings('input').focus();
          });
        });
        ele.siblings('input').on('blur', function () {
          ele.show();
          ele.siblings('input').hide();
        });
      }
    };
  })
  .directive('box', ['$http', 'constantUrl', '$cookieStore', 'modalResObjItems', 'getModalResList', function ($http, constantUrl, $cookieStore, modalResObjItems, getModalResList) {
    return {
      restrict: 'E',
      replace: 'true',
      scope: {
        mydata: '=',
        username: '=',
        revModalResObj: '&',
        closeMask: '&'
      },
      templateUrl: 'tpls/modalResTemp.html',
      link: function (scope, ele, attr) {
        ele.on('mouseenter mouseover mouseout', function (ev) {
          if (ev.type == 'mouseenter' || ev.type == 'mouseover') {
            ele.find('.modalRes-box-wrapper').addClass('transformY5');
            ele.find('.modalRes-box-top').addClass('w100');
            ele.find('.modalRes-box-right').addClass('h100');
            ele.find('.modalRes-box-bottom').addClass('w100');
            ele.find('.modalRes-box-left').addClass('h100');
          } else if (ev.type == 'mouseout') {
            ele.find('.modalRes-box-wrapper').removeClass('transformY5');
            ele.find('.modalRes-box-top').removeClass('w100');
            ele.find('.modalRes-box-right').removeClass('h100');
            ele.find('.modalRes-box-bottom').removeClass('w100');
            ele.find('.modalRes-box-left').removeClass('h100');
          }
          ;
          ev.stopPropagation();
        });
        ele.on('click', '.modalRes-box-plus', function () {
          ele.find('.modalRes-mask-objItem').fadeIn();
        });
        ele.on('click', '.modalRes-box-del', function () {
          var a = confirm('确认删除吗！');
          if (a) {
            var url = scope.mydata.classify + '/' + scope.mydata._id;
            getModalResList.del(url).then(function () {
              ele.remove()
            });
          }
          ;
        });
        ele.on('click', '.btn-success', function () {
          var url = scope.mydata.classify + '/' + scope.mydata._id;
          if (scope.mydata.classify == 'model_objects') {
            var str = 'title=' + encodeURIComponent(scope.mydata.title) + '&content=' + encodeURIComponent(scope.mydata.content);
            getModalResList.reviseItem(str, url).then(function () {
              ele.find('.modalRes-mask-objItem').fadeOut();
            });
          } else {
            var str = 'title=' + encodeURIComponent(scope.mydata.title) + '&content=' + encodeURIComponent(scope.mydata.content) + '&code=' + encodeURIComponent(scope.mydata.code);
            getModalResList.reviseItem(str, url).then(function () {
              ele.find('.modalRes-mask-objItem').fadeOut();
            });
          }
          ;
        });
        ele.on('click', '.btn-warning', function () {
          var url = scope.mydata.classify + '/' + scope.mydata._id;
          var str = scope.mydata.classify;
          getModalResList.getList(url).then(function (data) {
            scope.mydata = data;
            angular.extend(scope.mydata, {"classify": str});
            console.log(scope.mydata);
          });
        });
      }
    }
  }])
  .directive('mobileAction', function () {
    return {
      link: function (scope, ele, attrs) {
        ele.on('click', function () {
          console.log(ele.parent().css('left'));
          if (ele.parent().css('left') == '0px') {
            ele.parent().removeClass('l0');
          } else if (ele.parent().css('left') == '-210px') {
            ele.parent().addClass('l0');
          }
          ;
        });
      }
    }
  })
  .directive('jspdfAction', ['$http', '$location', function ($http, $location) {
    return {
      link: function (scope, ele, attr) {
        ele.on('click', function () {
          $('.printform').show();
          /*var getImageFromUrl = function(url, callback) {
           var img = new Image, data, ret={data: null, pending: true};

           img.onError = function() {
           throw new Error('Cannot load image: "'+url+'"');
           }
           img.onload = function() {
           var canvas = document.createElement('canvas');
           document.body.appendChild(canvas);
           canvas.width = img.width;
           canvas.height = img.height;

           var ctx = canvas.getContext('2d');
           ctx.drawImage(img, 0, 0);
           data = canvas.toDataURL('image/jpeg').slice('data:image/jpeg;base64,'.length);
           data = atob(data)
           document.body.removeChild(canvas);

           ret['data'] = data;
           ret['pending'] = false;
           if (typeof callback === 'function') {
           callback(data);
           }
           }
           img.src = url;

           return ret;
           }
           var options = {
           pagesplit: true
           };
           var createPDF = function(imgData) {
           var doc = new jsPDF('p','pt',[1920,10000]);
           doc.addImage(imgData, 'JPEG', 550, 50, 800, 500);
           setTimeout(function(){
           doc.addHTML($('.printform'),0,700,options,function(){
           doc.save('data.pdf');
           });
           },2000)
           }
           getImageFromUrl('chart.jpeg', createPDF);*/
          window.print();
          $('.printform').hide();
          /*var options = {
           pagesplit: true
           };
           var doc = new jsPDF('p','pt','a1');*/
          /*doc.addHTML($('.printform'),0,600,options,function(){
           doc.save('123.pdf');
           });*/
        })
      }
    }
  }])
  .directive('markdownCompile', [function () {
    return {
      link: function (scope, ele, attrs) {
        scope.$watch('mydata', function (nv, ov) {
          if (nv != undefined) {
            ele.html(marked(scope.mydata.content));
          }
        })
      }
    }
  }]);
