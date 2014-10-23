(function() {
	var myApp = angular.module('myApp',['truncate']);
	myApp.controller('DeenTv_Controller', ['$scope', '$http', function ($scope, $http) {
	   
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
		$scope.playvideo = function(currentItem){
			if(currentItem.custom_fields.dp_video_code){
				var str = currentItem.custom_fields.dp_video_code.toString();
				var str = str.replace('<script type="text/javascript" src="http://content.jwplatform.com/players/', '');
				var justtheid = str.replace('-xHSncDUr.js"></script>', '');
				$("#ytplayer").html('<iframe src="http://content.jwplatform.com/players/'+justtheid+'-xHSncDUr.html" width="480" height="270" frameborder="0" scrolling="auto"></iframe>');
			}else{
				$("#ytplayer").html('<iframe width="560" height="315" src="//www.youtube.com/embed/'+currentItem.custom_fields.youtube_id+'?autoplay=1" frameborder="0" allowfullscreen></iframe>');
			}
			$.mobile.navigate( "#watch" );
		};
	}]);
	
	//filter HTML
	myApp.filter('unsafe', function($sce) {
		return function(val) {
			return $sce.trustAsHtml(val);
		};	
	});

}());