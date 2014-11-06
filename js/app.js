(function() {
    var myApp = angular.module('myApp', ['truncate']);
    myApp.controller('DeenTv_Controller', ['$scope', '$http', function($scope, $http) {

        $scope.realTimeData;
		var url = "http://deen.tv/?json=get_category_posts&slug=featured&count=50&status=publish&page=1&custom_fields=_tern_wp_youtube_video,dp_video_code";
        //var url = "http://deen.tv/?json=get_category_posts&slug=featured&count=20&status=publish&page=1";
        url += "&callback=JSON_CALLBACK"
        
		//get jason data
		$http.jsonp(url).success(function(data) {
            $scope.realTimeData = data.posts;
			$scope.numbofpages = data.pages;
			//alert($scope.numbofpages.toString());
            //console.log(data.found);
        }).error(function(data) {
            //console.log("error");
        });
		
		
		//play the video
        $scope.playvideo = function(currentItem) {
            if (currentItem.custom_fields.dp_video_code) {
                var str = currentItem.custom_fields.dp_video_code.toString();
                var str = str.replace('<script type="text/javascript" src="http://content.jwplatform.com/players/', '');
                var justtheid = str.replace('-xHSncDUr.js"></script>', '');
                $("#ytplayer").html('<iframe src="http://content.jwplatform.com/players/' + justtheid + '-xHSncDUr.html" width="480" height="270" frameborder="0" scrolling="auto"></iframe>');
            } else if (currentItem.custom_fields._tern_wp_youtube_video) {
                $("#ytplayer").html('<iframe width="560" height="315" src="//www.youtube.com/embed/' + currentItem.custom_fields._tern_wp_youtube_video + '?autoplay=1&wmode=opaque&rel=0&showinfo=0&modestbranding=0" frameborder="0" allowfullscreen></iframe>');
            } else {
				alert("error" + " " + currentItem);
			}
			$("#video_title").html(currentItem.title);
			$("#video_desc").html(currentItem.content);
            $.mobile.navigate("#watch");
        };
		
		$scope.getcategory = function(cat_Array){
			var thecat = "";
    		angular.forEach(cat_Array, function(category) {
     			if(category.id == 41 || category.id == 4 || category.id == 44 || category.id == 1){
					//do nothing
				}else{
					thecat += category.title;
				}
    		});
			
			if (thecat == ""){
				return "Featured";
			}else{
				return thecat;
			}
		}
    }]);

    //filter HTML
    myApp.filter('unsafe', function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    });



}());
$(document).ready(function() {
    $("#remove").click(function() {
        $("#ytplayer").empty();
    });
    window.onhashchange = function() {
        //$("#ytplayer").empty();
    }

});