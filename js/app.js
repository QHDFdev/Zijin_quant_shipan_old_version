﻿angular.module('myapp', ['ngRoute', 'ngAnimate', 'ngCookies', 'ngMessages', 'ngResource', 'myService', 'hljs'])
    .config(['$routeProvider', 'hljsServiceProvider', function ($routeProvider, hljsServiceProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'tpls/newHome.html',
                controller: 'homeController'
            })
            .when('/login', {
                templateUrl: 'tpls/login.html'
            })
            .when('/PlatformInfo', {
                templateUrl: 'tpls/introduce.html'
            })
            .when('/register', {
                templateUrl: 'tpls/register.html'
            })
            .when('/BackTest', {
                templateUrl: 'tpls/analyse.html'
            })
            .when('/BackTest/:id', {
                templateUrl: 'tpls/analyse.html'
            })
            .when('/AccountTrade', {
                templateUrl: 'tpls/trueRes.html'
            })
            .when('/AccountTrade/:id', {
                templateUrl: 'tpls/trueRes.html',

            })
            .when('/StrategyRunPanel', {
                templateUrl: 'tpls/study.html',
                controller: 'studyController'
            })
            .when('/strategyconpanel', {
                templateUrl: 'tpls/mytable.html',
                controller: 'tableController'
            })
            .when('/SimRealTimeTrade', {
                templateUrl: 'tpls/actualRes.html',
                controller: 'actualResController'
            })
            .when('/SimRealTimeTrade/:id', {
                templateUrl: 'tpls/actualRes.html',
                controller: 'actualResController'
            })
            .when('/actualResForm', {
                templateUrl: 'tpls/actualResForm.html',
                controller: 'actualResController'
            })
            .when('/codeview', {
                templateUrl: 'tpls/complie.html',
                controller: 'complieController'
            })
            .when('/codeview/:id', {
                templateUrl: "tpls/complie.html",
                controller: 'complieItemController'
            })
            .when('/quantmodelshare', {
                templateUrl: 'tpls/modalRes.html',
                controller: 'modalResController'
            })
            .when('/model_quants/:id', {
                templateUrl: 'tpls/modalResTemplate.html',
                controller: 'modalResItemController'
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
            .when('/model_mls/:id', {
                templateUrl: 'tpls/modalResTemplate.html',
                controller: 'modalResItemController'
            })
            .when('/adminCenter', {
                templateUrl: 'tpls/adminCenter.html',
                controller: 'adminCenterController'
            })
            .when('/strategyruncenter', {
                templateUrl: 'tpls/runCenter.html'
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
        window.flag = 'model_quants';
        window.a;
        window.b=0;
        window.c=0;
        wow.init();
        /*var editor = ace.edit("editor");
         editor.setTheme("ace/theme/chrome");
         editor.getSession().setMode("ace/mode/java");*/
        if (
            ($location.url() == '/home') ||
            ($location.url() == '/QuantModelShare') ||
            ($location.url() == '/PlatformInfo')) {
            $rootScope.isactive = false;
        }
        ;
        $(window).on('scroll', function () {
            if ((($('html').scrollTop() > 100) ||
                ($('body').scrollTop() > 100)) &&
                (($location.url() == '/StrategyRunPanel') ||
                ($location.url() == '/home') ||
                ($location.url() == '/QuantModelShare') ||
                ($location.url() == '/StrategyConPanel') ||
                ($location.url() == '/PlatformInfo'))) {
                $rootScope.isactive = true;
                $rootScope.$apply();
            } else if ((($('html').scrollTop() < 100) &&
                ($('body').scrollTop() < 100)) &&
                (
                ($location.url() == '/home') ||
                ($location.url() == '/QuantModelShare')) ||
                ($location.url() == '/PlatformInfo')) {
                $rootScope.isactive = false;
                $rootScope.$apply();
            }
        });

        if (($location.url() == '/BackTest') ||
            ($location.url() == '/SimRealTimeTrade') ||
            ($location.url() == '/AccountTrade') ||
            ($location.url() == '/complie') ||
            ($location.url() == '/StrategyRunPanel') ||
            ($location.url() == '/StrategyConPanel') ||
            ($location.url() == '/adminCenter')) {
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
                //console.log('/complie');
            }
            ;
            $('html,body').scrollTop(0);
            if (
                ($location.url() == '/home') ||
                ($location.url() == '/QuantModelShare')
            ) {
                $rootScope.isactive = false;
            }
            ;
            $(window).on('scroll', function () {
                if ((($('html').scrollTop() > 100) ||
                    ($('body').scrollTop() > 100)) &&
                    (($location.url() == '/StrategyRunPanel') ||
                    ($location.url() == '/QuantModelShare') ||
                    ($location.url() == '/home') ||
                    ($location.url() == '/StrategyConPanel'))) {
                    $rootScope.isactive = true;
                    $rootScope.$apply();
                } else if ((($('html').scrollTop() < 100) &&
                    ($('body').scrollTop() < 100)) &&
                    (
                        ($location.url() == '/QuantModelShare') ||
                        ($location.url() == '/home')
                    )) {
                    $rootScope.isactive = false;
                    $rootScope.$apply();

                }
            });
            if (($location.url() == '/BackTest') ||
                ($location.url() == '/SimRealTimeTrade') ||
                ($location.url() == '/AccountTrade') ||
                ($location.url() == '/complie') ||
                ($location.url() == '/StrategyRunPanel') ||
                ($location.url() == '/StrategyConPanel') ||
                ($location.url() == '/adminCenter')) {
                $rootScope.isactive = true;
            }
            ;
            if (typeof(cur) !== 'undefined' &&
                (next.loadedTemplateUrl == 'tpls/complie.html') &&
                (cur.loadedTemplateUrl == 'tpls/complie.html')) {
                $window.location.reload();
            }
            ;
        });

    }])
    .constant('constantUrl', 'http://114.55.238.82:81/')
    .value('strategysValue', {
        "id": 123,
        "author": 'abc'
    })
    .value('myStrategysValue', [])
    .value('modalResObjList0', [])
    .value('modalResObjList1', [])
    .value('modalResObjList2', [])
    .value('modalResObjList3', [])
    .value('modalResObjList4', [])
    .value('modalResObjItems', {
        "title": '',
        "content": ''
    })
    .controller('adminCenterController', ['$scope', '$http', '$q', '$cookieStore', 'constantUrl', '$location', function ($scope, $http, $q, $cookieStore, constantUrl, $location) {
        $scope.getAllUsers = function () {
            $http.get(constantUrl + 'users/', {
                    headers: {
                        'Authorization': 'token ' + $cookieStore.get('user').token
                    }
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
        if ($cookieStore.get('user') == null) {
            $scope.aside = 'full';
        }
        else {
            $scope.aside = 'zijin-index';
        }
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
        $rootScope.flag = 'null';
        $rootScope.logout = function () {
            $cookieStore.remove('user');
            $rootScope.user = null;
            if ($cookieStore.get('user') == null) {
                $scope.aside = 'full';
            }
            else {
                $scope.aside = 'zijin-index';
            }
            $location.path('/home'); //页面跳转
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
        $('#nav-sidebar .nav-main ul li').click(function () {
            $('#nav-sidebar .nav-main ul li.active').removeClass('active');
            $(this).addClass('active');
        })

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
        /*$('.edit').hide()
       /!* $(".opera").click(function(){
            $(".right .edit").show()

        })*!/*/
        $scope.func = function (e) {
            return e["status"] != -2;
        };
        $scope.closeMask = function () {
            $('.zijin-table-mask').fadeOut();
        };
        $scope.allStrategys = [];
        var allRecStrategys=[],c=0;

        /* 源策略 */
        $scope.openMaskSourcing = function () {
            $('.sourcing-mask').fadeIn();
        };
        /**
         * 数组排序
         * @param order desc升序asc降序
         * @param sortBy 所要排序的字段
         * @returns {*}
         */
        function getSortFun(order, sortBy) {
            var ordAlpah = (order == 'desc') ? '>' : '<';
            var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
            return sortFun;
        }

        //获取所有策略信息保存到accounts数组里
        var accounts = [];
        var strategyList=[];
        //策略代码渲染到页面
       $scope.putScreen=function(page){

            $scope.page=page;
           $scope.currentPage=page;
           console.log($scope.currentPage)
            $scope.mySourcingStrategy=[];
            $scope.mySourcingStrategy = strategyList[page];
            for (var i = 0; i < $scope.mySourcingStrategy.length; i++) {
                var status = $scope.mySourcingStrategy[i].status;

                if (status == -1) {
                    $scope.mySourcingStrategy[i].color = "error"
                    $scope.mySourcingStrategy[i].status = "错误"
                    $scope.mySourcingStrategy[i].title = data[i].error;
                }
                if (status == 0) {
                    $scope.mySourcingStrategy[i].status = "加载中"
                }
                if (status == 1) {
                    $scope.mySourcingStrategy[i].status = "加载完成"
                }
            }
            $scope.getFirmStrategys(); //显示实盘/回测列表
            $scope.getHisStrategys();
            $scope.gettrueStrategys();
       }

        /*$(".pagination li").click(function(){
            $(".pagination li.checked").removeClass('checked');
            $(this).addClass('checked')
        })*/
        $("#trustPage .page1").click(function(){
           console.log("a")
            $(this).children('a').addClass("clicked");
            $(this).siblings('li').children('a').removeClass('clicked')
        })

        $scope.getSourcingStrategys = function () {

            $http.get(constantUrl + "classs/", {
                    headers: {
                        'Authorization': 'token ' + $cookieStore.get('user').token
                    }
                })
                .success(function (data) {
                    data.sort(getSortFun('desc', 'class_name')); //按classname升序存放
                    accounts = data;
                    $scope.allS=data.length;
                    var count=0;
                    var count1=[];
                    for(var i=0;i<data.length;i=i+10){

                        var list=[];
                        for(var j=0;(i+j)<data.length&&j<10;j++){
                            list.push(data[i+j])
                        }
                        strategyList[count]=list;
                        count1.push({
                            'page':count,

                        })
                        count++;
                    }

                    $scope.count = count1;

                    $scope.putScreen(0)

                   /* $("#menu li").each(function(index){
                        $(this).click(function(){
//                    移除已经选中的样式
                            $("#menu li.tabFocus").removeClass("tabFocus");
//                    增加当前选中项的样式
                            $(this).addClass("tabFocus");
                            $("#content li:eq("+index+")").show().siblings().hide();
                        })
                    })*/


                    //console.log(data);
                })
                .error(function (err, sta) {
                    Showbo.Msg.alert('网络错误，请稍后再试。');
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
                    $scope.getSourcingStrategys();
                    $('.zijin-table-mask').fadeOut();
                    Showbo.Msg.alert('添加成功');
                })
                .error(function (err, st) {
                    //console.log(err);
                    //console.log(st);
                    $('.zijin-table-mask').fadeOut();
                    Showbo.Msg.alert('添加失败，请稍后再试。');
                });
        };

        /**
         * 根据id获取策略
         * @param class_id
         * @returns {string|*}
         */
        function getcelve(class_id) {
            //console.log(accounts)
            for (var i = 0; i < accounts.length; i++) {
                if (accounts[i]._id == class_id) {
                    return accounts[i].class_name;
                }
            }
        }

        /**
         * 获取历史回测的错误信息
         * @param id 根据id获取错误信息
         * @param i 有错误信息的行数
         */
        $scope.geterror2 = function (id, i) {
            $http.get(constantUrl + "btstrategys/" + id + "/", {
                    headers: {
                        'Authorization': 'token ' + $cookieStore.get('user').token
                    }
                })
                .success(function (data) {
                    $scope.myHisStrategy[i].title = "错误信息: " + data.error;
                })
        }
        /**
         * 获取实盘的错误信息
         * @param id
         * @param i
         */
        $scope.geterror = function (id, i) {
            $http.get(constantUrl + "strategys/" + id + "/", {
                    headers: {
                        'Authorization': 'token ' + $cookieStore.get('user').token
                    }
                })
                .success(function (data) {
                    $scope.myStrategy[i].title = "错误信息: " + data.error;
                }).error(function (err, sta) {
                //console.log(err, sta)
            })
        }
        $scope.geterror3 = function (id, i) {
            $http.get(constantUrl + "strategys/" + id + "/", {
                    headers: {
                        'Authorization': 'token ' + $cookieStore.get('user').token
                    }
                })
                .success(function (data) {
                    $scope.trueStrategy[i].title = "错误信息: " + data.error;
                })
        }
        //console.log($cookieStore.get('user').token)
        //91aa354c022f7d7ba1fe541669b2b2db6bc3010f
        //真实交易列表渲染到页面
        $scope.gettrueStrategys = function () {
            // console.log('token ' + $cookieStore.get('user').token)
            $http.get(constantUrl + "strategys/", {
                    headers: {
                        'Authorization': 'token ' + $cookieStore.get('user').token
                    }
                })
                .success(function (data) {
                    for (var i = 0; i < data.length; i++) { //去除不是真实交易的
                        if (data[i].account_id == null) {
                            data.splice(i, 1);
                            i = -1;
                        }
                    }

                    $scope.trueStrategy = data;

                    $scope.error = 0, $scope.loading = 0, $scope.loaded = 0, $scope.start = 0, $scope.stop = 0, $scope.over = 0, $scope.trust = 0;
                    for (var i = 0; i < data.length; i++) {
                        $scope.trueStrategy[i].class_name = "none"; //策略代码初始化
                        var class_id = data[i].class_id;
                        var status = data[i].status;
                        $scope.trueStrategy[i].class_name = getcelve(class_id);
                        if (status != -2 && status == -1) {
                            $scope.trueStrategy[i].color = "error";
                            $scope.trueStrategy[i].status = "错误";
                            $scope.geterror3($scope.trueStrategy[i]._id, i);
                            $scope.error++;
                        }
                        if (status == 0) {
                            $scope.trueStrategy[i].title = "加载中";
                            $scope.trueStrategy[i].status = "加载中";
                            $scope.loading++;
                        }
                        if (status == 1) {
                            $scope.trueStrategy[i].title = "加载完成";
                            $scope.trueStrategy[i].status = "加载完成";
                            $scope.loaded++;
                        }
                        if (status == 2) {
                            $scope.trueStrategy[i].title = "运行中";
                            $scope.trueStrategy[i].status = "运行中";
                            $scope.start++;
                        }
                        if (status == 3) {
                            $scope.trueStrategy[i].title = "停止运行";
                            $scope.trueStrategy[i].status = "停止运行";
                            $scope.stop++;
                        }
                        if (status == 4) {
                            $scope.trueStrategy[i].title = "运行结束";
                            $scope.trueStrategy[i].status = "运行结束";
                            $scope.over++;

                        }
                    }
                    $scope.histroyTrue=[];
                    //console.log(data)
                    var histroyTrue=[]
                    angular.forEach(data, function (item, index) {
                        if (item.status == -2) {
                            item.color = "true";
                            item.type = "真实交易";
                            //$scope.allStrategys.push(item);
                            allRecStrategys[c++]=item;
                            $scope.trust++;
                            histroyTrue.push(item);
                        }
                    });


                    var q= 0,trueDel=[],trueDelPageSize=[];

                    for(var i=0;i<histroyTrue.length;i=i+10){
                        var list = [];
                        for(var j=0;(i+j)<histroyTrue.length&&j<10;j++){
                            list.push(histroyTrue[i+j]);
                        }
                        trueDel[q]=list;

                        trueDelPageSize.push({
                            "page":q
                        })

                       q++;
                    }
                    $scope.trueDelPageSize =trueDelPageSize



                    $scope.putScreenTureDel=function(page){
                        $scope.tureDelPage=page;
                        $scope.histroyTrue=[];
                        $scope.histroyTrue = trueDel[page]
                    }
                    $scope.putScreenTureDel(0)



                    var m= 0,stratgeListRec=[],recPageSize=[];
                    for(var i=0;i<allRecStrategys.length;i=i+10){
                        var list = [];
                        for(var j=0;(i+j)<allRecStrategys.length&&j<10;j++){
                            list.push(allRecStrategys[i+j]);
                        }
                        stratgeListRec[m]=list;
                        recPageSize.push({
                            "page":m
                        })
                        m++;
                    }
                    $scope.recPageSize=recPageSize
                    $scope.putScreenRec =function(page){
                        $scope.recPageSizeCurrent=page
                        $scope.allStrategys=[];
                        $scope.allStrategys = stratgeListRec[page]
                    }
                    $scope.putScreenRec(0)
                })
                .error(function (err, sta) {
                    Showbo.Msg.alert('网络错误，请稍后再试。');
                    //console.log(err);
                    //console.log(sta);
                });
        };
        /**
         * 转义换行
         * @param content
         * @returns {*}
         * @constructor
         */
        function TransferString(content) {
            var string = content;
            try {
                string = string.replace(/\r\n/g, "<BR>")
                string = string.replace(/\n/g, "<BR>");
            } catch (e) {
                alert(e.message);
            }
            return string;
        }


        function download(text, name, type) {
            var file = new Blob([text], {
                type: type
            })
            var a = $('<a hidden>Download py</a>').appendTo('body')
            a[0].href = URL.createObjectURL(file)
            a[0].download = name
            a[0].click()
        }

        $scope.downpy = function (id, name) {

            Showbo.Msg.confirm("您需要下载" + name + "吗？", function (flag) {
                if (flag == 'yes') {
                    $http.get(constantUrl + 'classs/' + id + '/', {
                            headers: {
                                'Authorization': 'token ' + $cookieStore.get('user').token
                            }
                        })
                        .success(function (data) {
                            download(data.code, data.code_name, 'text/plain')
                        })
                        .error(function (err, sta) {
                            console.log(err);
                        });
                }
                else {

                }
            })
        }
        /**
         * 日志初始化
         */
        $scope.beginlog = function () {
            $("#log").html("");
            $("#logname").html("");
            $('.logs-mask').show();
            $('.loadEffect').show();
        }
        /**
         * 日志输出
         * @param name
         * @param log
         */
        $scope.put = function (name, logs) {
            var test = new Array();
            var p = 0,
                q = 0;
            var num = 10000;
            test[0] = new Array();
            for (var i = 0; i < logs.length; i++) {
                test[p][q] = logs[i];
                q++;
                if (q == num) {
                    p++;
                    test[p] = new Array();
                    q = 0;
                }
            }
            if (test[0].length >= num) {
                $("#logname").append(name + "," + "前" + num + "条记录<br>")
            } else {
                $("#logname").append(name + " - " + test[0].length + "条记录");
            }
            var log = logs;
            for (var i = 0; i < log.length; i++) {
                $("#log").append(i + ": " + log[i] + "<br>")
            }
            $('.loadEffect').hide();
            $scope.log = true;
        }
        /* 创建实盘模拟 */ //加载策略页面
        //实盘列表渲染到页面
        var strategyList1=[]
        $scope.getFirmStrategys = function () {
            $http.get(constantUrl + "strategys/", {
                    headers: {
                        'Authorization': 'token ' + $cookieStore.get('user').token
                    }
                })
                .success(function (data) {
                    for (var i = 0; i < data.length; i++) { //去除不是真实交易的
                        if (data[i].account_id != null) {
                            data.splice(i, 1);
                            i = -1;
                        }
                    }

                    $scope.error1 = 0, $scope.loading1 = 0, $scope.loaded1 = 0, $scope.start1 = 0, $scope.stop1 = 0, $scope.over1 = 0, $scope.offer = 0;
                    $scope.histroySim=[];
                    var histroySim=[]
                    angular.forEach(data,function(item,index){
                        if (item.status != -2 && item.status == -1) {
                            item.color = "error";
                            item.status = "错误";
                            $scope.geterror(item[i]._id, i);
                            $scope.error1++;
                        }
                        if (item.status == 0) {
                            item.title = "加载中";
                            item.status = "加载中";
                            $scope.loading1++;
                        }
                        if (item.status == 1) {
                            item.title = "加载完成";
                            item.status = "加载完成";
                            $scope.loaded1++;
                        }
                        if (item.status == 2) {
                            item.title = "运行中";
                            item.status = "运行中";
                            $scope.start1++;

                        }
                        if (item.status == 3) {
                            item.title = "停止运行";
                            item.status = "停止运行";
                            $scope.stop1++;
                        }
                        if (item.status == 4) {
                            item.title = "运行结束";
                            item.status = "运行结束";
                            $scope.over1++;
                        }
                        if(item.status == -2){
                            item.color = "now";
                            item.type = "实盘模拟";
                            $scope.offer++;
                            //$scope.allStrategys.push(item);
                            allRecStrategys[c++]=item;
                            histroySim.push(item);
                        }

                    })

                    var simStragey=[]
                    angular.forEach(data,function(item,index){
                        if(item.status !=-2){
                            simStragey.push(item)
                        }
                    })


                    //删除的实盘
                    var x= 0,simDel=[],simDelPageSize=[];
                    for(var i=0;i<histroySim.length;i=i+10){
                        var list = [];
                        for(var j=0;(i+j)<histroySim.length&&j<10;j++){
                            list.push(histroySim[i+j]);
                        }
                        simDel[x]=list;
                        simDelPageSize.push({
                            "page":x
                        })
                        x++;
                    }
                    $scope.simDelPageSize=simDelPageSize



                    $scope.putScreenSimDel=function(page){
                        $scope.simDelPage=page;
                        $scope.histroySim=[];
                        $scope.histroySim = simDel[page]
                        for (var i = 0; i < $scope.histroySim.length; i++) {
                            $scope.histroySim[i].class_name = "none";  //策略代码初始化
                            var class_id = $scope.histroySim[i].class_id;
                            var status = $scope.histroySim[i].status;
                            $scope.histroySim[i].class_name = getcelve(class_id);

                        }

                    }
                    $scope.putScreenSimDel(0);



                    //没有删除的实盘
                    var n= 0,simPageSize=[];

                    for(var i=0;i<simStragey.length;i=i+10){
                        var list = [];
                        for(var j=0;(i+j)<simStragey.length&&j<10;j++){
                            list.push(simStragey[i+j]);
                        }
                        strategyList1[n]=list;
                        simPageSize.push({
                            'page':n
                        })
                        n++;
                    }
                    $scope.simPageSize=simPageSize;



                    $scope.putScreen1=function(page){
                        $scope.page1=page;
                        $scope.currentPage1=page;
                        $scope.myStrategy = [];

                        $scope.myStrategy = strategyList1[page];

                        for (var i = 0; i < $scope.myStrategy.length; i++) {
                            $scope.myStrategy[i].class_name = "none";  //策略代码初始化
                            var class_id = $scope.myStrategy[i].class_id;
                            var status = $scope.myStrategy[i].status;
                            $scope.myStrategy[i].class_name = getcelve(class_id);

                        }

                      /*  $scope.histroySim=[];
                        angular.forEach($scope.myStrategy, function (item, index) {
                            if (item.status == -2) {
                                item.color = "now";
                                item.type = "实盘模拟";
                                $scope.offer++;
                                $scope.allStrategys.push(item);
                                $scope.histroySim.push(item);
                            }
                        });*/
                    }

                    $scope.putScreen1(0)

                    //$scope.myStrategy = data;

                    //鼠标悬浮文字



                })
                .error(function (err, sta) {
                    Showbo.Msg.alert('网络错误，请稍后再试。');

                });
        };


        //选择删除 实盘模拟
        $scope.updateSelection2 = function (a) {
            //console.log(a.$index);
            $scope.myStrategy[a.$index].flag = !$scope.myStrategy[a.$index].flag;
        }
        $scope.delsel2 = function () {
            Showbo.Msg.alert('实盘暂时不能删除，谢谢')
            return;
            for (var i = 0; i < $scope.myStrategy.length; i++) {
                if ($scope.myStrategy[i].flag) {
                    var url = $scope.myStrategy[i]._id;
                    console.log(i, url)
                    return;
                    $http.delete(constantUrl + "strategys/" + url + '/', {
                            headers: {
                                'Authorization': 'token ' + $cookieStore.get('user').token
                            }
                        })
                        .success(function () {
                            console.log('删除成功')
                        })
                        .error(function (err, sta) {
                            Showbo.Msg.alert('删除失败，请稍后再试。')
                        });
                }
            }


        }
        var flag = false;
        $scope.selectall2 = function () {
            flag = !flag;
            for (var i = 0; i < $scope.myStrategy.length; i++) {
                $scope.myStrategy[i].flag = flag;
            }
        }
        var flag3 = false;
        $scope.selectall3 = function () {
            flag3 = !flag3;
            for (var i = 0; i < $scope.myHisStrategy.length; i++) {
                $scope.myHisStrategy[i].flag = flag3;
            }
        }

        $scope.updateSelection3 = function (a) {
            //console.log(a.$index);
            $scope.myHisStrategy[a.$index].flag = !$scope.myHisStrategy[a.$index].flag;
        }

        //批量删除历史回测
        $scope.delsel3 = function () {
            Showbo.Msg.confirm('您确定删除所选择的吗？', function (flag) {
                var a = true;
                if (flag == 'yes') {

                    for (var i = 0; i < $scope.myHisStrategy.length; i++) {
                        if ($scope.myHisStrategy[i].flag) {
                            a = false //判断是否选择了 ture为选中
                            var url = $scope.myHisStrategy[i]._id; //遍历需要删除的id
                            $http.delete(constantUrl + "btstrategys/" + url + '/', {
                                    headers: {
                                        'Authorization': 'token ' + $cookieStore.get('user').token
                                    }
                                })
                                .success(function () {
                                    //console.log('删除成功')
                                })
                                .error(function (err, sta) {
                                    Showbo.Msg.alert('删除失败，请稍后再试。')
                                });
                        }
                    }
                    if (a) {
                        Showbo.Msg.alert("您没有选择");
                        return;
                    }
                    setTimeout(function () { //刷新回测列表
                        $scope.allStrategys = [];
                        $scope.getFirmStrategys(); //刷新实盘/回测列表/回收站
                        $scope.getHisStrategys();
                    }, 1000)

                } else if (flag == 'no') {
                }
            });
        }

        var flag = false; //默认都不选
        $scope.selectall3 = function () { //全选或全不选
            flag = !flag;
            for (var i = 0; i < $scope.myHisStrategy.length; i++) {
                $scope.myHisStrategy[i].flag = flag;
            }
        }

        var height = $(window).height(); //浏览器当前窗口可视区域高度
        $("#test").css("height", height * 0.7 + "px");
        $("#test2").css("height", height * 0.7 + "px");
        $("#test3").css("height", height * 0.7 + "px");
        $("#test0").css("height", height * 0.7 + "px");
        $("#test4").css("height", height * 0.7 + "px");


        //创建实盘模拟策略
        $scope.addFirmStrategy = function () {

            if ($scope.firmItem == undefined) {
                Showbo.Msg.alert('请填入信息');
                return;
            }
            if ($scope.firmItem.name == undefined) {
                Showbo.Msg.alert('请输入策略名');
                return;
            }
            if ($scope.firmItem.exchange == undefined || $scope.firmItem.exchange == "") {
                Showbo.Msg.alert('请选择交易所代码');
                return;
            }
            if ($scope.firmItem.symbol == undefined || $scope.firmItem.symbol == "") {
                Showbo.Msg.alert('请选择交易合约');
                return;
            }
            if ($scope.firmItem.multiple == undefined) {
                Showbo.Msg.alert('请输入交易手数');
                return;
            }

            //console.log($scope.ids[0]._id);

            var files = $scope.files;
            //console.log(files);
            var formdata = new FormData();
            formdata.append('name', $scope.firmItem.name);
            formdata.append('symbol', $scope.firmItem.symbol);
            formdata.append('class_id', strategysValue.id);
            formdata.append('author', strategysValue.author);
            formdata.append('exchange', $scope.firmItem.exchange);
            formdata.append('multiple', $scope.firmItem.multiple);
            if (($scope.files != undefined) && ($scope.files != null)) {
                formdata.append('file', files);
            }
            $http.post(constantUrl + "strategys/", formdata, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined,
                        'Authorization': 'token ' + $cookieStore.get('user').token
                    }
                })
                .success(function (data) {
                    setTimeout(function () {
                        $scope.getFirmStrategys();
                    }, 100)
                    $('.zijin-table-mask').fadeOut();
                    Showbo.Msg.alert('添加成功');
                })
                .error(function (err, st) {
                    //console.log(err);
                    //console.log(st);
                    $('.zijin-table-mask').fadeOut();
                    Showbo.Msg.alert('添加失败，请稍后再试。');
                });
            $scope.firmItem.name = null;
            $scope.firmItem.exchange = null;
            $scope.firmItem.symbol = null;
            $scope.firmItem.multiple = null;
            $scope.change = false;
            $scope.change1 = false;
            $scope.change2 = false;

        };
        //创建真实交易
        $scope.addTrueStrategy = function () {
            if ($scope.trueItem == undefined) {
                Showbo.Msg.alert('请填入信息');
                return;
            }
            if ($scope.trueItem.name == undefined) {
                Showbo.Msg.alert('请输入交易名');
                return;
            }
            if ($scope.trueItem.exchange == undefined || $scope.trueItem.exchange == "") {
                Showbo.Msg.alert('请选择交易所代码');
                return;
            }
            if ($scope.trueItem.symbol == undefined || $scope.trueItem.symbol == "") {
                Showbo.Msg.alert('请选择交易合约');
                return;
            }
            if ($scope.trueItem.multiple == undefined) {
                Showbo.Msg.alert('请输入交易手数');
                return;
            }
            if ($scope.trueItem.account == undefined) {
                Showbo.Msg.alert('请选择accout_id');
                return;
            }

            //console.log($scope.trueItem,$scope.trueFile);
            //return;
            var files = $scope.trueFile;
            var formdata = new FormData();
            formdata.append('name', $scope.trueItem.name);
            formdata.append('symbol', $scope.trueItem.symbol);
            formdata.append('class_id', strategysValue.id);
            formdata.append('author', strategysValue.author);
            formdata.append('exchange', $scope.trueItem.exchange);
            formdata.append('multiple', $scope.trueItem.multiple);
            formdata.append('account_id', $scope.trueItem.account._id);
            if (($scope.trueFile != undefined) && ($scope.trueFile != null)) {
                formdata.append('file', files);
            }
            $http.post(constantUrl + "strategys/", formdata, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined,
                        'Authorization': 'token ' + $cookieStore.get('user').token
                    }
                })
                .success(function (data) {
                    setTimeout(function () {
                        $scope.gettrueStrategys();
                    }, 100)
                    $('.zijin-table-mask').fadeOut();
                    Showbo.Msg.alert('添加成功');
                })
                .error(function (err, st) {
                    //console.log(err);
                    //console.log(st);
                    $('.zijin-table-mask').fadeOut();
                    Showbo.Msg.alert('添加失败，请稍后再试。');
                });
            $scope.trueItem.name = null;
            $scope.trueItem.exchange = null;
            $scope.trueItem.symbol = null;
            $scope.trueItem.multiple = null;
            $scope.trueItem.account = null;
            $scope.trueFile = null;
            $scope.f = false;
            $scope.f1 = false;
            $scope.f2 = false;
        };
        $scope.new = function () {
            $http.get(constantUrl + "accounts/", {
                    headers: {
                        'Authorization': 'token ' + $cookieStore.get('user').token
                    }
                })
                .success(function (data) {
                    $scope.ids = data;
                })
                .error(function (err, sta) {
                    Showbo.Msg.alert('网络错误，请稍后再试。');
                })

        }
        $scope.new();
        $scope.checktime1 = function () {
            if ($scope.hisItem.end == undefined || $scope.hisItem.end == '') {
                return;
            }
            if ($scope.hisItem.end < $scope.hisItem.start) {
                Showbo.Msg.alert('开始时间应小于结束时间');
                $scope.hisItem.start = undefined;
            }
        }
        $scope.checktime = function () {
            if ($scope.hisItem.start == undefined || $scope.hisItem.start == '') {
                return;
            }
            if ($scope.hisItem.end < $scope.hisItem.start) {
                Showbo.Msg.alert('结束时间应大于开始时间');
                $scope.hisItem.end = undefined;
            }
        }

        $("#startTime").val("")
        $("#endTime").val("")
        $("#startTime").attr("disabled", "true");
        $("#endTime").attr("disabled", "true");

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
            //console.log($scope.firmItem.symbol)
            if ($scope.hisItem.exchange == undefined) {
                Showbo.Msg.alert('请先选择交易所代码');
                $scope.modeTickOptions = false;
                $scope.modeBarOptions = false;
                return;
            }
            // console.log($scope.hisItem)
            if ($scope.hisItem.symbol == "" || $scope.hisItem.symbol == undefined) {
                Showbo.Msg.alert('请输入交易合约');
                $scope.modeTickOptions = false;
                $scope.modeBarOptions = false;
                return;
            }
            //console.log($scope.firmItem)
            var symbol, exchange;
            symbol = $scope.hisItem.symbol;
            exchange = $scope.hisItem.exchange;
            $http.get(constantUrl + "dates/", {
                    //params: {type: ty, date_type: 'data',symbol:"D1_AG",exchange:"CSRPME"},
                    params: {
                        type: ty,
                        date_type: 'data',
                        symbol: symbol,
                        exchange: exchange
                    },
                    headers: {
                        'Authorization': 'token ' + $cookieStore.get('user').token
                    }
                })
                .success(function (data) {
                    loadtime(data)
                    $("#startTime").val("")
                    $("#endTime").val("")
                    $('#startTime').removeAttr("disabled");
                    $('#endTime').removeAttr("disabled");
                    //$scope.hisItem.time = data;
                })
                .error(function (err, sta) {
                    //console.log(err);
                    //console.log(sta);
                    if (sta == 400) {
                        Showbo.Msg.alert('交易合约不正确');
                        $scope.modeTickOptions = false;
                        $scope.modeBarOptions = false;
                    }
                });
        };
        //读取当前交易所代码
        var url = "exchange.json";
        $http.get(url).success(function (response) {
            //console.log(response)
            $scope.ex = response;
        })
        $scope.ex2 =
            [{
                "exchange": "CSRPME"
            }]

        $scope.changesymbol = function () { //历史回测 改变交易合约置空bar选项和时间
            $scope.hisItem.start = "";
            $scope.hisItem.end = "";
            $scope.modeBarOptions = "";
            $scope.modeTickOptions = "";
            $scope.hisItem.time = "";
            $("#startTime").val("")
            $("#endTime").val("")
            $("#startTime").attr("disabled", "true");
            $("#endTime").attr("disabled", "true");
        }
        //读取交易所代码对应的合约
        $scope.getsymbol2 = function () { //实盘改变交易所代码置空交易合约
            $scope.firmItem.symbol = "";
            var url = "exchange/" + $scope.firmItem.exchange + ".json";
            $http.get(url).success(function (response) {
                $scope.sy = response;
            })
        }
        $scope.getsymbol3 = function () { //实盘改变交易所代码置空交易合约
            $scope.trueItem.symbol = "";
            var url = "exchange/" + $scope.trueItem.exchange + ".json";
            $http.get(url).success(function (response) {
                $scope.sy = response;
            })
        }
        $scope.getsymbol = function () { //历史回测改变交易所代码置空刚刚选择的
            $scope.hisItem.symbol = "";
            $scope.hisItem.start = "";
            $scope.hisItem.end = "";
            $scope.modeBarOptions = "";
            $scope.modeTickOptions = "";
            $scope.hisItem.time = "";
            $("#startTime").val("")
            $("#endTime").val("")
            $("#startTime").attr("disabled", "true");
            $("#endTime").attr("disabled", "true");
            var url = "exchange/" + $scope.hisItem.exchange + ".json";
            $http.get(url).success(function (response) {
                $scope.sy = response;
            })
        }
        //创建历史回测策略
        $scope.addHisStrategy = function () {
            if ($scope.hisItem.name == undefined) {
                Showbo.Msg.alert('请输入策略名');
                return;
            }
            if ($scope.hisItem.exchange == undefined) {
                Showbo.Msg.alert('请选择交易所代码');
                return;
            }
            if ($scope.hisItem.symbol == '') {
                Showbo.Msg.alert('请选择交易合约');
                return;
            }
            if ($scope.modeTickOptions == false && $scope.modeBarOptions == false) {
                Showbo.Msg.alert('请选择bar或tick');
                return;
            }
            if ($scope.hisItem.start == undefined || $scope.hisItem.start == '') {
                Showbo.Msg.alert('请选择开始时间');
                return;
            }
            if ($scope.hisItem.end == undefined || $scope.hisItem.end == '') {
                Showbo.Msg.alert('请选择结束时间');
                return;
            }
            var files = $scope.files;
            var formdata = new FormData();
            if ($scope.modeBarOptions) {
                formdata.append('mode', 'bar');
            } else {
                formdata.append('mode', 'tick');
            }
            var mydate = $filter('date')(new Date((new Date($scope.hisItem.end)).setDate((new Date($scope.hisItem.end)).getDate() + 1)), 'yyyy-MM-dd');
            formdata.append('name', $scope.hisItem.name);
            formdata.append('symbol', $scope.hisItem.symbol);
            formdata.append('exchange', $scope.hisItem.exchange);
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
                    setTimeout(function () {
                        $scope.getHisStrategys();
                    }, 100)
                    $('.zijin-table-mask').fadeOut();
                    Showbo.Msg.alert('添加成功');
                })
                .error(function (err, st) {
                    //console.log(err);
                    //console.log(st);
                    $('.zijin-table-mask').fadeOut();
                    Showbo.Msg.alert('添加失败，请稍后再试。');
                });
            $scope.hisItem.name = null;
            $scope.hisItem.exchange = null;
            $scope.hisItem.symbol = null;
            $scope.modeBarOptions = null;
            $scope.modeTickOptions = null;
            $scope.hisItem.start = null;
            $scope.hisItem.end = null;
            $scope.files = null;
            $scope.fl = false;
            $scope.fl1 = false;
            $scope.fl2 = false;
        };


        //历史回测列表渲染到页面
        $scope.getHisStrategys = function () {
            $http.get(constantUrl + "btstrategys/", {
                    headers: {
                        'Authorization': 'token ' + $cookieStore.get('user').token
                    }
                })
                .success(function (data) {
                    $scope.myHisStrategy = data;

                    $scope.error2 = 0, $scope.loading2 = 0, $scope.loaded2 = 0, $scope.start2 = 0, $scope.stop2 = 0, $scope.over2 = 0, $scope.histroy = 0;
                    for (var i = 0; i < data.length; i++) {
                        var class_id = data[i].class_id;
                        var status = data[i].status;
                        if (status != -2) { //获取对应的策略代码
                            $scope.myHisStrategy[i].class_name = getcelve(class_id);
                        }
                        if (status == -1 && status != -2) {
                            $scope.myHisStrategy[i].color = "error";
                            $scope.myHisStrategy[i].status = "错误";
                            $scope.geterror2($scope.myHisStrategy[i]._id, i);
                            $scope.error2++;
                        }
                        if (status == 0) {
                            $scope.myHisStrategy[i].status = "加载中";
                            $scope.myHisStrategy[i].title = "加载中";
                            $scope.loading2++;
                        }
                        if (status == 1) {
                            $scope.myHisStrategy[i].status = "加载完成";
                            $scope.myHisStrategy[i].title = "加载完成";
                            $scope.loaded2++;
                        }
                        if (status == 2) {
                            $scope.myHisStrategy[i].status = "开始加载";
                            $scope.myHisStrategy[i].title = "开始加载";
                            $scope.start2++;
                        }
                        if (status == 3) {
                            $scope.myHisStrategy[i].status = "停止运行";
                            $scope.myHisStrategy[i].title = "停止运行";
                            $scope.stop2++;
                        }
                        if (status == 4) {
                            $scope.myHisStrategy[i].status = "运行结束";
                            $scope.myHisStrategy[i].title = "运行结束";
                            $scope.over2++;
                        }
                        $scope.myHisStrategy[i].flag = false; //所有选择框默认不选择
                    }
                    angular.forEach(data, function (item, index) {
                        if (item.status == -2) {
                            item.color = "his";
                            item.type = "历史回测";
                            //$scope.allStrategys.push(item);
                            allRecStrategys[c++]=item;
                            $scope.histroy++;
                        }
                    });

                })
                .error(function (err, sta) {
                    Showbo.Msg.alert('网络错误，请稍后再试。');
                    //console.log(err);
                    //console.log(sta);
                });
        };

        //注意把文本用utf-8格式保存不然会中文乱码 鼠标悬浮title
        var url = "instructions.txt";
        $http.get(url).success(function (response) {
            //console.log(response)
            $scope.titleQuick = response;
        })


        $(function () {
            $('#downtxt').mousemove(function () {
                    $('#title').show();
                })
                .mouseout(function () {
                    $('#title').hide();
                })
            $('#title').mousemove(function () {
                    $('#title').show();
                })
                .mouseout(function () {
                    $('#title').hide()
                })
        })



        //$scope.allStrategys = allRecStrategys

