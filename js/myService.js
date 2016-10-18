angular.module('myService',['ngResource'])
	.factory('strategyResources',function($resource){
		return $resource('http://192.241.218.233:8080/api/:id',{id:'@id'},{charge:{
			method:'POST',params:{charge:true},isArray:false
		}})
	})
	.factory('strategyResource',function($q,strategyResources){
		return {
			query:function(cardId){
				var defer=$q.defer();
				strategyResources.get({id:cardId},function(data,hearders){
					defer.resolve(data);
				}),function(data,hearders){
					defer.reject(data);
				};
				return defer.promise
			}
		}
	})
	