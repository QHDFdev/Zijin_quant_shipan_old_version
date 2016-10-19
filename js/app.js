angular.module('myapp',['ngRoute','ngAnimate','ngCookies','ngMessages','ngResource','myService'])
.config(['$routeProvider',function($routeProvider){
	$routeProvider
	.when('/home',{
		templateUrl:'tpls/home.html',
		controller:'homeController'
	})
	.when('/beta',{
		templateUrl:'tpls/beta.html',
		controller:"queryStrategy"
	})
	.when('/login',{
		templateUrl:'tpls/login.html'
	})
	.when('/register',{
		templateUrl:'tpls/register.html'
	})
	.otherwise({
		redirectTo:'/home'
	})
}])
.constant('constantUrl','http://114.55.238.82:81/')
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
}])
.controller('queryStrategy',['$scope','strategyResources','strategyResource','$http','$timeout','$cookieStore','constantUrl',function($scope,strategyResourcess,strategyResource,$http,$timeout,$cookieStore,constantUrl){
	$scope.queryAll=function(){
		$http.get(constantUrl+"api/strategys/",{
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
	 $http.get(constantUrl+"api/strategys/",{
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
		$http.patch(constantUrl+"api/strategys/"+url+'/',{status:0},{
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
		$http.patch(constantUrl+"api/strategys/"+url+'/',{status:1},{
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
		$http.patch(constantUrl+"api/strategys/"+url+'/',{status:2},{
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
		$http.delete(constantUrl+"api/strategys/"+url+'/',{
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
		$('.zijin-beta-mask').fadeIn();
	}
	/*$scope.addStrategy=function(){
		$http.post("http://114.55.238.82:80/api/strategys/",$scope.item).success(function(data){
			console.log(data);
			$('.zijin-beta-mask').fadeOut();
			$scope.queryAll();
		}).error(function(){
			console.log(1);
		})
	}*/

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
        $http.post(constantUrl+"api/strategys/",formdata,{
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
			console.log($rootScope.user);
		})
		.error(function(err,sta){
			console.log(err);
			console.log(sta);
			Showbo.Msg.alert('登录失败，请联系管理员。');
		})
	}
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