/*

        var m= 0,stratgeListRec=[];

        for(var i=0;i<allRecStrategys.length;i=i+10){
            var list = [];
            for(var j=0;(i+j)<allRecStrategys.length&&j<10;j++){
                list.push(allRecStrategys[i+j]);
            }
            stratgeListRec[m]=list;

            m++;
        }


        $scope.putScreenRec =function(page){
            $scope.allStrategys=[];
            $scope.allStrategys = stratgeListRec[page]
        }
        $scope.putScreenRec(0)
*/





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
                        headers: {
                            'Authorization': 'token ' + token
                        }
                    })
                    .success(function (data) {
                        $cookieStore.put('user', {
                            username: data.username,
                            email: data.email,
                            token: token,
                            is_admin: data.is_admin,
                            is_zijin: data.is_zijin
                        });
                        //console.log($cookieStore.get('user'));

                        if ($cookieStore.get('user').is_admin){
                            $location.path('/strategyruncenter');
                            $scope.aside = 'zijin-index';
                            $("#nav-sidebar li.active").removeClass('active');
                            $("#nav-sidebar li:nth-child(3)").addClass('active');
                        }
                        else{
                            $location.path('/home');
                            $("#nav-sidebar li.active").removeClass('active');
                            $("#nav-sidebar li:nth-child(1)").addClass('active');
                        }
                        //$location.path('/home');

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
    .controller('runCenterController', ['$scope', '$http', 'constantUrl', '$cookieStore', '$filter', '$routeParams', '$q', '$timeout','$rootScope', function ($scope, $http, constantUrl, $cookieStore, $filter, $routeParams, $q, $timeout,$rootScope) {
        $rootScope.user = $cookieStore.get('user');
        var falsedata = [], truedata = [],delTrust=[],delFirm=[],truedata2=[],falsedata2=[];
        var accounts = [];
        //var trueSymbolList=[],flaseSymbolList=[],allSymbolList=[];
        var nianHuaList = [];
        //策略代码渲染到页面
        $scope.getSourcingStrategys = function () {
            accounts = [];
            $http.get(constantUrl + "classs/", {
                    headers: {
                        'Authorization': 'token ' + $cookieStore.get('user').token
                    }
                })
                .success(function (data) {
                    accounts = data;
                    //getSelect();
                    //getHisSelect();
                })
                .error(function (err, sta) {
                    Showbo.Msg.alert('网络错误，请稍后再试。');
                });
        };
        $scope.getSourcingStrategys();

        function getcelve(class_id) {
            for (var i = 0; i < accounts.length; i++) {
                if (accounts[i]._id == class_id) {
                    return accounts[i].code_name;
                }
            }
        }
        $scope.sRun = 0, $scope.sStop = 0, $scope.sHui = 0,$scope.fHui = 0;
        //判断真实交易、实盘模拟
        function judge(){
            $http.get(constantUrl + "strategys/", {
                    headers: {
                        'Authorization': 'token ' + $cookieStore.get('user').token
                    }
                })
                .success(function (data) {
                    //data = $filter('orderBy')(data, 'name')
                    for (var i = 0; i < data.length; i++) {
                        data[i].account_id == null ? falsedata.push(data[i]) : truedata.push(data[i]);
                    }
                    if ($cookieStore.get('user').is_admin) {
                        trustDeals();
                    }
                });
        }
        judge();



        //真实交易
        function trustDeals(){
            var  truedata2=[];   /*存放没有被删除的策略*/
            for(var i=0; i<truedata.length; i++){
                if(truedata[i].status!=-2){
                    truedata2.push(truedata[i]);
                }
                else {
                    delTrust.push(truedata[i])
                }
            }
            for (var i = 0; i < truedata2.length; i++) {
                var class_id = truedata2[i].class_id;
                truedata2[i].code_name = getcelve(class_id);
            }

            var n = 0,i=0;
            var timeList = [];
            getTimes(0);
            //获取所有策略最后一天的时间
            function getTimes(i) {
                $http.get(constantUrl + 'dates/', {
                        params: {
                            "date_type": 'transaction',
                            "sty_id": truedata2[i]._id
                        },
                        headers: {
                            'Authorization': 'token ' + $cookieStore.get('user').token
                        }
                    })
                    .success(function (data) {
                        timeList[n++] = data[data.length - 1];
                        i++;
                        if (i == truedata2.length) {
                            getIdDate();
                            return;
                        }
                        getTimes(i);
                    })
                    .error(function(data){
                        timeList[n++]=0;
                        i++;
                        if (i == truedata2.length) {
                            getIdDate();
                            return;
                        }
                        getTimes(i);
                    })
            }
            //console.log(timeList)

            //把所有策略id、开始时间、结束时间放进一个数组
            var IdDateList=[];
            function getIdDate() {
                for (var i = 0; i < truedata2.length; i++) {
                    var id = truedata2[i]._id;
                    var sDate = timeList[i];
                    var eDate = $filter('date')(new Date((new Date(timeList[i])).setDate((new Date(timeList[i])).getDate() + 1)), 'yyyy-MM-dd');
                    //console.log(id,sDate,eDate);
                    IdDateList.push({
                        'id': id,
                        'sDate': sDate,
                        'eDate': eDate
                    })
                }
                getAllData(0);
            }
            //console.log(IdDateList);
            var i = 0;
            var allDataList = [];
            var m = 0;

            /**
             * 获取所有策略前一天的数据
             * @param i
             */

            function getAllData(i) {
                var nothing = new Array();
                $http.get(constantUrl + 'transactions/', {
                        params: {
                            "sty_id": IdDateList[i].id,
                            "start": IdDateList[i].sDate,
                            "end": IdDateList[i].eDate
                        },
                        headers: {
                            'Authorization': 'token ' + $cookieStore.get('user').token
                        }
                    })
                    .success(function (data) {
                        //console.log(data)
                        allDataList[m++] = data;
                        i++;
                        if (i >= IdDateList.length) {
                            getAllNianHua(0);
                            return;
                        }
                        getAllData(i);
                    })
                    .error(function(data){
                        allDataList[m++] =nothing;
                        i++;
                        if (i >= IdDateList.length) {
                            getAllNianHua(0);
                            return;
                        }
                        getAllData(i);
                    })
            }

            /**
             * 获取所有策略前一天的年化收益率
             * @param i
             */
            function getAllNianHua(i) {
                var nowData = allDataList[i];
                //console.log(nowData);
                handledata(true, nowData, timeList[i], IdDateList[i].id);
                //console.log(IdDateList[i].id)
                //return;
                i++;
                if (i >= allDataList.length) {
                    $timeout(function () {
                        putScreen();
                    }, 500);
                    //console.log($scope.trust);
                    return;
                }
                //console.log(i)
                getAllNianHua(i);
            }

            function putScreen() {
                //console.log(nianHuaList)
                for (var i = 0; i < nianHuaList.length; i++) {
                    var id = nianHuaList[i].nowId;
                    var nianhua = nianHuaList[i].nianhua;
                    var average_winrate = nianHuaList[i].average_winrate;
                    //console.log(id,nianhua,average_winrate)
                    for (j = 0; j < truedata2.length; j++) {
                        if (truedata2[j]._id == id) {
                            truedata2[j].yeild = nianhua;
                            truedata2[j].average_winrate = average_winrate;
                            truedata2[j].yeildColor = nianhua > 0 ? 'zheng' : 'fu';
                            truedata2[j].yeildColor1 = average_winrate > 0 ? 'zheng' : 'fu';

                            truedata2[j].y = nianhua > 0 ? 'glyphicon glyphicon-arrow-up zheng' : 'glyphicon glyphicon-arrow-down fu';
                            truedata2[j].y1 = average_winrate > 0 ? 'glyphicon glyphicon-arrow-up zheng' : 'glyphicon glyphicon-arrow-down fu';
                        }
                    }
                }
                var delStrategy=[],a= 0,runStrategy=[],b= 0,stopStrategy=[],c=0;
                angular.forEach(truedata2, function (item, index) {
                    /*if (item.status == -2) {
                     item.color = 'tdel';
                     item.a = 3;
                     $scope.sHui++;
                     delStrategy[a++]=item;
                     }*/
                    if (item.status == 2) {
                        //a.push(item);
                        item.color = 'run';
                        $scope.sRun++;
                        item.a = 1;
                        runStrategy[b++]=item;
                    }
                    if (item.status == 3) {
                        item.color = 'stop';
                        $scope.sStop++;
                        item.a = 2;
                        stopStrategy[c++]=item;
                    }
                })

                runStrategy.sort(function(a,b){return b.yeild-a.yeild;});
                stopStrategy.sort(function(a,b){return b.yeild-a.yeild;});

                var truedata1=[],d=0;
                //console.log(runStrategy[2])
                for(var i=0;i<runStrategy.length;i++){
                    truedata1[d++]=runStrategy[i];
                }
                for(var j=0;j<stopStrategy.length;j++){
                    truedata1[d++]=stopStrategy[j]
                }
                //console.log(truedata1)

                $scope.trust=truedata1;
                $('#container').hide();


                var symbolList = [];
                for (var i = 0; i < $scope.trust.length; i++) {
                    if (symbolList.indexOf($scope.trust[i].symbol) == -1) {
                        symbolList.push($scope.trust[i].symbol)
                    }
                }
                var symbolList1=[];
                for (var i = 0; i < symbolList.length; i++) {
                    if (symbolList1.indexOf(symbolList[i]) == -1) {
                        symbolList1.push(symbolList[i])
                    }
                }
                $scope.symbolList = symbolList1;
                //console.log($scope.symbolList)

                //console.log($scope.key)


            }

            //$scope.trust=truedata2;
        }

        //MA5
        function averline5(data){
            var averline5 = [];
            for (var i = data.length - 1; i >= 4; i--) {
                var aver = data[i].close, n = 0;
                for (var j = i; n < 4; j--) {
                    aver = aver + data[j - 1].close;
                    n++;
                }
                averline5.push({
                    'average': aver / 5,
                    "x": data[i].x,
                    "y": aver / 5,
                })
            }
            averline5 = $filter('orderBy')(averline5, 'x');
            return averline5;
        }

        //MA10

     function averline10(data){
         var averline10 = [];
         for (var i = data.length - 1; i >= 9; i--) {
             var aver10 = data[i].close, n = 0;
             for (var j = i; n < 9; j--) {
                 aver10 = aver10 + data[j - 1].close;
                 n++;
             }
             averline10.push({
                 'average': aver10 / 10,
                 "x": data[i].x,
                 "y": aver10 / 10,
             })
         }

         averline10 = $filter('orderBy')(averline10, 'x');
         return averline10;
     }

        //MA30
        function averline30(data){
            var averline30 = [];
            for (var i = data.length - 1; i >= 29; i--) {
                var aver30 = data[i].close, n = 0;
                for (var j = i; n < 29; j--) {
                    aver30 = aver30 + data[j - 1].close;
                    n++;
                }
                averline30.push({
                    'average': aver30 / 30,
                    "x": data[i].x,
                    "y": aver30 / 30,
                })
            }
            averline30 = $filter('orderBy')(averline30, 'x');
            return averline30;
        }

          //MA60
       function averline60(data){
           var averline60 = [];
           for (var i = data.length - 1; i >= 59; i--) {
               var aver60 = data[i].close, n = 0;
               for (var j = i; n < 59; j--) {
                   aver60 = aver60 + data[j - 1].close;
                   n++;
               }
               averline60.push({
                   'average': aver60 / 60,
                   "x": data[i].x,
                   "y": aver60 / 60,
               })
           }
           averline60 = $filter('orderBy')(averline60, 'x');
           return averline60;
       }


        $scope.key = 'D1_AG';
        $scope.chartJson =function(){
            var exchagne1,charrJson1=[],volume=[],latest=[],key,line5=[],line10=[],line30=[],line60=[];
            var marketData=[]
            key=$scope.key[0]+$scope.key[1];
            if(key == "D1" || key == 'D6'){
                exchagne1 = 'CSRPME'
            }
            else if(key == 'IF' || key == 'IC'){
                exchagne1 ='CTP'
            }
            else if(key == 'bt'){
                exchagne1 = 'OKCoin'
            }
            $http.get(constantUrl + 'datas/', {
                    params: {
                        "type": 'bar',
                        "exchange": exchagne1,
                        //"exchange": "CTP",
                        "symbol": $scope.key,
                        //"symbol": "IF",
                        "start": getNowFormatDate(),
                        "end": $filter('date')(new Date((new Date(getNowFormatDate())).setDate((new Date(getNowFormatDate())).getDate() + 1)), 'yyyy-MM-dd')
                    },
                    headers: {
                        'Authorization': 'token ' + $cookieStore.get('user').token
                    }
                })
                .success(function (data) {
                    marketData=data;
                    draw(marketData)

                })
                .error(function(){
                    $http.get(constantUrl + 'datas/', {
                            params: {
                                "type": 'bar',
                                "exchange": exchagne1,
                                "symbol": $scope.key,
                                "start": $filter('date')(new Date((new Date(getNowFormatDate())).setDate((new Date(getNowFormatDate())).getDate() -1)), 'yyyy-MM-dd'),
                                "end":getNowFormatDate()
                            },
                            headers: {
                                'Authorization': 'token ' + $cookieStore.get('user').token
                            }
                        })
                        .success(function (data) {
                            marketData=data;

                            draw(marketData);

                        });
                })
            $timeout(function(){
                $scope.chartJson();
            },60000);
        }
        $scope.chartJson();


        function draw(marketData){
            var charrJson1=[],volume=[],latest=[],key,line5=[],line10=[],line30=[],line60=[];
            angular.forEach(marketData, function (data, index) {
                charrJson1.push({
                    "x": data.datetime,
                    "y": data.close,
                    'low': data.low,
                    'high': data.high,
                    'close': data.close,
                    'open': data.open,
                    'volume': data.volume
                });
                volume.push({
                    "x": data.datetime,
                    "y": data.volume,
                    'low': data.low,
                    'high': data.high,
                    'close': data.close,
                    'open': data.open,
                    'volume': data.volume
                })
            });

            latest[0]=charrJson1[charrJson1.length-1].close;
            latest[1]=charrJson1[volume.length-1].volume;
            $scope.close=latest[0];
            $scope.volume = latest[1]
            line5=averline5(charrJson1);
            line10=averline10(charrJson1);
            line30=averline30(charrJson1);
            line60=averline60(charrJson1);
            Highcharts.setOptions({
                global: {
                    useUTC: false
                }
            });
            $('#highchart_view').highcharts('StockChart', {

                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },

                plotOptions: {
                    series: {
                        turboThreshold: 0,
                    },
                    candlestick: { //红涨绿跌
                        color: '#33AA11',
                        upColor: '#DD2200',
                        lineColor: '#33AA11',
                        upLineColor: '#DD2200',
                        maker: {
                            states: {
                                hover: {
                                    enabled: false,
                                }
                            }
                        }
                    },
                },
                tooltip: {
                    useHTML: true,
                    xDateFormat: "%Y-%m-%d %H:%M:%S",
                    valueDecimals: 2,
                    backgroundColor: '#eeeeee',   // 背景颜色
                    borderColor: '#ccc',         // 边框颜色
                    borderRadius: 10,             // 边框圆角
                    borderWidth: 1,               // 边框宽度
                    shadow: true,                 // 是否显示阴影
                    animation: true,               // 是否启用动画效果
                },
                legend: {
                    enabled: true,
                    align: 'right',
                    verticalAlign: 'top',
                    x: 0,
                    y: 0
                },
                yAxis: [{
                    labels: {
                        align: 'right',
                        x: -3
                    },
                    title: {
                        text: '价格'
                    },
                    lineWidth: 1,
                    height:'55%'

                }, {
                    labels: {
                        align: 'right',
                        x: -3
                    },
                    title: {
                        text: '成交量'
                    },
                    opposite: true,
                    offset: 0,
                    height: '30%',
                    top: '60%'
                }],
                rangeSelector: {
                    buttons: [{
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

                series: [{
                    type: 'spline',
                    name: 'MA5',
                    data: line5,
                    lineWidth: 1,
                    color: 'red',
                    visible: false
                },{
                    type: 'spline',
                    name: 'MA10',
                    data: line10,
                    lineWidth: 1,
                    color: 'yellow',
                    visible: false
                },{
                    type: 'spline',
                    name: 'MA30',
                    data: line30,
                    lineWidth: 1,
                    color: 'blue',
                    visible: false
                },{
                    type: 'spline',
                    name: 'MA60',
                    data: line60,
                    lineWidth: 1,
                    color: 'green',
                    visible: false
                },{
                    type:'candlestick',
                    name: '价格',
                    data: charrJson1,
                }, {
                    type: 'column',
                    data: volume,
                    name: '成交量',
                    yAxis: 1,
                    color: '#e6e843'

                }]
            });
        }


        //实盘模拟



        $scope.firm=function(){
            if(window.b ==1){
                return;
            }
            $scope.key1 = "D1_AG";
            $scope.chartJson2 =function(){
                var exchagne1,key,charrJson1=[],volume=[],latest=[],line5=[],line10=[],line30=[],line60=[];
                var marketData1=[]
                key=$scope.key1[0]+$scope.key1[1];
                if(key == "D1" || key == 'D6'){
                    exchagne1 = 'CSRPME'
                }
                else if(key == 'IF' || key == 'IC'){
                    exchagne1 ='CTP'
                }
                else if(key == 'bt'){
                    exchagne1 = 'OKCoin'
                }
                $http.get(constantUrl + 'datas/', {
                        params: {
                            "type": 'bar',
                            "exchange": exchagne1,
                            //"exchange": "CTP",
                            "symbol": $scope.key1,
                            //"symbol": "IF",
                            "start": getNowFormatDate(),
                            "end": $filter('date')(new Date((new Date(getNowFormatDate())).setDate((new Date(getNowFormatDate())).getDate() + 1)), 'yyyy-MM-dd')
                        },
                        headers: {
                            'Authorization': 'token ' + $cookieStore.get('user').token
                        }
                    })
                    .success(function (data) {
                        marketData1 = data;
                        console.log(marketData1)
                        draw1(marketData1)

                    })
                    .error(function(data){
                        $http.get(constantUrl + 'datas/', {
                                params: {
                                    "type": 'bar',
                                    "exchange": exchagne1,
                                    //"exchange": "CTP",
                                    "symbol": $scope.key1,
                                    //"symbol": "IF",
                                    "start": $filter('date')(new Date((new Date(getNowFormatDate())).setDate((new Date(getNowFormatDate())).getDate() - 1)), 'yyyy-MM-dd'),
                                    "end": getNowFormatDate()
                                },
                                headers: {
                                    'Authorization': 'token ' + $cookieStore.get('user').token
                                }
                            })
                            .success(function (data) {
                                marketData1 = data;

                                draw1(marketData1)

                            })
                    })
                $timeout(function(){
                    $scope.chartJson2();
                },60000);
            }
            $scope.chartJson2();

            function draw1(marketData1){
                var charrJson1=[],volume=[],latest=[],line5=[],line10=[],line30=[],line60=[];
                angular.forEach(marketData1, function (data, index) {
                    charrJson1.push({
                        "x": data.datetime,
                        "y": data.close,
                        'low': data.low,
                        'high': data.high,
                        'close': data.close,
                        'open': data.open,
                        'volume': data.volume
                    });
                    volume.push({
                        "x": data.datetime,
                        "y": data.volume,
                        'low': data.low,
                        'high': data.high,
                        'close': data.close,
                        'open': data.open,
                        'volume': data.volume
                    })
                });

                latest[0]=charrJson1[charrJson1.length-1].close;
                latest[1]=charrJson1[volume.length-1].volume;
                $scope.close1=latest[0];
                $scope.volume1 = latest[1]

                line5=averline5(charrJson1);
                line10=averline10(charrJson1);
                line30=averline30(charrJson1);
                line60=averline60(charrJson1);
                Highcharts.setOptions({
                    global: {
                        useUTC: false
                    }
                });

                $('#highchart_moni').highcharts('StockChart', {

                    credits: {
                        enabled: false
                    },
                    exporting: {
                        enabled: false
                    },

                    plotOptions: {
                        series: {
                            turboThreshold: 0,
                        },
                        candlestick: { //红涨绿跌
                            color: '#33AA11',
                            upColor: '#DD2200',
                            lineColor: '#33AA11',
                            upLineColor: '#DD2200',
                            maker: {
                                states: {
                                    hover: {
                                        enabled: false,
                                    }
                                }
                            }
                        },
                    },
                    tooltip: {
                        useHTML: true,
                        xDateFormat: "%Y-%m-%d %H:%M:%S",
                        valueDecimals: 2,
                        backgroundColor: '#eeeeee',   // 背景颜色
                        borderColor: '#ccc',         // 边框颜色
                        borderRadius: 10,             // 边框圆角
                        borderWidth: 1,               // 边框宽度
                        shadow: true,                 // 是否显示阴影
                        animation: true,               // 是否启用动画效果
                    },
                    legend: {
                        enabled: true,
                        align: 'right',
                        verticalAlign: 'top',
                        x: 0,
                        y: 0
                    },
                    yAxis: [{
                        labels: {
                            align: 'right',
                            x: -3
                        },
                        title: {
                            text: '价格'
                        },
                        lineWidth: 1,
                        height:'55%'

                    }, {
                        labels: {
                            align: 'right',
                            x: -3
                        },
                        title: {
                            text: '成交量'
                        },
                        opposite: true,
                        offset: 0,
                        height: '30%',
                        top: '60%'
                    }],
                    rangeSelector: {
                        buttons: [{
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
                    series: [{
                        type: 'spline',
                        name: 'MA5',
                        data: line5,
                        lineWidth: 1,
                        color: 'red',
                        visible: false
                    },{
                        type: 'spline',
                        name: 'MA10',
                        data: line10,
                        lineWidth: 1,
                        color: 'yellow',
                        visible: false
                    },{
                        type: 'spline',
                        name: 'MA30',
                        data: line30,
                        lineWidth: 1,
                        color: 'blue',
                        visible: false
                    },{
                        type: 'spline',
                        name: 'MA60',
                        data: line60,
                        lineWidth: 1,
                        color: 'green',
                        visible: false
                    },{
                        type:'candlestick',
                        name: '价格',
                        data: charrJson1,

                    }, {
                        type: 'column',
                        data: volume,
                        name: '成交量',
                        yAxis: 1,
                        color: '#e6e843'

                    }]
                });

            }

            var falsedata2=[];   /*存放没有被删除的策略*/
            delFirm=[];
            for(var i=0; i<falsedata.length; i++){
                if(falsedata[i].status ==2 || falsedata[i].status == 3){
                    falsedata2.push(falsedata[i]);
                }
                else{
                    delFirm.push(falsedata[i]);
                }
            }
            for (var i = 0; i < falsedata2.length; i++) {
                falsedata2[i].class_name = "none"; //策略代码初始化
                var class_id1 = falsedata2[i].class_id;
                falsedata2[i].code_name = getcelve(class_id1);
            }
            var delStrategy1=[],a= 0,runStrategy1=[],b= 0,stopStrategy1=[];
            $scope.fRun = 0, $scope.fStop = 0,
                angular.forEach(falsedata2, function (item, index) {
                    if (item.status == 2) {
                        item.color = 'run';
                        item.a = 1;
                        $scope.fRun++;
                        runStrategy1[b++]=item;
                    }
                    if (item.status == 3) {
                        item.color = 'stop';
                        item.a = 2;
                        $scope.fStop++;
                        stopStrategy1[b++]=item;
                    }
                })

            var n2 = 0;
            var i = 0;
            var timeList2 = [];
            getTimes2(0)
            function getTimes2(i) {
               /* var url = 'dates/?date_type=data&exchange=' + falsedata2[i].exchange + '&symbol=' + falsedata2[i].symbol + '&type=bar';*/
                $http.get(constantUrl + 'dates/', {
                        params: {
                            "date_type": 'transaction',
                            "sty_id": falsedata2[i]._id
                        },
                        headers: {
                            'Authorization': 'token ' + $cookieStore.get('user').token
                        }
                    })
                    .success(function (data) {
                        //console.log(data)
                        timeList2[n2++] = data[data.length - 1];
                        i++;
                        if (i >= falsedata2.length) {
                            getIdDate2();
                            return;
                        }
                        getTimes2(i);
                    })
                    .error(function(data){
                        timeList2[n2++]=0;
                        i++;
                        if (i >= falsedata2.length) {
                            getIdDate2();
                            return;
                        }
                        getTimes2(i)
                    })
            }

            var IdDateList2 = [];
            function getIdDate2() {
                //console.log(timeList2)
                for (var i = 0; i < falsedata2.length; i++) {
                    var id = falsedata2[i]._id;
                    var sDate = timeList2[i];
                    var eDate = $filter('date')(new Date((new Date(timeList2[i])).setDate((new Date(timeList2[i])).getDate() + 1)), 'yyyy-MM-dd');
                    //console.log(id,sDate,eDate);
                    IdDateList2.push({
                        'id': id,
                        'sDate': sDate,
                        'eDate': eDate
                    })
                }
                //console.log(IdDateList2);
                getAllData2(0);
            }

            var i = 0;
            var allDataList2 = [];
            var m = 0;

            /**
             * 获取所有策略前一天的数据
             * @param i
             */
            function getAllData2(i) {
                $http.get(constantUrl + 'transactions/', {
                        params: {
                            "sty_id": IdDateList2[i].id,
                            "start": IdDateList2[i].sDate,
                            "end": IdDateList2[i].eDate
                        },
                        headers: {
                            'Authorization': 'token ' + $cookieStore.get('user').token
                        }
                    })
                    .success(function (data) {
                        allDataList2[m++] = data;
                        i++;
                        if (i >= IdDateList2.length) {

                            getAllNianHua2(0);
                            return;
                        }
                        getAllData2(i);
                    })
                    .error(function(data){
                        allDataList2[m++] = 0;
                        i++;
                        if (i >= IdDateList2.length) {
                            getAllNianHua2(0);
                            return;
                        }
                        getAllData2(i);
                    })
            }

            function getAllNianHua2(i) {
                var  a = new Array();
                var nowData = allDataList2[i];
                if(nowData == 0){
                    nowData=a
                }
                handledata(false, nowData, timeList2[i], IdDateList2[i].id);
                //console.log(IdDateList[i].id)
                //return;
                i++;
                if (i >= allDataList2.length) {
                    $timeout(function () {
                        putScreen2();
                    }, 1000);
                    //console.log($scope.trust);
                    return;
                }
                getAllNianHua2(i);
            }
            function putScreen2() {
                for (j = 0; j < falsedata2.length; j++) {
                    falsedata2[j].yeild = 0.00;
                    falsedata2[j].average_winrate = 0.00;
                }
                for (var i = 0; i < nianHuaList.length; i++) {
                    var id = nianHuaList[i].nowId;
                    var nianhua = nianHuaList[i].nianhua;
                    var average_winrate = nianHuaList[i].average_winrate;
                    //console.log(id,nianhua,average_winrate)
                    for (j = 0; j < falsedata2.length; j++) {
                        if (falsedata2[j]._id == id) {
                            falsedata2[j].yeild = nianhua;
                            falsedata2[j].average_winrate = average_winrate;
                            falsedata2[j].yeildColor = nianhua > 0 ? 'zheng' : 'fu';
                            falsedata2[j].yeildColor1 = average_winrate > 0 ? 'zheng' : 'fu';

                            falsedata2[j].y = nianhua > 0 ? 'glyphicon glyphicon-arrow-up zheng' : 'glyphicon glyphicon-arrow-down fu';
                            falsedata2[j].y1 = average_winrate > 0 ? 'glyphicon glyphicon-arrow-up zheng' : 'glyphicon glyphicon-arrow-down fu';

                        }
                    }
                }
                runStrategy1.sort(function(a,b){return b.yeild-a.yeild;});
                stopStrategy1.sort(function(a,b){return b.yeild-a.yeild;});
                //stopStrategy1.sort(sortBy('yeild', true, parseInt));
               /* console.log(runStrategy1)
                console.log(stopStrategy1)
*/
                var falsedata1=[],d=0;
                //console.log(runStrategy[2])
                for(var i=0;i<runStrategy1.length;i++){
                    falsedata1[d++]=runStrategy1[i];
                }
                for(var j=0;j<stopStrategy1.length;j++){
                    falsedata1[d++]=stopStrategy1[j]
                }
                //$('#container1').hide();
                $scope.flase=falsedata1;

                //for(var j=0;j<delStrategy1.length;j++){
                //    falsedata1[d++]=delStrategy1[j]
                //}
                //$scope.flase=[],$scope.histroyFlase=[];
                //for(var i=0;i<falsedata1.length;i++){
                //    if(falsedata1[i].status!=-2){
                //        $scope.flase[i]=falsedata1[i];
                //    }
                //    if(falsedata1[i].status==-2){
                //        $scope.histroyFlase.push(falsedata1[i])
                //        flaseSymbolList.push(falsedata1[i].symbol)
                //    }
                //
                //}
                //console.log(flaseSymbolList);
            /*    allSymbolList=trueSymbolList.concat(flaseSymbolList)
                //console.log(allSymbolList);
                var allSymbolList1=[];
                for(var i=0;i<allSymbolList.length;i++){
                    if(allSymbolList1.indexOf(allSymbolList[i])==-1){
                        allSymbolList1.push(allSymbolList[i])
                    }
                }
                $scope.allSymbolList=allSymbolList1;*/

                //$scope.flase = falsedata1;
                //实盘过滤
                var symbolList2 = [];

                for (var i = 0; i <$scope.flase.length; i++) {
                    if (symbolList2.indexOf( $scope.flase[i].symbol) == -1) {
                        symbolList2.push( $scope.flase[i].symbol)
                    }
                }
                var symbolList3=[];
                for (var i = 0; i < symbolList2.length; i++) {
                    if (symbolList3.indexOf(symbolList2[i]) == -1) {
                        symbolList3.push(symbolList2[i])
                    }
                }

                $scope.symbolList1 = symbolList3;
                $("#container1").hide()




            }

            //$scope.flase=falsedata2;

            window.b=1;
        }

        function handledata(flag, nowdata, nowDay, nowId) {
            //console.log(nowdata)
            //console.log(nowId,nowDay)
            // console.log(nowdata)
            var aloneshort = [];
            var alonebuy = [];
            if (flag) {
                for (var i = 0; i < nowdata.length; i++) { //保留已成交
                    if (nowdata[i].status == 0 || nowdata[i].status == -1) {
                        nowdata.splice(i, 1);
                        i = -1;
                    }
                }
            }
            if (nowdata.length == 0) {
                //console.log(nowId,nowDay,"今天截至目前还未成交.")
                trueRes(nowdata, nowId);
                return;
            }
            var hasNone = false; //判断今天是否有不配对平仓
            //console.log(nowdata)
            if (nowdata[0] == null) {
                return;
            }
            for (var i = 0; i < nowdata.length; i++) {
                if (nowdata[i].trans_type == "cover") {
                    if (i == 0 || nowdata[i - 1].trans_type != "short") {
                        hasNone = true;
                        break;
                    }
                }
                if (nowdata[i].trans_type == "sell") {
                    if (i == 0 || nowdata[i - 1].trans_type != "buy") {
                        hasNone = true;
                        break;
                    }
                }
            }
            if (!hasNone) {
                //console.log("没有不配对平仓，不获取单独开仓");
                trueRes(nowdata, nowId);
                return;
            }
            var yesday = getPreDay(nowDay);
            // console.log(yesday)
            //var url = "http://114.55.238.82:81/transactions/";
            //url = url + '?sty_id='+ this.props._id + '&start=' + yesday + '&end=' + this.props.choosedate;
            $http.get(constantUrl + 'transactions/', {
                    params: {
                        "sty_id": nowId,
                        "start": yesday,
                        "end": nowDay
                    },
                    headers: {
                        'Authorization': 'token ' + $cookieStore.get('user').token
                    }
                })
                .success(function (data) {
                    // console.log(data)
                    if (data[0] != null) {
                        if (flag) {
                            for (var i = 0; i < data.length; i++) { //保留已成交
                                if (data[i].status == 0 || data[i].status == -1) {
                                    data.splice(i, 1);
                                    i = -1;
                                }
                            }
                        }
                        for (var i = 0; i < data.length; i++) { //获取前一天所有单独short
                            if (data[i].trans_type == "short") {
                                if (i + 1 >= data.length || data[i + 1].trans_type != "cover") {
                                    aloneshort.push(data[i])
                                }
                            }
                            if (data[i].trans_type == "buy") { //获取前一天所有单独buy
                                if (i + 1 >= data.length || data[i + 1].trans_type != "sell") {
                                    alonebuy.push(data[i])
                                }
                            }
                        }


                    } else {
                        // console.log("前一天没有交易")
                    }
                    if (nowdata[nowdata.length - 1] == null) {
                        nowdata.splice(nowdata.length - 1, 1)
                    }
                    for (var i = 0; i < nowdata.length; i++) { //获取今天所有单独short
                        if (nowdata[i].trans_type == "short") {
                            if (i + 1 >= nowdata.length || nowdata[i + 1].trans_type != "cover") {
                                aloneshort.push(nowdata[i])
                            }
                        }
                        if (nowdata[i].trans_type == "buy") {
                            if (i + 1 >= nowdata.length || nowdata[i + 1].trans_type != "sell") {
                                alonebuy.push(nowdata[i])
                            }
                        }
                    }
                    for (var i = 0; i < nowdata.length; i++) {
                        if (nowdata[i].trans_type == "cover") {
                            if (i == 0 || nowdata[i - 1].trans_type != "short") {
                                var flag = false;
                                for (var j = aloneshort.length - 1; j >= 0; j--) {
                                    if (aloneshort[j].datetime < nowdata[i].datetime) { //截取这个时间之前最近的short
                                        flag = true;
                                        break;
                                    }
                                }
                                if (flag) {
                                    nowdata.splice(i, 0, aloneshort[j]);
                                    aloneshort.splice(j, 1);
                                } else {
                                    nowdata.splice(i, 1);
                                    //console.log("发现无配对平仓")
                                    i--;
                                }
                            }
                        }
                    }
                    //console.log(nowdata)
                    for (var i = 0; i < nowdata.length; i++) {
                        if (nowdata[i].trans_type == "sell") {
                            if (i == 0 || nowdata[i - 1].trans_type != "buy") {
                                var flag = false;
                                for (var j = alonebuy.length - 1; j >= 0; j--) {
                                    if (alonebuy[j].datetime < nowdata[i].datetime) { //截取这个时间之前最近的buy
                                        flag = true;
                                        break;
                                    }
                                }
                                if (flag) {
                                    nowdata.splice(i, 0, alonebuy[j]);
                                    alonebuy.splice(j, 1);
                                } else {
                                    nowdata.splice(i, 1);
                                    //console.log("发现无配对平仓")
                                    i--;
                                }
                            }
                        }
                    }
                    //console.log(nowdata.length)
                    trueRes(nowdata, nowId);
                    //console.log(nowdata)


                })
        }

        function trueRes(nowdata, nowId) {
            var alldata = [];
            var alldata2 = [];
            for (var i = 0; i < nowdata.length; i++) { //清除未配对开仓
                if (nowdata[i].trans_type == "short") {
                    if (i == nowdata.length - 1 || nowdata[i + 1].trans_type != "cover") {
                        nowdata.splice(i, 1);
                        i--;
                    }
                } else if (nowdata[i].trans_type == "buy") {
                    if (i == nowdata.length - 1 || nowdata[i + 1].trans_type != "sell") {
                        nowdata.splice(i, 1);
                        i--;
                    }
                }
            }
            var data = nowdata;
            for (var i in data) {
                alldata[i] = data[i];
            }
            //console.log(alldata)
            /**
             *    删除"0"数据并保存
             */
            function delzero(data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].price == 0) {
                        var flag = data[i].trans_type;
                        data.splice(i);
                        if (flag == "cover" || flag == "sell") {
                            data.splice(i - 1);
                        } else {
                            data.splice(i);
                        }
                        i = -1;
                    }
                }
            }

            delzero(data)
            //console.log("数据处理完成")
            if (data.length < 2) {
                //alert("今天截至目前还未成交...")
            } else {
                var min = data[0].datetime;
                var max = data[0].datetime;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].datetime > max) {
                        max = data[i].datetime
                    }
                    if (data[i].datetime < min) {
                        min = data[i].datetime
                    }
                }
                stime = min;
                etime = max;
            }
            // console.log(data)
            var num = parseInt(alldata.length / 2);
            //console.log(alldata)
            //console.log(num)
            for (var i = 0; i < num; i++) {
                //console.log(alldata[2*i].symbol)
                //console.log(alldata)

                //console.log(alldata[2*i].trans_type,alldata[2*i+1].trans_type)
                if (alldata[2 * i].trans_type == "short") { //看空
                    alldata2.push({
                        "direction": "看空",
                        "openprice": alldata[2 * i].price,
                        "opentime": alldata[2 * i].datetime,
                        "openserialno": alldata[2 * i].serialno,
                        "closeprice": alldata[2 * i + 1].price,
                        "closetime": alldata[2 * i + 1].datetime,
                        "closeserialno": alldata[2 * i + 1].serialno,
                        "time": alldata[2 * i + 1].datetime,
                        "open": alldata[2 * i].datetime,
                        "test": gettest(alldata[2 * i + 1].price, alldata[2 * i].price,alldata[2*i].symbol,alldata[2*i].volume),
                        "notestpal": notest("看空", alldata[2 * i + 1].price, alldata[2 * i].price,alldata[2*i].volume,alldata[2*i].symbol),
                        "pal": Number((notest("看空", alldata[2 * i + 1].price, alldata[2 * i].price,alldata[2*i].volume,alldata[2*i].symbol) - gettest(alldata[2 * i + 1].price, alldata[2 * i].price,alldata[2*i].symbol,alldata[2*i].volume)).toFixed(6)),
                        "yeild": Number(((notest("看空", alldata[2 * i + 1].price, alldata[2 * i].price,alldata[2*i].volume,alldata[2*i].symbol) - gettest(alldata[2 * i + 1].price, alldata[2 * i].price,alldata[2*i].symbol,alldata[2*i].volume)) / alldata[2 * i].price/alldata[2*i].volume).toFixed(6))
                    })
                } else {
                    if (alldata[2 * i].trans_type == "buy") {
                        alldata2.push({
                            "direction": "看多",
                            "openprice": alldata[2 * i].price,
                            "opentime": alldata[2 * i].datetime,
                            "openserialno": alldata[2 * i].serialno,
                            "closeprice": alldata[2 * i + 1].price,
                            "closetime": alldata[2 * i + 1].datetime,
                            "closeserialno": alldata[2 * i + 1].serialno,
                            "time": alldata[2 * i + 1].datetime,
                            "open": alldata[2 * i].datetime,
                            "test": gettest(alldata[2 * i + 1].price, alldata[2 * i].price,alldata[2*i].symbol,alldata[2*i].volume),
                            "notestpal": notest("看多", alldata[2 * i + 1].price, alldata[2 * i].price,alldata[2*i].volume,alldata[2*i].symbol),
                            "pal": Number((notest("看多", alldata[2 * i + 1].price, alldata[2 * i].price,alldata[2*i].volume,alldata[2*i].symbol) - gettest(alldata[2 * i + 1].price, alldata[2 * i].price,alldata[2*i].symbol,alldata[2*i].volume)).toFixed(6)),
                            "yeild": Number(((notest("看多", alldata[2 * i + 1].price, alldata[2 * i].price,alldata[2*i].volume,alldata[2*i].symbol) - gettest(alldata[2 * i + 1].price, alldata[2 * i].price,alldata[2*i].symbol,alldata[2*i].volume)) / alldata[2 * i].price/alldata[2*i].volume).toFixed(6))

                        })
                    } else {
                        console.log("配对出错")
                    }
                }
            }

            var total_yeild = 0;
            var zheng = 0;
            for (var i = 0; i < alldata2.length; i++) {
                total_yeild += alldata2[i].yeild;
                if (alldata2[i].pal > 0) {
                    zheng++;
                }
            }
            var average_winrate = alldata2.length == 0 ? 0 : (zheng / alldata2.length) * 100;
            nianHuaList.push({
                'average_winrate': Number(average_winrate).toFixed(2),
                'nowId': nowId,
                'nianhua': Number(total_yeild * 250).toFixed(4)
            })
        }
        function getPreDay(s) {
            var y = parseInt(s.substr(0, 4), 10);
            var m = parseInt(s.substr(5, 2), 10) - 1;
            var d = parseInt(s.substr(8, 2), 10);
            var dt = new Date(y, m, d - 1);
            y = dt.getFullYear();
            m = dt.getMonth() + 1;
            d = dt.getDate();
            m = m > 10 ? m : "0" + m;
            d = d > 10 ? d : "0" + d;
            return y + "-" + m + "-" + d;
        }
        //计算手续费，无手续费盈亏
        function gettest(a,b,s,v) {
            var symbol = s[0] + s[1];
            //console.log(symbol)
            var charge;
            if (symbol == "IF" || symbol == "IC" || symbol == "IH") {
                charge = 0.00092;
            }
            if (symbol == "D1") {
                charge = 0.00035;
            }
            if (symbol == "D6") {
                charge = 0.00035;
            }
            if (symbol == "bt") {
                charge = 0.002;
                return Number(((a+b)*charge*v*0.01).toFixed(6));
            }
            var test = (a + b) * charge * v;
            return Number((test).toFixed(6));
        }
        function notest(flag, a, b,v,s) {
            var test;
            var symbol = s[0] + s[1];
            if (flag == "看多") {
                //console.log("看多");
                test = a - b;
            } else {
                //console.log("看空");
                test = b - a;
            }
            if(symbol == "bt"){
                return Number((test*v*0.01).toFixed(6));
            }
            test = test * v;
            return Number((test).toFixed(6));
        }

        //排序

        //历史回测
        $scope.histroy = [],histroy = [];
        $scope.getHisSelect=function(){
            if(window.c==1){
                return;
            }
            $scope.hRun = 0, $scope.hStop = 0;
            var histroy = []
            $http.get(constantUrl + "btstrategys/", {
                    headers: {
                        'Authorization': 'token ' + $cookieStore.get('user').token
                    }
                })
                .success(function (data) {
                    angular.forEach(data,function(item,index){
                        if(item.status == 4){
                            item.color='stop';
                            $scope.hStop++;
                            histroy.push(item)
                        }
                    })
                    for (var i = 0; i < histroy.length; i++) {
                        var class_id = histroy[i].class_id;
                        //var status = data[i].status;
                        histroy[i].code_name = getcelve(class_id);
                    }
                    var timeList=[],n= 0,i=0;
                    getTimes(0);
                    function getTimes(i){
                        $http.get(constantUrl + 'dates/', {
                            params: {
                                "date_type": 'transaction',
                                "sty_id": histroy[i]._id
                            },
                            headers: {
                                'Authorization': 'token ' + $cookieStore.get('user').token
                            }
                        })
                            .success(function(data){
                                 timeList[n++] = data[data.length-1];
                                i++;
                                if (i >= histroy.length) {
                                    getIdDate();
                                    return;
                                }
                                getTimes(i);
                            })
                            .error(function(data){
                                timeList[n++]=0;
                                i++;
                                if (i >= histroy.length) {
                                    getIdDate();
                                    return;
                                }
                                getTimes(i);
                            })
                    }

                    var IdDateList=[];
                    function getIdDate() {
                        for (var i = 0; i < histroy.length; i++) {
                            var id = histroy[i]._id;
                            var sDate = timeList[i];
                            var eDate = $filter('date')(new Date((new Date(timeList[i])).setDate((new Date(timeList[i])).getDate() + 1)), 'yyyy-MM-dd');
                            //console.log(id,sDate,eDate);
                            IdDateList.push({
                                'id': id,
                                'sDate': sDate,
                                'eDate': eDate
                            })
                        }
                        getAllData(0);
                        //console.log(IdDateList)
                    }


                    var i = 0;
                    var allDataList = [];
                    var m = 0;

                    /**
                     * 获取所有策略前一天的数据
                     * @param i
                     */

                    function getAllData(i) {
                        var nothing = new Array();
                        $http.get(constantUrl + 'transactions/', {
                                params: {
                                    "sty_id": IdDateList[i].id,
                                    "start": IdDateList[i].sDate,
                                    "end": IdDateList[i].eDate
                                },
                                headers: {
                                    'Authorization': 'token ' + $cookieStore.get('user').token
                                }
                            })
                            .success(function (data) {
                                //console.log(data)
                                allDataList[m++] = data;
                                i++;
                                if (i >= IdDateList.length) {
                                    getAllNianHua(0);
                                    return;
                                }
                                getAllData(i);
                            })
                            .error(function(data){
                                allDataList[m++] =nothing;
                                i++;
                                if (i >= IdDateList.length) {
                                    getAllNianHua(0);
                                    return;
                                }
                                getAllData(i);
                            })
                    }



                    /**
                     * 获取所有策略前一天的年化收益率
                     * @param i
                     */
                    function getAllNianHua(i) {
                        var nowData = allDataList[i];
                        //console.log(nowData);
                        handledata(false, nowData, timeList[i], IdDateList[i].id);
                        //console.log(IdDateList[i].id)
                        //return;
                        i++;
                        if (i >= allDataList.length) {
                            $timeout(function () {
                                putScreen();
                            }, 500);
                            //console.log($scope.trust);
                            return;
                        }
                        //console.log(i)
                        getAllNianHua(i);
                    }

                    function putScreen() {
                        //console.log(nianHuaList)
                        for (var i = 0; i < nianHuaList.length; i++) {
                            var id = nianHuaList[i].nowId;
                            var nianhua = nianHuaList[i].nianhua;
                            var average_winrate = nianHuaList[i].average_winrate;
                            //console.log(id,nianhua,average_winrate)
                            for (j = 0; j < histroy.length; j++) {
                                if (histroy[j]._id == id) {
                                    histroy[j].yeild = nianhua;
                                    histroy[j].average_winrate = average_winrate;
                                    histroy[j].yeildColor = nianhua > 0 ? 'zheng' : 'fu';
                                    histroy[j].yeildColor1 = average_winrate > 0 ? 'zheng' : 'fu';

                                    histroy[j].y = nianhua > 0 ? 'glyphicon glyphicon-arrow-up zheng' : 'glyphicon glyphicon-arrow-down fu';
                                    histroy[j].y1 = average_winrate > 0 ? 'glyphicon glyphicon-arrow-up zheng' : 'glyphicon glyphicon-arrow-down fu';
                                }
                            }
                        }
                        //histroyDel.sort(function(a,b){return b.yeild-a.yeild;});
                        //console.log(histroyDel)
                        //histroyStop.sort(function(a,b){return b.yeild-a.yeild;});

                       /* angular.forEach(histroy, function (item, index) {
                            if (item.status == -2) {
                                item.color = 'hdel';
                                item.a = 2;
                                $scope.hHui++;
                                histroyDel.push(histroy)
                            }
                            if (item.status == 4) {
                                item.color = 'stop';
                                item.a = 1;
                                $scope.hStop++;
                                histroyStop.push(histroy)
                            }
                        });
                        console.log(histroyStop)
                        histroyDel.sort(function(a,b){return b.yeild-a.yeild;});
                        histroyStop.sort(function(a,b){return b.yeild-a.yeild;});
                       var histroy1=[],k=0;
                        for(var i=0;i<histroyStop.length;i++){
                            histroy1.push(histroyStop[i])
                        }
                        for(var i=0;i<histroyDel.length;i++){
                            histroy1.push(histroyDel[i])
                        }


                        //histroy.sort(function(a,b){return b.yeild-a.yeild;});
                        $scope.histroy = histroy1;*/


                        histroy.sort(function(a,b){return b.yeild-a.yeild;});

                        $scope.histroy = histroy;

                        $("#container3").hide()
                        //console.log(histroy1)
                    }

                    //$scope.histroy = histroy;



                    var histroySymbolList = [];

                    for (var i = 0; i < histroy.length; i++) {
                        histroySymbolList.push(histroy[i].symbol)
                    }
                    var  histroySymbolList1=[];

                    for (var i = 0; i < histroySymbolList.length; i++) {
                        if (histroySymbolList1.indexOf(histroySymbolList[i]) == -1) {
                            histroySymbolList1.push(histroySymbolList[i])
                        }
                    }
                    $scope.histroySymbolList = histroySymbolList1;

                    $scope.key2 = $scope.histroySymbolList[0];
                    window.c=1;
                });

        };
        //getHisSelect()

        //历史交易

        $scope.histroyDeals=function(){
            $scope.key4 = "D1_AG";



            var k= 0,n= 0,j= 0,delTrustSymbol=[],delFirmSymbol=[],delAllSymbol=[];
            $scope.sHui=delTrust.length;
            for (var i = 0; i < delTrust.length; i++) {
                delTrustSymbol[n++]=delTrust[i].symbol;
                delTrust[i].color='tdel'
                var class_id = delTrust[i].class_id;
                delTrust[i].code_name = getcelve(class_id);
            }


            $scope.fHui=delFirm.length;
            //console.log(delFirm)
            for(var i=0;i<delFirm.length;i++){
                delFirmSymbol[j++]=delFirm[i].symbol;
                delFirm[i].color='sdel';
                var class_id1 = delFirm[i].class_id;
                delFirm[i].code_name = getcelve(class_id1);
            }
            delTrustSymbol=delTrustSymbol.concat(delFirmSymbol);
            for(var i=0;i<delTrustSymbol.length;i++){
                if(delAllSymbol.indexOf(delTrustSymbol[i]) == -1){
                    delAllSymbol.push(delTrustSymbol[i])
                }
            }
            $scope.allSymbolList = delAllSymbol


            var n = 0,i=0;
            var timeList = [];
            getTimes(0);
            //获取所有策略最后一天的时间
            function getTimes(i) {
                $http.get(constantUrl + 'dates/', {
                        params: {
                            "date_type": 'transaction',
                            "sty_id": delTrust[i]._id
                        },
                        headers: {
                            'Authorization': 'token ' + $cookieStore.get('user').token
                        }
                    })
                    .success(function (data) {
                        timeList[n++] = data[data.length - 1];
                        i++;
                        if (i >= delTrust.length) {
                            getIdDate();
                            return;
                        }
                        getTimes(i);
                    })
                    .error(function(data){
                        //console.log(truedata[i]._id);
                        timeList[n++]=0;
                        i++;
                        if (i >= delTrust.length) {
                            getIdDate();
                            return;
                        }
                        getTimes(i);
                    })
            }
            //console.log(timeList)

            //把所有策略id、开始时间、结束时间放进一个数组
            var IdDateList=[];
            function getIdDate() {
                for (var i = 0; i < delTrust.length; i++) {
                    var id = delTrust[i]._id;
                    var sDate = timeList[i];
                    var eDate = $filter('date')(new Date((new Date(timeList[i])).setDate((new Date(timeList[i])).getDate() + 1)), 'yyyy-MM-dd');
                    //console.log(id,sDate,eDate);
                    IdDateList.push({
                        'id': id,
                        'sDate': sDate,
                        'eDate': eDate
                    })
                }
                getAllData(0);
            }
            //console.log(IdDateList);
            var i = 0;
            var allDataList = [];
            var m = 0;

            /**
             * 获取所有策略前一天的数据
             * @param i
             */

            function getAllData(i) {
                var nothing = new Array();
                $http.get(constantUrl + 'transactions/', {
                        params: {
                            "sty_id": IdDateList[i].id,
                            "start": IdDateList[i].sDate,
                            "end": IdDateList[i].eDate
                        },
                        headers: {
                            'Authorization': 'token ' + $cookieStore.get('user').token
                        }
                    })
                    .success(function (data) {
                        //console.log(data)
                        allDataList[m++] = data;
                        i++;
                        if (i >= IdDateList.length) {
                            getAllNianHua(0);
                            return;
                        }
                        getAllData(i);
                    })
                    .error(function(data){
                        allDataList[m++] =nothing;
                        i++;
                        if (i >= IdDateList.length) {
                            getAllNianHua(0);
                            return;
                        }
                        getAllData(i);
                    })
            }

            /**
             * 获取所有策略前一天的年化收益率
             * @param i
             */
            function getAllNianHua(i) {
                var nowData = allDataList[i];
                //console.log(nowData);
                handledata(true, nowData, timeList[i], IdDateList[i].id);
                //console.log(IdDateList[i].id)
                //return;
                i++;
                if (i >= allDataList.length) {
                    $timeout(function () {
                        putScreen();
                    }, 500);
                    //console.log($scope.trust);
                    return;
                }
                //console.log(i)
                getAllNianHua(i);
            }

            function putScreen() {
                //console.log(nianHuaList)
                for (var i = 0; i < nianHuaList.length; i++) {
                    var id = nianHuaList[i].nowId;
                    var nianhua = nianHuaList[i].nianhua;
                    var average_winrate = nianHuaList[i].average_winrate;
                    //console.log(id,nianhua,average_winrate)
                    for (j = 0; j < delTrust.length; j++) {
                        if (delTrust[j]._id == id) {
                            delTrust[j].yeild = nianhua;
                            delTrust[j].average_winrate = average_winrate;
                            delTrust[j].yeildColor = nianhua > 0 ? 'zheng' : 'fu';
                            delTrust[j].yeildColor1 = average_winrate > 0 ? 'zheng' : 'fu';

                            delTrust[j].y = nianhua > 0 ? 'glyphicon glyphicon-arrow-up zheng' : 'glyphicon glyphicon-arrow-down fu';
                            delTrust[j].y1 = average_winrate > 0 ? 'glyphicon glyphicon-arrow-up zheng' : 'glyphicon glyphicon-arrow-down fu';
                        }
                    }
                }
                delTrust.sort(function(a,b){return b.yeild-a.yeild;});
                //delTrust=$filter('orderBy')(delTrust,'-yeild');
                $scope.histroyTrust=delTrust;
                $("#container2").hide()

            }

            var n2 = 0;
            var i = 0;
            var timeList2 = [];
            getTimes2(0)
            //console.log(delFirm)
            function getTimes2(i) {
                $http.get(constantUrl + 'dates/', {
                        params: {
                            "date_type": 'transaction',
                            "sty_id": delFirm[i]._id
                        },
                        headers: {
                            'Authorization': 'token ' + $cookieStore.get('user').token
                        }
                    })
                    .success(function (data) {
                        timeList2[n2++] = data[data.length - 1];
                        i++;
                        if (i >= delFirm.length) {
                            getIdDate2();
                            return;
                        }
                        getTimes2(i);
                    })
                    .error(function(data){
                        timeList2[n2++]=0;
                        i++;
                        if (i >= delFirm.length) {
                            getIdDate2();
                            return;
                        }
                        getTimes2(i)
                    })
            }

            var IdDateList2 = [];
            function getIdDate2() {
                //console.log(timeList2)
                for (var i = 0; i < delFirm.length; i++) {
                    var id = delFirm[i]._id;
                    var sDate = timeList2[i];
                    var eDate = $filter('date')(new Date((new Date(timeList2[i])).setDate((new Date(timeList2[i])).getDate() + 1)), 'yyyy-MM-dd');
                    //console.log(id,sDate,eDate);
                    IdDateList2.push({
                        'id': id,
                        'sDate': sDate,
                        'eDate': eDate
                    })
                }
                //console.log(IdDateList2);
                getAllData2(0);
            }
            console.log(IdDateList2)
            var i = 0;
            var allDataList2 = [];
            var p = 0;

            /**
             * 获取所有策略前一天的数据
             * @param i
             */
            function getAllData2(i) {
                $http.get(constantUrl + 'transactions/', {
                        params: {
                            "sty_id": IdDateList2[i].id,
                            "start": IdDateList2[i].sDate,
                            "end": IdDateList2[i].eDate
                        },
                        headers: {
                            'Authorization': 'token ' + $cookieStore.get('user').token
                        }
                    })
                    .success(function (data) {
                        allDataList2[p++] = data;
                        //console.log(allDataList2[m][0])
                        i++;
                        if (i >= IdDateList2.length) {

                            getAllNianHua2(0);
                            return;
                        }
                        getAllData2(i);
                    })
                    .error(function(data){
                        allDataList2[p++] = 0;
                        i++;
                        if (i >= IdDateList2.length) {

                            getAllNianHua2(0);
                            return;
                        }
                        getAllData2(i);
                    })
            }

            function getAllNianHua2(i) {
                var nowData = allDataList2[i];

                //console.log(nowData);
                handledata(false, nowData, timeList2[i], IdDateList2[i].id);
                //console.log(IdDateList[i].id)
                //return;
                i++;
                if (i >= allDataList2.length) {
                    $timeout(function () {
                        putScreen2();
                    }, 800);
                    //console.log($scope.trust);
                    return;
                }
                getAllNianHua2(i);
            }
            function putScreen2() {
                for (j = 0; j < delFirm.length; j++) {
                    delFirm[j].yeild = 0.00;
                    delFirm[j].average_winrate = 0.00;
                }
                for (var i = 0; i < nianHuaList.length; i++) {
                    var id = nianHuaList[i].nowId;
                    var nianhua = nianHuaList[i].nianhua;
                    var average_winrate = nianHuaList[i].average_winrate;
                    //console.log(id,nianhua,average_winrate)
                    for (j = 0; j < delFirm.length; j++) {
                        if (delFirm[j]._id == id) {

                            delFirm[j].yeild = nianhua;
                            delFirm[j].average_winrate = average_winrate;
                            delFirm[j].yeildColor = nianhua > 0 ? 'zheng' : 'fu';
                            delFirm[j].yeildColor1 = average_winrate > 0 ? 'zheng' : 'fu';

                            delFirm[j].y = nianhua > 0 ? 'glyphicon glyphicon-arrow-up zheng' : 'glyphicon glyphicon-arrow-down fu';
                            delFirm[j].y1 = average_winrate > 0 ? 'glyphicon glyphicon-arrow-up zheng' : 'glyphicon glyphicon-arrow-down fu';

                        }
                    }
                }
                //falsedata = $filter('orderBy')(falsedata, 'a');
               /* for (var i = 0; i < delFirm.length; i++) {
                    delFirm[i].class_name = "none"; //策略代码初始化
                    var class_id1 = delFirm[i].class_id;
                    delFirm[i].code_name = getcelve(class_id1);
                }*/

                //var delStrategy1=[],a= 0,runStrategy1=[],b= 0,stopStrategy1=[];

                /*$scope.fRun = 0, $scope.fStop = 0,
                    angular.forEach(delFirm, function (item, index) {
                        //if (item.status == -2) {
                        //
                        //    //c.push(item);
                        //    item.color = 'sdel';
                        //    item.a = 3;
                        //    $scope.fHui++;
                        //    delStrategy1[a++]=item;
                        //}
                        if (item.status == 2) {
                            //a.push(item);
                            item.color = 'run';
                            item.a = 1;
                            $scope.fRun++;
                            runStrategy1[b++]=item;
                        }
                        if (item.status == 3) {
                            item.color = 'stop';
                            item.a = 2;
                            $scope.fStop++;
                            stopStrategy1[b++]=item;
                        }
                    })*/
                //delStrategy1=$filter('orderBy')(delStrategy1,'-yeild');
                delFirm=$filter('orderBy')(delFirm,'-yeild');
                $scope.histroyFlase=delFirm;



               /* allSymbolList=trueSymbolList.concat(flaseSymbolList)
                //console.log(allSymbolList);
                var allSymbolList1=[];
                for(var i=0;i<allSymbolList.length;i++){
                    if(allSymbolList1.indexOf(allSymbolList[i])==-1){
                        allSymbolList1.push(allSymbolList[i])
                    }
                }
                $scope.allSymbolList=allSymbolList1;

                //$scope.flase = falsedata1;
                //实盘过滤
                var symbolList2 = [];

                for (var i = 0; i <$scope.flase.length; i++) {
                    if (symbolList2.indexOf( $scope.flase[i].symbol) == -1) {
                        symbolList2.push( $scope.flase[i].symbol)
                    }
                }
                var symbolList3=[];
                for (var i = 0; i < symbolList2.length; i++) {
                    if (symbolList3.indexOf(symbolList2[i]) == -1) {
                        symbolList3.push(symbolList2[i])
                    }
                }

                $scope.symbolList1 = symbolList3;*/


            }
        }

        $scope.jump = function (classname, id) {
            window.location.href = '#/' + classname + '/id=' + id;
        }
        /* console.log($scope.trust)
         console.log(truedata)*/
        //console.log(truedata[1].exchange)

        function getNowFormatDate() {
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
            //console.log(currentdate)
            return currentdate;
        }
        //$scope.getNowFormatDate()
        /*   var mydate = $filter('date')(new Date((new Date($scope.myFirmEndDate)).setDate((new Date($scope.myFirmEndDate)).getDate() + 1)), 'yyyy-MM-dd');*/


    }])
    .controller('analyseController', ['$scope', '$rootScope', '$filter', '$http', 'constantUrl', '$cookieStore', 'myStrategysValue', '$q', function ($scope, $rootScope, $filter, $http, constantUrl, $cookieStore, myStrategysValue, $q) {
        $scope.closeModal = function () {
            $('.analyse-modal-big').hide();
        };
        var chartData1 = [];

        var str = null;
        var href = window.location.href;
        var index = href.indexOf('id=');
        if (index != -1) {
            str = href.substring(index + 3);
        }
        //console.log(str);
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
                //var chartArr1 = [];
                var indexShortArr = [];
                var indexBuyArr = [];
                $scope.analyseSymbol = " " + chartData1[0].symbol + ' ' + chartData1[0].name;
                angular.forEach(chartData1, function (data, index) {
                    if (index == 0 && ((data.trans_type == "cover") || (data.trans_type == "sell")))
                        return;
                    if (index == chartData1.length - 1) return;
                    if ((data.trans_type == "cover") || (data.trans_type == "sell")) return;
                    if (data.trans_type == "short") {
                        outer: for (var i = 0; i < chartData1.length; i++) {
                            if (chartData1[i].trans_type == "cover") {
                                if (indexShortArr.length != 0) {
                                    inter: for (var j = 0; j < indexShortArr.length; j++) {
                                        if (indexShortArr[j] == i) {
                                            break inter;
                                        } else if ((j == indexShortArr.length - 1) && (indexShortArr[j] != i)) {
                                            var Earn;
                                            //if (data.name == 'AG_real') {
                                            //  Earn = Number((chartData1[i].price - data.price - 0.32 * 2).toFixed(2));
                                            //} else {
                                            //  Earn = Number((chartData1[i].price * (1 - 0.00003) - data.price * (1 + 0.00003)).toFixed(2));
                                            //}
                                            //;
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
                                }
                                else {
                                    var Earn;
                                    //if (data.name == 'AG_real') {
                                    //  Earn = $filter('number')(chartData1[i].price - data.price - 0.32 * 2, 2);
                                    //} else {
                                    //  Earn = $filter('number')(chartData1[i].price * (1 - 0.00003) - data.price * (1 - 0.00003), 2);
                                    //}
                                    //;
                                    chartArr.push({
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
                        outer1: for (var i = 0; i < chartData1.length; i++) {
                            if (chartData1[i].trans_type == "sell") {
                                if (indexShortArr.length != 0) {
                                    inter1: for (var j = 0; j < indexShortArr.length; j++) {
                                        if (indexShortArr[j] == i) {
                                            break inter1;
                                        } else if ((j == indexShortArr.length - 1) && (indexShortArr[j] != i)) {
                                            var Earn;
                                            //if (data.name == 'AG_real') {
                                            //  Earn = $filter('number')(chartData1[i].price - data.price - 0.32 * 2, 2);
                                            //} else {
                                            //  Earn = $filter('number')(chartData1[i].price * (1 - 0.00003) - data.price * (1 - 0.00003), 2);
                                            //}
                                            //;
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
                                }
                                else {
                                    var Earn;
                                    //if (data.name == 'AG_real') {
                                    //  Earn = $filter('number')(chartData1[i].price - data.price - 0.32 * 2, 2);
                                    //} else {
                                    //  Earn = $filter('number')(chartData1[i].price * (1 - 0.00003) - data.price * (1 - 0.00003), 2);
                                    //}
                                    //;
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
                    console.log("data: " + data);
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
                console.log("+--------------  " + tradeItem.pal);
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
                var total = 0;
                for (var i = 0; i < count; i++) {
                    total += $scope.analyseDataArr[i].pal;
                }
                $scope.allTotalpal = total;
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
                                s += '<br />high:<b class="red">￥' + Highcharts.numberFormat(this.points[0].point.high, 2) + '</b><br />low:<b class="blue">￥' + Highcharts.numberFormat(this.points[0].point.low, 2) + '</b><br />close:<b class="green">￥' + Highcharts.numberFormat(this.points[0].point.close, 2) + '</b><br />open:<b class="font-black">￥' + Highcharts.numberFormat(this.points[0].point.open, 2) + '</b><br />volume:<b class="orange">笔 ' + Highcharts.numberFormat(this.points[0].point.volume, 2);
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
                            buttons: [{
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
                                text: '价格'
                            },

                            lineWidth: 1
                        }],

                        series: [{
                            type: 'line',
                            name: '价格',
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
                                    s += '<br />总盈亏:<b class="white-blue">￥' + Highcharts.numberFormat(this.y, 2) + '</b><br />盈亏:<b class="font-black">￥' + this.points[0].point.pal + '</b><br />开仓价:<b class="font-black">￥' + this.points[0].point.openprice + '</b><br />平仓价:<b class="font-black">￥' + this.points[0].point.closeprice + '</b><br />方向:<span class="red">看多</span>';
                                    return s;
                                } else if (this.points[1].y == -1) {
                                    var s = Highcharts.dateFormat('<span>%Y-%m-%d %H:%M:%S</span>', this.x);
                                    s += '<br />总盈亏:<b class="white-blue">￥' + this.y + '</b><br />盈亏:<b class="font-black">￥' + this.points[0].point.pal + '</b><br />开仓价:<b class="font-black">￥' + this.points[0].point.openprice + '</b><br />平仓价:<b class="font-black">￥' + this.points[0].point.closeprice + '</b><br />方向:<span class="green">看空</span>';
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
                            buttons: [{
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
                        }, {
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
        //一进页面获取所有回测数据 包括期货白银
        function getHisSelect() {
            var defer1 = $q.defer();
            $http.get(constantUrl + "btstrategys/" , {
                    headers: {
                        'Authorization': 'token ' + $cookieStore.get('user').token
                    }
                })
                .success(function (data) {
                    var data1=[];
                    angular.forEach(data,function(item,index){
                        if(item._id == str){
                            data1=item;
                        }
                    })
                    $scope.myFirmStrategyList = data1;
                    $scope.myFirmStrategy = data1;
                    //$scope.myFirmStrategy.name=data.name;
                    defer1.resolve(data1);
                    //console.log(data.length,data);
                    /*angular.forEach(data, function(x, y) {
                     this.push({
                     "name": x["name"],
                     '_id': x["_id"],
                     'status': x["status"],
                     'exchange': x["exchange"],
                     'symbol': x["symbol"],
                     'class_id': x["class_id"],
                     //'multiple': x["multiple"],//回测不需要倍数
                     });
                     }, $scope.myFirmStrategyList);*/
                });
            return defer1.promise;
        }

        //console.log($scope.myFirmStrategyList)
        getHisSelect().then(function () {
            $scope.selecteStrategy();
        });
        //回测时间根据所选策略获取
        $scope.selecteStrategy = function () {
            $http.get(constantUrl + 'dates/', {
                    params: {
                        "date_type": 'transaction',
                        "sty_id": $scope.myFirmStrategy._id
                    },
                    headers: {
                        'Authorization': 'token ' + $cookieStore.get('user').token
                    }
                })
                .success(function (data) {
                    $scope.myFirmStartDate = data[data.length - 1];
                    $scope.myFirmEndDate = data[data.length - 1];
                    $scope.makeChart1();


                    loadtime(data);
                    $("#startTime").val("")
                    $("#endTime").val("")
                    $('#startTime').removeAttr("disabled");
                    $('#endTime').removeAttr("disabled");
                    //$scope.myFirmDateList = data;
                })
                .error(function (err, sta) {
                    if (sta == 400) {
                        Showbo.Msg.alert('没有数据');
                    }
                    ;
                });
        };

        $("#startTime").val("")
        $("#endTime").val("")
        $("#startTime").attr("disabled", "true");
        $("#endTime").attr("disabled", "true");
        //历史回测所需数据处理
        $scope.makeChart1 = function () {
            /*if ($scope.myFirmStrategy == undefined || $scope.myFirmStrategy == '') {
             Showbo.Msg.alert("请选择策略");
             return;
             }
             if ($scope.myFirmStartDate == undefined || $scope.myFirmStartDate == '') {
             Showbo.Msg.alert("请选择开始时间");
             return;
             }
             if ($scope.myFirmEndDate == undefined || $scope.myFirmEndDate == '') {
             Showbo.Msg.alert("请选择结束时间");
             return;
             }*/
            var myFirm = [];
            var alldata = [];
            var data2 = [];
            //console.log("所选历史回测信息:",$scope.myFirmStrategy);//所选策略名对应的属性 包含交易所名 倍数 期货还是白银
            myFirm = $scope.myFirmStrategy;
            var mydate = $filter('date')(new Date((new Date($scope.myFirmEndDate)).setDate((new Date($scope.myFirmEndDate)).getDate() + 1)), 'yyyy-MM-dd');
            var stime = $scope.myFirmStartDate;
            var etime = mydate;
            function model() {
                $http.get(constantUrl + 'model_datas/', {
                        params: {
                            "id": str,
                            "date": $scope.myFirmStartDate,
                        },
                        headers: {
                            'Authorization': 'token ' + $cookieStore.get('user').token
                        }
                    })
                    .success(function (data) {
                        //console.log(data)
                        $scope.accuracy = data;

                    })
            }

            model();
            //console.log($scope.myFirmStrategy)

            function getHisTime() {
                var defer1 = $q.defer();
                //返回交易详情输出
                $http.get(constantUrl + 'transactions/', {
                    params: {
                        "sty_id": str,
                        "start": $scope.myFirmStartDate,
                        "end": mydate
                    },
                    headers: {
                        'Authorization': 'token ' + $cookieStore.get('user').token
                    }
                }).success(function (data) {
                        function trueRes(nowdata) {
                            var aloneshort = [];
                            var alonebuy = [];
                            var defer6 = $q.defer();
                            if (nowdata.length == 0) {
                                Showbo.Msg.alert("今天尚未有交易信号")
                                defer6.reject(nowdata)
                                return defer6.promise;
                            }
                            var hasNone = false; //判断今天是否有不配对平仓
                            for (var i = 0; i < nowdata.length; i++) {
                                if (nowdata[i].trans_type == "cover") {
                                    if (i == 0 || nowdata[i - 1].trans_type != "short") {
                                        hasNone = true;
                                        break;
                                    }
                                }
                                if (nowdata[i].trans_type == "sell") {
                                    if (i == 0 || nowdata[i - 1].trans_type != "buy") {
                                        hasNone = true;
                                        break;
                                    }
                                }
                            }
                            if (!hasNone) {
                                //console.log("没有不配对平仓，不获取单独开仓");
                                defer6.resolve(nowdata);
                                return defer6.promise;
                            }
                            var sdate = $filter('date')(new Date((new Date($scope.myFirmStartDate)).setDate((new Date($scope.myFirmStartDate)).getDate() - 1)), 'yyyy-MM-dd');
                            $http.get(constantUrl + 'transactions/', {
                                    params: {
                                        "sty_id": $scope.myFirmStrategy._id,
                                        "start": sdate,
                                        "end": $scope.myFirmStartDate
                                    },
                                    headers: {
                                        'Authorization': 'token ' + $cookieStore.get('user').token
                                    }
                                })
                                .success(function (data) {
                                    if (data[0] != null) {
                                        for (var i = 0; i < data.length; i++) { //获取前一天所有单独short
                                            if (data[i].trans_type == "short") {
                                                if (i + 1 >= data.length || data[i + 1].trans_type != "cover") {
                                                    aloneshort.push(data[i])
                                                }
                                            }
                                            if (data[i].trans_type == "buy") { //获取前一天所有单独buy
                                                if (i + 1 >= data.length || data[i + 1].trans_type != "sell") {
                                                    alonebuy.push(data[i])
                                                }
                                            }
                                        }
                                    } else {
                                        console.log("前一天没有交易")
                                    }
                                    if (nowdata[nowdata.length - 1] == null) {
                                        nowdata.splice(nowdata.length - 1, 1)
                                    }
                                    for (var i = 0; i < nowdata.length; i++) { //获取今天所有单独short
                                        if (nowdata[i].trans_type == "short") {
                                            if (i + 1 >= nowdata.length || nowdata[i + 1].trans_type != "cover") {
                                                aloneshort.push(nowdata[i])
                                            }
                                        }
                                        if (nowdata[i].trans_type == "buy") {
                                            if (i + 1 >= nowdata.length || nowdata[i + 1].trans_type != "sell") {
                                                alonebuy.push(nowdata[i])
                                            }
                                        }
                                    }

                                    for (var i = 0; i < nowdata.length; i++) {
                                        if (nowdata[i].trans_type == "cover") {
                                            if (i == 0 || nowdata[i - 1].trans_type != "short") {
                                                var flag = false;
                                                for (var j = aloneshort.length - 1; j >= 0; j--) {
                                                    if (aloneshort[j].datetime < nowdata[i].datetime) { //截取这个时间之前最近的short
                                                        flag = true;
                                                        break;
                                                    }
                                                }
                                                if (flag) {
                                                    nowdata.splice(i, 0, aloneshort[j]);
                                                    aloneshort.splice(j, 1);
                                                } else {
                                                    nowdata.splice(i, 1);
                                                    //console.log("发现无配对平仓")
                                                    i--;
                                                }
                                            }
                                        }
                                    }
                                    //console.log(aloneshort,alonebuy)
                                    for (var i = 0; i < nowdata.length; i++) {
                                        if (nowdata[i].trans_type == "sell") {
                                            if (i == 0 || nowdata[i - 1].trans_type != "buy") {
                                                var flag = false;
                                                for (var j = alonebuy.length - 1; j >= 0; j--) {
                                                    if (alonebuy[j].datetime < nowdata[i].datetime) { //截取这个时间之前最近的buy
                                                        flag = true;
                                                        break;
                                                    }
                                                }
                                                if (flag) {
                                                    nowdata.splice(i, 0, alonebuy[j]);
                                                    alonebuy.splice(j, 1);
                                                } else {
                                                    nowdata.splice(i, 1);
                                                    //console.log("发现无配对平仓")
                                                    i--;
                                                }
                                            }
                                        }
                                    }

                                    defer6.resolve(nowdata);
                                })
                            return defer6.promise;
                        }

                        trueRes(data).then(function (nowdata) {
                            for (var i = 0; i < nowdata.length; i++) { //清除未配对开仓
                                if (nowdata[i].trans_type == "short") {
                                    if (i == nowdata.length - 1 || nowdata[i + 1].trans_type != "cover") {
                                        nowdata.splice(i, 1);
                                        i--;
                                    }
                                } else if (nowdata[i].trans_type == "buy") {
                                    if (i == nowdata.length - 1 || nowdata[i + 1].trans_type != "sell") {
                                        nowdata.splice(i, 1);
                                        i--;
                                    }
                                }
                            }
                            data = nowdata;
                            for (var i in data) {
                                alldata[i] = data[i];
                            }
                            /**
                             *    删除"0"数据并保存
                             */
                            function delzero(data) {
                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].price == 0) {
                                        var flag = data[i].trans_type;
                                        data.splice(i);
                                        if (flag == "cover" || flag == "sell") {
                                            data.splice(i - 1);
                                        } else {
                                            data.splice(i);
                                        }
                                        i = -1;
                                    }
                                }
                            }

                            //console.log(data);
                            delzero(data)
                            //console.log("数据处理完成")
                            if (data.length < 2) {

                                Showbo.Msg.alert("今天尚未有交易信号")
                            } else {
                                var min = data[0].datetime;
                                var max = data[0].datetime;
                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].datetime > max) {
                                        max = data[i].datetime
                                    }
                                    if (data[i].datetime < min) {
                                        min = data[i].datetime
                                    }
                                }
                                stime = min;
                                etime = max;
                            }
                            defer1.resolve(data);

                        })

                    })

                    .error(function (err, sta) {
                        defer1.reject(err);
                    });
                return defer1.promise;
            };
            //获取相应合约接口
            function getHisTransTime() {
                var defer2 = $q.defer();
                var a = $filter('date')(new Date((new Date(stime)).setDate((new Date(stime)).getDate())), 'yyyy-MM-dd');
                var b = $filter('date')(new Date((new Date(etime)).setDate((new Date(etime)).getDate() + 1)), 'yyyy-MM-dd');
                //console.log(a,b);
                //console.log($scope.myFirmStartDate,mydate);
                $http.get(constantUrl + 'datas/', {
                        params: {
                            "type": 'bar',
                            "exchange": $scope.myFirmStrategy.exchange,
                            //"exchange": "CTP",
                            "symbol": $scope.myFirmStrategy.symbol,
                            //"symbol": "IF",
                            "start": a,
                            "end": b
                        },
                        headers: {
                            'Authorization': 'token ' + $cookieStore.get('user').token
                        }
                    })
                    .success(function (data) {
                        var data2 = [];
                        var j = 0;
                        var flag = 3000000;
                        //console.log(stime,etime);
                        //console.log("显示股价区间：");
                        //console.log(new Date(stime).toLocaleString(),new Date(etime).toLocaleString())
                        for (var i = 0; i < data.length; i++) {
                            var nowtime = data[i].datetime;
                            if (nowtime > (stime - flag) && nowtime < (etime + flag) && data[i].open != 0) {
                                data2[j++] = data[i];
                            }
                        }
                        data = data2;
                        //console.log(data)
                        defer2.resolve(data); //返回需要显示的股价区间
                    })
                    .error(function (err, sta) {
                        defer2.reject(err);
                    });
                return defer2.promise;
            };
            getHisTime().then(function (data) {
                var chartData11 = data; //保存去除异常数据的数据
                //console.log(alldata)//包含异常数据的数据
                getHisTransTime().then(function (data) {
                    var chartJsonData = data; //data股价曲线数据
                    $scope.analyse_title = {
                        'name': $scope.myFirmStrategy.name,
                        'time': $scope.myFirmStartDate + ' 至 ' + $scope.myFirmEndDate,
                        'symbol': $scope.myFirmStrategy.symbol
                    };
                    $http.get(constantUrl + "classs/" + myFirm.class_id + "/", {
                        headers: {
                            'Authorization': 'token ' + $cookieStore.get('user').token
                        }
                    }).success(function (data) {
                        $scope.analyse_title.class_name = data.class_name;
                    })

                    draws1();

                    function draws1() {
                        var chartJsonDataArr = []; //股价
                        var chartArr = []; //盈亏
                        var chartArr1 = []; //收益曲线
                        var chartArr2 = []; //收益曲线
                        var buySellNum = 1;
                        var buyYArr = []; //看多flag信息 颜色不一样
                        var shortYArr = []; //看空flag信息
                        //console.log("无异常数据",chartData11);//去除异常数据的数据
                        for (var i = 0; i < chartData11.length; i++) {

                            var data = chartData11[i]; //保存开仓价信息
                            if (data.trans_type == "short") {
                                shortYArr.push({
                                    "buy": "buy",
                                    "text": '成交价：￥' + data.price + '<br>成交量：' + data.volume + '<br>操作：卖开仓' + '<br>方向：看空',
                                    "volume": data.volume,
                                    "pos": data.pos,
                                    "price": data.price,
                                    "x": data.datetime,
                                    "name": data.name,
                                    "symbol": data.symbol,
                                    "title": buySellNum + 'th_' + data.trans_type
                                });
                                i++;
                                if (i >= chartData11.length) {
                                    break;
                                }
                                data = chartData11[i]; //保存平仓价信息
                                shortYArr.push({
                                    "buy": "buy",
                                    "text": '成交价：￥' + data.price + '<br>成交量：' + data.volume + '<br>操作：买平仓' + '<br>方向：看空',
                                    "volume": data.volume,
                                    "pos": data.pos,
                                    "price": data.price,
                                    "x": data.datetime,
                                    "name": data.name,
                                    "symbol": data.symbol,
                                    "title":buySellNum + 'th_' + data.trans_type
                                });
                            } else {
                                buyYArr.push({
                                    "short": "short",
                                    "text": '成交价：￥' + data.price + '<br>成交量：' + data.volume + '<br>操作：买开仓' + '<br>方向：看多',
                                    "volume": data.volume,
                                    "pos": data.pos,
                                    "price": data.price,
                                    "x": data.datetime,
                                    "name": data.name,
                                    "symbol": data.symbol,
                                    "title":buySellNum + 'th_' + data.trans_type
                                });
                                i++;
                                if (i >= chartData11.length) {
                                    break;
                                }
                                data = chartData11[i]; //保存平仓价信息
                                buyYArr.push({
                                    "short": "short",
                                    "text": '成交价：￥' + data.price + '<br>成交量：' + data.volume + '<br>操作：卖平仓' + '<br>方向：看多',
                                    "volume": data.volume,
                                    "pos": data.pos,
                                    "price": data.price,
                                    "x": data.datetime,
                                    "name": data.name,
                                    "symbol": data.symbol,
                                    "title": buySellNum + 'th_' + data.trans_type
                                });
                            }
                            buySellNum++;

                        }

                        //console.log(myFirm.multiple)
                        var allPal=0;

                        for (var i = 0; i < chartData11.length; i++) {
                            if (i + 1 >= chartData11.length) {
                                break;
                            }
                            var data = chartData11[i];
                            i++;
                            var data2 = chartData11[i]; //保存平仓价信息

                            //无手续费盈亏
                            if (data.trans_type == "buy") {
                                //console.log("看多");
                                var test = data2.price - data.price;
                            } else {
                                //console.log("看空");
                                var test = data.price - data2.price;
                            }
                            test = Number((test).toFixed(6));
                            //console.log(test)
                            //计算手续费
                            var symbol = data.symbol[0] + data.symbol[1];
                            var charge;
                            if (symbol == "IF" || symbol == "IC" || symbol == "IH") {
                                charge = 0.00015;
                            }
                            if (symbol == "D1") {
                                charge = 0.00035;
                            }
                            if (symbol == "D6") {
                                charge = 0.00035;
                            }
                            if(symbol == "bt"){
                                charge = 0.002;
                            }
                            var test2 = (data2.price + data.price) * charge;

                            test2 = Number((test2).toFixed(6));
                            var pal = test - test2;
                            pal = Number((pal).toFixed(6));
                            allPal +=pal;

                            chartArr.push({
                                "x": data2.datetime,
                                "y": pal, //盈亏数值
                                "volume": data.volume,
                                "direction": data.pos,
                                "Earn": pal, //盈亏
                                "openprice": data.price,
                                "closeprice": data2.price,
                                "opentime": data.datetime,
                                "closetime": data2.datetime,
                                "present": data2.price,
                                "symbol": myFirm.symbol,
                                "text": '开仓价：￥' + data.price + '<br>平仓价：￥' + data2.price + '<br>手续费：' + test2 + '<br/>盈亏：' + pal
                            });

                            if (data.trans_type == "buy") {
                                chartArr1.push({
                                    "text": '开仓价：' + data.price + '<br>平仓价：￥' + data2.price + '<br>盈亏：' + allPal,
                                    "title": "看多",
                                    "x": data2.datetime,
                                    "y": pal,
                                    "volume": data.volume,
                                    "direction": data.pos,
                                    "Earn": pal,
                                    "openprice": data.price,
                                    "closeprice": data2.price,
                                    "opentime": data.datetime,
                                    "closetime": data2.datetime,
                                    "present": data2.price,
                                    "symbol": myFirm.symbol
                                })
                            } else {
                                chartArr2.push({
                                    "text": '开仓价：' + data.price + '<br>平仓价：￥' + data2.price + '<br>盈亏：' + allPal,
                                    "title": "看空",
                                    "x": data2.datetime,
                                    "y": pal,
                                    "volume": data.volume,
                                    "direction": data.pos,
                                    "Earn": pal,
                                    "openprice": data.price,
                                    "closeprice": data2.price,
                                    "opentime": data.datetime,
                                    "closetime": data2.datetime,
                                    "present": data2.price,
                                    "symbol": myFirm.symbol
                                })
                            }


                        }


                        var buy = [];
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
                            if (sec >= 60) {
                                min += parseInt(sec / 60);
                                sec = sec - parseInt(sec / 60) * 60;
                            }
                            if (hour < 10) hour = "0" + hour;
                            if (min < 10) min = "0" + min;
                            if (sec < 10) sec = "0" + sec;
                            var totalTime = hour + ":" + min + ":" + sec;
                            return totalTime;
                        }


                        var alldata2 = []; //开仓平仓合并后的数据
                        var del = [];
                        var alldata3 = []; //为了持仓时间
                        num = parseInt(alldata.length / 2);
                        //console.log(num)
                        for (var i = 0; i < num; i++) {
                            if (alldata[2 * i].trans_type == "short") { //看空
                                alldata2.push({
                                    "direction": "看空",
                                    "openprice": alldata[2 * i].price,
                                    "opentime": alldata[2 * i].datetime,
                                    "closeprice": alldata[2 * i + 1].price,
                                    "closetime": alldata[2 * i + 1].datetime,
                                    "time": alldata[2 * i + 1].datetime
                                })
                            } else {
                                if (alldata[2 * i].trans_type == "buy") {
                                    alldata2.push({
                                        "direction": "看多",
                                        "openprice": alldata[2 * i].price,
                                        "opentime": alldata[2 * i].datetime,
                                        "closeprice": alldata[2 * i + 1].price,
                                        "closetime": alldata[2 * i + 1].datetime,
                                        "time": alldata[2 * i + 1].datetime,
                                        "open": alldata[2 * i].datetime
                                    })
                                } else {
                                    console.log("配对出错")
                                }
                            }
                        }

                        angular.forEach(alldata2, function (data, index) { //寻找异常数据的行数
                            if (data['openprice'] == 0 || data['closeprice'] == 0) {
                                del.push(index);
                            }
                        })
                        for (var i = 0; i < alldata2.length; i++) {
                            alldata3.push({
                                "opentime": "",
                                "closetime": "",
                            })
                            alldata3[i].opentime = (alldata2[i].opentime);
                            alldata3[i].closetime = (alldata2[i].closetime);
                        }


                        /**
                         * 时间格式
                         * @returns {string}
                         */
                        Date.prototype.toLocaleString = function () {
                            var year, month, day, hour, min, sec;
                            year = this.getFullYear();
                            month = this.getMonth() + 1;
                            if (month < 10) {
                                month = "0" + month;
                            }
                            day = this.getDate();
                            if (day < 10) {
                                day = "0" + day;
                            }
                            hour = this.getHours();
                            if (hour < 10) {
                                hour = "0" + hour;
                            }
                            min = this.getMinutes();
                            if (min < 10) {
                                min = "0" + min;
                            }
                            sec = this.getSeconds();
                            if (sec < 10) {
                                sec = "0" + sec;
                            }
                            return year + "-" + month + "-" + day + " " + hour + ":" + min;
                        };
                        /**
                         * 毫秒时间戳转换普通时间
                         * @param time
                         * @returns {string}
                         */
                        function gettime(time) {
                            var unixTimestamp = new Date(time)
                            return unixTimestamp.toLocaleString();
                        }

                        for (var i = 0; i < alldata2.length; i++) {
                            alldata2[i].opentime = gettime(alldata2[i].opentime);
                            alldata2[i].closetime = gettime(alldata2[i].closetime);
                            alldata2[i].time = gettime(alldata2[i].time);
                        }
                        $scope.analyseDataArr = alldata2;
                        /**封装计算手续费方法
                         *
                         * @param i
                         * @returns {number}
                         */
                        function gettest(i) {
                            var symbol = $scope.myFirmStrategy.symbol[0] + $scope.myFirmStrategy.symbol[1];
                            var charge;
                            if (symbol == "IF" || symbol == "IC" || symbol == "IH") {
                                charge = 0.00092;
                            }
                            if (symbol == "D1") {
                                charge = 0.00035;
                            }
                            if (symbol == "D6") {
                                charge = 0.00035;
                            }
                            if ($scope.myFirmStrategy.exchange == 'OKCoin') {
                                charge = 0.002;
                                return Number((($scope.analyseDataArr[i].closeprice + $scope.analyseDataArr[i].openprice) * charge *0.01).toFixed(6));
                            }
                            var test = ($scope.analyseDataArr[i].closeprice + $scope.analyseDataArr[i].openprice) * charge;

                            test = Number((test).toFixed(6));
                            return test;
                        }


                        /**无手续费盈亏
                         *
                         * @param i
                         * @returns {number}
                         */
                        function notest(i) {
                            if ($scope.analyseDataArr[i].direction == "看多") {
                                //console.log("看多");
                                var test = $scope.analyseDataArr[i].closeprice - $scope.analyseDataArr[i].openprice;
                            } else {
                                //console.log("看空");
                                var test = $scope.analyseDataArr[i].openprice - $scope.analyseDataArr[i].closeprice;
                            }
                            if ($scope.myFirmStrategy.exchange == 'OKCoin'){
                                return Number((test *0.01).toFixed(6));
                            }
                            test = Number((test).toFixed(6));
                            return test;
                        }

                        //console.log("所选实盘信息:",myFirm);//所选策略名对应的属性 包含交易所名  期货还是白银 回测没有倍数
                        //console.log(data2);//开仓平仓单个数据 获取委托号

                        var totalpal = 0;
                        var totaltest = 0;
                        var totaltestpal = 0;
                        var allTotalyeild = 0;
                        var allTotalTime1 = 0;
                        var zheng = 0;
                        var zheng1 = 0;
                        var a = 0;
                        var b = 0;
                        var mean = 0;
                        var n = 0;
                        var max = -100;
                        var min = 100;
                        //实盘测试计算
                        var num = 0; //正确数据的个数
                        for (var i = 0; i < alldata2.length; i++) {
                            var flag = false;
                            for (var j = 0; j < del.length; j++) {
                                if (i == del[j]) {
                                    $scope.analyseDataArr[i].color = "error";
                                    flag = true; //有异常flag为true
                                    //console.log("有异常数据",i)
                                }
                            }
                            if (flag) {
                                continue;
                            } //如果当前数据异常跳过计算
                            $scope.analyseDataArr[i].a = alldata[2 * i].serialno; //开仓价委托号
                            $scope.analyseDataArr[i].b = alldata[2 * i + 1].serialno; //平仓价委托号
                            $scope.analyseDataArr[i].multiple = myFirm.multiple; //交易手数
                            $scope.analyseDataArr[i].pal = notest(i) - gettest(i); //计算每笔盈亏
                            $scope.analyseDataArr[i].test = gettest(i); //计算每笔手续费
                            $scope.analyseDataArr[i].testpal = notest(i); //计算每笔无手续费盈亏
                            totalpal += $scope.analyseDataArr[i].pal; //累加总盈亏
                            totaltest += $scope.analyseDataArr[i].test; //累加手续费
                            totaltestpal += $scope.analyseDataArr[i].testpal; //累加无手续费盈亏
                            //交易收益率输出
                            $scope.analyseDataArr[i].yeild = $scope.analyseDataArr[i].pal / $scope.analyseDataArr[i].openprice; //计算每笔收益率
                            allTotalyeild += $scope.analyseDataArr[i].yeild; //累加收益率
                            //持仓时间计算
                            $scope.analyseDataArr[i].totalTime = $scope.newTotalTime(alldata3[i].closetime - alldata3[i].opentime); //计算每笔持仓时间
                            allTotalTime1 += (alldata3[i].closetime - alldata3[i].opentime); //累加持仓时间

                            //胜率
                            var test = notest(i) - gettest(i);
                            if (test > 0) {
                                $scope.analyseDataArr[i].winrate = 100; //盈亏胜率胜 盈为100%亏为0%
                                zheng++; //累积胜的次数
                            } else {
                                $scope.analyseDataArr[i].winrate = 0;
                            }
                            //交易方向胜率，根据看多看空分别比较
                            if ($scope.analyseDataArr[i].direction == "看多") { //看多的时候开仓小于平仓为盈
                                if ($scope.analyseDataArr[i].closeprice > $scope.analyseDataArr[i].openprice) {
                                    $scope.analyseDataArr[i].jiaoyiwinrate = 100;
                                    zheng1++;
                                } else {
                                    $scope.analyseDataArr[i].jiaoyiwinrate = 0;
                                }
                            } else { //看空的时候开仓大于平仓为亏
                                //console.log("看空");
                                if ($scope.analyseDataArr[i].closeprice < $scope.analyseDataArr[i].openprice) {
                                    $scope.analyseDataArr[i].jiaoyiwinrate = 100;
                                    zheng1++;
                                } else {
                                    $scope.analyseDataArr[i].jiaoyiwinrate = 0;
                                }
                            }
                            //盈亏比
                            var test = notest(i) - gettest(i);
                            if (test > 0) {
                                a += test; //累加所有盈
                            } else {
                                b += test; //累加所有亏
                            }

                            //最大回撤率，最小除最大减1
                            var test = notest(i) - gettest(i);
                            if (test > max) {
                                max = test; //找出最大
                            }
                            if (test < min) {
                                min = test; //找出最小
                            }

                            num++;
                        }


                        //console.log("成交数：", num)

                        $scope.allTotaltest = totaltest;
                        $scope.allTotaltestpal = totaltestpal;
                        $scope.allTotalpal = totalpal;
                        $scope.allTotalyeild = allTotalyeild;
                        $scope.averTotalyeild = allTotalyeild / num;
                        $scope.annualized_return = allTotalyeild * 250; //年化收益率
                        $scope.allTotalTime = $scope.newTotalTime(allTotalTime1); //alltotaltime是总持仓时间
                        $scope.averTotalTime = $scope.newTotalTime(allTotalTime1 / num); //averTotalTime是平均持仓时间
                        $scope.average_winrate = zheng / num * 100; //盈亏胜率
                        $scope.average_jioayiwinrate = zheng1 / num * 100; //交易方向胜率
                        $scope.average_profit = Math.abs(a / b) * 100; //盈亏比
                        $scope.rate1 = allTotalyeild / num; //平均净回报率
                        // mean(a) = a(1) + a(2) + .... /n
                        //std(a)=sqrt([(a(1)-mean(a))^2 + (a(2)-mean(a))^2 + .../(n-1)])
                        mean = totalpal / num; //收益均值
                        for (var i = 0; i < num; i++) {
                            var test = notest(i) - gettest(i);
                            n += Math.pow(test - mean, 2);
                        }
                        n = n / (num - 1);
                        var std = Math.sqrt(n);
                        var nianhua = std * Math.sqrt(250); //年化标准差,std*sqrt(250)是最普通的做法，mean的部分要乘以250(策略收益波动率)
                        $scope.rate2 = nianhua; //年化标准差
                        $scope.rate3 = (mean) / std; //sharpe就每天受益平均下除以std
                        $scope.errorYeild = mean / nianhua; //信息比率(策略每日收益 - 参考标准每日收益)的年化均值 / 年化标准差
                        $scope.rate4 = min / max - 1; //最大回撤率


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
                        ////////////////////////////////////////////////////////////////////////////////////////

                        //修改的highchart1
                        // console.log(chartJsonDataArr)

                        var volume = [];
                        angular.forEach(chartJsonData, function (data, index) {
                            volume.push({
                                "x": data.datetime,
                                "y": data.volume,
                                'low': data.low,
                                'high': data.high,
                                'close': data.close,
                                'open': data.open,
                                'volume': data.volume
                            })
                        })

                        // console.log(volume)


                        //MA5
                        var averline5 = [];
                        for (var i = chartJsonDataArr.length - 1; i >= 4; i--) {
                            var aver = chartJsonDataArr[i].close, n = 0;
                            for (var j = i; n < 4; j--) {
                                aver = aver + chartJsonDataArr[j - 1].close;
                                n++;
                            }
                            averline5.push({
                                'average': aver / 5,
                                "x": chartJsonDataArr[i].x,
                                "y": aver / 5,
                            })
                        }
                        averline5 = $filter('orderBy')(averline5, 'x');


                        //MA10

                        var averline10 = [];
                        for (var i = chartJsonDataArr.length - 1; i >= 9; i--) {
                            var aver10 = chartJsonDataArr[i].close, n = 0;
                            for (var j = i; n < 9; j--) {
                                aver10 = aver10 + chartJsonDataArr[j - 1].close;
                                n++;
                            }
                            averline10.push({
                                'average': aver10 / 10,
                                "x": chartJsonDataArr[i].x,
                                "y": aver10 / 10,
                            })
                        }

                        averline10 = $filter('orderBy')(averline10, 'x');

                        //MA30
                        var averline30 = [];
                        for (var i = chartJsonDataArr.length - 1; i >= 29; i--) {
                            var aver30 = chartJsonDataArr[i].close, n = 0;
                            for (var j = i; n < 29; j--) {
                                aver30 = aver30 + chartJsonDataArr[j - 1].close;
                                n++;
                            }
                            averline30.push({
                                'average': aver30 / 30,
                                "x": chartJsonDataArr[i].x,
                                "y": aver30 / 30,
                            })
                        }

                        averline30 = $filter('orderBy')(averline30, 'x');

                        //MA60
                        var averline60 = [];
                        for (var i = chartJsonDataArr.length - 1; i >= 59; i--) {
                            var aver60 = chartJsonDataArr[i].close, n = 0;
                            for (var j = i; n < 59; j--) {
                                aver60 = aver60 + chartJsonDataArr[j - 1].close;
                                n++;
                            }
                            averline60.push({
                                'average': aver60 / 60,
                                "x": chartJsonDataArr[i].x,
                                "y": aver60 / 60,
                            })
                        }
                        averline60 = $filter('orderBy')(averline60, 'x');



                        $('#return_map_big').highcharts('StockChart', {
                            credits: {
                                enabled: false
                            },
                            exporting: {
                                enabled: false
                            },
                            plotOptions: {
                                series: {
                                    turboThreshold: 0,
                                },
                                candlestick: { //红涨绿跌
                                    color: '#33AA11',
                                    upColor: '#DD2200',
                                    lineColor: '#33AA11',
                                    upLineColor: '#DD2200',
                                    maker: {
                                        states: {
                                            hover: {
                                                enabled: false,
                                            }
                                        }
                                    }
                                },
                            },
                            tooltip: {
                                useHTML: true,
                                xDateFormat: "%Y-%m-%d %H:%M:%S",
                                valueDecimals: 2,
                                backgroundColor: '#eeeeee',   // 背景颜色
                                borderColor: '#ccc',         // 边框颜色
                                borderRadius: 10,             // 边框圆角
                                borderWidth: 1,               // 边框宽度
                                shadow: true,                 // 是否显示阴影
                                animation: true,               // 是否启用动画效果
                            },
                            legend: {
                                enabled: true,
                                align: 'right',
                                verticalAlign: 'top',
                                x: 0,
                                y: 0
                            },
                            rangeSelector: {
                                buttons: [{
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
                                    text: '价格'
                                },
                                lineWidth: 1,
                                height: '50%'
                            }, {
                                labels: {
                                    align: 'right',
                                    x: -3
                                },
                                title: {
                                    text: '成交量'
                                },
                                opposite: true,
                                offset: 0,
                                height: '20%',
                                top: '52%'
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
                                height: '20%',
                                top: '74%'
                            }],
                            series: [{
                                type: 'spline',
                                name: 'MA5',
                                data: averline5,
                                lineWidth: 1,
                                color: 'red',
                                visible: false
                            }, {
                                type: 'spline',
                                name: 'MA10',
                                data: averline10,
                                lineWidth: 1,
                                color: 'yellow',
                                visible: false
                            }, {
                                type: 'spline',
                                name: 'MA30',
                                data: averline30,
                                lineWidth: 1,
                                color: 'blue',
                                visible: false
                            }, {
                                type: 'spline',
                                name: 'MA60',
                                data: averline60,
                                lineWidth: 1,
                                color: 'green',
                                visible: false
                            }, {
                                type: 'candlestick',
                                name: '价格',
                                data: chartJsonDataArr,
                                id: 'dataseries',
                                color: 'green',
                                upColor: 'red',
                                showInLegend: false
                            }, {
                                type: 'flags',
                                data: shortYArr,
                                onSeries: "dataseries",
                                shape: 'squarepin',
                                width:60,
                                color: '#ff9912',
                                fillColor: 'transparent',
                                style:{
                                    color:'#ff9912'
                                },
                                y: -40,
                                name: '看空',
                            }, {
                                type: 'flags',
                                data: buyYArr,
                                onSeries: "dataseries",
                                shape: 'squarepin',
                                width: 60,
                                color: "#4169e1",
                                fillColor: 'transparent',
                                style: {
                                    color: '#4169e1'
                                },
                                y: 20,
                                name: '看多',
                            }, {
                                type: 'column',
                                data: volume,
                                name: '成交量',
                                yAxis: 1,
                                color: '#e6e843'

                            }, {
                                type: 'column',
                                data: chartArr,
                                name: '盈亏',
                                yAxis: 2,
                                threshold: 0,
                                negativeColor: 'green',
                                color: 'red'
                            }]
                        });

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
                                },
                                candlestick: { //红涨绿跌
                                    color: '#33AA11',
                                    upColor: '#DD2200',
                                    lineColor: '#33AA11',
                                    upLineColor: '#DD2200',
                                    maker: {
                                        states: {
                                            hover: {
                                                enabled: false,
                                            }
                                        }
                                    }
                                }
                            },
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
                                buttons: [{
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
                                    text: '价格'
                                },
                                lineWidth: 1,
                                height: '50%'
                            }, {
                                labels: {
                                    align: 'right',
                                    x: -3
                                },
                                title: {
                                    text: '成交量'
                                },
                                opposite: true,
                                offset: 0,
                                height: '20%',
                                top: '52%'
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
                                height: '20%',
                                top: '74%'
                            }],
                            series: [{
                                type: 'line',
                                name: '价格',
                                data: chartJsonDataArr,
                                lineWidth: 2,
                                id: 'dataseries'
                            }, {
                                type: 'candlestick',
                                name: '价格',
                                data: chartJsonDataArr,

                                id: 'dataseries'
                            }, {
                                type: 'flags',
                                data: shortYArr,
                                onSeries: "dataseries",
                                shape: 'squarepin',
                                width: 36,
                                color: '#ff9912',
                                fillColor: 'transparent',
                                style: {
                                    color: '#ff9912'
                                },
                                y: -40,
                                name: '看空',
                            }, {
                                type: 'flags',
                                data: buyYArr,
                                onSeries: "dataseries",
                                shape: 'squarepin',
                                width: 36,
                                color: "#4169e1",
                                fillColor: 'transparent',
                                style: {
                                    color: '#4169e1'
                                },
                                y: 20,
                                name: '看多',
                            }, {
                                type: 'column',
                                data: volume,
                                name: '成交量',
                                yAxis: 1,
                                color: '#e6e843'

                            }, {
                                type: 'column',
                                data: chartArr,
                                name: '盈亏',
                                /*lineWidth:2,*/
                                yAxis: 2,
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
                        //页面显示的收益曲线图
                        for (var i = 1; i < chartArr.length; i++) {
                            chartArr[i].Earn = chartArr[i - 1].Earn + chartArr[i].Earn;
                            chartArr[i].y = chartArr[i - 1].y + chartArr[i].y;
                        }

                        $('#return_map_big1').highcharts('StockChart', {
                            credits: {
                                enabled: false
                            },
                            exporting: {
                                enabled: false
                            },

                            xAxis: {
                                tickInterval: 1
                            },
                            yAxis: [{
                                type: '盈亏',
                                minorTickInterval: 0.1,
                                plotLines: [{
                                    color: '#A25E6B', //线的颜色
                                    dashStyle: 'solid', //默认值，这里定义为实线
                                    value: 0, //定义在那个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
                                    width: 2 //标示线的宽度，2px
                                }],
                            }],
                            rangeSelector: {
                                buttons: [{
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
                            plotOptions: {
                                spline: {
                                    lineWidth: 1.5,
                                    fillOpacity: 0.1,
                                    marker: {
                                        enabled: false,
                                        states: {
                                            hover: {
                                                enabled: true,
                                                radius: 2
                                            }
                                        }
                                    },
                                    shadow: false
                                }
                            },
                            //收益曲线
                            series: [{
                                data: chartArr,
                                name: '盈亏',
                                marker: {
                                    enabled: true,
                                    symbol: 'square',
                                    fillColor: 'blue',
                                    radius: 5
                                },
                                id: "yingkui",
                                color: '#eec710',

                            }, {
                                type: 'flags',
                                data: chartArr1,
                                onSeries: "yingkui",
                                shape: 'squarepin',
                                width: 36,
                                color: "#4169e1",
                                fillColor: 'transparent',
                                style: {
                                    color: '#4169e1'
                                },
                                name: "详情",
                                y: -50,

                            },
                                {
                                    type: 'flags',
                                    data: chartArr2,
                                    onSeries: "yingkui",
                                    shape: 'squarepin',
                                    width: 36,
                                    color: "#ff9912",
                                    fillColor: 'transparent',
                                    style: {
                                        color: '#ff9912'
                                    },
                                    name: "详情",
                                    y: -50
                                }
                            ]
                        });

                        //打印中的收益曲线
                        $('#return_map_big1_1').highcharts('StockChart', {
                            credits: {
                                enabled: false
                            },
                            exporting: {
                                enabled: false
                            },
                            xAxis: {
                                tickInterval: 1
                            },
                            yAxis: [{
                                type: '盈亏',
                                minorTickInterval: 0.1,
                                plotLines: [{
                                    color: '#A25E6B', //线的颜色
                                    dashStyle: 'solid', //默认值，这里定义为实线
                                    value: 0, //定义在那个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
                                    width: 2 //标示线的宽度，2px
                                }],
                            }],

                            rangeSelector: {
                                buttons: [{
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

                            plotOptions: {
                                spline: {
                                    lineWidth: 1.5,
                                    fillOpacity: 0.1,
                                    marker: {
                                        enabled: false,
                                        states: {
                                            hover: {
                                                enabled: true,
                                                radius: 2
                                            }
                                        }
                                    },
                                    shadow: false
                                }
                            },

                            series: [{
                                data: chartArr,
                                name: '盈亏',
                                marker: {
                                    enabled: true,
                                    symbol: 'square',
                                    fillColor: 'blue',
                                    radius: 5
                                },
                                id: "yingkui",
                                color: '#eec710'
                            }, {
                                type: 'flags',
                                data: chartArr1,
                                onSeries: "yingkui",
                                shape: 'squarepin',
                                width: 36,
                                color: "#4169e1",
                                fillColor: 'transparent',
                                style: {
                                    color: '#333'
                                },
                                name: "详情",
                                y: -50


                            }

                            ]
                        });
                        $(".analyse .noprint  .remind span").show();

                    };
                });
            }, function (err, sta) {
                Showbo.Msg.alert('没有交易数据!');
            });

        }
    }])

    // 历史/实盘测试
    .controller('actualResController', ['$scope', '$rootScope', '$filter', '$http', 'constantUrl', '$cookieStore', 'myStrategysValue', '$q', function ($scope, $rootScope, $filter, $http, constantUrl, $cookieStore, myStrategysValue, $q) {
        $scope.closeModal = function () {
            $('.analyse-modal-big').hide();
        };
        var str = null;
        var href = window.location.href;
        var index = href.indexOf('id=');
        if (index != -1) {
            str = href.substring(index + 3);
        }
        $scope.g = function () {
            var defer1 = $q.defer();
            $http.get(constantUrl + "strategys/", {
                    headers: {
                        'Authorization': 'token ' + $cookieStore.get('user').token
                    }
                })
                .success(function (data) {
                    var  data1=[]
                    angular.forEach(data,function(item,index){
                        if(item._id == str){
                            data1=item
                        }
                    })
                    console.log(data1)
                    $scope.myFirmStrategy = data1;
                    defer1.resolve(data1);
                })
                .error(function (err, sta) {
                    console.log(err);
                });
            return defer1.promise;

        }

        $scope.g().then(function () {
            $scope.p();
        })

        $scope.p = function () {
            $http.get(constantUrl + 'dates/', {
                    params: {
                        "date_type": 'transaction',
                        "sty_id": str
                    },
                    headers: {
                        'Authorization': 'token ' + $cookieStore.get('user').token
                    }
                })
                .success(function (data) {
                    $scope.my = data;
                    $scope.myFirmDate = data[data.length - 2];
                    $scope.makeChart1();
                    //console.log($scope.my)
                })
                .error(function (err, sta) {
                    if (sta == 400) {
                        Showbo.Msg.alert('没有数据');
                    }
                    ;
                });
        };

        var chartData1 = [];
        //输入实盘交易数据，点我生成图表功能
        $scope.makeChart = function () {
            return;
            draw();

            function draw() {
                if (/{/.test($scope.analyseData)) { //?????????????????????
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
                            "pos": Number(arr[3]), //?????????
                            "volume": Number(arr[2]), //成交量
                            "trans_type": arr[4], //交易类型???
                            "symbol": arr[0] //???????????????
                        });
                    });
                    //console.log(chartData1);
                }
                ;
                var chartJsonData; //图表Json数据
                var chartJsonDataArr = []; //图表Json数据数组
                var chartArr = []; //图表数组，与画图有关
                var indexShortArr = []; //????
                var indexBuyArr = []; //????
                $scope.analyseSymbol = " " + chartData1[0].symbol + ' ' + chartData1[0].name;
                angular.forEach(chartData1, function (data, index) {
                    //????????????????????????????????????????????????????????????????????
                    if (index == 0 && ((data.trans_type == "cover") || (data.trans_type == "sell")))
                        return;
                    if (index == chartData1.length - 1) return; //到头了
                    if ((data.trans_type == "cover") || (data.trans_type == "sell")) return;
                    if (data.trans_type == "short") {
                        outer: for (var i = 0; i < chartData1.length; i++) {
                            if (chartData1[i].trans_type == "cover") { //???
                                if (indexShortArr.length != 0) { //???
                                    inter: for (var j = 0; j < indexShortArr.length; j++) {
                                        if (indexShortArr[j] == i) { //???
                                            break inter;
                                        } else if ((j == indexShortArr.length - 1) && (indexShortArr[j] != i)) { //???
                                            var Earn;
                                            //if (data.name == 'AG_real') {
                                            //  Earn = $filter('number')(chartData1[i].price - data.price - 0.32 * 2, 2);
                                            //} else {
                                            //  Earn = $filter('number')(chartData1[i].price * (1 - 0.00003) - data.price * (1 - 0.00003), 2);
                                            //};
                                            //把数据push进图表数组
                                            chartArr.push({
                                                "volume": data.volume, //成交量
                                                "direction": data.pos, //交易方向???
                                                //"Earn":$filter('number')(chartData1[i].price-data.price,2),
                                                "Earn": Earn, //盈亏
                                                "openprice": data.price, //开仓价
                                                "closeprice": chartData1[i].price, //平仓价
                                                "opentime": data.datetime, //开仓时间
                                                "closetime": chartData1[i].datetime, //平仓时间
                                                "present": chartData1[i].price, //成交价
                                                "name": data.name, //名称
                                                "symbol": data.symbol //???
                                            });
                                            indexShortArr.push(i); //???
                                            break outer;
                                        }
                                        ;
                                    }
                                    ;
                                }
                                else { //???
                                    var Earn;
                                    //if (data.name == 'AG_real') {
                                    //  Earn = $filter('number')(chartData1[i].price - data.price - 0.32 * 2, 2);
                                    //} else {
                                    //  Earn = $filter('number')(chartData1[i].price * (1 - 0.00003) - data.price * (1 - 0.00003), 2);
                                    //};
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
                                }
                                ;
                            }
                            ;
                        }
                        ;
                    }
                    ;
                    if (data.trans_type == "buy") { //???
                        outer1: for (var i = 0; i < chartData1.length; i++) {
                            if (chartData1[i].trans_type == "sell") { //???
                                if (indexShortArr.length != 0) { //???
                                    inter1: for (var j = 0; j < indexShortArr.length; j++) {
                                        if (indexShortArr[j] == i) { //???
                                            break inter1;
                                        } else if ((j == indexShortArr.length - 1) && (indexShortArr[j] != i)) { //???
                                            var Earn;
                                            //if (data.name == 'AG_real') {
                                            //  Earn = $filter('number')(chartData1[i].price - data.price - 0.32 * 2, 2);
                                            //} else {
                                            //  Earn = $filter('number')(chartData1[i].price * (1 - 0.00003) - data.price * (1 - 0.00003), 2);
                                            //};
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
                                }
                                else { //???
                                    var Earn;
                                    //if (data.name == 'AG_real') {
                                    //  Earn = $filter('number')(chartData1[i].price - data.price - 0.32 * 2, 2);
                                    //} else {
                                    //  Earn = $filter('number')(chartData1[i].price * (1 - 0.00003) - data.price * (1 - 0.00003), 2);
                                    //};
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

                var wealth1 = []; //???
                var wealth2 = []; //???
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
                    }
                    ;
                });
                wealth1 = $filter('orderBy')(wealth1, 'x'); //wealth1按照时间排序
                var wealth = []; //???
                var buy = []; //???
                var tradeItem = []; //???
                var direction; //交易方向
                var amount = 0; //???
                var total = 0; //???
                var winrate; //胜率
                var totalWinrate = 0; //总胜率
                var totalProfit = 0; //总利润
                var totalRate1 = 0; //???
                var totalRate2 = 0; //???
                var totalRate3 = 0; //???
                var totalRate4 = []; //???
                var yeildAbs; //???
                var totalpal = 0; //???
                var allTotalpal = 0; //???
                var allTotalyeild = 0; //???
                var prof = 0; //???
                var loss = 0; //???
                angular.forEach(chartArr, function (data, index) {
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
                        // Math.abs() 取绝对值
                        // toFixed() 方法可把 Number 四舍五入为指定小数位数的数字。
                        yeildAbs = Math.abs((Number(data["Earn"]) * 100 / data['openprice']).toFixed(2)); //???
                        prof = prof + Number(data["Earn"]) * 100 / data['openprice']; //???
                    } else {
                        winrate = 0;
                        yeildAbs = Math.abs((Number(data["Earn"]) * 100 / data['closeprice']).toFixed(2)); //???
                        loss = loss + Number(data["Earn"]) * 100 / data['openprice']; //???
                    }
                    ;
                    wealth.push({
                        "x": data["opentime"], //???
                        "y": Number($filter('number')(parseFloat(totalpal), 2)), //???
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
                    totalWinrate = totalWinrate + winrate; //???
                    total = total + Number(data["Earn"]) * 100 / data['openprice']; //???
                    // parseFloat() 函数可解析一个字符串，并返回一个浮点数。
                    totalRate1 = totalRate1 + parseFloat(Number(data["Earn"]) * 100 / data['openprice'] - 0.0492);
                    totalRate4.push(yeildAbs); //totalRate4是一个数组
                    allTotalyeild = allTotalyeild + Number((Number(data["Earn"]) * 100 / data['openprice']));
                });
                amount = tradeItem.length; //???
                $scope.analyseDataArr = tradeItem; //???
                //$scope.annualized_return = (allTotalyeild / amount * 250).toFixed(2);//???
                //$scope.annualized_return=0;
                //$scope.annualized_return= allTotalyeild*250;//年化收益率
                ////$scope.annualized_return=Math.pow(allTotalyeild,250)-1;//年化收益率

                $scope.average_winrate = parseFloat(totalWinrate / amount).toFixed(2);
                $scope.average_profit = parseFloat(prof / loss).toFixed(2); //???
                $scope.rate1 = parseFloat(totalRate1 / amount).toFixed(2); //???
                angular.forEach(chartArr, function (data, index) {
                    // pow() 方法可返回 x 的 y 次幂的值。
                    totalRate2 = totalRate2 + parseFloat(Math.pow(parseFloat((Number(data["Earn"]) * 100 / data['openprice'] - 0.0492) - $scope.rate1), 2));
                });
                $scope.rate2 = Math.sqrt(parseFloat(totalRate2) / amount).toFixed(2); // sqrt() 方法可返回一个数的平方根。???
                $scope.rate3 = parseFloat($scope.rate1 / $scope.rate2).toFixed(2); //???
                // math.max.apply() 取最大值
                $scope.rate4 = (Math.max.apply(Math, totalRate4)).toFixed(2); //totalRate4是一个数组
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
                                s += '<br />high:<b class="red">￥' + Highcharts.numberFormat(this.points[0].point.high, 2) + '</b><br />low:<b class="blue">￥' + Highcharts.numberFormat(this.points[0].point.low, 2) + '</b><br />close:<b class="green">￥' + Highcharts.numberFormat(this.points[0].point.close, 2) + '</b><br />open:<b class="font-black">￥' + Highcharts.numberFormat(this.points[0].point.open, 2) + '</b><br />volume:<b class="orange">笔 ' + Highcharts.numberFormat(this.points[0].point.volume, 2);
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
                            buttons: [{
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
                                text: '价格'
                            },

                            lineWidth: 1
                        }],

                        series: [{
                            type: 'line',
                            name: '价格',
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
                                    s += '<br />总盈亏:<b class="white-blue">￥' + Highcharts.numberFormat(this.y, 2) + '</b><br />盈亏:<b class="font-black">￥' + this.points[0].point.pal + '</b><br />开仓价:<b class="font-black">￥' + this.points[0].point.openprice + '</b><br />平仓价:<b class="font-black">￥' + this.points[0].point.closeprice + '</b><br />方向:<span class="red">看多</span>';
                                    return s;
                                } else if (this.points[1].y == -1) {
                                    var s = Highcharts.dateFormat('<span>%Y-%m-%d %H:%M:%S</span>', this.x);
                                    s += '<br />总盈亏:<b class="white-blue">￥' + this.y + '</b><br />盈亏:<b class="font-black">￥' + this.points[0].point.pal + '</b><br />开仓价:<b class="font-black">￥' + this.points[0].point.openprice + '</b><br />平仓价:<b class="font-black">￥' + this.points[0].point.closeprice + '</b><br />方向:<span class="green">看空</span>';
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
                            buttons: [{
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
                        }, {
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

        $scope.clickfalse = function () {
            $scope.myFirmDateList = [];
            $scope.type = "实盘模拟"
            $scope.checktrue = 'false';
            $scope.myFirmStrategyList = falsedata;
        }
        $scope.clicktrue = function () {
            $scope.myFirmDateList = [];
            $scope.type = "真实交易"
            $scope.checktrue = 'true';
            $scope.myFirmStrategyList = truedata;
        }

        /*  if($cookieStore.get('user').is_admin){
         $scope.isadmin=true;
         }
         else{
         $scope.isadmin=false;
         return;
         }*/
        $scope.type = "实盘模拟"
        $scope.checktrue = 'false';
        var truedata = [];
        var falsedata = [];
        var allStrategy = [];
        $scope.myFirmStrategyList = [];
        //一进页面获取全部实盘数据(除了删除的数据)
       /* function getSelect() {
            $http.get(constantUrl + "strategys/", {
                    headers: {
                        'Authorization': 'token ' + $cookieStore.get('user').token
                    }
                })
                .success(function (data) {
                    allStrategy = data;
                    data = $filter('orderBy')(data, 'name')
                    for (var i = 0; i < data.length; i++) {
                        data[i].account_id == null ? falsedata.push(data[i]) : truedata.push(data[i])
                    }
                    var action = {
                        "#/AccountTrade": function () {
                            $scope.myFirmStrategyList = truedata;
                        },
                        "#/SimRealTimeTrade": function () {
                            $scope.myFirmStrategyList = falsedata;
                        }
                    }
                    //action[window.location.hash]();

                });

        };
        //getSelect();
        $scope.selecteStrategy = function () {
            $http.get(constantUrl + 'dates/', {
                    params: {
                        "date_type": 'transaction',
                        "sty_id": str
                    },
                    headers: {
                        'Authorization': 'token ' + $cookieStore.get('user').token
                    }
                })
                .success(function (data) {
                    $scope.myFirmDateList = data;
                    console.log($scope.myFirmDateList)
                })
                .error(function (err, sta) {
                    if (sta == 400) {
                        Showbo.Msg.alert('没有数据');
                    }
                    ;
                });
        };
*/

        /**
         * 实盘/真实交易数据处理
         */


        $scope.makeChart1 = function () {
            var beginData = [];
            var myFirm = [];
            var alldata = [];
            var data2 = [];
            myFirm = $scope.myFirmStrategy;
            var mydate = $filter('date')(new Date((new Date($scope.myFirmDate)).setDate((new Date($scope.myFirmDate)).getDate() + 1)), 'yyyy-MM-dd');
            var stime = $scope.myFirmDate;
            var etime = $scope.myFirmDate;

            function model() {
                $http.get(constantUrl + 'model_datas/', {
                        params: {
                            "id": str,
                            "date": $scope.myFirmDate,
                        },
                        headers: {
                            'Authorization': 'token ' + $cookieStore.get('user').token
                        }
                    })
                    .success(function (data) {

                        $scope.accuracy = data;

                    })
            }
            model();
            function getFirmTime() {
                var defer1 = $q.defer(); //通过$q服务注册一个延迟对象 defer1
                //console.log(myFirm[0]._id)

                $http.get(constantUrl + 'transactions/', {
                        params: {
                            "sty_id": myFirm._id,
                            "start": $scope.myFirmDate,
                            "end": mydate
                        },
                        headers: {
                            'Authorization': 'token ' + $cookieStore.get('user').token
                        }
                    })
                    .success(function (data) {
                        for(var i =0; i< data.length;i++) {
                            beginData[i] = data[i];
                        }
                        function trueRes(nowdata) {
                            var aloneshort = [];
                            var alonebuy = [];
                            var defer6 = $q.defer();
                            if (window.location.hash[2] == "A") {
                                for (var i = 0; i < nowdata.length; i++) { //保留已成交
                                    if (nowdata[i].status == 0 || nowdata[i].status == -1) {
                                        nowdata.splice(i, 1);
                                        i = -1;
                                    }
                                }
                            }
                            if (nowdata.length == 0) {
                                Showbo.Msg.alert("今天尚未有交易信号");
                                //console.log(stime,etime)
                                defer6.resolve(data);
                                return defer6.promise;
                            }
                            var hasNone = false; //判断今天是否有不配对平仓
                            for (var i = 0; i < nowdata.length; i++) {
                                if (nowdata[i].trans_type == "cover") {
                                    if (i == 0 || nowdata[i - 1].trans_type != "short") {
                                        hasNone = true;
                                        break;
                                    }
                                }
                                if (nowdata[i].trans_type == "sell") {
                                    if (i == 0 || nowdata[i - 1].trans_type != "buy") {
                                        hasNone = true;
                                        break;
                                    }
                                }
                            }
                            if (!hasNone) {
                                //console.log("没有不配对平仓，不获取单独开仓");
                                defer6.resolve(nowdata);
                                return defer6.promise;
                            }
                            var sdate = $filter('date')(new Date((new Date($scope.myFirmDate)).setDate((new Date($scope.myFirmDate)).getDate() - 1)), 'yyyy-MM-dd');
                            $http.get(constantUrl + 'transactions/', {
                                    params: {
                                        "sty_id": $scope.myFirmStrategy._id,
                                        "start": sdate,
                                        "end": $scope.myFirmDate
                                    },
                                    headers: {
                                        'Authorization': 'token ' + $cookieStore.get('user').token
                                    }
                                })
                                .success(function (data) {
                                    if (data[0] != null) {
                                        if (window.location.hash[2] == "A") {
                                            for (var i = 0; i < data.length; i++) { //保留已成交
                                                if (data[i].status == 0 || data[i].status == -1) {
                                                    data.splice(i, 1);
                                                    i = -1;
                                                }
                                            }
                                        }
                                        for (var i = 0; i < data.length; i++) { //获取前一天所有单独short
                                            if (data[i].trans_type == "short") {
                                                if (i + 1 >= data.length || data[i + 1].trans_type != "cover") {
                                                    aloneshort.push(data[i])
                                                }
                                            }
                                            if (data[i].trans_type == "buy") { //获取前一天所有单独buy
                                                if (i + 1 >= data.length || data[i + 1].trans_type != "sell") {
                                                    alonebuy.push(data[i])
                                                }
                                            }
                                        }
                                    } else {
                                        console.log("前一天没有交易")
                                    }
                                    if (nowdata[nowdata.length - 1] == null) {
                                        nowdata.splice(nowdata.length - 1, 1)
                                    }
                                    for (var i = 0; i < nowdata.length; i++) { //获取今天所有单独short
                                        if (nowdata[i].trans_type == "short") {
                                            if (i + 1 >= nowdata.length || nowdata[i + 1].trans_type != "cover") {
                                                aloneshort.push(nowdata[i])
                                            }
                                        }
                                        if (nowdata[i].trans_type == "buy") {
                                            if (i + 1 >= nowdata.length || nowdata[i + 1].trans_type != "sell") {
                                                alonebuy.push(nowdata[i])
                                            }
                                        }
                                    }

                                    for (var i = 0; i < nowdata.length; i++) {
                                        if (nowdata[i].trans_type == "cover") {
                                            if (i == 0 || nowdata[i - 1].trans_type != "short") {
                                                var flag = false;
                                                for (var j = aloneshort.length - 1; j >= 0; j--) {
                                                    if (aloneshort[j].datetime < nowdata[i].datetime) { //截取这个时间之前最近的short
                                                        flag = true;
                                                        break;
                                                    }
                                                }
                                                if (flag) {
                                                    nowdata.splice(i, 0, aloneshort[j]);
                                                    aloneshort.splice(j, 1);
                                                } else {
                                                    nowdata.splice(i, 1);
                                                    //console.log("发现无配对平仓")
                                                    i--;
                                                }
                                            }
                                        }
                                    }

                                    //console.log(nowdata)
                                    for (var i = 0; i < nowdata.length; i++) {
                                        if (nowdata[i].trans_type == "sell") {
                                            if (i == 0 || nowdata[i - 1].trans_type != "buy") {
                                                var flag = false;
                                                for (var j = alonebuy.length - 1; j >= 0; j--) {
                                                    if (alonebuy[j].datetime < nowdata[i].datetime) { //截取这个时间之前最近的buy
                                                        flag = true;
                                                        break;
                                                    }
                                                }
                                                if (flag) {
                                                    nowdata.splice(i, 0, alonebuy[j]);
                                                    alonebuy.splice(j, 1);
                                                } else {
                                                    nowdata.splice(i, 1);
                                                    //console.log("发现无配对平仓")
                                                    i--;
                                                }
                                            }
                                        }
                                    }

                                    defer6.resolve(nowdata);
                                })
                            return defer6.promise;
                        }

                        trueRes(data).then(function (nowdata) {
                            for (var i = 0; i < nowdata.length; i++) { //清除未配对开仓
                                if (nowdata[i].trans_type == "short") {
                                    if (i == nowdata.length - 1 || nowdata[i + 1].trans_type != "cover") {
                                        nowdata.splice(i, 1);
                                        i--;
                                    }
                                } else if (nowdata[i].trans_type == "buy") {
                                    if (i == nowdata.length - 1 || nowdata[i + 1].trans_type != "sell") {
                                        nowdata.splice(i, 1);
                                        i--;
                                    }
                                }
                            }
                            data = nowdata;
                            for (var i in data) {
                                alldata[i] = data[i];
                            }
                            /**
                             *    删除"0"数据并保存
                             */
                            function delzero(data) {
                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].price == 0) {
                                        var flag = data[i].trans_type;
                                        data.splice(i);
                                        if (flag == "cover" || flag == "sell") {
                                            data.splice(i - 1);
                                        } else {
                                            data.splice(i);
                                        }
                                        i = -1;
                                    }
                                }
                            }
                            delzero(data);
                            //console.log("数据处理完成")
                            if (data.length < 2) {
                                stime = $scope.myFirmDate;
                                etime = mydate;
                                Showbo.Msg.alert("今天尚未有交易信号");
                                defer1.resolve(data)
                            } else {
                                var min = data[0].datetime;
                                var max = data[0].datetime;
                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].datetime > max) {
                                        max = data[i].datetime
                                    }
                                    if (data[i].datetime < min) {
                                        min = data[i].datetime
                                    }
                                }
                                stime = min;
                                etime = max;
                            }
                            defer1.resolve(data);

                        })

                    })
                    .error(function (err, sta) {
                        defer1.reject(err); //deferred.reject(reason)  未成功解决其派生的promise。参数reason被用来说明未成功的原因。此时deferred实例的promise对象将会捕获一个任务未成功执行的错误，promise.catch(errorCallback(reason){...})。补充一点，promise.catch(errorCallback)实际上就是promise.then(null, errorCallback)的简写。
                    });
                return defer1.promise; //通过deferred延迟对象，可以得到一个承诺promise，而promise会返回当前任务的完成结果
            };
            //获取当前股价行情 时间根据交易时间的第一笔截至
            function getTransTime(chartData11) {
                var defer2 = $q.defer();
                var a = $filter('date')(new Date((new Date(stime)).setDate((new Date(stime)).getDate())), 'yyyy-MM-dd');
                var b = $filter('date')(new Date((new Date(etime)).setDate((new Date(etime)).getDate() + 1)), 'yyyy-MM-dd');
                if (chartData11.length == 0) {
                    b = $filter('date')(new Date((new Date(etime)).setDate((new Date(etime)).getDate())), 'yyyy-MM-dd');
                }
                //console.log(a, b)
                $http.get(constantUrl + 'datas/', {
                        params: {
                            //"type": 'tick',
                            "type": 'bar',
                            "start": a,
                            "symbol": $scope.myFirmStrategy.symbol,
                            "exchange": $scope.myFirmStrategy.exchange,
                            "multiple": $scope.myFirmStrategy.multiple,
                            "end": b
                        },
                        headers: {
                            'Authorization': 'token ' + $cookieStore.get('user').token
                        }
                    })
                    .success(function (data) {
                        if (chartData11.length == 0) {
                            defer2.resolve(data);
                        }
                        /* var data2 = []; //保存截取后股价的区间
                         var j = 0;
                         var flag = 300000;
                         for (var i = 0; i < data.length; i++) { //api是按天去股价，现在根据时间截取
                         var nowtime = data[i].datetime;
                         if (nowtime > stime - flag && nowtime < etime + flag && data[i].open != 0) {
                         data2[j++] = data[i];
                         }
                         }
                         data = data2;*/
                        defer2.resolve(data); //返回需要显示的股价区间
                    })
                    .error(function (err, sta) {
                        defer2.reject(err);
                    });
                return defer2.promise;
            };
            ///////////////////////////////////////////////////////////////////////////
            getFirmTime().then(function (data) {
                var chartData11 = data; //保存去除异常数据的数据
                //console.log(alldata)//包含异常数据的数据
                //  console.log(stime,etime)
                getTransTime(chartData11).then(function (data) {
                    //console.log(data)
                    var chartJsonData = data; //data股价曲线数据
                    $scope.analyse_title = { //选择策略的信息
                        'time': $filter('date')($scope.myFirmDate, 'yyyy-MM-dd'),
                        'name': $scope.myFirmStrategy.name,
                        'symbol': $scope.myFirmStrategy.symbol,
                        "multiple": $scope.myFirmStrategy.multiple,
                    };

                    draws();
                    //画曲线图
                    function draws() {
                        var chartJsonDataArr = []; //股价
                        var chartArr = []; //盈亏
                        var chartArr1 = []; //收益曲线
                        var  chartArr2=[];
                        var buySellNum = 1;
                        var buyYArr = []; //看多flag信息 颜色不一样
                        var shortYArr = []; //看空flag信息
                        // console.log("无异常数据",chartData11);//去除异常数据的数据
                        for (var i = 0; i < chartData11.length; i++) {
                            var data = chartData11[i]; //保存开仓价信息
                            //console.log(data.trans_type);
                            if (data.trans_type == "short") {
                                shortYArr.push({
                                    "text": '成交价：￥' + data.price + '<br>成交量：' + data.volume + '<br>操作：卖开仓' + '<br>方向：看空',
                                    "volume": data.volume,
                                    "pos": data.pos,
                                    "price": data.price,
                                    "x": data.datetime,
                                    "name": data.name,
                                    "symbol": data.symbol,
                                    "title":buySellNum + 'th_' + data.trans_type
                                });
                                i++;
                                if (i >= chartData11.length) {
                                    break;
                                }
                                data = chartData11[i]; //保存平仓价信息
                                shortYArr.push({
                                    "text": '成交价：￥' + data.price + '<br>成交量：' + data.volume + '<br>操作：买平仓' + '<br>方向：看空',
                                    "volume": data.volume,
                                    "pos": data.pos,
                                    "price": data.price,
                                    "x": data.datetime,
                                    "name": data.name,
                                    "symbol": data.symbol,
                                    "title":buySellNum + 'th_' + data.trans_type
                                });
                            } else {
                                buyYArr.push({
                                    "text": '成交价：￥' + data.price + '<br>成交量：' + data.volume + '<br>操作：买开仓' + '<br>方向：看多',
                                    "volume": data.volume,
                                    "pos": data.pos,
                                    "price": data.price,
                                    "x": data.datetime,
                                    "name": data.name,
                                    "symbol": data.symbol,
                                    "title": buySellNum + 'th_' + data.trans_type
                                });
                                i++;
                                if (i >= chartData11.length) {
                                    break;
                                }
                                data = chartData11[i]; //保存平仓价信息
                                buyYArr.push({
                                    "text": '成交价：￥' + data.price + '<br>成交量：' + data.volume + '<br>操作：卖平仓' + '<br/>方向：看多',
                                    "volume": data.volume,
                                    "pos": data.pos,
                                    "price": data.price,
                                    "x": data.datetime,
                                    "name": data.name,
                                    "symbol": data.symbol,
                                    "title": buySellNum + 'th_' + data.trans_type
                                });
                            }
                            buySellNum++;
                        }



                        //console.log(myFirm.multiple)
                        var allPal=0;
                        for (var i = 0; i < chartData11.length; i++) {

                            if (i + 1 >= chartData11.length) {
                                break;
                            }
                            var data = chartData11[i];
                            i++;
                            var data2 = chartData11[i]; //保存平仓价信息


                            var symbol = data.symbol[0] + data.symbol[1];
                            //无手续费盈亏
                            if (data.trans_type == "buy") {
                                //console.log("看多");
                                if(symbol == "bt"){
                                    var  test = (data2.price - data.price)*0.01
                                }
                                else {
                                    var test = data2.price - data.price;
                                }

                            } else {
                                //console.log("看空");
                                if(symbol == "bt"){
                                    var test = (data.price - data2.price)*0.01;
                                }
                                else{
                                    var test = data.price - data2.price;
                                }
                            }

                            test = test * myFirm.multiple;
                            test = Number((test).toFixed(6));
                            //console.log(test)
                            //计算手续费

                            var charge;
                            if (symbol == "IF" || symbol == "IC" || symbol == "IH") {
                                charge = 0.00015;
                                var test2 = (data2.price + data.price) * charge;
                            }
                            if (symbol == "D1") {
                                charge = 0.00035;
                                var test2 = (data2.price + data.price) * charge;
                            }
                            if (symbol == "D6") {
                                charge = 0.00035;
                                var test2 = (data2.price + data.price) * charge;
                            }
                            if(symbol == "bt"){
                                charge = 0.002;
                                var test2 = (data2.price + data.price) * charge*0.01;
                            }

                            test2 = test2 * myFirm.multiple;
                            test2 = Number((test2).toFixed(6));
                            var pal = test - test2;

                            pal = Number((pal).toFixed(6));
                            allPal +=pal;

                            chartArr.push({
                                "x": data2.datetime,
                                "y": pal, //盈亏数值
                                "volume": data.volume,
                                "direction": data.pos,
                                "Earn": pal, //盈亏
                                "openprice": data.price,
                                "closeprice": data2.price,
                                "opentime": data.datetime,
                                "closetime": data2.datetime,
                                "present": data2.price,
                                "symbol": myFirm.symbol,
                                "text": '开仓价：￥' + data.price + '<br>平仓价：￥' + data2.price + '<br>手续费：' + test2 + '<br/>盈亏：' + pal
                            });

                            if (data.trans_type == "buy") {
                                chartArr1.push({
                                    "text": '开仓价：' + data.price + '<br>平仓价：' + data2.price + '<br>盈亏：' + allPal,
                                    "title": "看多",
                                    "x": data2.datetime,
                                    "y": pal,
                                    "volume": data.volume,
                                    "direction": data.pos,
                                    "Earn": pal,
                                    "openprice": data.price,
                                    "closeprice": data2.price,
                                    "opentime": data.datetime,
                                    "closetime": data2.datetime,
                                    "present": data2.price,
                                    "symbol": myFirm.symbol
                                })
                            } else {
                                chartArr2.push({
                                    "text": '开仓价：' + data.price + '<br>平仓价：' + data2.price + '<br>盈亏：' + allPal,
                                    "title": "看空",
                                    "x": data2.datetime,
                                    "y": pal,
                                    "volume": data.volume,
                                    "direction": data.pos,
                                    "Earn": pal,
                                    "openprice": data.price,
                                    "closeprice": data2.price,
                                    "opentime": data.datetime,
                                    "closetime": data2.datetime,
                                    "present": data2.price,
                                    "symbol": myFirm.symbol
                                })
                            }


                        }
                        /**
                         * 数组排序
                         * @param order desc升序asc降序
                         * @param sortBy 所要排序的字段
                         * @returns {*}
                         */
                        function getSortFun(order, sortBy) {
                            var ordAlpah = (order == 'desc') ? '>' : '<';
                            var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
                            return sortFun;
                        }

                        chartArr.sort(getSortFun('desc', 'x'));


                        var buy = [];

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
                            if (sec >= 60) {
                                min += parseInt(sec / 60);
                                sec = sec - parseInt(sec / 60) * 60;
                            }
                            if (hour < 10) hour = "0" + hour;
                            if (min < 10) min = "0" + min;
                            if (sec < 10) sec = "0" + sec;
                            var totalTime = hour + ":" + min + ":" + sec;
                            return totalTime;
                        }


                        var alldata3 = []; //为了持仓时间
                        var alldata2 = []; //开仓平仓合并后的数据
                        var del = [];
                        num = parseInt(alldata.length / 2);
                        for (var i = 0; i < num; i++) {
                            //console.log(alldata[2*i].trans_type,alldata[2*i+1].trans_type)
                            if (alldata[2 * i].trans_type == "short") { //看空
                                alldata2.push({
                                    "direction": "看空",
                                    "openprice": alldata[2 * i].price,
                                    "opentime": alldata[2 * i].datetime,
                                    "closeprice": alldata[2 * i + 1].price,
                                    "closetime": alldata[2 * i + 1].datetime,
                                    "time": alldata[2 * i + 1].datetime,
                                    "open": alldata[2 * i].datetime
                                })
                            } else {
                                if (alldata[2 * i].trans_type == "buy") {
                                    alldata2.push({
                                        "direction": "看多",
                                        "openprice": alldata[2 * i].price,
                                        "opentime": alldata[2 * i].datetime,
                                        "closeprice": alldata[2 * i + 1].price,
                                        "closetime": alldata[2 * i + 1].datetime,
                                        "time": alldata[2 * i + 1].datetime,
                                        "open": alldata[2 * i].datetime
                                    })
                                } else {
                                    console.log("配对出错")
                                }
                            }
                        }

                        angular.forEach(alldata2, function (data, index) { //寻找异常数据的行数
                            if (data['openprice'] == 0 || data['closeprice'] == 0) {
                                del.push(index);
                            }
                        })
                        for (var i = 0; i < alldata2.length; i++) {
                            alldata3.push({
                                "opentime": "",
                                "closetime": "",
                            })
                            alldata3[i].opentime = (alldata2[i].opentime);
                            alldata3[i].closetime = (alldata2[i].closetime);
                        }


                        /**
                         * 时间格式
                         * @returns {string}
                         */
                        Date.prototype.toLocaleString = function () {
                            var year, month, day, hour, min, sec;
                            year = this.getFullYear();
                            month = this.getMonth() + 1;
                            if (month < 10) {
                                month = "0" + month;
                            }
                            day = this.getDate();
                            if (day < 10) {
                                day = "0" + day;
                            }
                            hour = this.getHours();
                            if (hour < 10) {
                                hour = "0" + hour;
                            }
                            min = this.getMinutes();
                            if (min < 10) {
                                min = "0" + min;
                            }
                            sec = this.getSeconds();
                            if (sec < 10) {
                                sec = "0" + sec;
                            }
                            return year + "-" + month + "-" + day + " " + hour + ":" + min;
                        };
                        /**
                         * 毫秒时间戳转换普通时间
                         * @param time
                         * @returns {string}
                         */
                        function gettime(time) {
                            var unixTimestamp = new Date(time)
                            return unixTimestamp.toLocaleString();
                        }


                        for (var i = 0; i < alldata2.length; i++) {
                            alldata2[i].opentime = gettime(alldata2[i].opentime);
                            alldata2[i].closetime = gettime(alldata2[i].closetime);
                            alldata2[i].time = gettime(alldata2[i].time);
                        }
                        /**
                         * 数组排序
                         * @param order desc升序asc降序
                         * @param sortBy 所要排序的字段
                         * @returns {*}
                         */
                        function getSortFun(order, sortBy) {
                            var ordAlpah = (order == 'desc') ? '>' : '<';
                            var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
                            return sortFun;
                        }

                        alldata2.sort(getSortFun('desc', 'open'));

                        $scope.analyseDataArr = alldata2;

                        /**封装计算手续费方法
                         *
                         * @param i
                         * @returns {number}
                         */
                        function gettest(i) {
                            var symbol = $scope.myFirmStrategy.symbol[0] + $scope.myFirmStrategy.symbol[1];
                            var charge;
                            if (symbol == "IF" || symbol == "IC" || symbol == "IH") {
                                charge = 0.00092;
                            }
                            if (symbol == "D1") {
                                charge = 0.00035;
                            }
                            if (symbol == "D6") {
                                charge = 0.00035;
                            }
                            if ($scope.myFirmStrategy.exchange == 'OKCoin') {
                                charge = 0.002;
                                return Number((($scope.analyseDataArr[i].closeprice + $scope.analyseDataArr[i].openprice) * charge * $scope.myFirmStrategy.multiple*0.01).toFixed(6));
                            }
                            var test = ($scope.analyseDataArr[i].closeprice + $scope.analyseDataArr[i].openprice) * charge;
                            test = test * $scope.myFirmStrategy.multiple;
                            test = Number((test).toFixed(6));
                            return test;
                        }

                        /**无手续费盈亏
                         *
                         * @param i
                         * @returns {number}
                         */
                        function notest(i) {
                            if ($scope.analyseDataArr[i].direction == "看多") {
                                //console.log("看多");
                                var test = $scope.analyseDataArr[i].closeprice - $scope.analyseDataArr[i].openprice;
                            } else {
                                //console.log("看空");
                                var test = $scope.analyseDataArr[i].openprice - $scope.analyseDataArr[i].closeprice;
                            }
                            if ($scope.myFirmStrategy.exchange == 'OKCoin'){
                                return Number((test * $scope.myFirmStrategy.multiple*0.01).toFixed(6));
                            }
                            test = test * $scope.myFirmStrategy.multiple;
                            test = Number((test).toFixed(6));
                            return test;
                        }

                        //console.log("所选实盘信息:",myFirm);//所选策略名对应的属性 包含交易所名  期货还是白银 回测没有倍数
                        //console.log(data2);//开仓平仓单个数据 获取委托号

                        var totalpal = 0;
                        var totaltest = 0;
                        var totaltestpal = 0;
                        var allTotalyeild = 0;
                        var allTotalTime1 = 0;
                        var zheng = 0;
                        var zheng1 = 0;
                        var a = 0;
                        var b = 0;
                        var mean = 0;
                        var n = 0;
                        var max = -100;
                        var min = 100;
                        //实盘测试计算
                        var num = 0; //正确数据的个数
                        for (var i = 0; i < alldata2.length; i++) {
                            var flag = false;
                            for (var j = 0; j < del.length; j++) {
                                if (i == del[j]) {
                                    $scope.analyseDataArr[i].color = "error";
                                    flag = true; //有异常flag为true
                                }
                            }
                            if (flag) {
                                continue;
                            } //如果当前数据异常跳过计算
                            $scope.analyseDataArr[i].a = alldata[2 * i].serialno; //开仓价委托号
                            $scope.analyseDataArr[i].b = alldata[2 * i + 1].serialno; //平仓价委托号
                            $scope.analyseDataArr[i].multiple = myFirm.multiple; //交易手数
                            $scope.analyseDataArr[i].pal = notest(i) - gettest(i); //计算每笔盈亏
                            $scope.analyseDataArr[i].test = gettest(i); //计算每笔手续费
                            $scope.analyseDataArr[i].testpal = notest(i); //计算每笔无手续费盈亏
                            totalpal += $scope.analyseDataArr[i].pal; //累加总盈亏
                            totaltest += $scope.analyseDataArr[i].test; //累加手续费
                            totaltestpal += $scope.analyseDataArr[i].testpal; //累加无手续费盈亏
                            //交易收益率输出
                            $scope.analyseDataArr[i].yeild = $scope.analyseDataArr[i].pal / $scope.analyseDataArr[i].openprice; //计算每笔收益率
                            allTotalyeild += $scope.analyseDataArr[i].yeild; //累加收益率
                            //持仓时间计算
                            $scope.analyseDataArr[i].totalTime = $scope.newTotalTime(alldata3[i].closetime - alldata3[i].opentime); //计算每笔持仓时间
                            allTotalTime1 += (alldata3[i].closetime - alldata3[i].opentime); //累加持仓时间

                            //胜率
                            var test = notest(i) - gettest(i);
                            if (test > 0) {
                                $scope.analyseDataArr[i].winrate = 100; //盈亏胜率胜 盈为100%亏为0%
                                zheng++; //累积胜的次数
                            } else {
                                $scope.analyseDataArr[i].winrate = 0;
                            }
                            //交易方向胜率，根据看多看空分别比较
                            if ($scope.analyseDataArr[i].direction == "看多") { //看多的时候开仓小于平仓为盈
                                if ($scope.analyseDataArr[i].closeprice > $scope.analyseDataArr[i].openprice) {
                                    $scope.analyseDataArr[i].jiaoyiwinrate = 100;
                                    zheng1++;
                                } else {
                                    $scope.analyseDataArr[i].jiaoyiwinrate = 0;
                                }
                            } else { //看空的时候开仓大于平仓为亏
                                //console.log("看空");
                                if ($scope.analyseDataArr[i].closeprice < $scope.analyseDataArr[i].openprice) {
                                    $scope.analyseDataArr[i].jiaoyiwinrate = 100;
                                    zheng1++;
                                } else {
                                    $scope.analyseDataArr[i].jiaoyiwinrate = 0;
                                }
                            }
                            //盈亏比
                            var test = notest(i) - gettest(i);
                            if (test > 0) {
                                a += test; //累加所有盈
                            } else {
                                b += test; //累加所有亏
                            }

                            //最大回撤率，最小除最大减1
                            var test = notest(i) - gettest(i);
                            if (test > max) {
                                max = test; //找出最大
                            }
                            if (test < min) {
                                min = test; //找出最小
                            }

                            num++;
                        }

                        //console.log("成交数：", num)

                        $scope.allTotaltest = totaltest;
                        $scope.allTotaltestpal = totaltestpal;
                        $scope.allTotalpal = totalpal;
                        $scope.allTotalyeild = allTotalyeild;
                        $scope.averTotalyeild = allTotalyeild / num;
                        $scope.annualized_return = allTotalyeild * 250; //年化收益率
                        $scope.allTotalTime = $scope.newTotalTime(allTotalTime1); //alltotaltime是总持仓时间
                        $scope.averTotalTime = $scope.newTotalTime(allTotalTime1 / num); //averTotalTime是平均持仓时间
                        $scope.average_winrate = zheng / num * 100; //盈亏胜率
                        $scope.average_jioayiwinrate = zheng1 / num * 100; //交易方向胜率
                        $scope.average_profit = Math.abs(a / b) * 100; //盈亏比
                        $scope.rate1 = allTotalyeild / num; //平均净回报率
                        // mean(a) = a(1) + a(2) + .... /n
                        //std(a)=sqrt([(a(1)-mean(a))^2 + (a(2)-mean(a))^2 + .../(n-1)])
                        mean = totalpal / num; //收益均值
                        for (var i = 0; i < num; i++) {
                            var test = notest(i) - gettest(i);
                            n += Math.pow(test - mean, 2);
                        }
                        n = n / (num - 1);
                        var std = Math.sqrt(n);
                        var nianhua = std * Math.sqrt(250); //年化标准差,std*sqrt(250)是最普通的做法，mean的部分要乘以250(策略收益波动率)
                        $scope.rate2 = nianhua; //年化标准差
                        $scope.rate3 = (mean) / std; //sharpe就每天受益平均下除以std
                        $scope.errorYeild = mean / nianhua; //信息比率(策略每日收益 - 参考标准每日收益)的年化均值 / 年化标准差
                        $scope.rate4 = min / max - 1; //最大回撤率


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
                        //成交量图表
                        // console.log(chartJsonDataArr);
                        var volume = [];
                        angular.forEach(chartJsonData, function (data, index) {
                            volume.push({
                                "x": data.datetime,
                                "y": data.volume,
                                'low': data.low,
                                'high': data.high,
                                'close': data.close,
                                'open': data.open,
                                'volume': data.volume
                            })

                        })

                        // console.log((1483067700000-1483048799000)/1000/60/60);
                        /*   var avarline=[];
                         for(var i=0;i<chartJsonDataArr.length;i++){
                         var avar=chartJsonDataArr[i].close,n=0;
                         for(var j=i;n<5;j++){
                         if(parseInt((chartJsonDataArr[j+1].x-chartJsonDataArr[j].x)/1000/60)==1){
                         avar=avar+chartJsonDataArr[j+1].close;
                         n++;
                         }
                         }
                         avarline[i]=avar;
                         }*/

                        //MA5
                        var averline5 = [];
                        for (var i = chartJsonDataArr.length - 1; i >= 4; i--) {
                            var aver = chartJsonDataArr[i].close, n = 0;
                            for (var j = i; n < 4; j--) {
                                aver = aver + chartJsonDataArr[j - 1].close;
                                n++;
                            }
                            averline5.push({
                                'average': aver / 5,
                                "x": chartJsonDataArr[i].x,
                                "y": aver / 5,
                            })
                        }
                        averline5 = $filter('orderBy')(averline5, 'x');

                        //MA10

                        var averline10 = [];
                        for (var i = chartJsonDataArr.length - 1; i >= 9; i--) {
                            var aver10 = chartJsonDataArr[i].close, n = 0;
                            for (var j = i; n < 9; j--) {
                                aver10 = aver10 + chartJsonDataArr[j - 1].close;
                                n++;
                            }
                            averline10.push({
                                'average': aver10 / 10,
                                "x": chartJsonDataArr[i].x,
                                "y": aver10 / 10,
                            })
                        }

                        averline10 = $filter('orderBy')(averline10, 'x');

                        //MA30
                        var averline30 = [];
                        for (var i = chartJsonDataArr.length - 1; i >= 29; i--) {
                            var aver30 = chartJsonDataArr[i].close, n = 0;
                            for (var j = i; n < 29; j--) {
                                aver30 = aver30 + chartJsonDataArr[j - 1].close;
                                n++;
                            }
                            averline30.push({
                                'average': aver30 / 30,
                                "x": chartJsonDataArr[i].x,
                                "y": aver30 / 30,
                            })
                        }

                        averline30 = $filter('orderBy')(averline30, 'x');

                        //MA60
                        var averline60 = [];
                        for (var i = chartJsonDataArr.length - 1; i >= 59; i--) {
                            var aver60 = chartJsonDataArr[i].close, n = 0;
                            for (var j = i; n < 59; j--) {
                                aver60 = aver60 + chartJsonDataArr[j - 1].close;
                                n++;
                            }
                            averline60.push({
                                'average': aver60 / 60,
                                "x": chartJsonDataArr[i].x,
                                "y": aver60 / 60,
                            })
                        }
                        function nullToData(chartData11){
                            console.log(chartData11)
                            console.log(chartData11[0])
                            for (var i = 0; i < chartData11.length; i++) {
                                var data = chartData11[i]; //保存开仓价信息
                                console.log(data);
                                if (data.trans_type == "short") {

                                    shortYArr.push({
                                        "text": '成交价：￥' + data.price + '<br>成交量：' + data.volume + '<br>操作：卖开仓' + '<br>方向：看空',
                                        "volume": data.volume,
                                        "pos": data.pos,
                                        "price": data.price,
                                        "x": data.datetime,
                                        "name": data.name,
                                        "symbol": data.symbol,
                                        "title":buySellNum + 'th_' + data.trans_type
                                    });
                                    i++;
                                    if (i >= chartData11.length) {
                                        break;
                                    }
                                    data = chartData11[i]; //保存平仓价信息
                                    shortYArr.push({
                                        "text": '成交价：￥' + data.price + '<br>成交量：' + data.volume + '<br>操作：买平仓' + '<br>方向：看空',
                                        "volume": data.volume,
                                        "pos": data.pos,
                                        "price": data.price,
                                        "x": data.datetime,
                                        "name": data.name,
                                        "symbol": data.symbol,
                                        "title":buySellNum + 'th_' + data.trans_type
                                    });
                                } else {
                                    buyYArr.push({
                                        "text": '成交价：￥' + data.price + '<br>成交量：' + data.volume + '<br>操作：买开仓' + '<br>方向：看多',
                                        "volume": data.volume,
                                        "pos": data.pos,
                                        "price": data.price,
                                        "x": data.datetime,
                                        "name": data.name,
                                        "symbol": data.symbol,
                                        "title": buySellNum + 'th_' + data.trans_type
                                    });
                                    i++;
                                    if (i >= chartData11.length) {
                                        break;
                                    }
                                    data = chartData11[i]; //保存平仓价信息
                                    buyYArr.push({
                                        "text": '成交价：￥' + data.price + '<br>成交量：' + data.volume + '<br>操作：卖平仓' + '<br/>方向：看多',
                                        "volume": data.volume,
                                        "pos": data.pos,
                                        "price": data.price,
                                        "x": data.datetime,
                                        "name": data.name,
                                        "symbol": data.symbol,
                                        "title": buySellNum + 'th_' + data.trans_type
                                    });
                                }
                                buySellNum++;
                            }
                        }
                        averline60 = $filter('orderBy')(averline60, 'x');

                        if(buyYArr.length==0&&shortYArr.length==0){
                            nullToData(beginData);
                        }
                        //console.log(buyYArr,shortYArr,beginData);
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
                                },
                                candlestick: { //红涨绿跌
                                    color: '#33AA11',
                                    upColor: '#DD2200',
                                    lineColor: '#33AA11',
                                    upLineColor: '#DD2200',
                                    maker: {
                                        states: {
                                            hover: {
                                                enabled: false,
                                            }
                                        }
                                    }
                                }
                            },
                            tooltip: {
                                useHTML: true,
                                xDateFormat: "%Y-%m-%d %H:%M:%S",
                                valueDecimals: 2,
                                backgroundColor: '#eeeeee',   // 背景颜色
                                borderColor: '#ccc',         // 边框颜色
                                borderRadius: 10,             // 边框圆角
                                borderWidth: 1,               // 边框宽度
                                shadow: true,                 // 是否显示阴影
                                animation: true,               // 是否启用动画效果
                                // pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                            },
                            legend: {
                                enabled: true,
                                align: 'right',
                                verticalAlign: 'top',
                                x: 0,
                                y: 0
                            },
                            rangeSelector: {
                                buttons: [{
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
                                    text: '价格'
                                },
                                lineWidth: 1,
                                height: '50%'
                            }, {
                                labels: {
                                    align: 'right',
                                    x: -3
                                },
                                title: {
                                    text: '成交量'
                                },
                                opposite: true,
                                offset: 0,
                                height: '20%',
                                top: '52%'
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
                                height: '20%',
                                top: '74%'
                            }],
                            series: [{
                                type: 'spline',
                                name: 'MA5',
                                data: averline5,
                                lineWidth: 1,
                                color: 'red',
                                visible: false,
                            }, {
                                type: 'spline',
                                name: 'MA10',
                                data: averline10,
                                lineWidth: 1,
                                color: 'yellow',
                                visible: false
                            }, {
                                type: 'spline',
                                name: 'MA30',
                                data: averline30,
                                lineWidth: 1,
                                color: 'blue',
                                visible: false
                            }, {
                                type: 'spline',
                                name: 'MA60',
                                data: averline60,
                                lineWidth: 1,
                                color: 'green',
                                visible: false
                            }, {
                                type: 'candlestick',
                                name: '价格',
                                data: chartJsonDataArr,
                                id: 'dataseries',
                                showInLegend: false
                            }, {
                                type: 'flags',
                                data: shortYArr,
                                onSeries: "dataseries",
                                shape: 'squarepin',
                                width: 60,
                                color: '#ff9912',
                                fillColor: 'transparent',
                                style: {
                                    color: '#ff9912'
                                },
                                y: -40,
                                name: '看空',
                            },{
                                type: 'flags',
                                data: buyYArr,
                                onSeries: "dataseries",
                                shape: 'squarepin',
                                width: 60,
                                color: "#4169e1",
                                fillColor: 'transparent',
                                style: {
                                    color: '#4169e1'
                                },
                                y: 20,
                                name: '看多',
                            }, {
                                type: 'column',
                                data: volume,
                                name: '成交量',
                                yAxis: 1,
                                color: '#e6e843'

                            }, {
                                type: 'column',
                                data: chartArr,
                                name: '盈亏',
                                yAxis: 2,
                                threshold: 0,
                                negativeColor: 'green',
                                color: 'red'
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
                                },
                                candlestick: { //红涨绿跌
                                    color: '#33AA11',
                                    upColor: '#DD2200',
                                    lineColor: '#33AA11',
                                    upLineColor: '#DD2200',
                                    maker: {
                                        states: {
                                            hover: {
                                                enabled: false,
                                            }
                                        }
                                    }
                                }
                            },
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
                                buttons: [{
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
                                    text: '价格'
                                },
                                lineWidth: 1,
                                height: '50%'
                            }, {
                                labels: {
                                    align: 'right',
                                    x: -3
                                },
                                title: {
                                    text: '成交量'
                                },
                                opposite: true,
                                offset: 0,
                                height: '20%',
                                top: '52%'
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
                                height: '20%',
                                top: '74%'
                            }],
                            series: [{
                                type: 'line',
                                name: '价格',
                                data: chartJsonDataArr,
                                lineWidth: 2,
                                id: 'dataseries'
                            }, {
                                type: 'candlestick',
                                name: '价格',
                                data: chartJsonDataArr,

                                id: 'dataseries'
                            }, {
                                type: 'flags',
                                data: shortYArr,
                                onSeries: "dataseries",
                                shape: 'squarepin',
                                width: 36,
                                color: '#ff9912',
                                fillColor: 'transparent',
                                style: {
                                    color: '#33x  3'
                                },
                                y: -40,
                                name: '看空',
                            }, {
                                type: 'flags',
                                data: buyYArr,
                                onSeries: "dataseries",
                                shape: 'squarepin',
                                width: 36,
                                color: "#4169e1",
                                fillColor: 'transparent',
                                style: {
                                    color: '#333'
                                },
                                y: 20,
                                name: '看多',
                            }, {
                                type: 'column',
                                data: volume,
                                name: '成交量',
                                yAxis: 1,
                                color: '#e6e843'

                            }, {
                                type: 'column',
                                data: chartArr,
                                name: '盈亏',
                                /*lineWidth:2,*/
                                yAxis: 2,
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
                        //console.log(chartArr);


                        for (var i = 1; i < chartArr.length; i++) {
                            chartArr[i].Earn = chartArr[i - 1].Earn + chartArr[i].Earn;
                            chartArr[i].y = chartArr[i - 1].y + chartArr[i].y;
                        }

                        //console.log(chartArr);
                        //页面显示的收益曲线图
                        $('#return_map_big_2').highcharts('StockChart', {
                            credits: {
                                enabled: false
                            },
                            exporting: {
                                enabled: false
                            },
                            xAxis: {
                                tickInterval: 1
                            },
                            yAxis: [{
                                type: '盈亏',
                                minorTickInterval: 0.1,
                                plotLines: [{
                                    color: '#A25E6B', //线的颜色
                                    dashStyle: 'solid', //默认值，这里定义为实线
                                    value: 0, //定义在那个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
                                    width: 2 //标示线的宽度，2px
                                }],
                            }],

                            rangeSelector: {
                                buttons: [{
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

                            plotOptions: {
                                spline: {
                                    lineWidth: 1.5,
                                    fillOpacity: 0.1,
                                    marker: {
                                        enabled: false,
                                        states: {
                                            hover: {
                                                enabled: true,
                                                radius: 2
                                            }
                                        }
                                    },
                                    shadow: false
                                }
                            },

                            //收益曲线
                            series: [{
                                data: chartArr,
                                name: '盈亏',
                                marker: {
                                    enabled: true,
                                    symbol: 'square',
                                    fillColor: 'blue',
                                    radius: 5
                                },
                                id: "yingkui",
                                color: '#eec710',
                            },
                                {
                                    type: 'flags',
                                    data: chartArr2,
                                    onSeries: "yingkui",
                                    shape: 'squarepin',
                                    width: 36,
                                    color: "#ff9912",
                                    fillColor: 'transparent',
                                    style: {
                                        color: '#ff9912'
                                    },
                                    name: "详情",
                                    y: -50
                                }
                                , {
                                    type: 'flags',
                                    data: chartArr1,
                                    onSeries: "yingkui",
                                    shape: 'squarepin',
                                    width: 36,
                                    color: "#4169e1",
                                    fillColor: 'transparent',
                                    style: {
                                        color: '#4169e1'
                                    },
                                    name: "详情",
                                    y: -50
                                }
                            ]
                        });

                        //打印中的收益曲线
                        $('#return_map_big_form1').highcharts('StockChart', {
                            credits: {
                                enabled: false
                            },
                            exporting: {
                                enabled: false
                            },
                            xAxis: {
                                tickInterval: 1
                            },
                            yAxis: [{
                                type: '盈亏',
                                minorTickInterval: 0.1,
                                plotLines: [{
                                    color: '#A25E6B', //线的颜色
                                    dashStyle: 'solid', //默认值，这里定义为实线
                                    value: 0, //定义在那个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
                                    width: 2 //标示线的宽度，2px
                                }],
                            }],

                            rangeSelector: {
                                buttons: [{
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

                            plotOptions: {
                                spline: {
                                    lineWidth: 1.5,
                                    fillOpacity: 0.1,
                                    marker: {
                                        enabled: false,
                                        states: {
                                            hover: {
                                                enabled: true,
                                                radius: 2
                                            }
                                        }
                                    },
                                    shadow: false
                                }
                            },

                            series: [{
                                data: chartArr,
                                name: '盈亏',
                                marker: {
                                    enabled: true,
                                    symbol: 'square',
                                    fillColor: 'blue',
                                    radius: 5
                                },
                                id: "yingkui",
                                color: '#eec710'
                            }, {
                                type: 'flags',
                                data: chartArr1,
                                onSeries: "yingkui",
                                shape: 'squarepin',
                                width: 36,
                                color: "#4169e1",
                                fillColor: 'transparent',
                                style: {
                                    color: '#333'
                                },
                                name: "详情",
                                y: -50


                            }

                            ]
                        });
                        $(".analyse .noprint .remind span").show();


                    };
                });
            });
        };


    }])
    .controller('complieController', ['$scope', '$rootScope', '$http', '$location', '$cookies', '$cookieStore', 'constantUrl', '$route', '$timeout', '$q', '$interval', '$filter', function ($scope, $rootScope, $http, $location, $cookies, $cookieStore, constantUrl, $route, $timeout, $q, $interval, $filter) {
        $scope.fate = 0;
        var editor;
        var myClassId;
        $scope.code = "# encoding: UTF-8\n" + "\"\"\"\n" + "这里的Demo是一个最简单的策略实现，并未考虑太多实盘中的交易细节，如：\n" + "1. 委托价格超出涨跌停价导致的委托失败\n" + "2. 委托未成交，需要撤单后重新委托\n" + "3. 断网后恢复交易状态\n" + "\"\"\"\n" + "from ctaBase import *\n" + "from ctaTemplate import CtaTemplate\n\n" + "########################################################################\n" + "class Demo(CtaTemplate):\n" + "    \"\"\"双指数均线策略Demo\"\"\"\n" + "    className = 'Demo'\n" + "    author = u'coder name'\n\n" + "    # 策略参数\n" + "    fastK = 0.9     # 快速EMA参数\n" + "    slowK = 0.1     # 慢速EMA参数\n" + "    initDays = 10   # 初始化数据所用的天数\n\n" + "    # 策略变量\n" + "    bar = None\n" + "    barMinute = EMPTY_STRING\n\n" + "    fastMa = []             # 快速EMA均线数组\n" + "    fastMa0 = EMPTY_FLOAT   # 当前最新的快速EMA\n" + "    fastMa1 = EMPTY_FLOAT   # 上一根的快速EMA\n\n" + "    slowMa = []             # 与上面相同\n" + "    slowMa0 = EMPTY_FLOAT\n" + "    slowMa1 = EMPTY_FLOAT\n\n" + "    # 参数列表，保存了参数的名称\n" + "    paramList = ['name',\n" + "                 'className',\n" + "                 'author',\n" + "                 'vtSymbol',\n" + "                 'fastK',\n" + "                 'slowK']\n\n" + "    # 变量列表，保存了变量的名称\n" + "    varList = ['inited',\n" + "               'trading',\n" + "               'pos',\n" + "               'fastMa0',\n" + "               'fastMa1',\n" + "               'slowMa0',\n" + "               'slowMa1']\n\n" + "    #----------------------------------------------------------------------\n" + "    def __init__(self, ctaEngine, setting):\n" + "        \"\"\"Constructor\"\"\"\n" + "        super(Demo, self).__init__(ctaEngine, setting)\n\n" + "       # 注意策略类中的可变对象属性（通常是list和dict等），在策略初始化时需要重新创建，\n" + "        # 否则会出现多个策略实例之间数据共享的情况，有可能导致潜在的策略逻辑错误风险，\n" + "        # 策略类中的这些可变对象属性可以选择不写，全都放在__init__下面，写主要是为了阅读\n" + "        # 策略时方便（更多是个编程习惯的选择）\n" + "        self.fastMa = []\n" + "        self.slowMa = []\n\n" + "    #----------------------------------------------------------------------\n" + "    def onInit(self):\n" + "        \"\"\"初始化策略（必须由用户继承实现）\"\"\"\n" + "        self.writeCtaLog(u'demo策略初始化')\n\n" + "        initData = self.loadBar(self.initDays)\n" + "        for bar in initData:\n" + "            self.onBar(bar)\n\n" + "        self.putEvent()\n\n" + "    #----------------------------------------------------------------------\n" + "    def onStart(self):\n" + "        \"\"\"启动策略（必须由用户继承实现）\"\"\"\n" + "        self.writeCtaLog(u'demo策略启动')\n" + "        self.putEvent()\n\n" + "    #----------------------------------------------------------------------\n" + "    def onStop(self):\n" + "        \"\"\"停止策略（必须由用户继承实现）\"\"\"\n" + "        self.writeCtaLog(u'demo策略停止')\n" + "        self.putEvent()\n\n" + "    #----------------------------------------------------------------------\n" + "    def onTick(self, tick):\n" + "        \"\"\"收到行情TICK推送（必须由用户继承实现）\"\"\"\n" + "        # 计算K线\n" + "        tickMinute = tick.datetime.minute\n\n" + "        if tickMinute != self.barMinute:\n" + "            if self.bar:\n" + "                self.onBar(self.bar)\n\n" + "            bar = CtaBarData()\n" + "            bar.vtSymbol = tick.vtSymbol\n" + "            bar.symbol = tick.symbol\n" + "            bar.exchange = tick.exchange\n\n" + "            bar.open = tick.lastPrice\n" + "            bar.high = tick.lastPrice\n" + "            bar.low = tick.lastPrice\n" + "            bar.close = tick.lastPrice\n\n" + "            bar.date = tick.date\n" + "            bar.time = tick.time\n" + "            bar.datetime = tick.datetime    # K线的时间设为第一个Tick的时间\n\n" + "            # 实盘中用不到的数据可以选择不算，从而加快速度\n\n" + "            #bar.volume = tick.volume\n" + "            #bar.openInterest = tick.openInterest\n\n" + "            self.bar = bar                  # 这种写法为了减少一层访问，加快速度\n" + "            self.barMinute = tickMinute     # 更新当前的分钟\n\n" + "        else:                               # 否则继续累加新的K线\n\n" + "            bar = self.bar                  # 写法同样为了加快速度\n\n" + "            bar.high = max(bar.high, tick.lastPrice)\n" + "            bar.low = min(bar.low, tick.lastPrice)\n" + "            bar.close = tick.lastPrice\n\n" + "    #----------------------------------------------------------------------\n\n" + "    def onBar(self, bar):\n" + "        \"\"\"收到Bar推送（必须由用户继承实现）\"\"\"\n" + "		\"\"\"算法核心，接受到Bar数据后算法逻辑判断\"\"\"\n\n" + "		# 计算快慢均线\n" + "        if not self.fastMa0:\n" + "            self.fastMa0 = bar.close\n" + "            self.fastMa.append(self.fastMa0)\n" + "        else:\n" + "            self.fastMa1 = self.fastMa0\n" + "            self.fastMa0 = bar.close * self.fastK + self.fastMa0 * (1 - self.fastK)\n" + "            self.fastMa.append(self.fastMa0)\n\n" + "        if not self.slowMa0:\n" + "            self.slowMa0 = bar.close\n" + "            self.slowMa.append(self.slowMa0)\n" + "        else:\n" + "            self.slowMa1 = self.slowMa0\n" + "            self.slowMa0 = bar.close * self.slowK + self.slowMa0 * (1 - self.slowK)\n" + "            self.slowMa.append(self.slowMa0)\n\n" + "        # 判断买卖\n" + "        crossOver = self.fastMa0>self.slowMa0 and self.fastMa1<self.slowMa1     # 金叉上穿\n" + "        crossBelow = self.fastMa0<self.slowMa0 and self.fastMa1>self.slowMa1    # 死叉下穿\n\n" + "        # 金叉和死叉的条件是互斥\n" + "        # 所有的委托均以K线收盘价委托（这里有一个实盘中无法成交的风险，考虑添加对模拟市价单类型的支持）\n" + "        if crossOver:\n" + "            # 如果金叉时手头没有持仓，则直接做多\n" + "            if self.pos == 0:\n" + "                self.buy(bar.close, 1)\n" + "            # 如果有空头持仓，则先平空，再做多\n" + "            elif self.pos < 0:\n" + "                self.cover(bar.close, 1)\n" + "                self.buy(bar.close, 1)\n" + "        # 死叉和金叉相反\n" + "        elif crossBelow:\n" + "            if self.pos == 0:\n" + "                self.short(bar.close, 1)\n" + "            elif self.pos > 0:\n" + "                self.sell(bar.close, 1)\n" + "                self.short(bar.close, 1)\n\n" + "        # 发出状态更新事件\n" + "        self.putEvent()\n\n" + "    #----------------------------------------------------------------------\n" + "    def onOrder(self, order):\n" + "        \"\"\"收到委托变化推送（必须由用户继承实现）\"\"\"\n" + "        # 对于无需做细粒度委托控制的策略，可以忽略onOrder\n" + "        pass\n\n" + "    #----------------------------------------------------------------------\n" + "    def onTrade(self, trade):\n" + "        \"\"\"收到成交推送（必须由用户继承实现）\"\"\"\n" + "        # 对于无需做细粒度委托控制的策略，可以忽略onOrder\n" + "        pass\n\n\n" + "########################################################################################\n" + "class OrderManagementDemo(CtaTemplate):\n" + "    \"\"\"基于tick级别细粒度撤单追单测试demo\"\"\"\n\n" + "    className = 'OrderManagementDemo'\n" + "    author = u'用Python的交易员'\n\n" + "    # 策略参数\n" + "    initDays = 10   # 初始化数据所用的天数\n\n" + "    # 策略变量\n" + "    bar = None\n" + "    barMinute = EMPTY_STRING\n\n\n" + "    # 参数列表，保存了参数的名称\n" + "    paramList = ['name',\n" + "                 'className',\n" + "                 'author',\n" + "                 'vtSymbol']\n\n" + "    # 变量列表，保存了变量的名称\n" + "    varList = ['inited',\n" + "               'trading',\n" + "               'pos']\n\n" + "    #----------------------------------------------------------------------\n" + "    def __init__(self, ctaEngine, setting):\n" + "        \"\"\"Constructor\"\"\"\n" + "        super(OrderManagementDemo, self).__init__(ctaEngine, setting)\n\n" + "        self.lastOrder = None\n" + "        self.orderType = ''\n\n" + "    #----------------------------------------------------------------------\n" + "    def onInit(self):\n" + "       \"\"\"初始化策略（必须由用户继承实现）\"\"\"\n" + "        self.writeCtaLog(u'demo策略初始化')\n\n" + "        initData = self.loadBar(self.initDays)\n" + "        for bar in initData:\n" + "            self.onBar(bar)\n\n" + "        self.putEvent()\n\n" + "    #----------------------------------------------------------------------\n" + "    def onStart(self):\n" + "        \"\"\"启动策略（必须由用户继承实现）\"\"\"\n" + "        self.writeCtaLog(u'demo策略启动')\n" + "        self.putEvent()\n\n" + "    #----------------------------------------------------------------------\n" + "    def onStop(self):\n" + "        \"\"\"停止策略（必须由用户继承实现）\"\"\"\n" + "        self.writeCtaLog(u'demo策略停止')\n" + "        self.putEvent()\n\n" + "    #----------------------------------------------------------------------\n" + "    def onTick(self, tick):\n" + "        \"\"\"收到行情TICK推送（必须由用户继承实现）\"\"\"\n\n" + "        # 建立不成交买单测试单\n" + "        if self.lastOrder == None:\n" + "            self.buy(tick.lastprice - 10.0, 1)\n\n" + "        # CTA委托类型映射\n" + "        if self.lastOrder != None and self.lastOrder.direction == u'多' and self.lastOrder.offset == u'开仓':\n" + "            self.orderType = u'买开'\n\n" + "        elif self.lastOrder != None and self.lastOrder.direction == u'多' and self.lastOrder.offset == u'平仓':\n" + "            self.orderType = u'买平'\n\n" + "        elif self.lastOrder != None and self.lastOrder.direction == u'空' and self.lastOrder.offset == u'开仓':\n" + "            self.orderType = u'卖开'\n\n" + "        elif self.lastOrder != None and self.lastOrder.direction == u'空' and self.lastOrder.offset == u'平仓':\n" + "            self.orderType = u'卖平'\n\n" + "        # 不成交，即撤单，并追单\n" + "        if self.lastOrder != None and self.lastOrder.status == u'未成交':\n\n" + "            self.cancelOrder(self.lastOrder.vtOrderID)\n" + "            self.lastOrder = None\n" + "        elif self.lastOrder != None and self.lastOrder.status == u'已撤销':\n" + "        # 追单并设置为不能成交\n\n" + "            self.sendOrder(self.orderType, self.tick.lastprice - 10, 1)\n" + "            self.lastOrder = None\n\n" + "    #----------------------------------------------------------------------\n" + "    def onBar(self, bar):\n" + "        \"\"\"收到Bar推送（必须由用户继承实现）\"\"\"\n" + "        pass\n\n" + "    #----------------------------------------------------------------------\n" + "    def onOrder(self, order):\n" + "        \"\"\"收到委托变化推送（必须由用户继承实现）\"\"\"\n" + "        # 对于无需做细粒度委托控制的策略，可以忽略onOrder\n" + "        self.lastOrder = order\n\n" + "    #----------------------------------------------------------------------\n\n" + "    def onTrade(self, trade):\n" + "        \"\"\"收到成交推送（必须由用户继承实现）\"\"\"\n" + "        # 对于无需做细粒度委托控制的策略，可以忽略onOrder\n" + "        pass";


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
            actualResController
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
                    params: {
                        type: ty,
                        date_type: 'data'
                    },
                    headers: {
                        'Authorization': 'token ' + $cookieStore.get('user').token
                    }
                })
                .success(function (data) {
                    $scope.hisItem.time = data;
                    console.log(data)
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
                            headers: {
                                'Authorization': 'token ' + $cookieStore.get('user').token
                            }
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
                                        headers: {
                                            'Authorization': 'token ' + $cookieStore.get('user').token
                                        }
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
                                                        headers: {
                                                            'Authorization': 'token ' + $cookieStore.get('user').token
                                                        }
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
                                                        headers: {
                                                            'Authorization': 'token ' + $cookieStore.get('user').token
                                                        }
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
                                                //console.log(data);
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
                                                            //if (data['name'] == 'AG_real') {
                                                            //  if (hour < 6 || hour > 9) {
                                                            //    this.push(data);
                                                            //  }
                                                            //} else {
                                                            //  if (hour < 9 || hour > 15 || (hour == 15 && minute > 30)) {
                                                            //
                                                            //  } else {
                                                            //    this.push(data);
                                                            //  }
                                                            //  ;
                                                            //}
                                                            //;
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

                                                                outer: for (var i = 0; i < chartData1.length; i++) {
                                                                    if (chartData1[i].trans_type == "cover") {
                                                                        if (indexShortArr.length != 0) {
                                                                            inter: for (var j = 0; j < indexShortArr.length; j++) {
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
                                                                                    //if (data.name == 'AG_real') {
                                                                                    //  Earn = Number((data.price - chartData1[i].price - 0.32 * 2).toFixed(2));
                                                                                    //  y = Number((data.price - chartData1[i].price - 0.32 * 2).toFixed(2));
                                                                                    //} else {
                                                                                    //  Earn = Number((data.price * (1 - 0.00003) - chartData1[i].price * (1 + 0.00003)).toFixed(2));
                                                                                    //  y = Number((data.price * (1 - 0.00003) - chartData1[i].price * (1 + 0.00003)).toFixed(2));
                                                                                    //}
                                                                                    //;
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
                                                                            //if (data.name == 'AG_real') {
                                                                            //  Earn = Number((data.price - chartData1[i].price - 0.32 * 2).toFixed(2));
                                                                            //  y = Number((data.price - chartData1[i].price - 0.32 * 2).toFixed(2));
                                                                            //} else {
                                                                            //  Earn = Number((data.price * (1 - 0.00003) - chartData1[i].price * (1 + 0.00003)).toFixed(2));
                                                                            //  y = Number((data.price * (1 - 0.00003) - chartData1[i].price * (1 + 0.00003)).toFixed(2));
                                                                            //}
                                                                            //;
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

                                                                outer1: for (var i = 0; i < chartData1.length; i++) {
                                                                    if (chartData1[i].trans_type == "sell") {
                                                                        if (indexShortArr.length != 0) {
                                                                            inter1: for (var j = 0; j < indexShortArr.length; j++) {
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
                                                                                    //if (data.name == 'AG_real') {
                                                                                    //  Earn = Number((chartData1[i].price - data.price - 0.32 * 2).toFixed(2));
                                                                                    //  y = Number((chartData1[i].price - data.price - 0.32 * 2).toFixed(2));
                                                                                    //} else {
                                                                                    //  Earn = Number((chartData1[i].price * (1 - 0.00003) - data.price * (1 + 0.00003)).toFixed(2));
                                                                                    //  y = Number((chartData1[i].price * (1 - 0.00003) - data.price * (1 + 0.00003)).toFixed(2));
                                                                                    //}
                                                                                    //;
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
                                                                        }
                                                                        else {
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
                                                                            //if (data.name == 'AG_real') {
                                                                            //  Earn = Number((chartData1[i].price - data.price - 0.32 * 2).toFixed(2));
                                                                            //  y = Number((chartData1[i].price - data.price - 0.32 * 2).toFixed(2));
                                                                            //} else {
                                                                            //  Earn = Number((chartData1[i].price * (1 - 0.00003) - data.price * (1 + 0.00003)).toFixed(2));
                                                                            //  y = Number((chartData1[i].price * (1 - 0.00003) - data.price * (1 + 0.00003)).toFixed(2));
                                                                            //}
                                                                            //;
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
                                                        var allTotalTime = 0; //总持仓时间r
                                                        var averTotalTime = 0; //平均持仓时间
                                                        var errorYeild = 0; //跟踪误差年化波动率
                                                        var prof = 0;
                                                        var loss = 0;
                                                        var yeildArrs = [];

                                                        //var delNum = [];
                                                        //angular.forEach(chartArr, function (data, index) {
                                                        //  if (data['openprice'] == 0 || data['closeprice'] == 0) {
                                                        //    delNum.push(index);
                                                        //  }
                                                        //  ;
                                                        //});
                                                        //angular.forEach(delNum, function (data, index) {
                                                        //  chartArr.splice(data, 1);
                                                        //});
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
                                                                buttons: [{
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
                                                                    text: '价格'
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
                                                                name: '价格',
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
        var str = null;
        var hash = window.location.hash;
        var index = hash.indexOf('58');
        if (index != -1) {
            str = hash.substring(index);
        }
        //console.log(str)
        function download(text, name, type) {
            var file = new Blob([text], {
                type: type
            })
            var a = $('<a hidden>Download py</a>').appendTo('body');
            a[0].href = URL.createObjectURL(file);
            a[0].download = name;
            a[0].click();
        }

        $scope.save = function () {
            $http.get(constantUrl + 'classs/' + str + '/', {
                    headers: {
                        'Authorization': 'token ' + $cookieStore.get('user').token
                    }
                })
                .success(function (data) {
                    download(data.code, data.code_name, 'text/plain');
                    //console.log(data)
                })
                .error(function (err, sta) {
                    console.log(err);
                });
        }

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
                    headers: {
                        'Authorization': 'token ' + $cookieStore.get('user').token
                    }
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
                    params: {
                        type: ty,
                        date_type: 'data'
                    },
                    headers: {
                        'Authorization': 'token ' + $cookieStore.get('user').token
                    }
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
                            headers: {
                                'Authorization': 'token ' + $cookieStore.get('user').token
                            }
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
                                        headers: {
                                            'Authorization': 'token ' + $cookieStore.get('user').token
                                        }
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
                                                        headers: {
                                                            'Authorization': 'token ' + $cookieStore.get('user').token
                                                        }
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
                                                        headers: {
                                                            'Authorization': 'token ' + $cookieStore.get('user').token
                                                        }
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
                                                            //if (data['name'] == 'AG_real') {
                                                            //  if (hour < 6 || hour > 9) {
                                                            //    this.push(data);
                                                            //  }
                                                            //} else {
                                                            //  if (hour < 9 || hour > 15 || (hour == 15 && minute > 30)) {
                                                            //
                                                            //  } else {
                                                            //    this.push(data);
                                                            //  }
                                                            //  ;
                                                            //}
                                                            //;
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

                                                                outer: for (var i = 0; i < chartData1.length; i++) {
                                                                    if (chartData1[i].trans_type == "cover") {
                                                                        if (indexShortArr.length != 0) {
                                                                            inter: for (var j = 0; j < indexShortArr.length; j++) {
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
                                                                                    //if (data.name == 'AG_real') {
                                                                                    //  Earn = Number((data.price - chartData1[i].price - 0.32 * 2).toFixed(2));
                                                                                    //  y = Number((data.price - chartData1[i].price - 0.32 * 2).toFixed(2));
                                                                                    //} else {
                                                                                    //  Earn = Number((data.price * (1 - 0.00003) - chartData1[i].price * (1 + 0.00003)).toFixed(2));
                                                                                    //  y = Number((data.price * (1 - 0.00003) - chartData1[i].price * (1 + 0.00003)).toFixed(2));
                                                                                    //}
                                                                                    //;
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
                                                                            //if (data.name == 'AG_real') {
                                                                            //  Earn = Number((data.price - chartData1[i].price - 0.32 * 2).toFixed(2));
                                                                            //  y = Number((data.price - chartData1[i].price - 0.32 * 2).toFixed(2));
                                                                            //} else {
                                                                            //  Earn = Number((data.price * (1 - 0.00003) - chartData1[i].price * (1 + 0.00003)).toFixed(2));
                                                                            //  y = Number((data.price * (1 - 0.00003) - chartData1[i].price * (1 + 0.00003)).toFixed(2));
                                                                            //}
                                                                            //;
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

                                                                outer1: for (var i = 0; i < chartData1.length; i++) {
                                                                    if (chartData1[i].trans_type == "sell") {
                                                                        if (indexShortArr.length != 0) {
                                                                            inter1: for (var j = 0; j < indexShortArr.length; j++) {
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
                                                                                    //if (data.name == 'AG_real') {
                                                                                    //  Earn = Number((chartData1[i].price - data.price - 0.32 * 2).toFixed(2));
                                                                                    //  y = Number((chartData1[i].price - data.price - 0.32 * 2).toFixed(2));
                                                                                    //} else {
                                                                                    //  Earn = Number((chartData1[i].price * (1 - 0.00003) - data.price * (1 + 0.00003)).toFixed(2));
                                                                                    //  y = Number((chartData1[i].price * (1 - 0.00003) - data.price * (1 + 0.00003)).toFixed(2));
                                                                                    //}
                                                                                    //;
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
                                                                        }
                                                                        else {
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
                                                                            //if (data.name == 'AG_real') {
                                                                            //  Earn = Number((chartData1[i].price - data.price - 0.32 * 2).toFixed(2));
                                                                            //  y = Number((chartData1[i].price - data.price - 0.32 * 2).toFixed(2));
                                                                            //} else {
                                                                            //  Earn = Number((chartData1[i].price * (1 - 0.00003) - data.price * (1 + 0.00003)).toFixed(2));
                                                                            //  y = Number((chartData1[i].price * (1 - 0.00003) - data.price * (1 + 0.00003)).toFixed(2));
                                                                            //}
                                                                            //;
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
                                                        var allTotalTime = 0; //总持仓时间r
                                                        var averTotalTime = 0; //平均持仓时间
                                                        var errorYeild = 0; //跟踪误差年化波动率
                                                        var prof = 0;
                                                        var loss = 0;
                                                        var yeildArrs = [];

                                                        //var delNum = [];
                                                        //angular.forEach(chartArr, function (data, index) {
                                                        //  if (data['openprice'] == 0 || data['closeprice'] == 0) {
                                                        //    delNum.push(index);
                                                        //  }
                                                        //  ;
                                                        //});
                                                        //angular.forEach(delNum, function (data, index) {
                                                        //  chartArr.splice(data, 1);
                                                        //});
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
                                                                buttons: [{
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
                                                                    text: '价格'
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
                                                                name: '价格',
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
                                                Showbo.Msg.alert('没有交易数据!');
                                            });
                                        }
                                        ;
                                    })
                                    .error(function (err, sta) {
                                        if (sta == 400) {
                                            Showbo.Msg.alert('没有交易数据!');
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

    .controller('modalResController', ['$scope', '$rootScope', '$http', '$location', '$cookies', '$cookieStore', 'constantUrl', 'modalResObjList0', 'modalResObjList1', 'modalResObjList2', 'modalResObjList3', 'modalResObjList4', 'storageModalRes', 'getModalResList', 'modalResObjItems', function ($scope, $rootScope, $http, $location, $cookies, $cookieStore, constantUrl, modalResObjList0, modalResObjList1, modalResObjList2, modalResObjList3, modalResObjList4, storageModalRes, getModalResList, modalResObjItems) {


        $scope.modalResObjItem = modalResObjItems;
        $scope.username = $cookieStore.get('user').username;
        $scope.getOpen = function () {
            getModalResList.getList('model_quants').then(function (data) {
                modalResObjList0 = [];
                angular.forEach(data, function (data, index) {
                    angular.extend(data, {
                        "classify": 'model_quants'
                    });
                    this.push(data);
                }, modalResObjList0);
                $scope.modalResObjList0 = modalResObjList0;
            });
        };

        $scope.getObj = function () {
            getModalResList.getList('model_objects').then(function (data) {
                modalResObjList1 = [];
                angular.forEach(data, function (data, index) {
                    angular.extend(data, {
                        "classify": 'model_objects'
                    });
                    this.push(data);
                }, modalResObjList1);
                $scope.modalResObjList1 = modalResObjList1;
            });
        };

        $scope.getMet = function () {
            getModalResList.getList('model_methods').then(function (data) {
                modalResObjList2 = [];
                angular.forEach(data, function (data, index) {
                    angular.extend(data, {
                        "classify": 'model_methods'
                    });
                    this.push(data);
                }, modalResObjList2);
                $scope.modalResObjList2 = modalResObjList2;
            });
        };
        $scope.getExa = function () {
            getModalResList.getList('model_examples').then(function (data) {
                modalResObjList3 = [];
                angular.forEach(data, function (data, index) {
                    angular.extend(data, {
                        "classify": 'model_examples'
                    });
                    this.push(data);
                }, modalResObjList3);
                $scope.modalResObjList3 = modalResObjList3;
            });
        };
        $scope.getRobot = function () {
            getModalResList.getList('model_mls').then(function (data) {
                modalResObjList4 = [];
                angular.forEach(data, function (data, index) {
                    angular.extend(data, {
                        "classify": 'model_mls'
                    });
                    this.push(data);
                }, modalResObjList4);
                $scope.modalResObjList4 = modalResObjList4;
            });
        };
        $scope.getOpen();
        $scope.getObj();
        $scope.getExa();
        $scope.getMet();
        $scope.getRobot();
        /*storageModalRes.storage(str1);*/

        $scope.start = function (id) {
            $('.modalRes-new').hide();
            $('.modalRes-method').hide();
            $('.modalRes-exa').hide();
            $('.modalRes-obj').hide();
            $('.modalRes-mac').hide();
            $('.modalRes-' + id).show();
        }
        $scope.start2 = function (b) {
            $('.nav-item').find('span').removeClass('sanjiao').prev('.nav-title').removeClass('active');
            $('.nav-item' + b).find('span').addClass('sanjiao').prev('.nav-title').addClass('active');
        }

        // model_quants
        // model_methods
        // model_examples
        // model_mls

        var a, b;
        switch (window.flag) {
            case 'model_quants':
                a = 'new';
                b = 1;
                break;
            case 'model_objects':
                a = 'obj';
                b = 2;
                break;
            case 'model_methods':
                a = 'method';
                b = 3;
                break;
            case 'model_examples':
                a = 'exa';
                b = 4;
                break;
            case 'model_mls':
                a = 'mac';
                b = 5;
                break;
        }
        $scope.start(a);
        $scope.start2(b);


        $('.nav-item').click(function () {
            var id = $(this).attr('href');
            $('.item-tutorial').removeClass('active');
            $(id).addClass('active');
            $('.nav-item').find('span').removeClass('sanjiao').prev('.nav-title').removeClass('active');
            $(this).find('span').addClass('sanjiao').prev('.nav-title').addClass('active');
            $scope.start(id);
        });

        $scope.modalResOpen = {
            title: '',
            content: ''
        }
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
        $scope.openModalResNew = function () {
            $('.modalRes-mask-open').fadeIn();
            $scope.modalResOpen = {
                title: '',
                content: ''
            }
        }
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
        $scope.openModalResMac = function () {
            $('.modalRes-mask-robot').fadeIn();
            $scope.modalResRobot = {
                title: '',
                content: '',
                code: ''
            }

        }
        var height = $(window).height(); //浏览器当前窗口可视区域高度
        $("#test2").css("height", height * 0.85 + "px");
        //$("#test3").css("height", height*0.80+"px");

        function getObjectURL(file) {
            var url = null;
            if (window.createObjectURL != undefined) { // basic
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        }

        //选择文件
        $scope.openFile = function () {
            $('.files').fadeIn();
            $('.col-sm-offset-2').hide();
        };
        $scope.closeFile = function () {
            $('.files').hide();
            $('.col-sm-offset-2').fadeIn();
        };
        $scope.changeFile0 = function (files) {
            if (files[0] == undefined) {
                $scope.file = "";
                $('#filename').html("未选择任何文件");
                return;
            }
            $('#filename').html(files[0].name);
        };
        $scope.delFile = function () {
            $("#filename").html("未选择任何文件");
            $scope.file = "";
            $scope.filename = "";
        };
        $scope.addFile = function () {
            if ($scope.filename == undefined || $scope.filename == "") {
                Showbo.Msg.alert("未输入代码名");
                return;
            }
            if ($scope.file == undefined || $scope.file == "") {
                Showbo.Msg.alert("未选择任何文件");
                return;
            }
            console.log($scope.filename, $scope.file)
            $('.files').hide();
            $('.col-sm-offset-2').fadeIn();
        }

        var height = $(window).height(); //浏览器当前窗口可视区域高度
        $("#test1").css("height", height * 0.85 + "px");
        $("#test0").css("height", height * 0.85 + "px");
        $("#test4").css("height", height * 0.85 + "px");
        //插入图片
        $scope.openImage = function () {
            $('.image').fadeIn();
            $('.col-sm-offset-2').hide();
        };
        $scope.closeImage = function () {
            $('.image').hide();
            $('.col-sm-offset-2').fadeIn();
        };
        $scope.loadStaus = "上传";
        $scope.addImage = function () {

            //$http({
            //  url: "https://sm.ms/api/list",
            //  method: 'GET',
            //  headers: {
            //    'Content-Type': undefined
            //  },
            //  transformRequest: function() {
            //
            //  }
            //}).success(function (data) {
            //  console.log(data)
            //})

            if ($scope.image == undefined || $scope.image == "") {
                Showbo.Msg.alert("未选择图片");
                return;
            }
            $scope.loadStaus = "上传中...";
            $http({
                url: "https://sm.ms/api/upload",
                method: 'POST',
                headers: {
                    'Content-Type': undefined
                },
                transformRequest: function () {
                    var formData = new FormData();
                    formData.append('smfile', $scope.image);
                    return formData;
                }
            }).success(function (data) {
                if (data.code == "error") {
                    $scope.loadStaus = "上传";
                    Showbo.Msg.alert("error:" + data.msg);
                    return;
                } else {
                    $scope.loadStaus = "上传成功";
                }
                var imageUrl = "![none](" + data.data.url + ")"; //![Alt text](./images/4.jpg)
                $("#content6").insertContent(imageUrl);
                $scope.modalResExa.content = $("#content6").val();
                $("#content5").insertContent(imageUrl);
                $scope.modalResMet.content = $("#content5").val();
                $("#content4").insertContent(imageUrl);
                $scope.modalResObj.content = $("#content4").val();

                $("#content3").insertContent(imageUrl);
                $scope.modalResObj.content = $("#content3").val();
                $("#content7").insertContent(imageUrl);
                $scope.modalResObj.content = $("#content7").val();
                //console.log($scope.modalResMet.content)
                //setTimeout(function () {
                    $('.image').hide();
                    $('.col-sm-offset-2').fadeIn();
                    $scope.loadStaus = "上传";
                //}, 500)
            });

        };
        $scope.delImage = function () {
            $scope.image = "";
            $scope.image0 = false;
        };
        $scope.changeImage0 = function (files) {
            if (files[0] == undefined) {
                $scope.image = "";
                $scope.image0 = false;
                return;
            }
            var objUrl = getObjectURL(files[0]);
            $scope.img0 = objUrl;
            $scope.image0 = true;
        };


        $scope.closeMask = function () {
            $('.modalRes-mask').fadeOut();
        };

        $scope.addModalResOpen = function () {
            var str = "title=" + encodeURIComponent($scope.modalResOpen.title) + "&content=" + encodeURIComponent($scope.modalResOpen.content) + "&code=" + encodeURIComponent($scope.modalResOpen.code);

            getModalResList.addItem(str, 'model_quants').then(function () {
                $scope.getOpen();
                $scope.closeMask();
            }, function (err) {
                // console.log(err);
            });
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
        $scope.addModalResRobot = function () {
            var str = "title=" + encodeURIComponent($scope.modalResRobot.title) + "&content=" + encodeURIComponent($scope.modalResRobot.content) + '&code=' + encodeURIComponent($scope.modalResRobot.code);
            getModalResList.addItem(str, 'model_mls').then(function () {
                $scope.getRobot();
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
    .controller('modalResItemController', ['$scope', '$rootScope', '$http', '$location', '$cookies', '$cookieStore', 'constantUrl', '$routeParams', 'modalResObjList0', 'modalResObjList1', 'modalResObjList2', 'modalResObjList3', 'modalResObjList4', 'storageModalRes', 'getModalResList', function ($scope, $rootScope, $http, $location, $cookies, $cookieStore, constantUrl, $routeParams, modalResObjList0, modalResObjList1, modalResObjList2, modalResObjList3, modalResObjList4, storageModalRes, getModalResList) {
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
                        headers: {
                            'Authorization': 'token ' + $cookieStore.get('user').token
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
            addItem: function (obj, url) {
                var defer = $q.defer();
                // console.log(obj, url)
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
                        headers: {
                            'Authorization': 'token ' + $cookieStore.get('user').token
                        }
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
                //$('.edit').hide()

                //创建实盘模拟、历史回测、删除策略代码
                scope.addhis = function (a) {
                    if (scope.modeBarOptions == false && scope.modeTickOptions == false) {
                        $("#startTime").val("")
                        $("#endTime").val("")
                        $("#startTime").attr("disabled", "true");
                        $("#endTime").attr("disabled", "true");
                    }
                    i = a.$index; //点击的第几个
                    strategysValue.id = scope.mySourcingStrategy[i]._id;
                    strategysValue.author = scope.mySourcingStrategy[i].author;

                    $('.his-mask').fadeIn();
                    //strategysValue.id = $(this).closest('tr').children().eq(0).text();
                    //console.log(strategysValue);
                }

                scope.addfirm = function (a) {
                    i = a.$index; //点击的第几个
                    strategysValue.id = scope.mySourcingStrategy[i]._id;
                    strategysValue.author = scope.mySourcingStrategy[i].author;

                    $('.firm-mask').fadeIn();
                    //strategysValue.id = $(this).closest('tr').children().eq(0).text();
                    //strategysValue.author = $(this).closest('tr').children().eq(3).text();
                    //console.log(strategysValue);
                }
                scope.addtrue = function (a) {
                    i = a.$index; //点击的第几个
                    strategysValue.id = scope.mySourcingStrategy[i]._id;
                    strategysValue.author = scope.mySourcingStrategy[i].author;
                    $('.true-mask').fadeIn();
                    //strategysValue.id = $(this).closest('tr').children().eq(0).text();
                    //strategysValue.author = $(this).closest('tr').children().eq(3).text();
                    //console.log(strategysValue);
                }
                scope.delsour = function (a) {
                    i = a.$index; //点击的第几个
                    var url = scope.mySourcingStrategy[i]._id;
                    //var url = $(this).closest('tr').children().eq(0).text();
                    Showbo.Msg.confirm('您确定删除' + scope.mySourcingStrategy[i].class_name + "吗？", function (flag) {
                        if (flag == 'yes') {
                            $http.delete(constantUrl + "classs/" + url + '/', {
                                    headers: {
                                        'Authorization': 'token ' + $cookieStore.get('user').token
                                    }
                                })
                                .success(function () {
                                    /*$route.reload();*/
                                    setTimeout(function () {
                                        scope.getSourcingStrategys();
                                    }, 100)

                                    /*Showbo.Msg.alert('删除成功。')*/

                                })
                                .error(function (err, sta) {
                                    Showbo.Msg.alert('删除失败，请稍后再试。')

                                });
                        } else if (flag == 'no') {
                        }
                    });
                }
            }
        };
    }])
    .directive('adminTable', ['$route', '$location', '$http', 'constantUrl', '$cookieStore', 'strategysValue', function ($route, $location, $http, constantUrl, $cookieStore, strategysValue) {
        return {
            link: function (scope, ele, attrs) {
                ele.on('click', '.user-pro', function () {
                    //console.log($(this).closest('tr').children().eq(2).text());
                    if ($(this).closest('tr').children().eq(2).text() == 'true') {
                        Showbo.Msg.alert('该用户已经获得权限。')
                    } else {
                        var name = $(this).closest('tr').children().eq(0).text();
                        $http.patch(constantUrl + 'users/' + name + '/', {
                                zijin: '1'
                            }, {
                                headers: {
                                    'Authorization': 'token ' + $cookieStore.get('user').token
                                }
                            })
                            .success(function (data) {
                                scope.getAllUsers();
                            });
                    }
                    ;
                });
                ele.on('click', '.user-min', function () {
                    //console.log($(this).closest('tr').children().eq(2).text());
                    if ($(this).closest('tr').children().eq(2).text() == 'false') {
                        Showbo.Msg.alert('该用户权限已经被收回。')
                    } else {
                        var name = $(this).closest('tr').children().eq(0).text();
                        $http.patch(constantUrl + 'users/' + name + '/', {
                                zijin: '0'
                            }, {
                                headers: {
                                    'Authorization': 'token ' + $cookieStore.get('user').token
                                }
                            })
                            .success(function (data) {
                                scope.getAllUsers();
                            });
                    }
                    ;
                });
                ele.on('click', '.user-del', function () {

                    var name = $(this).closest('tr').children().eq(0).text();
                    Showbo.Msg.confirm('您确定删除此用户吗？', function (flag) {
                        if (flag == 'yes') {

                            $http.delete(constantUrl + 'users/' + name + '/', {
                                    headers: {
                                        'Authorization': 'token ' + $cookieStore.get('user').token
                                    }
                                })
                                .success(function (data) {
                                    scope.getAllUsers();
                                });

                            ;

                        } else if (flag == 'no') {
                        }
                    });


                });
            }
        };
    }])
    .directive('strategyTable', ['$route', '$location', '$http', 'constantUrl', '$cookieStore', function ($route, $location, $http, constantUrl, $cookieStore) {
        return {
            controller: function ($scope, $element, $http) {
                function download(text, name, type) {
                    var file = new Blob([text], {
                        type: type
                    })
                    var a = $('<a hidden>Download py</a>').appendTo('body');
                    a[0].href = URL.createObjectURL(file);
                    a[0].download = name;
                    a[0].click();
                }

                $scope.log1 = function (a) {
                    $scope.beginlog();
                    i = a.$index; //点击的第几个
                    var url = $scope.trueStrategy[i]._id;
                    $http.get(constantUrl + "strategys/" + url + '/', {
                            headers: {
                                'Authorization': 'token ' + $cookieStore.get('user').token
                            }
                        })
                        .success(function (data) {
                            $scope.put($scope.trueStrategy[i].name, data.logs)
                        })
                        .error(function (err, sta) {
                            $('#logs').hide()
                            Showbo.Msg.alert("请求失败")
                        });
                };
                $scope.log1Load = function(a){
                    //$scope.beginlog();
                    i= a.$index;
                    var url = $scope.trueStrategy[i]._id;
                    $http.get(constantUrl + "strategys/" + url + '/', {
                            headers: {
                                'Authorization': 'token ' + $cookieStore.get('user').token
                            }
                        })
                        .success(function (data) {
                            download(data.logs, $scope.trueStrategy[i].name, 'text/plain');
                        })
                        .error(function (err, sta) {
                            Showbo.Msg.alert("请求失败")
                        });

                }
                $scope.log2 = function (a) {
                    $scope.beginlog();
                    i = a.$index; //点击的第几个
                    var url = $scope.myStrategy[i]._id;
                    $http.get(constantUrl + "strategys/" + url + '/', {
                            headers: {
                                'Authorization': 'token ' + $cookieStore.get('user').token
                            }
                        })
                        .success(function (data) {
                            $scope.put($scope.myStrategy[i].name, data.logs)
                        })
                        .error(function (err, sta) {
                            $('#logs').hide()
                            Showbo.Msg.alert("请求失败")
                        });
                }
                $scope.log2Load = function(a){
                    //$scope.beginlog();
                    i= a.$index;
                    var url = $scope.myStrategy[i]._id;
                    $http.get(constantUrl + "strategys/" + url + '/', {
                            headers: {
                                'Authorization': 'token ' + $cookieStore.get('user').token
                            }
                        })
                        .success(function (data) {
                            download(data.logs, $scope.myStrategy[i].name, 'text/plain');
                        })
                        .error(function (err, sta) {
                            Showbo.Msg.alert("请求失败")
                        });

                }
                $scope.colselog = function () {
                    $scope.log = false;
                    $('.logs-mask').hide();
                }
            },
            link: function (scope, ele, attrs) {
                scope.startstrategy = function (a) {
                    //var url = $(this).closest('tr').children().eq(0).text();
                    i = a.$index; //点击的第几个
                    var url = scope.myStrategy[i]._id;
                    $http.patch(constantUrl + "strategys/" + url + '/', {
                            status: 2
                        }, {
                            headers: {
                                'Authorization': 'token ' + $cookieStore.get('user').token
                            }
                        })
                        .success(function () {
                            /*$route.reload();*/
                            scope.getFirmStrategys();

                        })
                        .error(function (err, sta) {
                            Showbo.Msg.alert('启动失败，请检查当前状态')
                        });
                }

                scope.starttrue = function (a) {
                    //var url = $(this).closest('tr').children().eq(0).text();
                    i = a.$index; //点击的第几个
                    var url = scope.trueStrategy[i]._id;
                    $http.patch(constantUrl + "strategys/" + url + '/', {
                            status: 2
                        }, {
                            headers: {
                                'Authorization': 'token ' + $cookieStore.get('user').token
                            }
                        })
                        .success(function () {
                            /*$route.reload();*/
                            scope.gettrueStrategys();

                        })
                        .error(function (err, sta) {
                            Showbo.Msg.alert('启动失败，请检查当前状态')
                        });
                }
                scope.strategypause = function (a) {
                    //var url = $(this).closest('tr').children().eq(0).text();
                    i = a.$index; //点击的第几个
                    var url = scope.myStrategy[i]._id;
                    $http.patch(constantUrl + "strategys/" + url + '/', {
                            status: 3
                        }, {
                            headers: {
                                'Authorization': 'token ' + $cookieStore.get('user').token
                            }
                        })
                        .success(function () {
                            /*$route.reload();*/
                            scope.getFirmStrategys();

                        })
                        .error(function (err, sta) {
                            Showbo.Msg.alert('暂停失败，请检查当前状态')
                        });
                }
                scope.truepause = function (a) {
                    //var url = $(this).closest('tr').children().eq(0).text();
                    i = a.$index; //点击的第几个
                    var url = scope.trueStrategy[i]._id;
                    $http.patch(constantUrl + "strategys/" + url + '/', {
                            status: 3
                        }, {
                            headers: {
                                'Authorization': 'token ' + $cookieStore.get('user').token
                            }
                        })
                        .success(function () {
                            /*$route.reload();*/
                            scope.gettrueStrategys();

                        })
                        .error(function (err, sta) {
                            Showbo.Msg.alert('暂停失败，请检查当前状态')
                        });
                }


                //批量删除回收站
                var flag4 = false;
                scope.selectall4 = function () {
                    flag4 = !flag4;
                    for (var i = 0; i < scope.allStrategys.length; i++) {
                        scope.allStrategys[i].flag = flag4;
                    }
                }
                scope.updateSelection4 = function (a) {
                    var i = a.$index;
                    scope.allStrategys[i].flag = !scope.allStrategys[i].flag;
                }

                scope.delsel4 = function () {
                    Showbo.Msg.confirm('您确定删除所选择的吗？', function (flag) {
                        var a = true;
                        if (flag == 'yes') {
                            for (var i = 0; i < scope.allStrategys.length; i++) {
                                (function (i) {
                                    if (scope.allStrategys[i].flag == true) {
                                        a = false //判断是否选择了 ture为选中
                                        //console.log(scope.allStrategys[i].type);
                                        var url = scope.allStrategys[i]._id;
                                        if (scope.allStrategys[i].type != "历史回测") {
                                            $http.delete(constantUrl + "strategys/" + url + '/', { //先判断是不是实盘策略
                                                    headers: {
                                                        'Authorization': 'token ' + $cookieStore.get('user').token
                                                    }
                                                })
                                                .success(function () {
                                                    /*$route.reload();*/

                                                    /*Showbo.Msg.alert('删除成功。')*/
                                                })
                                                .error(function (err, sta) {
                                                    //Showbo.Msg.alert('删除失败，请稍候再试')
                                                })
                                        } else {
                                            $http.delete(constantUrl + "btstrategys/" + url + '/', {
                                                    headers: {
                                                        'Authorization': 'token ' + $cookieStore.get('user').token
                                                    }
                                                })
                                                .success(function () {
                                                    /*$route.reload();*/

                                                    /*Showbo.Msg.alert('删除成功。')*/
                                                })
                                                .error(function (err, sta) {
                                                    //Showbo.Msg.alert('删除失败，请稍后再试')
                                                });
                                        }
                                    }
                                })(i);
                            }
                            if (a) {
                                Showbo.Msg.alert("您没有选择");
                                return;
                            }
                            setTimeout(function () {
                                scope.allStrategys = [];
                                scope.gettrueStrategys();
                                scope.getFirmStrategys(); //刷新实盘/回测列表/回收站
                                scope.getHisStrategys();
                            }, 100)

                        } else if (flag == 'no') {
                        }
                    });

                }


                //清空回收站
                scope.alldel = function () {
                    Showbo.Msg.confirm('您确定清空回收站吗？', function (flag) {
                        if (flag == 'yes') {

                            for (var i = 0; i < scope.allStrategys.length; i++) {
                                //console.log( scope.allStrategys[i].name,scope.allStrategys[i]._id);
                                var url = scope.allStrategys[i]._id;
                                $http.delete(constantUrl + "strategys/" + url + '/', {
                                        headers: {
                                            'Authorization': 'token ' + $cookieStore.get('user').token
                                        }
                                    })
                                    .success(function () {

                                    })
                                    .error(function (err, sta) {
                                        console.log(err, sta);
                                        if (sta == 400) {
                                            $http.delete(constantUrl + "btstrategys/" + url + '/', {
                                                    headers: {
                                                        'Authorization': 'token ' + $cookieStore.get('user').token
                                                    }
                                                })
                                                .success(function () {
                                                })
                                                .error(function (err, sta) {
                                                    Showbo.Msg.alert('删除失败，请稍后再试。')
                                                });
                                        }
                                    });
                            }
                            /*$route.reload();*/
                            /*Showbo.Msg.alert('删除成功。')*/
                            scope.allStrategys = [];
                            scope.gettrueStrategys();
                            scope.getFirmStrategys();
                            scope.getHisStrategys();

                        } else if (flag == 'no') {
                        }
                    });

                }

                //删除回收站
                scope.delhuishou = function (a) {
                    i = a.$index; //点击的第几个
                    var url = scope.allStrategys[i]._id;
                    //console.log(scope.allStrategys[i].type);
                    //return;
                    Showbo.Msg.confirm("您确定删除" + scope.allStrategys[i].name + "吗?", function (flag) {
                        if (flag == 'yes') {
                            if (scope.allStrategys[i].type != "历史回测") {
                                $http.delete(constantUrl + "strategys/" + url + '/', { //先判断是不是实盘策略
                                        headers: {
                                            'Authorization': 'token ' + $cookieStore.get('user').token
                                        }
                                    })
                                    .success(function () {
                                        /*$route.reload();*/
                                        scope.allStrategys.splice(i, 1)
                                        //scope.allStrategys = [];
                                        //scope.gettrueStrategys();
                                        //scope.getFirmStrategys();
                                        //scope.getHisStrategys();
                                        /*Showbo.Msg.alert('删除成功。')*/
                                    })
                                    .error(function (err, sta) {
                                        //Showbo.Msg.alert('删除失败，请稍候再试')
                                    })
                            } else {
                                $http.delete(constantUrl + "btstrategys/" + url + '/', {
                                        headers: {
                                            'Authorization': 'token ' + $cookieStore.get('user').token
                                        }
                                    })
                                    .success(function () {
                                        /*$route.reload();*/
                                        scope.allStrategys.splice(i, 1)
                                        //scope.allStrategys = [];
                                        //scope.gettrueStrategys();
                                        //scope.getFirmStrategys();
                                        //scope.getHisStrategys();
                                        /*Showbo.Msg.alert('删除成功。')*/
                                    })
                                    .error(function (err, sta) {
                                        //Showbo.Msg.alert('删除失败，请稍后再试')
                                    });
                            }
                        } else if (flag == 'no') {
                        }
                    });
                }

                //删除真实交易
                scope.deltrue = function (a) {
                    i = a.$index; //点击的第几个
                    var url = scope.trueStrategy[i]._id;
                    Showbo.Msg.confirm('您确定删除' + scope.trueStrategy[i].name + "吗？", function (flag) {
                        if (flag == 'yes') {
                            $http.delete(constantUrl + "strategys/" + url + '/', {
                                    headers: {
                                        'Authorization': 'token ' + $cookieStore.get('user').token
                                    }
                                })
                                .success(function () {
                                    /*$route.reload();*/
                                    scope.gettrueStrategys();
                                    /*Showbo.Msg.alert('删除成功。')*/
                                })
                                .error(function (err, sta) {
                                    Showbo.Msg.alert('删除失败，请稍后再试。')
                                });

                        } else if (flag == 'no') {
                        }
                    });

                }
                //真实交易移至历史交易
                scope.romoveTrue = function (a) {
                    i = a.$index; //点击的第几个
                    var url = scope.trueStrategy[i]._id;
                    Showbo.Msg.confirm('将' + scope.trueStrategy[i].name + "移到历史交易中？", function (flag) {
                        if (flag == 'yes') {
                            $http.delete(constantUrl + "strategys/" + url + '/', {
                                    headers: {
                                        'Authorization': 'token ' + $cookieStore.get('user').token
                                    }
                                })
                                .success(function () {
                                    /*$route.reload();*/
                                    scope.gettrueStrategys();
                                    /*Showbo.Msg.alert('删除成功。')*/
                                })
                                .error(function (err, sta) {
                                    Showbo.Msg.alert('删除失败，请稍后再试。')
                                });

                        } else if (flag == 'no') {
                        }
                    });

                }
                //删除实盘
                scope.delstrategy = function (a) {
                    i = a.$index; //点击的第几个
                    var url = scope.myStrategy[i]._id;
                    Showbo.Msg.confirm('您确定删除' + scope.myStrategy[i].name + "吗？", function (flag) {
                        if (flag == 'yes') {
                            $http.delete(constantUrl + "strategys/" + url + '/', {
                                    headers: {
                                        'Authorization': 'token ' + $cookieStore.get('user').token
                                    }
                                })
                                .success(function () {
                                    /*$route.reload();*/
                                    scope.allStrategys = [];
                                    scope.gettrueStrategys();
                                    scope.getFirmStrategys(); //刷新实盘/回测列表/回收站
                                    scope.getHisStrategys();
                                    /*Showbo.Msg.alert('删除成功。')*/
                                })
                                .error(function (err, sta) {
                                    Showbo.Msg.alert('删除失败，请稍后再试。')
                                });

                        } else if (flag == 'no') {
                        }
                    });

                }

                //实盘模拟移至历史交易
                scope.removeStrategy = function (a) {
                    i = a.$index; //点击的第几个
                    var url = scope.myStrategy[i]._id;
                    Showbo.Msg.confirm('将' + scope.myStrategy[i].name + "移到历史交易中？", function (flag) {
                        if (flag == 'yes') {
                            $http.delete(constantUrl + "strategys/" + url + '/', {
                                    headers: {
                                        'Authorization': 'token ' + $cookieStore.get('user').token
                                    }
                                })
                                .success(function () {
                                    /*$route.reload();*/
                                    scope.allStrategys = [];
                                    scope.gettrueStrategys();
                                    scope.getFirmStrategys(); //刷新实盘/回测列表/回收站
                                    scope.getHisStrategys();
                                    /*Showbo.Msg.alert('删除成功。')*/
                                })
                                .error(function (err, sta) {
                                    Showbo.Msg.alert('删除失败，请稍后再试。')
                                });

                        } else if (flag == 'no') {
                        }
                    });

                }

            }
        }
    }])
    .directive('hisTable', ['$route', '$location', '$http', 'constantUrl', '$cookieStore', function ($route, $location, $http, constantUrl, $cookieStore) {
        return {
            link: function (scope, ele, attrs) {
                function download(text, name, type) {
                    var file = new Blob([text], {
                        type: type
                    })
                    var a = $('<a hidden>Download py</a>').appendTo('body');
                    a[0].href = URL.createObjectURL(file);
                    a[0].download = name;
                    a[0].click();
                }
                scope.strategystart = function (a) {
                    i = a.$index; //点击的第几个
                    var url = scope.myHisStrategy[i]._id;
                    $http.patch(constantUrl + "btstrategys/" + url + '/', {
                            status: 2
                        }, {
                            headers: {
                                'Authorization': 'token ' + $cookieStore.get('user').token
                            }
                        })
                        .success(function () {
                            scope.getHisStrategys();
                        })
                        .error(function (err, sta) {
                            Showbo.Msg.alert('启动失败，请检查当前状态')
                        });
                }
                scope.pausestrategy = function (a) {
                    i = a.$index; //点击的第几个
                    var url = scope.myHisStrategy[i]._id;
                    //var url = $(this).closest('tr').children().eq(0).text();
                    $http.patch(constantUrl + "btstrategys/" + url + '/', {
                            status: 3
                        }, {
                            headers: {
                                'Authorization': 'token ' + $cookieStore.get('user').token
                            }
                        })
                        .success(function () {
                            scope.getHisStrategys();

                        })
                        .error(function (err, sta) {
                            Showbo.Msg.alert('暂停失败，请检查当前状态')
                        });
                }
                scope.log3 = function (a) {
                    scope.beginlog();
                    i = a.$index; //点击的第几个
                    var url = scope.myHisStrategy[i]._id;
                    $http.get(constantUrl + "btstrategys/" + url + '/', {
                            headers: {
                                'Authorization': 'token ' + $cookieStore.get('user').token
                            }
                        })
                        .success(function (data) {
                            scope.put(scope.myHisStrategy[i].name, data.logs)
                        })
                        .error(function (err, sta) {
                            $('#logs').hide()
                            Showbo.Msg.alert("请求失败")
                        });
                };
                scope.log3Load = function(a){
                    //$scope.beginlog();
                    i= a.$index;
                    var url = scope.myHisStrategy[i]._id;
                    $http.get(constantUrl + "btstrategys/" + url + '/', {
                            headers: {
                                'Authorization': 'token ' + $cookieStore.get('user').token
                            }
                        })
                        .success(function (data) {
                            //$scope.put($scope.myHisStrategy[i].name, data.logs);
                            download(data.logs, scope.myHisStrategy[i].name, 'text/plain');
                        })
                        .error(function (err, sta) {
                            Showbo.Msg.alert("请求失败")
                        });

                }
                scope.colselog = function () {
                    $scope.log = false;
                    $('#logs').hide();
                }
                //删除历史回测
                scope.strategydel = function (a) {
                    //var url = $(this).closest('tr').children().eq(0).text();
                    i = a.$index; //点击的第几个
                    var url = scope.myHisStrategy[i]._id;
                    Showbo.Msg.confirm('您确定删除' + scope.myHisStrategy[i].name + "吗？", function (flag) {
                        if (flag == 'yes') {
                            $http.delete(constantUrl + "btstrategys/" + url + '/', {
                                    headers: {
                                        'Authorization': 'token ' + $cookieStore.get('user').token
                                    }
                                })
                                .success(function () {
                                    /*$route.reload();*/
                                    scope.allStrategys = [];
                                    scope.getFirmStrategys(); //刷新实盘/回测列表/回收站
                                    scope.getHisStrategys();
                                    scope.gettrueStrategys();
                                    /*Showbo.Msg.alert('删除成功。')*/
                                })
                                .error(function (err, sta) {
                                    Showbo.Msg.alert('删除失败，请稍后再试。')
                                });
                        } else if (flag == 'no') {

                        }
                    });

                }

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
                    var dis = (num + 0.2) * dist + 'px';
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
                ele.on('mouseover', function (ev) {
                    ele.children('.list-group').show();
                    ev.stopPropagation();
                });
                ele.on('mouseout', function (ev) {
                    $timeout(function () {
                        ele.children('.list-group').hide();
                    }, 2000);
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
                    var url = scope.mydata.classify + '/' + scope.mydata._id;
                    Showbo.Msg.confirm('您确定删除吗？', function (flag) {
                        if (flag == 'yes') {

                            getModalResList.del(url).then(function () {
                                ele.remove()
                            });

                            ;
                        } else if (flag == 'no') {
                        }
                    });

                });

                scope.toDetail = function (classify, id) {
                    // console.log(classify,id)
                    // console.log(window.flag)
                    window.flag = classify;
                    // href='#/{{mydata.classify}}/{{mydata._id}}'
                    window.location.href = '#/' + classify + '/' + id;
                }

                function getObjectURL(file) {
                    var url = null;
                    if (window.createObjectURL != undefined) { // basic
                        url = window.createObjectURL(file);
                    } else if (window.URL != undefined) { // mozilla(firefox)
                        url = window.URL.createObjectURL(file);
                    } else if (window.webkitURL != undefined) { // webkit or chrome
                        url = window.webkitURL.createObjectURL(file);
                    }
                    return url;
                }

                var height = $(window).height(); //浏览器当前窗口可视区域高度
                //$("#test0").css("height", height*0.85+"px");
                scope.obj = {
                    "height": height * 0.85 + "px"
                }

                scope.changeImage = function (files) {
                    if (files[0] == undefined) {
                        scope.image02 = false;
                        scope.image2 = "";
                        return;
                    }
                    var objUrl = getObjectURL(files[0]);
                    scope.img02 = objUrl;
                    scope.image02 = true;
                };

                scope.delImage2 = function () {
                    scope.image02 = false;
                    scope.image2 = "";
                };

                window.type;
                window.test;
                //编辑插入图片
                scope.openImage2 = function (a) {
                    window.test = a.$parent.$index;
                    window.type = scope.mydata.classify;
                    //var test=$(".row #content8").eq(indexs)
                    $('.image9').fadeIn();
                    $('.col-sm-offset-2').hide();
                };
                scope.closeImage2 = function () {
                    $('.image9').hide();
                    $('.col-sm-offset-2').fadeIn();
                };
                window.content;
                scope.loadStaus = "上传"
                scope.addImage2 = function () {
                    if (scope.image2 == undefined || scope.image2 == "") {
                        Showbo.Msg.alert("未选择图片");
                        return;
                    }
                    scope.loadStaus = "上传中..."
                    $http({
                        url: "https://sm.ms/api/upload",
                        method: 'POST',
                        headers: {
                            'Content-Type': undefined
                        },
                        transformRequest: function () {
                            var formData = new FormData();
                            formData.append('smfile', scope.image2);
                            return formData;
                        }
                    }).success(function (data) {
                        if (data.code == "error") {
                            scope.loadStaus = "上传"
                            Showbo.Msg.alert("error:" + data.msg);
                            return;
                        } else {
                            scope.loadStaus = "上传成功"
                        }
                        //console.log("上传成功")
                        var imageUrl = "![none](" + data.data.url + ")"; //![Alt text](./images/4.jpg)
                        $("#" + window.type + " #content8").eq(window.test).insertContent(imageUrl);
                        scope.mydata.content = $("#" + window.type + " #content8").eq(window.test).val();
                        window.content = $("#" + window.type + " #content8").eq(window.test).val();
                        ;
                        setTimeout(function () {
                            scope.loadStaus = "上传"
                            $('.image9').hide();
                            $('.col-sm-offset-2').fadeIn();
                        }, 500)
                    });

                };

                scope.changeContent = function () { //jquery插入图片，angular获取不到
                    window.content = undefined;
                    //console.log(scope.mydata.content)
                }

                ele.on('click', '.btn-success', function () {
                    var url = scope.mydata.classify + '/' + scope.mydata._id;
                    if (window.content != undefined) {
                        scope.mydata.content = window.content;
                    }
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
                        angular.extend(scope.mydata, {
                            "classify": str
                        });
                    });
                });
            }
        }
    }])
    .directive('mobileAction', function () {
        return {
            link: function (scope, ele, attrs) {
                ele.on('click', function () {
                    //console.log(ele.parent().css('left'));
                    if (ele.parent().css('left') == '0px') {
                        ele.parent().removeClass('l0');

                        //$(ele).css("class")
                    } else {
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
                        //console.log(marked(scope.mydata.content));//mardown转换html
                        ele.html(marked(scope.mydata.content));
                    }
                })
            }
        }
    }]);