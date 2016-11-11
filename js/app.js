angular.module('myapp',['ngRoute','ngAnimate','ngCookies','ngMessages','ngResource','myService'])
.config(['$routeProvider',function($routeProvider){
	$routeProvider
	.when('/home',{
		templateUrl:'tpls/newHome.html',
		controller:'homeController'
	})
	/*.when('/beta',{
		templateUrl:'tpls/beta.html',
		controller:"queryStrategy"
	})*/
	.when('/login',{
		templateUrl:'tpls/login.html'
	})
	.when('/register',{
		templateUrl:'tpls/register.html'
	})
	.when('/analyse',{
		templateUrl:'tpls/analyse.html'
	})
	.when('/study',{
		templateUrl:'tpls/study.html',
		controller:'studyController'
	})
	.when('/mytable',{
		templateUrl:'tpls/mytable.html',
		controller:'tableController'
	})
	.when('/actualRes',{
		templateUrl:'tpls/actualRes.html'
	})
	.when('/complie',{
		templateUrl:'tpls/complie.html',
		controller:'complieController'
	})
	.when('/modalRes',{
		templateUrl:'tpls/modalRes.html',
		controller:'modalResController'
	})
	.otherwise({
		redirectTo:'/home'
	})
}])
.run(['$rootScope','$location','$window',function($rootScope,$location,$window){
	var wow = new WOW({
		boxClass : 'wow',
		animateClass : 'animated',
		offset : 0,
		mobile : false,
		live : true
	});
	wow.init();
	/*var editor = ace.edit("editor");
	editor.setTheme("ace/theme/chrome");
	editor.getSession().setMode("ace/mode/java");*/
	if(($location.url()=='/study')||($location.url()=='/home')||($location.url()=='/mytable')){
		$rootScope.isactive=false;
	}
	$(window).on('scroll',function(){
		if((($('html').scrollTop()>100)||($('body').scrollTop()>100))&&(($location.url()=='/study')||($location.url()=='/home')||($location.url()=='/mytable'))){
			$rootScope.isactive=true;
			$rootScope.$apply();
		}else if((($('html').scrollTop()<100)&&($('body').scrollTop()<100))&&(($location.url()=='/study')||($location.url()=='/home')||($location.url()=='/mytable'))){
			$rootScope.isactive=false;
			$rootScope.$apply();

		}
	})
	if(($location.url()=='/analyse')||($location.url()=='/complie')||($location.url()=='/modalRes')){
		$rootScope.isactive=true;
	}
	$rootScope.$on('$routeChangeStart',function(next,cur){
		$('html,body').scrollTop(0)
		var wow = new WOW({
		boxClass : 'wow',
		animateClass : 'animated',
		offset : 0,
		mobile : false,
		live : true
		});
		wow.init();
		/*var editor = ace.edit("editor");
		editor.setTheme("ace/theme/chrome");
		editor.getSession().setMode("ace/mode/java");*/
	})
	$rootScope.$on('$routeChangeSuccess',function(next,cur){
		if($location.url()=='/complie'){
			$rootScope.$watch('$viewContentLoaded', function() {  
				var editor = ace.edit("editor");
				editor.setTheme("ace/theme/chrome");
				editor.getSession().setMode("ace/mode/python");
			}); 
			
		}
		$('html,body').scrollTop(0);
		if(($location.url()=='/study')||($location.url()=='/home')||($location.url()=='/mytable')){
			$rootScope.isactive=false;
		}
		$(window).on('scroll',function(){
			if((($('html').scrollTop()>100)||($('body').scrollTop()>100))&&(($location.url()=='/study')||($location.url()=='/home')||($location.url()=='/mytable'))){
				$rootScope.isactive=true;
				$rootScope.$apply();
			}else if((($('html').scrollTop()<100)&&($('body').scrollTop()<100))&&(($location.url()=='/study')||($location.url()=='/home')||($location.url()=='/mytable'))){
				$rootScope.isactive=false;
				$rootScope.$apply();
				
			}
		})
		if(($location.url()=='/analyse')||($location.url()=='/complie')||($location.url()=='/modalRes')){
			$rootScope.isactive=true;
		}
	})

}])
.constant('constantUrl','http://114.55.238.82:81/')
.value('strategysValue',{"id":123,"author":'abc'})
.value('myStrategysValue',[])
.controller('homeController',['$scope','$rootScope','$http','$location','$cookies','$cookieStore','constantUrl',function($scope,$rootScope,$http,$location,$cookies,$cookieStore,constantUrl){
	$scope.$watch(function(){
		var str=null;
		var href=window.location.href;
		var index=href.indexOf('#/');
		if(index!=-1){
			str=href.substring(index);
		};
		$scope.natived=str;
	});
	$rootScope.user=$cookieStore.get('user');
	$rootScope.logout=function(){
		$cookieStore.remove('user');
		$rootScope.user=null;
		$location.path('/home');
	}
	$scope.complie=function(){
		$location.path('/register');
	}
	$scope.hashLocation=function(x){
		if ($rootScope.user){
			$location.path(x)
		} else{
			$location.path('/login');
		}
	}

}])
.controller('studyController',['$scope','strategyResources','strategyResource','$http','$timeout','$cookieStore','constantUrl','$location','$rootScope',function($scope,strategyResourcess,strategyResource,$http,$timeout,$cookieStore,constantUrl,$location,$rootScope){
	$scope.hisActtoryRes=function(x){
		if ($rootScope.user){
			$location.path(x);
			$('.analyse-modal-big').show();
		} else{
			$location.path('/login');
		}
	}
}])
/*.controller('queryStrategy',['$scope','strategyResources','strategyResource','$http','$timeout','$cookieStore','constantUrl',function($scope,strategyResourcess,strategyResource,$http,$timeout,$cookieStore,constantUrl){
	$scope.queryAll=function(){
		$http.get(constantUrl+"strategys/",{
			headers:{'Authorization':'token '+$cookieStore.get('user').token}
		})
		.success(function(data){
			$('.zijin-beta-body .zijin-beta-left .glyphicon').css('transform','rotate(180deg)');
			$scope.strategy=data;
			$('.zijin-beta-body .zijin-beta-left table').slideDown(2000);
		})
		.error(function(data){
			Showbo.Msg.alert('网络错误，请稍后再试。')
		});
	};
	getStrategy();
	function getStrategy(){
	 $http.get(constantUrl+"strategys/",{
			headers:{'Authorization':'token '+$cookieStore.get('user').token}
		})
		.success(function(data){
			$scope.items=data;
			$scope.strategy=data;
		})
		.error(function(data){
			Showbo.Msg.alert('网络错误，请稍后再试。')
		});
	}
	$scope.iniStrategy=function(){
		if(!$scope.selectedStrategy){
			Showbo.Msg.alert('请选择策略。');
			return
		}
		var url=$scope.selectedStrategy.name;
		$http.patch(constantUrl+"strategys/"+url+'/',{status:0},{
			headers:{'Authorization':'token '+$cookieStore.get('user').token}
		})
		.success(function(){
			getStrategy();
			$scope.selectedStrategy=null;
			Showbo.Msg.alert('初始化成功，请重新选择策略。')
		})
		.error(function(data){
			Showbo.Msg.alert('初始化失败，请稍后再试。')
		});
	}
	$scope.stStrategy=function(){
		if(!$scope.selectedStrategy){
			Showbo.Msg.alert('请选择策略。');
			return
		}
		var url=$scope.selectedStrategy.name;
		$http.patch(constantUrl+"strategys/"+url+'/',{status:1},{
			headers:{'Authorization':'token '+$cookieStore.get('user').token}
		})
		.success(function(){
			getStrategy();
			$scope.selectedStrategy=null;
			Showbo.Msg.alert('启动成功，请重新选择策略。')
		})
		.error(function(data){
			Showbo.Msg.alert('启动失败，请稍后再试。')
		});
	}
	$scope.pouStrategy=function(){
		if(!$scope.selectedStrategy){
			Showbo.Msg.alert('请选择策略。');
			return
		}
		var url=$scope.selectedStrategy.name;
		$http.patch(constantUrl+"strategys/"+url+'/',{status:2},{
			headers:{'Authorization':'token '+$cookieStore.get('user').token}
		})
		.success(function(){
			getStrategy();
			$scope.selectedStrategy=null;
			Showbo.Msg.alert('暂停成功，请重新选择策略。')
		})
		.error(function(data){
			Showbo.Msg.alert('暂停失败，请稍后再试。')
		});
	}
	$scope.delStrategy=function(){
		if(!$scope.selectedStrategy){
			Showbo.Msg.alert('请选择策略。');
			return
		}
		var url=$scope.selectedStrategy.name;
		$http.delete(constantUrl+"strategys/"+url+'/',{
			headers:{'Authorization':'token '+$cookieStore.get('user').token}
		})
		.success(function(){
			$scope.items=null;
			$scope.selectedStrategy=null;
			getStrategy();
			Showbo.Msg.alert('删除成功。')
		})
		.error(function(data){
			Showbo.Msg.alert('删除失败，请稍后再试。')
		});
	}
	$scope.openMask=function(){
		$('.sourcing-mask').fadeIn();
	};
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
		//console.log($scope.item);
        $http.post(constantUrl+"strategys/",formdata,{
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined,
	            	'Authorization':'token '+$cookieStore.get('user').token	
	        	}
        	})
        .success(function(data){
        	$('.zijin-beta-mask').fadeOut();
			getStrategy();
			Showbo.Msg.alert('添加成功。');
        })
        .error(function(err,st){
        	//console.log(err);
        	//console.log(st);
        	Showbo.Msg.alert('添加失败，请稍后再试。');
        })
	}
	$scope.closeMask=function(){
		
		$('.zijin-beta-mask').fadeOut();
	}
}])*/
.controller('tableController',['$scope','strategyResources','strategyResource','$http','$timeout','$cookieStore','constantUrl','strategysValue','myStrategysValue',function($scope,strategyResourcess,strategyResource,$http,$timeout,$cookieStore,constantUrl,strategysValue,myStrategysValue){
	$scope.func=function(e){
		return e["status"]!=-3;
	}
	$scope.closeMask=function(){
		$('.zijin-table-mask').fadeOut();
	}
	$scope.allStrategys=[];
	
	/* 源策略 */
	$scope.openMaskSourcing=function(){
		$('.sourcing-mask').fadeIn();
	}
	$scope.getSourcingStrategys=function(){
	 $http.get(constantUrl+"classs/",{
			headers:{'Authorization':'token '+$cookieStore.get('user').token}
		})
		.success(function(data){
			$scope.mySourcingStrategy=data;
		})
		.error(function(err,sta){
			Showbo.Msg.alert('网络错误，请稍后再试。');
			//console.log(err);
			//console.log(sta);
		});
	};
	$scope.getSourcingStrategys();
	

	$scope.addSourcingStrategy=function(){
		var file = $scope.sourcingCode;
		var formdata = new FormData();
		formdata.append('code', file);
		formdata.append('class_name',$scope.itemSourcing.class_name);
        $http.post(constantUrl+"classs/",formdata,{
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined,
	            	'Authorization':'token '+$cookieStore.get('user').token	
	        	}
        	})
        .success(function(data){
        	$('.zijin-table-mask').fadeOut();
			//console.log(data);
			$scope.getSourcingStrategys();
			Showbo.Msg.alert('添加成功。');
        })
        .error(function(err,st){
        	//console.log(err);
        	//console.log(st);
        	$('.zijin-table-mask').fadeOut();
        	Showbo.Msg.alert('添加失败，请稍后再试。');
        })
	}

	/* 创建实盘模拟 */
	$scope.getFirmStrategys=function(){
	 	$http.get(constantUrl+"strategys/",{
			headers:{'Authorization':'token '+$cookieStore.get('user').token}
		})
		.success(function(data){
			$scope.myStrategy=data;
			angular.forEach(data,function(item,index){
				$scope.allStrategys.push(item);
			})
		})
		.error(function(err,sta){
			Showbo.Msg.alert('网络错误，请稍后再试。');
			//console.log(err);
			//console.log(sta);
		});
	};
	$scope.getFirmStrategys();
	$scope.addFirmStrategy=function(){

		var files = $scope.files;
		var formdata = new FormData();
		formdata.append('name', $scope.firmItem.name);
		formdata.append('symbol', $scope.firmItem.symbol);
		formdata.append('class_id', strategysValue.id);
		formdata.append('author', strategysValue.author);
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
        	$scope.myStrategy=data;
			//console.log(data);
			$scope.getFirmStrategys();
			Showbo.Msg.alert('添加成功。');
        })
        .error(function(err,st){
        	//console.log(err);
        	//console.log(st);
        	$('.zijin-table-mask').fadeOut();
        	Showbo.Msg.alert('添加失败，请稍后再试。');
        })
	}
	
	
	/* 创建历史回测 */
	$scope.hisItem={};
	$scope.modeTickOptions=false;
	$scope.modeBarOptions=false;
	$scope.getBarList=function(){
		$scope.modeTickOptions=!$scope.modeBarOptions;
		if (!$scope.modeBarOptions) return;
		getModeList('bar');
	}
	$scope.getTickList=function(){
		$scope.modeBarOptions=!$scope.modeTickOptions;
		if (!$scope.modeTickOptions) return;
		getModeList('tick');
	}
	function getModeList(ty){
		$http.get(constantUrl+"dates/",{
			params:{type:ty,date_type:'data'},
			headers:{'Authorization':'token '+$cookieStore.get('user').token}
		})
		.success(function(data){
			$scope.hisItem.time=data;
			
		})
		.error(function(err,sta){
			console.log(err);
			console.log(sta);
			/*Showbo.Msg.alert('没有数据');*/
		})
	}
	$scope.addHisStrategy=function(){

		var files = $scope.files;
		var formdata = new FormData();
		if ($scope.modeBarOptions) {
			formdata.append('mode', 'bar');
		}else{
			formdata.append('mode', 'tick');
		};
		formdata.append('name', $scope.hisItem.name);
		formdata.append('start',$scope.hisItem.start);
		formdata.append('end', $scope.hisItem.end);
		formdata.append('class_id', strategysValue.id);
		if (($scope.files!=undefined)&&($scope.files!=null)) {
			formdata.append('file',files);
		}
        $http.post(constantUrl+"btstrategys/",formdata,{
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined,
	            	'Authorization':'token '+$cookieStore.get('user').token	
	        	}
        	})
        .success(function(data){
        	$('.zijin-table-mask').fadeOut();
        	$scope.myHisStrategy=data;
			//console.log(data);
			$scope.getHisStrategys();
			console.log(data);
			Showbo.Msg.alert('添加成功。');
        })
        .error(function(err,st){
        	//console.log(err);
        	//console.log(st);
        	$('.zijin-table-mask').fadeOut();
        	Showbo.Msg.alert('添加失败，请稍后再试。');
        })
	}
	$scope.getHisStrategys=function(){
	 	$http.get(constantUrl+"btstrategys/",{
			headers:{'Authorization':'token '+$cookieStore.get('user').token}
		})
		.success(function(data){
			$scope.myHisStrategy=data;
			angular.forEach(data,function(item,index){
				$scope.allStrategys.push(item);
			})
		})
		.error(function(err,sta){
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
.controller('userController',['$scope','$rootScope','$http','$location','$cookies','$cookieStore','constantUrl','myStrategysValue',function($scope,$rootScope,$http,$location,$cookies,$cookieStore,constantUrl,myStrategysValue){
	$scope.adduser=function(){
		$http.post(constantUrl+'users/',$scope.user)
		.success(function(data){
			Showbo.Msg.alert('注册成功');
			$location.path('/login');
		})
		.error(function(err,sta){
			//console.log(err);
			//console.log(sta);
			Showbo.Msg.alert('注册失败，请联系管理员。');
		})
	}
	
	$scope.userlogin=function(){
		var username=$scope.user.username;
		var password=$scope.user.password;
		$http.post(constantUrl+'api-token-auth/',$scope.user)
		.success(function(data){
			$cookieStore.put('user',{
				username:username,
				password:password,
				token:data.token
			})
			$rootScope.user=$cookieStore.get('user');
			Showbo.Msg.alert('登录成功');
			$location.path('/home');
			//console.log($cookieStore.get('user'));
		})
		.error(function(err,sta){
			//console.log(err);
			//console.log(sta);
			Showbo.Msg.alert('登录失败，请联系管理员。');
		})
	}
}])
.controller('analyseController',['$scope','$rootScope','$filter','$http','constantUrl','$cookieStore','myStrategysValue','$q',function($scope,$rootScope,$filter,$http,constantUrl,$cookieStore,myStrategysValue,$q){
	$scope.closeModal=function(){
		$('.analyse-modal-big').hide();
	}
	var chartData1=[];
	$scope.makeChart=function(){
		draw1();
		function  draw1(){
			if (/{/.test($scope.analyseData)) {
				chartData1=angular.fromJson($scope.analyseData);
			}else{
				var csvArr=($scope.analyseData).split('format: symbol, price, volume, pos, trans_type, time');
				var csvArr1=csvArr[1].replace(/\s/g,'');
				var csvArr2=(csvArr1.replace(/IF/g,' IF')).split(' ');
				angular.forEach(csvArr2,function(data,index){
					if (index==0) return;
					var arr=data.split(",");
					arr[5]=(arr[5]).replace(/(\d{4}-\d{2}-\d{2})(\d{2}:\d{2}:\d{2}\.\d{6})/,"$1 $2");
					chartData1.push({
						"name":csvArr[0],
				        "price": Number(arr[1]),
				        "time": (new Date(arr[5])).getTime(),
				        "pos":  Number(arr[3]),
				        "volume":Number(arr[2]),
				        "trans_type":  arr[4],
				        "symbol":  arr[0]
					})
				})
				//console.log(chartData1);
			}
			var chartJsonData;
			var chartJsonDataArr=[];
			var chartArr=[];
			var indexShortArr=[];
			var indexBuyArr=[];
			$scope.analyseSymbol=" "+chartData1[0].symbol+' '+chartData1[0].name;
			angular.forEach(chartData1,function(data,index){
				if (index==0&&((data.trans_type=="cover")||(data.trans_type=="sell")))
					return;
				if (index==chartData1.length-1) return;
				if ((data.trans_type=="cover")||(data.trans_type=="sell")) return;
				if (data.trans_type=="short") {
					outer:
					for(var i=0;i<chartData1.length;i++){
						if (chartData1[i].trans_type=="cover") {
							if (indexShortArr.length!=0) {
								inter:
								for(var j=0;j<indexShortArr.length;j++){
									if (indexShortArr[j]==i) {
										break inter;
									}else if((j==indexShortArr.length-1)&&(indexShortArr[j]!=i)){
										chartArr.push({
											"volume":data.volume,
											"direction":data.pos,
											"Earn":$filter('number')(chartData1[i].price-data.price,2),
											"openprice":data.price,
											"closeprice":chartData1[i].price,
											"opentime":data.datetime,
											"closetime":chartData1[i].datetime,
											"present":chartData1[i].price,
											"name":data.name,
											"symbol":data.symbol
										});
										indexShortArr.push(i);
										break outer;
									}
								}
							}else{
								chartArr.push({
									"volume":data.volume,
									"direction":-1,
									"Earn":$filter('number')(chartData1[i].price-data.price,2),
									"openprice":data.price,
									"closeprice":chartData1[i].price,
									"opentime":data.datetime,
									"closetime":chartData1[i].datetime,
									"present":chartData1[i].price,
									"name":data.name,
									"symbol":data.symbol
								});
								indexShortArr.push(i);
								break outer;
							}
						}
					}
				}
				if (data.trans_type=="buy") {
					outer1:
					for(var i=0;i<chartData1.length;i++){
						if (chartData1[i].trans_type=="sell") {
							if (indexShortArr.length!=0) {
								inter1:
								for(var j=0;j<indexShortArr.length;j++){
									if (indexShortArr[j]==i) {
										break inter1;
									}else if((j==indexShortArr.length-1)&&(indexShortArr[j]!=i)){
										chartArr.push({
											"volume":data.volume,
											"direction":1,
											"Earn":$filter('number')(chartData1[i].price-data.price,2),
											"openprice":data.price,
											"closeprice":chartData1[i].price,
											"opentime":data.datetime,
											"closetime":chartData1[i].datetime,
											"present":chartData1[i].price,
											"name":data.name,
											"symbol":data.symbol
										});
										indexShortArr.push(i);
										break outer1;
									}
								}
							}else{
								chartArr.push({
									"volume":data.volume,
									"direction":data.pos,
									"Earn":$filter('number')(chartData1[i].price-data.price,2),
									"openprice":data.price,
									"closeprice":chartData1[i].price,
									"opentime":data.datetime,
									"closetime":chartData1[i].datetime,
									"present":chartData1[i].price,
									"name":data.name,
									"symbol":data.symbol
								});
								indexShortArr.push(i);
								break outer1;
							}
						}
					}
				}
			})
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
			var wealth2=[];
			angular.forEach(chartData1,function(data,index){
				/*if(data.time>1477411200000&&data.time<1477497599000){*/
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
				/*}*/		
			})
			wealth1=$filter('orderBy')(wealth1,'x');
			var wealth = [];
			var buy = [];
			var tradeItem=[];
			var direction;
			var amount=0;
			var total=0;
			var winrate;
			var totalWinrate=0;
			var totalProfit=0;
			var totalRate1=0;
			var totalRate2=0;
			var totalRate3=0;
			var totalRate4=[];
			var yeildAbs;
			var totalpal=0;
			var allTotalpal=0;
			var allTotalyeild=0;
			var prof=0;
			var loss=0;
			angular.forEach(chartArr,function(data,index){
				totalpal=totalpal+Number(data["Earn"]);
				allTotalpal=allTotalpal+Number(data["Earn"]);
				if (data['direction']>0) {
					direction='看多';
				}else{
					direction='看空';
				}
				if(Number(data["Earn"])>0){
					winrate=100;
					yeildAbs=Math.abs((Number(data["Earn"])*100/data['openprice']).toFixed(2));
					prof=prof+Number(data["Earn"])*100/data['openprice'];
				}else{
					winrate=0;
					yeildAbs=Math.abs((Number(data["Earn"])*100/data['closeprice']).toFixed(2));
					loss=loss+Number(data["Earn"])*100/data['openprice'];
				}
				wealth.push({
					"x":data["opentime"],
					"y":Number($filter('number')(parseFloat(totalpal),2)),
					"pal":Number(data["Earn"]),
					"openprice":data['openprice'],
					"closeprice":data['closeprice']
				});	
				buy.push({
					"x":data['opentime'],
					"y":data['direction']
				});
				tradeItem.push({
					"openprice":data['openprice'],
					"closeprice":data['closeprice'],
					"time":$filter('date')(data["opentime"],"yyyy-MM-dd H:mm:ss"),
					"pal":$filter('number')(Number(data["Earn"]),2),
					"totalpal":$filter('number')(totalpal,2),
					'direction':direction,
					'yeild': (Number(data["Earn"])*100/data['openprice']).toFixed(2),
					'winrate':winrate,
					'yeildAbs':yeildAbs,
					'closetime':$filter('date')(data["closetime"],"yyyy-MM-dd H:mm:ss"),
					"opentime":$filter('date')(data["opentime"],"yyyy-MM-dd H:mm:ss")
				});
				totalWinrate=totalWinrate+winrate;
				total=total+Number(data["Earn"])*100/data['openprice'];
				totalRate1=totalRate1+parseFloat(Number(data["Earn"])*100/data['openprice']-0.0492);
				totalRate4.push(yeildAbs);
				allTotalyeild=allTotalyeild+Number((Number(data["Earn"])*100/data['openprice']));
			})
			amount=tradeItem.length;
			$scope.analyseDataArr=tradeItem;
			$scope.annualized_return=parseFloat((Math.pow((1+total/100/amount),252/amount)-1)*100).toFixed(2);
			$scope.average_winrate=parseFloat(totalWinrate/amount).toFixed(2);
			$scope.average_profit=parseFloat(prof/loss).toFixed(2);
			$scope.rate1=parseFloat(totalRate1/amount).toFixed(2);
			angular.forEach(chartArr,function(data,index){
				totalRate2=totalRate2+parseFloat(Math.pow(parseFloat((Number(data["Earn"])*100/data['openprice']-0.0492)-$scope.rate1),2));
			})
			$scope.rate2=Math.sqrt(parseFloat(totalRate2)/amount).toFixed(2);
			$scope.rate3=parseFloat($scope.rate1/$scope.rate2).toFixed(2);
			$scope.rate4=(Math.max.apply(Math,totalRate4)).toFixed(2);
			$scope.allTotalpal=allTotalpal;
			$scope.allTotalyeild=(allTotalyeild).toFixed(2);
			$scope.averTotalyeild=(allTotalyeild/amount).toFixed(4);
			Highcharts.setOptions({
				global: {
				  useUTC: false
				}
			});
			if ($scope.analyseJsonData) {
				chartJsonData=angular.fromJson($scope.analyseJsonData);
				angular.forEach(chartJsonData,function(data,index){
					var parseTime=(new Date(data.datetime.replace('T'," "))).getTime();
					chartJsonDataArr.push({
						"x":parseTime,
						"y":data.close,
						'low':data.low,
						'high':data.high,
						'close':data.close,
						'open':data.open,
						'volume':data.volume
					});
				})
				chartJsonDataArr=$filter('orderBy')(chartJsonDataArr,'x');
				$('#return_map_big').highcharts('StockChart', {
					credits: {
	            		enabled: false
	        		},
					exporting:{
						enabled:false
					},
					plotOptions:{
						series:{
							turboThreshold:0
						}
					},
					tooltip : {
						shared : true,
						useHTML : true,
						formatter : function() {
							var s = Highcharts.dateFormat('<span>%Y-%m-%d %H:%M:%S</span>',this.x);
							s += '<br />high:<b class="red">￥'
							+Highcharts.numberFormat(this.points[0].point.high,2)
							+ '</b><br />low:<b class="blue">￥'
							+Highcharts.numberFormat(this.points[0].point.low,2)
							+ '</b><br />close:<b class="green">￥'
							+Highcharts.numberFormat(this.points[0].point.close,2)
							+ '</b><br />open:<b class="font-black">￥'
							+Highcharts.numberFormat(this.points[0].point.open,2)
							+ '</b><br />volume:<b class="orange">笔 '
							+Highcharts.numberFormat(this.points[0].point.volume,2);
							return s;
						},						
						valueDecimals : 2 
					},
					
					legend: {
						enabled:true,
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
						  },  {
							  type: 'minute',
							  count: 30,
							  text: '30m'
						  },{
							  type: 'hour',
							  count: 1,
							  text: '1h'
						  }, {
							  type: 'day',
							  count: 1,
							  text: '1d'
						  },{
							  type: 'week',
							  count: 1,
							  text: '1w'
						  },{
							  type: 'all',
							  text: '所有'
						  }],
						  selected: 5,
						  buttonSpacing:2

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
						lineWidth:2,
						id: 'dataseries',
						},{
						type: 'flags',
						data: wealth1,
						onSeries:"dataseries",
						shape:'circlepin',
						width:30,
						color:'#ff9912',
						fillColor:'transparent',
						style:{
							color:'#333'
						},
						y:20,
						name:'买入/卖出'
					},{
						type: 'flags',
						data: wealth2,
						onSeries:"dataseries",
						shape:'circlepin',
						width:30,
						color:"#4169e1",
						fillColor:'transparent',
						style:{
							color:'#333'
						},
						y:-40,
						name:'建仓/平仓'
					}]
				});
			}else {
				$('#return_map_big').highcharts('StockChart', {
					credits: {
	            		enabled: false
	        		},
					exporting:{
						enabled:false
					},
					plotOptions:{
						series:{
							turboThreshold:0
						}
					},
					tooltip : {
						shared : true,
						useHTML : true,
						formatter : function() {
							if (this.points[1].y==1){
								var s = Highcharts.dateFormat('<span>%Y-%m-%d %H:%M:%S</span>',this.x);
								s += '<br />总盈亏:<b class="white-blue">￥'
								+Highcharts.numberFormat(this.y,2)
								+ '</b><br />盈亏:<b class="font-black">￥'
								+this.points[0].point.pal
								+ '</b><br />开仓价:<b class="font-black">￥'
								+this.points[0].point.openprice
								+ '</b><br />平仓价:<b class="font-black">￥'
								+this.points[0].point.closeprice
								+ '</b><br />方向:<span class="red">看多</span>';
								return s;
							}else if(this.points[1].y==-1){
								var s = Highcharts.dateFormat('<span>%Y-%m-%d %H:%M:%S</span>',this.x);
								s += '<br />总盈亏:<b class="white-blue">￥'
								+this.y
								+ '</b><br />盈亏:<b class="font-black">￥'
								+this.points[0].point.pal
								+ '</b><br />开仓价:<b class="font-black">￥'
								+this.points[0].point.openprice
								+ '</b><br />平仓价:<b class="font-black">￥'
								+this.points[0].point.closeprice
								+ '</b><br />方向:<span class="green">看空</span>';
								return s;
							}
						},						
						valueDecimals : 2 
					},
					
					legend: {
						enabled:true,
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
						  },  {
							  type: 'minute',
							  count: 30,
							  text: '30m'
						  },{
							  type: 'hour',
							  count: 1,
							  text: '1h'
						  }, {
							  type: 'day',
							  count: 1,
							  text: '1d'
						  },{
							  type: 'week',
							  count: 1,
							  text: '1w'
						  },{
							  type: 'all',
							  text: '所有'
						  }],
						  selected: 5,
						  buttonSpacing:2

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
						opposite:true,
						top: '65%',
						height: '35%',
						offset: 0,
						lineWidth: 1,
					}],
					
					series: [{
						type: 'line',
						name: '总盈亏',
						data: wealth,
						lineWidth:2
					},{
						type: 'column',
						name: '看多/看空',
						data: buy,
						yAxis: 1,
						threshold:0,
						negativeColor:'red',
						color:'green'
					}]
				});
			}
		}
	}
	$scope.myFirmStrategyList=[];
	function getHisSelect(){
	 	$http.get(constantUrl+"btstrategys/",{
			headers:{'Authorization':'token '+$cookieStore.get('user').token}
		})
		.success(function(data){
			angular.forEach(data,function(x,y){
				this.push({
					"name":x["name"],
					'_id':x["_id"],
					'status':x["status"]
				});
			},$scope.myFirmStrategyList)
		})
	}	
	getHisSelect();
	$scope.selecteStrategy=function(){
		/*$http.get(constantUrl+'btstrategys/'+$scope.myFirmStrategy._id+'/',{
			headers:{'Authorization':'token '+$cookieStore.get('user').token}	
		})
		.success(function(data){
			console.log(data);
		})
		.error(function(err,sta){
			if (sta==400) {
				Showbo.Msg.alert('没有数据');
			}
		});*/
		$http.get(constantUrl+'dates/',{
			params:{
				"date_type":'transaction',
				"sty_id":$scope.myFirmStrategy._id
			},
			headers:{'Authorization':'token '+$cookieStore.get('user').token}	
		})
		.success(function(data){
			$scope.myFirmDateList=data;
		})
		.error(function(err,sta){
			if (sta==400) {
				Showbo.Msg.alert('没有数据');
			}
		});
	}
	/*function getSelect(){
		var defer=$q.defer();
	 	$http.get(constantUrl+"strategys/",{
			headers:{'Authorization':'token '+$cookieStore.get('user').token}
		})
		.success(function(data){
			angular.forEach(data,function(x,y){
				myStrategysValue.push({
					"name":x["name"],
					'_id':x["_id"],
					'status':x["status"]
				});
			})
			defer.resolve(myStrategysValue);
		})
		return defer.promise;
	}	
	getSelect().then(function(d){
		$scope.myFirmStrategyList=d;
		$scope.$watch("myFirmStrategy",function(newValue,oldValue,scope){
			if((newValue!=oldValue)&&newValue!=null){
				$scope.myFirmDateList=null;
				$http.get(constantUrl+'dates/',{
					params:{
						"date_type":'transaction',
						"sty_id":newValue._id
					},
					headers:{'Authorization':'token '+$cookieStore.get('user').token}	
				})
				.success(function(data){
					////console.log(data);
					//var arr=[];
					//angular.forEach(data,function(info,index){
					//	var num=((new Date(info[1])).getTime()-(new Date(info[0])).getTime())/(24*3600000);
					//	for(var i=0;i<num;i++){
					//		var time=(new Date(info[0])).getTime()+(24*3600000)*i;
					//		arr.push($filter('date')(time,"yyyy-MM-dd"));
					//	}
					//})
					$scope.myFirmDateList=data;
				})
				.error(function(err,sta){
					if (sta==400) {
						Showbo.Msg.alert('没有数据');
					}
				});
			}	
		})
	})*/

	$scope.makeChart1=function(){
		var mydate=$filter('date')(new Date((new Date($scope.myFirmEndDate)).setDate((new Date($scope.myFirmEndDate)).getDate()+1)),'yyyy-MM-dd');
		function getHisTime(){
			var defer1=$q.defer();
			$http.get(constantUrl+'transactions/',{
				params:{
					"sty_id":$scope.myFirmStrategy._id,
					"start":$scope.myFirmStartDate,
					"end":mydate
				},
				headers:{'Authorization':'token '+$cookieStore.get('user').token}
			})
			.success(function(data){
				defer1.resolve(data);
			})
			.error(function(err,sta){
				defer1.reject(err);
			})
			return defer1.promise;
		};
		function getHisTransTime(){
			var defer2=$q.defer();
			$http.get(constantUrl+'datas/',{
				params:{
					"type":'bar',
					"start":$scope.myFirmStartDate,
					"end":mydate
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
		};
		getHisTime().then(function(data){
			var chartData1=data;
			//console.log(data);
			getHisTransTime().then(function(data){
				var	chartJsonData=data;
				//console.log(data);
				$scope.analyse_title={
					'name':$scope.myFirmStrategy.name,
					'time':$scope.myFirmStartDate+' 至 '+$scope.myFirmEndDate
				};
				draws1();
				function  draws1(){
					/*$('#return_mapping_1').css('display','block').siblings().css('display','none');*/
					var chartJsonDataArr=[];
					var chartArr=[];
					var indexShortArr=[];
					var indexBuyArr=[];
					var buySellNum=0;
					var buyYArr=[];
					var shortYArr=[];
					$scope.highstockAnalyseanalyseSymbol=chartData1[0].symbol+' '+chartData1[0].name;
					angular.forEach(chartData1,function(data,index){
						if (index==0&&((data.trans_type=="cover")||(data.trans_type=="sell")))
							return;
						if (index==chartData1.length-1) return;
						if ((data.trans_type=="cover")||(data.trans_type=="sell")) return;
						if (data.trans_type=="short") {
							
							outer:
							for(var i=0;i<chartData1.length;i++){
								if (chartData1[i].trans_type=="cover") {
									if (indexShortArr.length!=0) {
										inter:
										for(var j=0;j<indexShortArr.length;j++){
											if (indexShortArr[j]==i) {
												break inter;
											}else if((j==indexShortArr.length-1)&&(indexShortArr[j]!=i)){
												buySellNum++;
												buyYArr.push({
													"short":"short",
													"text":'时间：'+$filter('date')(data.datetime,'yyyy-MM-dd H:mm:ss')+'<br>成交价：￥'+data.price+'<br>成交量：'+data.volume,
													"volume":data.volume,
													"pos":data.pos,
													"price":data.price,
													"x":data.datetime,
													"name":data.name,
													"symbol":data.symbol,
													"title":data.trans_type+' '+buySellNum
												})
												chartArr.push({

													"x":chartData1[i].datetime,
													"y":Number($filter('number')(data.price-chartData1[i].price,2)),
													"volume":data.volume,
													"direction":data.pos,
													"Earn":Number($filter('number')(data.price-chartData1[i].price,2)),
													"openprice":data.price,
													"closeprice":chartData1[i].price,
													"opentime":data.datetime,
													"closetime":chartData1[i].datetime,
													"present":chartData1[i].price,
													"name":data.name,
													"symbol":data.symbol
												});

												buyYArr.push({
													"short":"short",
													"text":'时间：'+$filter('date')(chartData1[i].datetime,'yyyy-MM-dd H:mm:ss')+'<br>成交价：￥'+chartData1[i].price
													+'<br>成交量：'+chartData1[i].volume,
													"volume":chartData1[i].volume,
													"pos":chartData1[i].pos,
													"price":chartData1[i].price,
													"x":chartData1[i].datetime,
													"name":chartData1[i].name,
													"symbol":chartData1[i].symbol,
													"title":chartData1[i].trans_type+' '+buySellNum
												})
												indexShortArr.push(i);
												break outer;
											}
										}
									}else{
										buySellNum++;
										buyYArr.push({
											"short":"short",
											"text":'时间：'+$filter('date')(data.datetime,'yyyy-MM-dd H:mm:ss')+'<br>成交价：￥'+data.price+'<br>成交量：'+data.volume,
											"volume":data.volume,
											"pos":data.pos,
											"price":data.price,
											"x":data.datetime,
											"name":data.name,
											"symbol":data.symbol,
											"title":data.trans_type+' '+buySellNum
										})
										chartArr.push({

											"x":chartData1[i].datetime,
											"y":Number($filter('number')(data.price-chartData1[i].price,2)),
											"volume":data.volume,
											"direction":-1,
											"Earn":Number($filter('number')(data.price-chartData1[i].price,2)),
											"openprice":data.price,
											"closeprice":chartData1[i].price,
											"opentime":data.datetime,
											"closetime":chartData1[i].datetime,
											"present":chartData1[i].price,
											"name":data.name,
											"symbol":data.symbol
										});
										buyYArr.push({
											"short":"short",
											"text":'时间：'+$filter('date')(chartData1[i].datetime,'yyyy-MM-dd H:mm:ss')+'<br>成交价：￥'+chartData1[i].price+'<br>成交量：'+chartData1[i].volume,
											"volume":chartData1[i].volume,
											"pos":chartData1[i].pos,
											"price":chartData1[i].price,
											"x":chartData1[i].datetime,
											"name":chartData1[i].name,
											"symbol":chartData1[i].symbol,
											"title":chartData1[i].trans_type+' '+buySellNum
										})
										indexShortArr.push(i);
										break outer;
									}
								}
							}
						}
						if (data.trans_type=="buy") {
							
							outer1:
							for(var i=0;i<chartData1.length;i++){
								if (chartData1[i].trans_type=="sell") {
									if (indexShortArr.length!=0) {
										inter1:
										for(var j=0;j<indexShortArr.length;j++){
											if (indexShortArr[j]==i) {
												break inter1;
											}else if((j==indexShortArr.length-1)&&(indexShortArr[j]!=i)){
												buySellNum++;
												shortYArr.push({
													"buy":'buy',
													"text":'时间：'+$filter('date')(data.datetime,'yyyy-MM-dd H:mm:ss')+'<br>成交价：￥'+data.price+'<br>成交量：'+data.volume,
													"volume":data.volume,
													"pos":data.pos,
													"price":data.price,
													"x":data.datetime,
													"name":data.name,
													"symbol":data.symbol,
													"title":data.trans_type+' '+buySellNum
												})
												chartArr.push({

													"x":chartData1[i].datetime,
													"y":Number($filter('number')(chartData1[i].price-data.price,2)),
													"volume":data.volume,
													"direction":1,
													"Earn":Number($filter('number')(chartData1[i].price-data.price,2)),
													"openprice":data.price,
													"closeprice":chartData1[i].price,
													"opentime":data.datetime,
													"closetime":chartData1[i].datetime,
													"present":chartData1[i].price,
													"name":data.name,
													"symbol":data.symbol
												});
												shortYArr.push({
													"buy":'buy',
													"text":'时间：'+$filter('date')(chartData1[i].datetime,'yyyy-MM-dd H:mm:ss')+'<br>成交价：￥'+chartData1[i].price+'<br>成交量：'+chartData1[i].volume,
													"volume":chartData1[i].volume,
													"pos":chartData1[i].pos,
													"price":chartData1[i].price,
													"x":chartData1[i].datetime,
													"name":chartData1[i].name,
													"symbol":chartData1[i].symbol,
													"title":chartData1[i].trans_type+' '+buySellNum
												})
												indexShortArr.push(i);
												break outer1;
											}
										}
									}else{
										buySellNum++;
										shortYArr.push({
											"buy":'buy',
											"text":'时间：'+$filter('date')(data.datetime,'yyyy-MM-dd H:mm:ss')+'<br>成交价：￥'+data.price+'<br>成交量：'+data.volume,
											"volume":data.volume,
											"pos":data.pos,
											"price":data.price,
											"x":data.datetime,
											"name":data.name,
											"symbol":data.symbol,
											"title":data.trans_type+' '+buySellNum
										})
										chartArr.push({

											"x":chartData1[i].datetime,
											"y":Number($filter('number')(chartData1[i].price-data.price,2)),
											"volume":data.volume,
											"direction":data.pos,
											"Earn":Number($filter('number')(chartData1[i].price-data.price,2)),
											"openprice":data.price,
											"closeprice":chartData1[i].price,
											"opentime":data.datetime,
											"closetime":chartData1[i].datetime,
											"present":chartData1[i].price,
											"name":data.name,
											"symbol":data.symbol
										});
										shortYArr.push({
											"buy":'buy',
											"text":'时间：'+$filter('date')(chartData1[i].datetime,'yyyy-MM-dd H:mm:ss')+'<br>成交价：￥'+chartData1[i].price+'<br>成交量：'+chartData1[i].volume,
											"volume":chartData1[i].volume,
											"pos":chartData1[i].pos,
											"price":chartData1[i].price,
											"x":chartData1[i].datetime,
											"name":chartData1[i].name,
											"symbol":chartData1[i].symbol,
											"title":chartData1[i].trans_type+' '+buySellNum
										})
										indexShortArr.push(i);
										break outer1;
									}
								}
							}
						}
					})
					
					shortYArr=$filter('orderBy')(shortYArr,'x');
					buyYArr=$filter('orderBy')(buyYArr,'x');
					chartArr=$filter('orderBy')(chartArr,'x');
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
					var tradeItem=[];
					var direction;
					var amount=0;
					var total=0;
					var winrate;
					var totalWinrate=0;
					var totalProfit=0;
					var totalRate1=0;
					var totalRate2=0;
					var totalRate3=0;
					var totalRate4=[];
					var yeildAbs;
					var totalpal=0;
					var allTotalpal=0;
					var allTotalyeild=0;
					var prof=0;
					var loss=0;
					angular.forEach(chartArr,function(data,index){
						totalpal=totalpal+Number(data["Earn"]);
						allTotalpal=allTotalpal+Number(data["Earn"]);
						if (data['direction']>0) {
							direction='看多';
						}else{
							direction='看空';
						}
						if(Number(data["Earn"])>0){
							winrate=100;
							yeildAbs=Math.abs((Number(data["Earn"])*100/data['openprice']).toFixed(2));
							prof=prof+Number(data["Earn"])*100/data['openprice'];
						}else{
							winrate=0;
							yeildAbs=Math.abs((Number(data["Earn"])*100/data['closeprice']).toFixed(2));
							loss=loss+Number(data["Earn"])*100/data['openprice'];
						}
						wealth.push({
							"x":data["opentime"],
							"y":Number($filter('number')(parseFloat(totalpal),2)),
							"pal":Number(data["Earn"]),
							"openprice":data['openprice'],
							"closeprice":data['closeprice']
						});	
						buy.push({
							"x":data['opentime'],
							"y":data['direction']
						});
						tradeItem.push({
							"openprice":data['openprice'],
							"closeprice":data['closeprice'],
							"time":$filter('date')(data["opentime"],"yyyy-MM-dd H:mm:ss"),
							"pal":$filter('number')(Number(data["Earn"]),2),
							"totalpal":$filter('number')(totalpal,2),
							'direction':direction,
							'yeild': (Number(data["Earn"])*100/data['openprice']).toFixed(2),
							'winrate':winrate,
							'yeildAbs':yeildAbs,
							'closetime':$filter('date')(data["closetime"],"yyyy-MM-dd H:mm:ss"),
							"opentime":$filter('date')(data["opentime"],"yyyy-MM-dd H:mm:ss")
						});
						totalWinrate=totalWinrate+winrate;
						total=total+Number(data["Earn"])*100/data['openprice'];
						totalRate1=totalRate1+parseFloat(Number(data["Earn"])*100/data['openprice']-0.0492);
						totalRate4.push(yeildAbs);
						allTotalyeild=allTotalyeild+Number((Number(data["Earn"])*100/data['openprice']));
					})
					amount=tradeItem.length;
					$scope.analyseDataArr=tradeItem;
					$scope.annualized_return=parseFloat((Math.pow((1+total/100/amount),252/amount)-1)*100).toFixed(2);
					$scope.average_winrate=parseFloat(totalWinrate/amount).toFixed(2);
					$scope.average_profit=parseFloat(prof/loss).toFixed(2);
					$scope.rate1=parseFloat(totalRate1/amount).toFixed(2);
					angular.forEach(chartArr,function(data,index){
						totalRate2=totalRate2+parseFloat(Math.pow(parseFloat((Number(data["Earn"])*100/data['openprice']-0.0492)-$scope.rate1),2));
					})
					$scope.rate2=Math.sqrt(parseFloat(totalRate2)/amount).toFixed(2);
					$scope.rate3=parseFloat($scope.rate1/$scope.rate2).toFixed(2);
					$scope.rate4=(Math.max.apply(Math,totalRate4)).toFixed(2);
					$scope.allTotalpal=allTotalpal;
					$scope.allTotalyeild=(allTotalyeild).toFixed(2);
					$scope.averTotalyeild=(allTotalyeild/amount).toFixed(4);
					Highcharts.setOptions({
						global: {
						  useUTC: false
						}
					});
					
					/*chartJsonData=angular.fromJson($scope.analyseJsonData);*/
					angular.forEach(chartJsonData,function(data,index){
						/*var parseTime=(new Date(data.datetime.replace('T'," "))).getTime();*/
						chartJsonDataArr.push({
							"x":data.datetime,
							"y":data.close,
							'low':data.low,
							'high':data.high,
							'close':data.close,
							'open':data.open,
							'volume':data.volume
						});
					})
					chartJsonDataArr=$filter('orderBy')(chartJsonDataArr,'x');
					console.log(chartArr);
					$('#return_map_big').highcharts('StockChart', {
						credits: {
			        		enabled: false
			    		},
						exporting:{
							enabled:false
						},
						plotOptions:{
							series:{
								turboThreshold:0
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
						tooltip:{
							useHTML:true,
							xDateFormat:"%Y-%m-%d %H:%M:%S",
							valueDecimals:2
						},
						legend: {
							enabled:true,
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
							  },  {
								  type: 'minute',
								  count: 30,
								  text: '30m'
							  },{
								  type: 'hour',
								  count: 1,
								  text: '1h'
							  }, {
								  type: 'day',
								  count: 1,
								  text: '1d'
							  },{
								  type: 'week',
								  count: 1,
								  text: '1w'
							  },{
								  type: 'all',
								  text: '所有'
							  }],
							  selected: 5,
							  buttonSpacing:2

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
							height:'60%'
							},{
							labels:{
								align:'right',
								x:-3
							},
							title:{
								text:'盈亏'
							},
							opposite:true,
							offset:0,
							height:'35%',
							top:'65%'
						}],
						series: [{
							type: 'line',
							name: '股价',
							data: chartJsonDataArr,
							lineWidth:2,
							id: 'dataseries'
							},{
							type: 'flags',
							data: buyYArr,
							onSeries:"dataseries",
							shape:'squarepin',
							width:36,
							color:'#ff9912',
							fillColor:'transparent',
							style:{
								color:'#333'
							},
							y:30,
							name:'买入/卖出',
						},{
							type: 'flags',
							data: shortYArr,
							onSeries:"dataseries",
							shape:'squarepin',
							width:36,
							color:"#4169e1",
							fillColor:'transparent',
							style:{
								color:'#333'
							},
							y:-50,
							name:'建仓/平仓',
						},{
							type:'column',
							data:chartArr,
							name:'盈亏',
							/*lineWidth:2,*/
							yAxis:1,
							threshold:0,
							negativeColor:'green',
							color:'red'
							/*color:'#e3170d',*/
							/*marker:{
								enabled:true,
								symbol:'circle',
								fillColor:'#0b1746',
								radius:5
							}*/
						}]
					});
				}
			})
		},function(err,sta){
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
.controller('actualResController',['$scope','$rootScope','$filter','$http','constantUrl','$cookieStore','myStrategysValue','$q',function($scope,$rootScope,$filter,$http,constantUrl,$cookieStore,myStrategysValue,$q){
	$scope.closeModal=function(){
		$('.analyse-modal-big').hide();
	}
	var chartData1=[];
	$scope.makeChart=function(){
		draw();
		function  draw(){
			if (/{/.test($scope.analyseData)) {
				chartData1=angular.fromJson($scope.analyseData);
			}else{
				var csvArr=($scope.analyseData).split('format: symbol, price, volume, pos, trans_type, time');
				var csvArr1=csvArr[1].replace(/\s/g,'');
				var csvArr2=(csvArr1.replace(/IF/g,' IF')).split(' ');
				angular.forEach(csvArr2,function(data,index){
					if (index==0) return;
					var arr=data.split(",");
					arr[5]=(arr[5]).replace(/(\d{4}-\d{2}-\d{2})(\d{2}:\d{2}:\d{2}\.\d{6})/,"$1 $2");
					chartData1.push({
						"name":csvArr[0],
				        "price": Number(arr[1]),
				        "time": (new Date(arr[5])).getTime(),
				        "pos":  Number(arr[3]),
				        "volume":Number(arr[2]),
				        "trans_type":  arr[4],
				        "symbol":  arr[0]
					})
				})
				//console.log(chartData1);
			}
			var chartJsonData;
			var chartJsonDataArr=[];
			var chartArr=[];
			var indexShortArr=[];
			var indexBuyArr=[];
			$scope.analyseSymbol=" "+chartData1[0].symbol+' '+chartData1[0].name;
			angular.forEach(chartData1,function(data,index){
				if (index==0&&((data.trans_type=="cover")||(data.trans_type=="sell")))
					return;
				if (index==chartData1.length-1) return;
				if ((data.trans_type=="cover")||(data.trans_type=="sell")) return;
				if (data.trans_type=="short") {
					outer:
					for(var i=0;i<chartData1.length;i++){
						if (chartData1[i].trans_type=="cover") {
							if (indexShortArr.length!=0) {
								inter:
								for(var j=0;j<indexShortArr.length;j++){
									if (indexShortArr[j]==i) {
										break inter;
									}else if((j==indexShortArr.length-1)&&(indexShortArr[j]!=i)){
										chartArr.push({
											"volume":data.volume,
											"direction":data.pos,
											"Earn":$filter('number')(chartData1[i].price-data.price,2),
											"openprice":data.price,
											"closeprice":chartData1[i].price,
											"opentime":data.datetime,
											"closetime":chartData1[i].datetime,
											"present":chartData1[i].price,
											"name":data.name,
											"symbol":data.symbol
										});
										indexShortArr.push(i);
										break outer;
									}
								}
							}else{
								chartArr.push({
									"volume":data.volume,
									"direction":-1,
									"Earn":$filter('number')(chartData1[i].price-data.price,2),
									"openprice":data.price,
									"closeprice":chartData1[i].price,
									"opentime":data.datetime,
									"closetime":chartData1[i].datetime,
									"present":chartData1[i].price,
									"name":data.name,
									"symbol":data.symbol
								});
								indexShortArr.push(i);
								break outer;
							}
						}
					}
				}
				if (data.trans_type=="buy") {
					outer1:
					for(var i=0;i<chartData1.length;i++){
						if (chartData1[i].trans_type=="sell") {
							if (indexShortArr.length!=0) {
								inter1:
								for(var j=0;j<indexShortArr.length;j++){
									if (indexShortArr[j]==i) {
										break inter1;
									}else if((j==indexShortArr.length-1)&&(indexShortArr[j]!=i)){
										chartArr.push({
											"volume":data.volume,
											"direction":1,
											"Earn":$filter('number')(chartData1[i].price-data.price,2),
											"openprice":data.price,
											"closeprice":chartData1[i].price,
											"opentime":data.datetime,
											"closetime":chartData1[i].datetime,
											"present":chartData1[i].price,
											"name":data.name,
											"symbol":data.symbol
										});
										indexShortArr.push(i);
										break outer1;
									}
								}
							}else{
								chartArr.push({
									"volume":data.volume,
									"direction":data.pos,
									"Earn":$filter('number')(chartData1[i].price-data.price,2),
									"openprice":data.price,
									"closeprice":chartData1[i].price,
									"opentime":data.datetime,
									"closetime":chartData1[i].datetime,
									"present":chartData1[i].price,
									"name":data.name,
									"symbol":data.symbol
								});
								indexShortArr.push(i);
								break outer1;
							}
						}
					}
				}
			})
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
			var wealth2=[];
			angular.forEach(chartData1,function(data,index){
				/*if(data.time>1477411200000&&data.time<1477497599000){*/
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
				/*}*/		
			})
			wealth1=$filter('orderBy')(wealth1,'x');
			var wealth = [];
			var buy = [];
			var tradeItem=[];
			var direction;
			var amount=0;
			var total=0;
			var winrate;
			var totalWinrate=0;
			var totalProfit=0;
			var totalRate1=0;
			var totalRate2=0;
			var totalRate3=0;
			var totalRate4=[];
			var yeildAbs;
			var totalpal=0;
			var allTotalpal=0;
			var allTotalyeild=0;
			var prof=0;
			var loss=0;
			angular.forEach(chartArr,function(data,index){
				totalpal=totalpal+Number(data["Earn"]);
				allTotalpal=allTotalpal+Number(data["Earn"]);
				if (data['direction']>0) {
					direction='看多';
				}else{
					direction='看空';
				}
				if(Number(data["Earn"])>0){
					winrate=100;
					yeildAbs=Math.abs((Number(data["Earn"])*100/data['openprice']).toFixed(2));
					prof=prof+Number(data["Earn"])*100/data['openprice'];
				}else{
					winrate=0;
					yeildAbs=Math.abs((Number(data["Earn"])*100/data['closeprice']).toFixed(2));
					loss=loss+Number(data["Earn"])*100/data['openprice'];
				}
				wealth.push({
					"x":data["opentime"],
					"y":Number($filter('number')(parseFloat(totalpal),2)),
					"pal":Number(data["Earn"]),
					"openprice":data['openprice'],
					"closeprice":data['closeprice']
				});	
				buy.push({
					"x":data['opentime'],
					"y":data['direction']
				});
				tradeItem.push({
					"openprice":data['openprice'],
					"closeprice":data['closeprice'],
					"time":$filter('date')(data["opentime"],"yyyy-MM-dd H:mm:ss"),
					"pal":$filter('number')(Number(data["Earn"]),2),
					"totalpal":$filter('number')(totalpal,2),
					'direction':direction,
					'yeild': (Number(data["Earn"])*100/data['openprice']).toFixed(2),
					'winrate':winrate,
					'yeildAbs':yeildAbs,
					'closetime':$filter('date')(data["closetime"],"yyyy-MM-dd H:mm:ss"),
					"opentime":$filter('date')(data["opentime"],"yyyy-MM-dd H:mm:ss")
				});
				totalWinrate=totalWinrate+winrate;
				total=total+Number(data["Earn"])*100/data['openprice'];
				totalRate1=totalRate1+parseFloat(Number(data["Earn"])*100/data['openprice']-0.0492);
				totalRate4.push(yeildAbs);
				allTotalyeild=allTotalyeild+Number((Number(data["Earn"])*100/data['openprice']));
			})
			amount=tradeItem.length;
			$scope.analyseDataArr=tradeItem;
			$scope.annualized_return=parseFloat((Math.pow((1+total/100/amount),252/amount)-1)*100).toFixed(2);
			$scope.average_winrate=parseFloat(totalWinrate/amount).toFixed(2);
			$scope.average_profit=parseFloat(prof/loss).toFixed(2);
			$scope.rate1=parseFloat(totalRate1/amount).toFixed(2);
			angular.forEach(chartArr,function(data,index){
				totalRate2=totalRate2+parseFloat(Math.pow(parseFloat((Number(data["Earn"])*100/data['openprice']-0.0492)-$scope.rate1),2));
			})
			$scope.rate2=Math.sqrt(parseFloat(totalRate2)/amount).toFixed(2);
			$scope.rate3=parseFloat($scope.rate1/$scope.rate2).toFixed(2);
			$scope.rate4=(Math.max.apply(Math,totalRate4)).toFixed(2);
			$scope.allTotalpal=allTotalpal;
			$scope.allTotalyeild=(allTotalyeild).toFixed(2);
			$scope.averTotalyeild=(allTotalyeild/amount).toFixed(4);
			Highcharts.setOptions({
				global: {
				  useUTC: false
				}
			});
			if ($scope.analyseJsonData) {
				chartJsonData=angular.fromJson($scope.analyseJsonData);
				angular.forEach(chartJsonData,function(data,index){
					var parseTime=(new Date(data.datetime.replace('T'," "))).getTime();
					chartJsonDataArr.push({
						"x":parseTime,
						"y":data.close,
						'low':data.low,
						'high':data.high,
						'close':data.close,
						'open':data.open,
						'volume':data.volume
					});
				})
				chartJsonDataArr=$filter('orderBy')(chartJsonDataArr,'x');
				$('#return_map_big_1').highcharts('StockChart', {
					credits: {
	            		enabled: false
	        		},
					exporting:{
						enabled:false
					},
					plotOptions:{
						series:{
							turboThreshold:0
						}
					},
					tooltip : {
						shared : true,
						useHTML : true,
						formatter : function() {
							var s = Highcharts.dateFormat('<span>%Y-%m-%d %H:%M:%S</span>',this.x);
							s += '<br />high:<b class="red">￥'
							+Highcharts.numberFormat(this.points[0].point.high,2)
							+ '</b><br />low:<b class="blue">￥'
							+Highcharts.numberFormat(this.points[0].point.low,2)
							+ '</b><br />close:<b class="green">￥'
							+Highcharts.numberFormat(this.points[0].point.close,2)
							+ '</b><br />open:<b class="font-black">￥'
							+Highcharts.numberFormat(this.points[0].point.open,2)
							+ '</b><br />volume:<b class="orange">笔 '
							+Highcharts.numberFormat(this.points[0].point.volume,2);
							return s;
						},						
						valueDecimals : 2 
					},
					
					legend: {
						enabled:true,
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
						  },  {
							  type: 'minute',
							  count: 30,
							  text: '30m'
						  },{
							  type: 'hour',
							  count: 1,
							  text: '1h'
						  }, {
							  type: 'day',
							  count: 1,
							  text: '1d'
						  },{
							  type: 'week',
							  count: 1,
							  text: '1w'
						  },{
							  type: 'all',
							  text: '所有'
						  }],
						  selected: 5,
						  buttonSpacing:2

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
						lineWidth:2,
						id: 'dataseries',
						},{
						type: 'flags',
						data: wealth1,
						onSeries:"dataseries",
						shape:'circlepin',
						width:30,
						color:'#ff9912',
						fillColor:'transparent',
						style:{
							color:'#333'
						},
						y:20,
						name:'买入/卖出'
					},{
						type: 'flags',
						data: wealth2,
						onSeries:"dataseries",
						shape:'circlepin',
						width:30,
						color:"#4169e1",
						fillColor:'transparent',
						style:{
							color:'#333'
						},
						y:-40,
						name:'建仓/平仓'
					}]
				});
			}else {
				$('#return_map_big_1').highcharts('StockChart', {
					credits: {
	            		enabled: false
	        		},
					exporting:{
						enabled:false
					},
					plotOptions:{
						series:{
							turboThreshold:0
						}
					},
					tooltip : {
						shared : true,
						useHTML : true,
						formatter : function() {
							if (this.points[1].y==1){
								var s = Highcharts.dateFormat('<span>%Y-%m-%d %H:%M:%S</span>',this.x);
								s += '<br />总盈亏:<b class="white-blue">￥'
								+Highcharts.numberFormat(this.y,2)
								+ '</b><br />盈亏:<b class="font-black">￥'
								+this.points[0].point.pal
								+ '</b><br />开仓价:<b class="font-black">￥'
								+this.points[0].point.openprice
								+ '</b><br />平仓价:<b class="font-black">￥'
								+this.points[0].point.closeprice
								+ '</b><br />方向:<span class="red">看多</span>';
								return s;
							}else if(this.points[1].y==-1){
								var s = Highcharts.dateFormat('<span>%Y-%m-%d %H:%M:%S</span>',this.x);
								s += '<br />总盈亏:<b class="white-blue">￥'
								+this.y
								+ '</b><br />盈亏:<b class="font-black">￥'
								+this.points[0].point.pal
								+ '</b><br />开仓价:<b class="font-black">￥'
								+this.points[0].point.openprice
								+ '</b><br />平仓价:<b class="font-black">￥'
								+this.points[0].point.closeprice
								+ '</b><br />方向:<span class="green">看空</span>';
								return s;
							}
						},						
						valueDecimals : 2 
					},
					
					legend: {
						enabled:true,
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
						  },  {
							  type: 'minute',
							  count: 30,
							  text: '30m'
						  },{
							  type: 'hour',
							  count: 1,
							  text: '1h'
						  }, {
							  type: 'day',
							  count: 1,
							  text: '1d'
						  },{
							  type: 'week',
							  count: 1,
							  text: '1w'
						  },{
							  type: 'all',
							  text: '所有'
						  }],
						  selected: 5,
						  buttonSpacing:2

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
						opposite:true,
						top: '65%',
						height: '35%',
						offset: 0,
						lineWidth: 1,
					}],
					
					series: [{
						type: 'line',
						name: '总盈亏',
						data: wealth,
						lineWidth:2
					},{
						type: 'column',
						name: '看多/看空',
						data: buy,
						yAxis: 1,
						threshold:0,
						negativeColor:'red',
						color:'green'
					}]
				});
			}
		}
	}
	$scope.myFirmStrategyList=[];
	function getSelect(){
	 	$http.get(constantUrl+"strategys/",{
			headers:{'Authorization':'token '+$cookieStore.get('user').token}
		})
		.success(function(data){
			angular.forEach(data,function(x,y){
				this.push({
					"name":x["name"],
					'_id':x["_id"],
					'status':x["status"],
					'symbol':x["symbol"]
				});
			},$scope.myFirmStrategyList)
		})
	}	
	getSelect();
	$scope.selecteStrategy=function(){
		$http.get(constantUrl+'dates/',{
			params:{
				"date_type":'transaction',
				"sty_id":$scope.myFirmStrategy._id
			},
			headers:{'Authorization':'token '+$cookieStore.get('user').token}	
		})
		.success(function(data){
			$scope.myFirmDateList=data;
		})
		.error(function(err,sta){
			if (sta==400) {
				Showbo.Msg.alert('没有数据');
			}
		});

	}
	/*function getSelect(){
		var defer=$q.defer();
	 	$http.get(constantUrl+"strategys/",{
			headers:{'Authorization':'token '+$cookieStore.get('user').token}
		})
		.success(function(data){
			angular.forEach(data,function(x,y){
				myStrategysValue.push({
					"name":x["name"],
					'_id':x["_id"],
					'status':x["status"]
				});
			})
			defer.resolve(myStrategysValue);
		})
		return defer.promise;
	}	
	getSelect().then(function(d){
		$scope.myFirmStrategyList=d;
		$scope.$watch("myFirmStrategy",function(newValue,oldValue,scope){
			if((newValue!=oldValue)&&newValue!=null){
				$scope.myFirmDateList=null;
				$http.get(constantUrl+'dates/',{
					params:{
						"date_type":'transaction',
						"sty_id":newValue._id
					},
					headers:{'Authorization':'token '+$cookieStore.get('user').token}	
				})
				.success(function(data){
					////console.log(data);
					//var arr=[];
					//angular.forEach(data,function(info,index){
					//	var num=((new Date(info[1])).getTime()-(new Date(info[0])).getTime())/(24*3600000);
					//	for(var i=0;i<num;i++){
					//		var time=(new Date(info[0])).getTime()+(24*3600000)*i;
					//		arr.push($filter('date')(time,"yyyy-MM-dd"));
					//	}
					//})
					$scope.myFirmDateList=data;
				})
				.error(function(err,sta){
					if (sta==400) {
						Showbo.Msg.alert('没有数据');
					}
				});
			}	
		})
	})*/

	$scope.makeChart1=function(){
		var mydate=$filter('date')(new Date((new Date($scope.myFirmDate_end)).setDate((new Date($scope.myFirmDate_end)).getDate()+1)),'yyyy-MM-dd');
		function getFirmTime(){
			var defer1=$q.defer();
			$http.get(constantUrl+'transactions/',{
				params:{
					"sty_id":$scope.myFirmStrategy._id,
					"start":$scope.myFirmDate,
					"end":mydate
				},
				headers:{'Authorization':'token '+$cookieStore.get('user').token}
			})
			.success(function(data){
				defer1.resolve(data);
			})
			.error(function(err,sta){
				defer1.reject(err);
			})
			return defer1.promise;
		};
		function getTransTime(){
			var defer2=$q.defer();
			$http.get(constantUrl+'datas/',{
				params:{
					"type":'bar',
					"start":$scope.myFirmDate,
					"end":mydate
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
		};
		getFirmTime().then(function(data){
			var chartData1=data;
			//console.log(data);
			getTransTime().then(function(data){
				var	chartJsonData=data;
				//console.log(data);
				$scope.analyse_title={
					'time':$filter('date')($scope.myFirmDate,'yyyy-MM-dd'),
					'name':$scope.myFirmStrategy.name,
					'symbol':$scope.myFirmStrategy.symbol
				}
				draws();
				function  draws(){
					/*$('#return_mapping_1').css('display','block').siblings().css('display','none');*/
					var chartJsonDataArr=[];
					var chartArr=[];
					var indexShortArr=[];
					var indexBuyArr=[];
					var buySellNum=0;
					var buyYArr=[];
					var shortYArr=[];
					$scope.highstockAnalyseanalyseSymbol=chartData1[0].symbol+' '+chartData1[0].name;
					angular.forEach(chartData1,function(data,index){
						if (index==0&&((data.trans_type=="cover")||(data.trans_type=="sell")))
							return;
						if (index==chartData1.length-1) return;
						if ((data.trans_type=="cover")||(data.trans_type=="sell")) return;
						if (data.trans_type=="short") {
							
							outer:
							for(var i=0;i<chartData1.length;i++){
								if (chartData1[i].trans_type=="cover") {
									if (indexShortArr.length!=0) {
										inter:
										for(var j=0;j<indexShortArr.length;j++){
											if (indexShortArr[j]==i) {
												break inter;
											}else if((j==indexShortArr.length-1)&&(indexShortArr[j]!=i)){
												buySellNum++;
												buyYArr.push({
													"short":"short",
													"text":'时间：'+$filter('date')(data.datetime,'yyyy-MM-dd H:mm:ss')+'<br>成交价：￥'+data.price+'<br>成交量：'+data.volume,
													"volume":data.volume,
													"pos":data.pos,
													"price":data.price,
													"x":data.datetime,
													"name":data.name,
													"symbol":data.symbol,
													"title":data.trans_type+' '+buySellNum
												})
												chartArr.push({

													"x":chartData1[i].datetime,
													"y":Number($filter('number')(data.price-chartData1[i].price,2)),
													"volume":data.volume,
													"direction":data.pos,
													"Earn":Number($filter('number')(data.price-chartData1[i].price,2)),
													"openprice":data.price,
													"closeprice":chartData1[i].price,
													"opentime":data.datetime,
													"closetime":chartData1[i].datetime,
													"present":chartData1[i].price,
													"name":data.name,
													"symbol":data.symbol
												});

												buyYArr.push({
													"short":"short",
													"text":'时间：'+$filter('date')(chartData1[i].datetime,'yyyy-MM-dd H:mm:ss')+'<br>成交价：￥'+chartData1[i].price
													+'<br>成交量：'+chartData1[i].volume,
													"volume":chartData1[i].volume,
													"pos":chartData1[i].pos,
													"price":chartData1[i].price,
													"x":chartData1[i].datetime,
													"name":chartData1[i].name,
													"symbol":chartData1[i].symbol,
													"title":chartData1[i].trans_type+' '+buySellNum
												})
												indexShortArr.push(i);
												break outer;
											}
										}
									}else{
										buySellNum++;
										buyYArr.push({
											"short":"short",
											"text":'时间：'+$filter('date')(data.datetime,'yyyy-MM-dd H:mm:ss')+'<br>成交价：￥'+data.price+'<br>成交量：'+data.volume,
											"volume":data.volume,
											"pos":data.pos,
											"price":data.price,
											"x":data.datetime,
											"name":data.name,
											"symbol":data.symbol,
											"title":data.trans_type+' '+buySellNum
										})
										chartArr.push({

											"x":chartData1[i].datetime,
											"y":Number($filter('number')(data.price-chartData1[i].price,2)),
											"volume":data.volume,
											"direction":-1,
											"Earn":Number($filter('number')(data.price-chartData1[i].price,2)),
											"openprice":data.price,
											"closeprice":chartData1[i].price,
											"opentime":data.datetime,
											"closetime":chartData1[i].datetime,
											"present":chartData1[i].price,
											"name":data.name,
											"symbol":data.symbol
										});
										buyYArr.push({
											"short":"short",
											"text":'时间：'+$filter('date')(chartData1[i].datetime,'yyyy-MM-dd H:mm:ss')+'<br>成交价：￥'+chartData1[i].price+'<br>成交量：'+chartData1[i].volume,
											"volume":chartData1[i].volume,
											"pos":chartData1[i].pos,
											"price":chartData1[i].price,
											"x":chartData1[i].datetime,
											"name":chartData1[i].name,
											"symbol":chartData1[i].symbol,
											"title":chartData1[i].trans_type+' '+buySellNum
										})
										indexShortArr.push(i);
										break outer;
									}
								}
							}
						}
						if (data.trans_type=="buy") {
							
							outer1:
							for(var i=0;i<chartData1.length;i++){
								if (chartData1[i].trans_type=="sell") {
									if (indexShortArr.length!=0) {
										inter1:
										for(var j=0;j<indexShortArr.length;j++){
											if (indexShortArr[j]==i) {
												break inter1;
											}else if((j==indexShortArr.length-1)&&(indexShortArr[j]!=i)){
												buySellNum++;
												shortYArr.push({
													"buy":'buy',
													"text":'时间：'+$filter('date')(data.datetime,'yyyy-MM-dd H:mm:ss')+'<br>成交价：￥'+data.price+'<br>成交量：'+data.volume,
													"volume":data.volume,
													"pos":data.pos,
													"price":data.price,
													"x":data.datetime,
													"name":data.name,
													"symbol":data.symbol,
													"title":data.trans_type+' '+buySellNum
												})
												chartArr.push({

													"x":chartData1[i].datetime,
													"y":Number($filter('number')(chartData1[i].price-data.price,2)),
													"volume":data.volume,
													"direction":1,
													"Earn":Number($filter('number')(chartData1[i].price-data.price,2)),
													"openprice":data.price,
													"closeprice":chartData1[i].price,
													"opentime":data.datetime,
													"closetime":chartData1[i].datetime,
													"present":chartData1[i].price,
													"name":data.name,
													"symbol":data.symbol
												});
												shortYArr.push({
													"buy":'buy',
													"text":'时间：'+$filter('date')(chartData1[i].datetime,'yyyy-MM-dd H:mm:ss')+'<br>成交价：￥'+chartData1[i].price+'<br>成交量：'+chartData1[i].volume,
													"volume":chartData1[i].volume,
													"pos":chartData1[i].pos,
													"price":chartData1[i].price,
													"x":chartData1[i].datetime,
													"name":chartData1[i].name,
													"symbol":chartData1[i].symbol,
													"title":chartData1[i].trans_type+' '+buySellNum
												})
												indexShortArr.push(i);
												break outer1;
											}
										}
									}else{
										buySellNum++;
										shortYArr.push({
											"buy":'buy',
											"text":'时间：'+$filter('date')(data.datetime,'yyyy-MM-dd H:mm:ss')+'<br>成交价：￥'+data.price+'<br>成交量：'+data.volume,
											"volume":data.volume,
											"pos":data.pos,
											"price":data.price,
											"x":data.datetime,
											"name":data.name,
											"symbol":data.symbol,
											"title":data.trans_type+' '+buySellNum
										})
										chartArr.push({

											"x":chartData1[i].datetime,
											"y":Number($filter('number')(chartData1[i].price-data.price,2)),
											"volume":data.volume,
											"direction":data.pos,
											"Earn":Number($filter('number')(chartData1[i].price-data.price,2)),
											"openprice":data.price,
											"closeprice":chartData1[i].price,
											"opentime":data.datetime,
											"closetime":chartData1[i].datetime,
											"present":chartData1[i].price,
											"name":data.name,
											"symbol":data.symbol
										});
										shortYArr.push({
											"buy":'buy',
											"text":'时间：'+$filter('date')(chartData1[i].datetime,'yyyy-MM-dd H:mm:ss')+'<br>成交价：￥'+chartData1[i].price+'<br>成交量：'+chartData1[i].volume,
											"volume":chartData1[i].volume,
											"pos":chartData1[i].pos,
											"price":chartData1[i].price,
											"x":chartData1[i].datetime,
											"name":chartData1[i].name,
											"symbol":chartData1[i].symbol,
											"title":chartData1[i].trans_type+' '+buySellNum
										})
										indexShortArr.push(i);
										break outer1;
									}
								}
							}
						}
					})
					/*console.log(chartArr);
					console.log($filter('date')(1477897077000,'yyyy-MM-dd H:mm:ss'));*/
					shortYArr=$filter('orderBy')(shortYArr,'x');
					buyYArr=$filter('orderBy')(buyYArr,'x');
					chartArr=$filter('orderBy')(chartArr,'x');
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
					var tradeItem=[];
					var direction;
					var amount=0;
					var total=0;
					var winrate;
					var totalWinrate=0;
					var totalProfit=0;
					var totalRate1=0;
					var totalRate2=0;
					var totalRate3=0;
					var totalRate4=[];
					var yeildAbs;
					var totalpal=0;
					var allTotalpal=0;
					var allTotalyeild=0;
					var prof=0;
					var loss=0;
					angular.forEach(chartArr,function(data,index){
						totalpal=totalpal+Number(data["Earn"]);
						allTotalpal=allTotalpal+Number(data["Earn"]);
						if (data['direction']>0) {
							direction='看多';
						}else{
							direction='看空';
						}
						if(Number(data["Earn"])>0){
							winrate=100;
							yeildAbs=Math.abs((Number(data["Earn"])*100/data['openprice']).toFixed(2));
							prof=prof+Number(data["Earn"])*100/data['openprice'];
						}else{
							winrate=0;
							yeildAbs=Math.abs((Number(data["Earn"])*100/data['closeprice']).toFixed(2));
							loss=loss+Number(data["Earn"])*100/data['openprice'];
						}
						wealth.push({
							"x":data["opentime"],
							"y":Number($filter('number')(parseFloat(totalpal),2)),
							"pal":Number(data["Earn"]),
							"openprice":data['openprice'],
							"closeprice":data['closeprice']
						});	
						buy.push({
							"x":data['opentime'],
							"y":data['direction']
						});
						tradeItem.push({
							"openprice":data['openprice'],
							"closeprice":data['closeprice'],
							"time":$filter('date')(data["opentime"],"yyyy-MM-dd H:mm:ss"),
							"pal":$filter('number')(Number(data["Earn"]),2),
							"totalpal":$filter('number')(totalpal,2),
							'direction':direction,
							'yeild': (Number(data["Earn"])*100/data['openprice']).toFixed(2),
							'winrate':winrate,
							'yeildAbs':yeildAbs,
							'closetime':$filter('date')(data["closetime"],"yyyy-MM-dd H:mm:ss"),
							"opentime":$filter('date')(data["opentime"],"yyyy-MM-dd H:mm:ss")
						});
						totalWinrate=totalWinrate+winrate;
						total=total+Number(data["Earn"])*100/data['openprice'];
						totalRate1=totalRate1+parseFloat(Number(data["Earn"])*100/data['openprice']-0.0492);
						totalRate4.push(yeildAbs);
						allTotalyeild=allTotalyeild+Number((Number(data["Earn"])*100/data['openprice']));
					})
					amount=tradeItem.length;
					$scope.analyseDataArr=tradeItem;
					$scope.annualized_return=parseFloat((Math.pow((1+total/100/amount),252/amount)-1)*100).toFixed(2);
					$scope.average_winrate=parseFloat(totalWinrate/amount).toFixed(2);
					$scope.average_profit=parseFloat(prof/loss).toFixed(2);
					$scope.rate1=parseFloat(totalRate1/amount).toFixed(2);
					angular.forEach(chartArr,function(data,index){
						totalRate2=totalRate2+parseFloat(Math.pow(parseFloat((Number(data["Earn"])*100/data['openprice']-0.0492)-$scope.rate1),2));
					})
					$scope.rate2=Math.sqrt(parseFloat(totalRate2)/amount).toFixed(2);
					$scope.rate3=parseFloat($scope.rate1/$scope.rate2).toFixed(2);
					$scope.rate4=(Math.max.apply(Math,totalRate4)).toFixed(2);
					$scope.allTotalpal=allTotalpal;
					$scope.allTotalyeild=(allTotalyeild).toFixed(2);
					$scope.averTotalyeild=(allTotalyeild/amount).toFixed(4);
					Highcharts.setOptions({
						global: {
						  useUTC: false
						}
					});
					
					/*chartJsonData=angular.fromJson($scope.analyseJsonData);*/
					angular.forEach(chartJsonData,function(data,index){
						/*var parseTime=(new Date(data.datetime.replace('T'," "))).getTime();*/
						chartJsonDataArr.push({
							"x":data.datetime,
							"y":data.close,
							'low':data.low,
							'high':data.high,
							'close':data.close,
							'open':data.open,
							'volume':data.volume
						});
					})
					chartJsonDataArr=$filter('orderBy')(chartJsonDataArr,'x');
					$('#return_map_big_1').highcharts('StockChart', {
						credits: {
			        		enabled: false
			    		},
						exporting:{
							enabled:false
						},
						plotOptions:{
							series:{
								turboThreshold:0
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
						tooltip:{
							useHTML:true,
							xDateFormat:"%Y-%m-%d %H:%M:%S",
							valueDecimals:2
						},
						legend: {
							enabled:true,
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
							  },  {
								  type: 'minute',
								  count: 30,
								  text: '30m'
							  },{
								  type: 'hour',
								  count: 1,
								  text: '1h'
							  }, {
								  type: 'day',
								  count: 1,
								  text: '1d'
							  },{
								  type: 'week',
								  count: 1,
								  text: '1w'
							  },{
								  type: 'all',
								  text: '所有'
							  }],
							  selected: 5,
							  buttonSpacing:2

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
							height:'60%'
							},{
							labels:{
								align:'right',
								x:-3
							},
							title:{
								text:'盈亏'
							},
							opposite:true,
							offset:0,
							height:'35%',
							top:'65%'
						}],
						series: [{
							type: 'line',
							name: '股价',
							data: chartJsonDataArr,
							lineWidth:2,
							id: 'dataseries'
							},{
							type: 'flags',
							data: buyYArr,
							onSeries:"dataseries",
							shape:'squarepin',
							width:36,
							color:'#ff9912',
							fillColor:'transparent',
							style:{
								color:'#333'
							},
							y:30,
							name:'买入/卖出',
						},{
							type: 'flags',
							data: shortYArr,
							onSeries:"dataseries",
							shape:'squarepin',
							width:36,
							color:"#4169e1",
							fillColor:'transparent',
							style:{
								color:'#333'
							},
							y:-50,
							name:'建仓/平仓',
						},{
							type:'column',
							data:chartArr,
							name:'盈亏',
							/*lineWidth:2,*/
							yAxis:1,
							threshold:0,
							negativeColor:'green',
							color:'red'
							/*color:'#e3170d',*/
							/*marker:{
								enabled:true,
								symbol:'circle',
								fillColor:'#0b1746',
								radius:5
							}*/
						}]
					});
				}
			})
		})
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
.controller('complieController',['$scope','$rootScope','$http','$location','$cookies','$cookieStore','constantUrl',function($scope,$rootScope,$http,$location,$cookies,$cookieStore,constantUrl){

}])
.controller('modalResController',['$scope','$rootScope','$http','$location','$cookies','$cookieStore','constantUrl',function($scope,$rootScope,$http,$location,$cookies,$cookieStore,constantUrl){
	$scope.modalResObjList1=[
	{
		"title":123,
		"text":'aaaaa'
	},{
		"title":123,
		"text":'aaaaa'
	},{
		"title":123,
		"text":'aaaaa'
	},{
		"title":123,
		"text":'aaaaa'
	},{
		"title":123,
		"text":'aaaaa'
	},{
		"title":123,
		"text":'aaaaa'
	},{
		"title":123,
		"text":'aaaaa'
	},{
		"title":123,
		"text":'aaaaa'
	}];
	$scope.modalResObjList2=[
	{
		"title":123,
		"text":'aaaaa'
	},{
		"title":123,
		"text":'aaaaa'
	},{
		"title":123,
		"text":'aaaaa'
	},{
		"title":123,
		"text":'aaaaa'
	},{
		"title":123,
		"text":'aaaaa'
	},{
		"title":123,
		"text":'aaaaa'
	},{
		"title":123,
		"text":'aaaaa'
	},{
		"title":123,
		"text":'aaaaa'
	},
	{
		"title":123,
		"text":'aaaaa'
	},{
		"title":123,
		"text":'aaaaa'
	}];
	$scope.modalResObjList3=[
	{
		"title":123,
		"text":'aaaaa'
	},{
		"title":123,
		"text":'aaaaa'
	},{
		"title":123,
		"text":'aaaaa'
	},{
		"title":123,
		"text":'aaaaa'
	}];
	$scope.modalResObjList4=[
	{
		"title":123,
		"text":'aaaaa'
	},{
		"title":123,
		"text":'aaaaa'
	},{
		"title":123,
		"text":'aaaaa'
	},{
		"title":123,
		"text":'aaaaa'
	}];
}])
.directive('slideupDown',function(){
	return{
		restrict:'AE',
		link:function(scope,ele,attr){
			ele.on('click','p',function(){
				ele.nextAll().slideToggle();
			})
		}
	}
})
.directive('fileModel', ['$parse', function ($parse) {
    return {
	        restrict: 'A',
	        link: function(scope, element, attrs) {
	            var model = $parse(attrs.fileModel);
	            var modelSetter = model.assign;
            
	        element.bind('change', function(){
	               scope.$apply(function(){
	            	   modelSetter(scope, element[0].files[0]);
                	});
	               
            	});
        	}
    	};
}])
.directive('ensureNameunique',function($http,constantUrl){
	return{
		require: 'ngModel',
		link:function(scope,ele,attrs,ngModelCtrl){
			
			ngModelCtrl.$parsers.push(function(val){
				
				if(!val){
					return;
				}
				$http({
					method:'get',
					url : constantUrl+'users/'+val+'/'
				}).success(function(data,sta){
					if(sta==200){
						ngModelCtrl.$setValidity('usernameAvi',false);
					}
				}).error(function(err,sta){
					if(sta==404){
						ngModelCtrl.$setValidity('usernameAvi',true);
					}
				})
				return val;
			})
		}
	}
})
.directive('slideToggle',function(){
	return {
		link:function(scope,ele,attrs){
			ele.on('click',function(){
				ele.nextAll().slideToggle();
			})
		}
	}
})
.directive('sourcingTable',function($route,$location,$http,constantUrl,$cookieStore,strategysValue){
	return {
		link:function(scope,ele,attrs){
			ele.on('click','.firm-add',function(){
				$('.firm-mask').fadeIn();

				strategysValue.id=$(this).closest('tr').children().eq(0).text();
				strategysValue.author=$(this).closest('tr').children().eq(3).text();
				//console.log(strategysValue);
			});
			ele.on('click','.his-add',function(){
				$('.his-mask').fadeIn();

				strategysValue.id=$(this).closest('tr').children().eq(0).text();
				//console.log(strategysValue);
			});
			ele.on('click','.sour-del',function(){
				var url=$(this).closest('tr').children().eq(0).text();
				$http.delete(constantUrl+"classs/"+url+'/',{
					headers:{'Authorization':'token '+$cookieStore.get('user').token}
				})
				.success(function(){
					/*$route.reload();*/
					scope.getSourcingStrategys();
					Showbo.Msg.alert('删除成功。')
				})
				.error(function(err,sta){
					Showbo.Msg.alert('删除失败，请稍后再试。')
				});

			});
		}
	}
})
.directive('strategyTable',function($route,$location,$http,constantUrl,$cookieStore){
	return {
		link:function(scope,ele,attrs){
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
			ele.on('click','.strategy-start',function(){
				var url=$(this).closest('tr').children().eq(0).text();
				$http.patch(constantUrl+"strategys/"+url+'/',{status:1},{
					headers:{'Authorization':'token '+$cookieStore.get('user').token}
				})
				.success(function(){
					/*$route.reload();*/
					scope.getFirmStrategys();
					
				})
				.error(function(err,sta){
					Showbo.Msg.alert('启动失败，请稍后再试。')
				});
			});
			ele.on('click','.strategy-pause',function(){
				var url=$(this).closest('tr').children().eq(0).text();
				$http.patch(constantUrl+"strategys/"+url+'/',{status:2},{
					headers:{'Authorization':'token '+$cookieStore.get('user').token}
				})
				.success(function(){
					/*$route.reload();*/
					scope.getFirmStrategys();
					
				})
				.error(function(err,sta){
					Showbo.Msg.alert('暂停失败，请稍后再试。')
				});
			});
			ele.on('click','.strategy-del',function(){
				var url=$(this).closest('tr').children().eq(0).text();
				$http.delete(constantUrl+"strategys/"+url+'/',{
					headers:{'Authorization':'token '+$cookieStore.get('user').token}
				})
				.success(function(){
					/*$route.reload();*/
					scope.allStrategys=[];
					scope.getFirmStrategys();
					scope.getHisStrategys();
					Showbo.Msg.alert('删除成功。')
				})
				.error(function(err,sta){
					console.log(err,sta);
					if(sta==400){
						$http.delete(constantUrl+"btstrategys/"+url+'/',{
							headers:{'Authorization':'token '+$cookieStore.get('user').token}
						})
						.success(function(){
							/*$route.reload();*/
							scope.allStrategys=[];
							scope.getFirmStrategys();
							scope.getHisStrategys();
							Showbo.Msg.alert('删除成功。')
						})
						.error(function(err,sta){
							Showbo.Msg.alert('删除失败，请稍后再试。')
						});
					}	
				});
			})
		}
	}
})
.directive('hisTable',function($route,$location,$http,constantUrl,$cookieStore){
	return {
		link:function(scope,ele,attrs){
			ele.on('click','.strategy-pause',function(){
				var url=$(this).closest('tr').children().eq(0).text();
				$http.patch(constantUrl+"btstrategys/"+url+'/',{status:2},{
					headers:{'Authorization':'token '+$cookieStore.get('user').token}
				})
				.success(function(){
					scope.getHisStrategys();
					
				})
				.error(function(err,sta){
					Showbo.Msg.alert('暂停失败，请稍后再试。')
				});
			});
			ele.on('click','.strategy-del',function(){
				var url=$(this).closest('tr').children().eq(0).text();
				$http.delete(constantUrl+"btstrategys/"+url+'/',{
					headers:{'Authorization':'token '+$cookieStore.get('user').token}
				})
				.success(function(){
					/*$route.reload();*/
					scope.getHisStrategys();
					Showbo.Msg.alert('删除成功。')
				})
				.error(function(err,sta){
					Showbo.Msg.alert('删除失败，请稍后再试。')
				});
			})
		}
	}
})
.directive('tooltip',function(){
	return {
		link:function(scope,ele,attrs){
			$("[data-toggle='tooltip']").tooltip();
		}
	}
})
.directive('moveBox',function(){
	return{
		link:function(scope,ele,attrs){
			ele.on('mouseenter','a',function(){
				var num=$(this).parent().index();
				var dist=ele.children('li').width();
				var dis=(num+0.1)*dist+'px';
				$('#move-box').stop(true);
				$('#move-box').addClass('infinite');
				$('#move-box').animate({
					left:dis
				},500,'easeOutExpo',function(){
					$('#move-box').removeClass('infinite');
				})
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
.directive('mouseShow',function(){
	return{
		link:function(scope,ele,attrs){
			ele.on('mouseenter',function(){
				ele.children('.list-group').fadeIn();
			});
			ele.on('mouseleave',function(){
				setTimeout(function(){
					ele.children('.list-group').fadeOut(100);
				},1000)
				
			});
		}
	}
})
.directive('newName',function(){
	return{
		link:function(scope,ele,attrs){
			ele.on('click',function(){
				$(this).hide();
				ele.siblings('input').slideDown(function(){
					ele.siblings('input').focus();
				});
			})
			ele.siblings('input').on('blur',function(){
				ele.show();
				ele.siblings('input').hide();
			})
		}
	}
})
.directive('box',function(){
	return {
		restrict:'E',
		replace:'true',
		scope:{
			mydata:'='
		},
		templateUrl:'tpls/modalResTemp.html',
		link:function(scope,ele,attr){
			ele.on('mouseenter mouseover mouseout',function(ev){
				 if(ev.type=='mouseenter'||ev.type=='mouseover') {
					ele.find('.modalRes-box-top').addClass('w100');
					ele.find('.modalRes-box-right').addClass('h100');
					ele.find('.modalRes-box-bottom').addClass('w100');
					ele.find('.modalRes-box-left').addClass('h100');
				}else if(ev.type=='mouseout'){
					ele.find('.modalRes-box-top').removeClass('w100');
					ele.find('.modalRes-box-right').removeClass('h100');
					ele.find('.modalRes-box-bottom').removeClass('w100');
					ele.find('.modalRes-box-left').removeClass('h100');
				}
				ev.stopPropagation();
			})
		}
	}
})
/*.directive('ensureEmailunique',function($http,constantUrl){
	return{
		require: 'ngModel',
		link:function(scope,ele,attrs,ngModelCtrl){
			
			ngModelCtrl.$parsers.push(function(val){
				
				$http({
					method:'POST',
					url : constantUrl+'users/'+val
				}).success(function(data){
					//console.log(data);
					if(data){
						ngModelCtrl.$setValidity('useremailAvi',false);
					
					}else{
						ngModelCtrl.$setValidity('useremailAvi',true);
			
					}
					
				});
				return val;
			})
		}
	}
})*/