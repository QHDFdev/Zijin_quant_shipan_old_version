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
	if(($location.url()=='/analyse')||($location.url()=='/complie')){
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
				editor.getSession().setMode("ace/mode/java");
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
		if(($location.url()=='/analyse')||($location.url()=='/complie')){
			$rootScope.isactive=true;
		}
	})

}])
.constant('constantUrl','http://114.55.238.82:81/')
.value('strategysValue',{"id":123,"author":'abc'})
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
		$location.path('/login');
	}
	$scope.complie=function(){
		$location.path('/login');
	}

}])
.controller('studyController',['$scope','strategyResources','strategyResource','$http','$timeout','$cookieStore','constantUrl','$location',function($scope,strategyResourcess,strategyResource,$http,$timeout,$cookieStore,constantUrl,$location){
	$scope.historyRes=function(){
		$location.path('/analyse');
	}
	$scope.actualRes=function(){
		$location.path('/actualRes');
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
		console.log($scope.item);
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
        	console.log(err);
        	console.log(st);
        	Showbo.Msg.alert('添加失败，请稍后再试。');
        })
	}
	$scope.closeMask=function(){
		
		$('.zijin-beta-mask').fadeOut();
	}
}])*/
.controller('tableController',['$scope','strategyResources','strategyResource','$http','$timeout','$cookieStore','constantUrl','strategysValue',function($scope,strategyResourcess,strategyResource,$http,$timeout,$cookieStore,constantUrl,strategysValue){
	$scope.func=function(e){
		return e["status"]!=-3;
	}
	$scope.closeMask=function(){
		$('.zijin-table-mask').fadeOut();
	}
	getSourcingStrategys();
	getFirmStrategys();
	/* 源策略 */
	$scope.openMaskSourcing=function(){
		$('.sourcing-mask').fadeIn();
	}
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
			console.log(data);
			getSourcingStrategys()
			Showbo.Msg.alert('添加成功。');
        })
        .error(function(err,st){
        	console.log(err);
        	console.log(st);
        	$('.zijin-table-mask').fadeOut();
        	Showbo.Msg.alert('添加失败，请稍后再试。');
        })
	}
	function getSourcingStrategys(){
	 $http.get(constantUrl+"classs/",{
			headers:{'Authorization':'token '+$cookieStore.get('user').token}
		})
		.success(function(data){
			$scope.mySourcingStrategy=data;
			console.log(data);
		})
		.error(function(err,sta){
			Showbo.Msg.alert('网络错误，请稍后再试。');
			console.log(err);
			console.log(sta);
		});
	};
	/* 创建实盘模拟 */
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
			console.log(data);
			getFirmStrategys();
			Showbo.Msg.alert('添加成功。');
        })
        .error(function(err,st){
        	console.log(err);
        	console.log(st);
        	$('.zijin-table-mask').fadeOut();
        	Showbo.Msg.alert('添加失败，请稍后再试。');
        })
	}
	function getFirmStrategys(){
	 	$http.get(constantUrl+"strategys/",{
			headers:{'Authorization':'token '+$cookieStore.get('user').token}
		})
		.success(function(data){
			$scope.myStrategy=data;
			console.log(data);
		})
		.error(function(err,sta){
			Showbo.Msg.alert('网络错误，请稍后再试。');
			console.log(err);
			console.log(sta);
		});
	};
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
        	console.log(err);
        	console.log(st);
        	Showbo.Msg.alert('添加失败，请稍后再试。');
        })
	}
	$scope.closeMask=function(){
		
		$('.zijin-table-mask').fadeOut();
	}*/


}])
.controller('userController',['$scope','$rootScope','$http','$location','$cookies','$cookieStore','constantUrl',function($scope,$rootScope,$http,$location,$cookies,$cookieStore,constantUrl){
	$scope.adduser=function(){
		$http.post(constantUrl+'users/',$scope.user)
		.success(function(data){
			Showbo.Msg.alert('注册成功');
			$location.path('/login');
		})
		.error(function(err,sta){
			console.log(err);
			console.log(sta);
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
			console.log($cookieStore.get('user'));
		})
		.error(function(err,sta){
			console.log(err);
			console.log(sta);
			Showbo.Msg.alert('登录失败，请联系管理员。');
		})
	}
}])
.controller('analyseController',['$scope','$rootScope','$filter',function($scope,$rootScope,$filter){
	$scope.makeChart=function(){
		var chartData=angular.fromJson($scope.analyseData);
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
		console.log($scope.analyseData.length);
		if ($scope.analyseData.length>1000) {
			Showbo.Msg.alert("当前数据长度为"+$scope.analyseData.length+"条,可能加载时间过长，请稍等……")
		};
		angular.forEach(chartData,function(data,index){
			if (data['orders']) {
				wealth.push({
					"x":data['orders'][0]["time"],
					"y":data['totalpal'],
					"pal":data["pals"][0],
					"openprice":data['orders'][0]['cose'],
					"closeprice":data['orders'][0]['present']
				});
				buy.push({
					"x":data['orders'][0]["time"],
					"y":data['direction']
				});
				if (data['direction']>0) {
					direction='看多';
				}else{
					direction='看空';
				}
				if(data["pals"][0]>0){
					winrate=100;
					yeildAbs=Math.abs((data["pals"][0]*100/data['orders'][0]['cose']).toFixed(2));
				}else{
					winrate=0;
					yeildAbs=Math.abs((data["pals"][0]*100/data['orders'][0]['present']).toFixed(2));
				}
				tradeItem.push({
					"openprice":$filter('number')(data['orders'][0]['cose'],2),
					"closeprice":$filter('number')(data['orders'][0]['present'],2),
					"time":$filter('date')(data['orders'][0]["time"],"yyyy-MM-dd hh:mm:ss"),
					"pal":$filter('number')(data["pals"][0],2),
					"totalpal":$filter('number')(data['totalpal'],2),
					'direction':direction,
					'yeild': (data["pals"][0]*100/data['orders'][0]['cose']).toFixed(2),
					'winrate':winrate,
					'yeildAbs':yeildAbs
				});
				totalWinrate=totalWinrate+winrate;
				total=total+data["pals"][0]*100/data['orders'][0]['cose'];
				totalRate1=totalRate1+parseFloat(data["pals"][0]*100/data['orders'][0]['cose']-0.0492);
				totalRate4.push(yeildAbs);
			}
		});
		console.log(wealth);
		console.log(buy);
		amount=tradeItem.length;
		$scope.analyseDataArr=tradeItem;
		$scope.annualized_return=parseFloat((Math.pow((1+total/100/amount),252/amount)-1)*100).toFixed(2);
		$scope.average_winrate=parseFloat(totalWinrate/amount).toFixed(2);
		$scope.average_profit=parseFloat(total/amount).toFixed(2);
		$scope.rate1=parseFloat(totalRate1/amount).toFixed(2);
		angular.forEach(chartData,function(data,index){
			totalRate2=totalRate2+parseFloat(Math.pow(parseFloat((data["pals"][0]*100/data['orders'][0]['cose']-0.0492)-$scope.rate1),2));
		})
		$scope.rate2=Math.sqrt(parseFloat(totalRate2)/amount).toFixed(2);
		$scope.rate3=parseFloat($scope.rate1/$scope.rate2).toFixed(2);
		$scope.rate4=(Math.max.apply(Math,totalRate4)).toFixed(2);
		/*Highcharts.setOptions({
			global: {
			  useUTC: false
			}
		});*/
		
		$('#return_map_big').highcharts('StockChart', {
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
				 /* buttons: [  
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
				  }],*/
				  selected: 5,
				 /* buttonSpacing:2,*/
				  inputDateFormat: '%Y-%m-%d'

			},
			/*title: {
				text: ,
				margin:0,
				y:50

			},*/
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
				negativeColor:'green',
				color:'red'
			}]
		});

	}
}])
.controller('actualResController',['$scope','$rootScope','$filter',function($scope,$rootScope,$filter){
	var chartData1=[];
	$scope.makeChart=function(){
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
										"Earn":$filter('number')(chartData1[i].price-chartData1[index].price,2),
										"openprice":chartData1[index].price,
										"closeprice":chartData1[i].price,
										"opentime":chartData1[index].time,
										"closetime":chartData1[i].time,
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
								"Earn":$filter('number')(chartData1[i].price-chartData1[index].price,2),
								"openprice":chartData1[index].price,
								"closeprice":chartData1[i].price,
								"opentime":chartData1[index].time,
								"closetime":chartData1[i].time,
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
										"Earn":$filter('number')(chartData1[i].price-chartData1[index].price,2),
										"openprice":chartData1[index].price,
										"closeprice":chartData1[i].price,
										"opentime":chartData1[index].time,
										"closetime":chartData1[i].time,
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
								"Earn":$filter('number')(chartData1[i].price-chartData1[index].price,2),
								"openprice":chartData1[index].price,
								"closeprice":chartData1[i].price,
								"opentime":chartData1[index].time,
								"closetime":chartData1[i].time,
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
				console.log($filter('date')(data.closetime,'yyyy-MM-dd hh:mm:ss'));
				console.log(data.Earn);
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
			if(data.time>1477411200000&&data.time<1477497599000){
				if(data.trans_type=='short'||data.trans_type=='cover'){
					wealth1.push({
						"x":data["time"],
						"title":data["trans_type"]
					});	
				}else if(data.trans_type=='buy'||data.trans_type=='sell'){
					wealth2.push({
						"x":data["time"],
						"title":data["trans_type"]
					});
				}
			}		
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
		angular.forEach(chartArr,function(data,index){
			totalpal=totalpal+Number(data["Earn"]);
			if (data['direction']>0) {
				direction='看多';
			}else{
				direction='看空';
			}
			if(Number(data["Earn"])>0){
				winrate=100;
				yeildAbs=Math.abs((Number(data["Earn"])*100/data['openprice']).toFixed(2));
			}else{
				winrate=0;
				yeildAbs=Math.abs((Number(data["Earn"])*100/data['closeprice']).toFixed(2));
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
				"time":$filter('date')(data["opentime"],"yyyy-MM-dd hh:mm:ss"),
				"pal":$filter('number')(Number(data["Earn"]),2),
				"totalpal":$filter('number')(totalpal,2),
				'direction':direction,
				'yeild': (Number(data["Earn"])*100/data['openprice']).toFixed(2),
				'winrate':winrate,
				'yeildAbs':yeildAbs
			});
			totalWinrate=totalWinrate+winrate;
			total=total+Number(data["Earn"])*100/data['openprice'];
			totalRate1=totalRate1+parseFloat(Number(data["Earn"])*100/data['openprice']-0.0492);
			totalRate4.push(yeildAbs);
		})
		amount=tradeItem.length;
		$scope.analyseDataArr=tradeItem;
		$scope.annualized_return=parseFloat((Math.pow((1+total/100/amount),252/amount)-1)*100).toFixed(2);
		$scope.average_winrate=parseFloat(totalWinrate/amount).toFixed(2);
		$scope.average_profit=parseFloat(total/amount).toFixed(2);
		$scope.rate1=parseFloat(totalRate1/amount).toFixed(2);
		angular.forEach(chartArr,function(data,index){
			totalRate2=totalRate2+parseFloat(Math.pow(parseFloat((Number(data["Earn"])*100/data['openprice']-0.0492)-$scope.rate1),2));
		})
		$scope.rate2=Math.sqrt(parseFloat(totalRate2)/amount).toFixed(2);
		$scope.rate3=parseFloat($scope.rate1/$scope.rate2).toFixed(2);
		$scope.rate4=(Math.max.apply(Math,totalRate4)).toFixed(2);
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
					color:'#FD2E2E',
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
					color:"rgb(102,153,255)",
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
					negativeColor:'green',
					color:'red'
				}]
			});
		}
	}
}])
.controller('complieController',['$scope','$rootScope','$http','$location','$cookies','$cookieStore','constantUrl',function($scope,$rootScope,$http,$location,$cookies,$cookieStore,constantUrl){

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
				console.log(strategysValue);
			});
			ele.on('click','.sour-del',function(){
				var url=$(this).closest('tr').children().eq(0).text();
				$http.delete(constantUrl+"classs/"+url+'/',{
					headers:{'Authorization':'token '+$cookieStore.get('user').token}
				})
				.success(function(){
					$route.reload();
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
					$route.reload();
					Showbo.Msg.alert('启动成功。')
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
					$route.reload();
					Showbo.Msg.alert('暂停成功。')
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
					$route.reload();
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
				ele.children('.list-group').fadeIn(1);
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
/*.directive('ensureEmailunique',function($http,constantUrl){
	return{
		require: 'ngModel',
		link:function(scope,ele,attrs,ngModelCtrl){
			
			ngModelCtrl.$parsers.push(function(val){
				
				$http({
					method:'POST',
					url : constantUrl+'users/'+val
				}).success(function(data){
					console.log(data);
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