
/*
 var myNameSpace = angular.module('myApp', []);
 myNameSpace.controller('Controller', function($scope){
                        $scope.authors = {
                        'name' : 'Malik 1',
                        'title' : 'UI Developer',
                        'company' : 'DeenTV'
						 }
                        
});
 
app.controller("FetchJSON", ['$http', function($http) {
  $http.get('http://deen.tv/?json=get_category_posts&slug=featured&count=10&status=publish&page=1');
  
  }];
});

myNameSpace.controller("FetchJSON", function FetchJSON($scope, $http) {
	$http.get('js/info.json').success(function(data) {
		$scope.channel = data;
	});
});
 
 
 
//

 var myNameSpace = angular.module('myApp', []);
 myNameSpace.controller('Controller', function($scope, $http){
	 $http.get('js/info.json').success(function(data){
		 //$scope.artists = data;
		 //alert(data);
	 });
 });
 
*/

/*
myApp.controller("PostsCtrl", function($scope, $http) {
  $http.jsonp('http://coinabul.com/api.php?callback=JSON_CALLBACK').
    success(function(data, status, headers, config) {
	  $scope.posts = data;
    }).
    error(function(data, status, headers, config) {
      alert("asfa")
	});
});

myApp.controller('JSONController', ['$scope','$http', function($scope, $http) { 
   $http.jsonp('http://coinabul.com/api.php?callback=JSON_CALLBACK').
    success(function(data, status, headers, config) {
	  $scope.posts = data;
    }).
    error(function(data, status, headers, config) {
      alert("asfa")
	});
}]); */

var myApp = angular.module('myApp',[]);
/*
myApp.controller('GreetingController', ['$scope', function($scope) {
  $scope.greeting = 'Hola!';
  $scope.authors = [{
                        'name' : 'Malik 1',
                        'title' : 'UI Developer',
                        'company' : 'DeenTV'
						 },{
                        'name' : 'Malik 2',
                        'title' : 'Musician',
                        'company' : 'DeenTV'
						 },{
                        'name' : 'Malik 3',
                        'title' : 'Martial Artist',
                        'company' : 'DeenTV'
						 }]
}]);


myApp.controller('NasheedArtist', function($scope, $http){
	 $http.get('js/info.json').success(function(data){
		 $scope.artists = data;
		 //alert(data);
	 });
 });
 

*/
myApp.controller('myBusStopCtrl', ['$scope', '$http', function ($scope, $http) {
   
    $scope.realTimeData;
	var url = "http://reis.trafikanten.no/reisrest/realtime/getrealtimedata/3010435" + "?callback=JSON_CALLBACK";
    $http.jsonp(url).success(function(data, status, headers, config){
            $scope.realTimeData = data;
			console.log(data.found);
        }).error(function(data, status, headers, config) {
		  //alert("saf");
		});

}]);