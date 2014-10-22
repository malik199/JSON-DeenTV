(function() {
	var myApp = angular.module('myApp',['truncate']);
	myApp.controller('myBusStopCtrl', ['$scope', '$http', function ($scope, $http) {
	   
		$scope.realTimeData;
		var url = "http://deen.tv/?json=get_category_posts&slug=featured&count=20&status=publish&page=1";
		url += "&callback=JSON_CALLBACK"
		$http.jsonp(url).success(function(data){
				$scope.realTimeData = data.posts;
				console.log(data.found);
				
			}).error(function(data) {
			  //alert("saf");
			  console.log("asdfad");
			});
	
	}]);
	
	//filter HTML
	myApp.filter('unsafe', function($sce) {
		return function(val) {
			return $sce.trustAsHtml(val);
		};	
	});

}());