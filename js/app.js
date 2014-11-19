(function() {
    var myApp = angular.module('myApp', ['truncate']);
    myApp.controller('DeenTv_Controller', ['$scope', '$http', function($scope, $http) {

        $scope.realTimeData;
        var url = "http://deen.tv/?json=get_category_posts&slug=featured&count=50&status=publish&page=1&custom_fields=_tern_wp_youtube_video,dp_video_code,dp_video_url";
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
                $("#ytplayer").html('<iframe src="http://content.jwplatform.com/players/' + justtheid + '-xHSncDUr.html" width="100%" height="100%" frameborder="0" scrolling="auto"></iframe>');
                gotoWatchPage()
            } else if (currentItem.custom_fields._tern_wp_youtube_video) {
                $("#ytplayer").html('<iframe width="100%" height="100%" src="//www.youtube.com/embed/' + currentItem.custom_fields._tern_wp_youtube_video + '?autoplay=1&wmode=opaque&rel=0&showinfo=0&modestbranding=0" frameborder="0" allowfullscreen></iframe>');
                gotoWatchPage()
            } else if (currentItem.custom_fields.dp_video_url) {
                var parsedID = getYoutubeID(currentItem.custom_fields.dp_video_url.toString());
                $("#ytplayer").html('<iframe width="100%" height="100%" src="//www.youtube.com/embed/' + parsedID + '?autoplay=1&wmode=opaque&rel=0&showinfo=0&modestbranding=0" frameborder="0" allowfullscreen></iframe>');
                gotoWatchPage()
            } else {
                alert('There is an error with this video "' + currentItem.title + '"');
            }

            function getYoutubeID(myurl) {
                var videoid = myurl.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
                if (videoid != null) {
                    return videoid[1];
                } else {
                    alert("The youtube url is not valid.");
                }
            }

            function gotoWatchPage() {
                $("#video_title").html(currentItem.title);
                $("#video_desc").html(currentItem.content);
                $.mobile.navigate("#watch");
				var viewer = UstreamEmbed('UstreamIframe');
				viewer.callMethod('stop');
            }
        };

        $scope.getcategory = function(cat_Array) {
            var thecat = "";
            angular.forEach(cat_Array, function(category) {
                if (category.id == 41 || category.id == 4 || category.id == 44 || category.id == 1) {
                    //do nothing
                } else {
                    thecat += category.title;
                }
            });

            if (thecat == "") {
                return "Featured";
            } else {
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
$(document).bind('pageinit', function() {
    //removing video link so audio doesnt play
    $(".navigation a, .home_link").click(function() {
        $("#ytplayer").empty();
    });
	
});

// Setting the height of the scroll area
$( document ).ready(function() {
	var p = $("#list_videos");
	var padding = 16;
    var offset = p.offset();
	var logo_video_search_height = Math.round($("#logo_video_search").height()); 
	var just_logo_header = Math.round($(".logo").height()); 
	var footer_height = $(".ui-footer").outerHeight();
	$("#list_videos").height($(window).height() - ((logo_video_search_height + (padding * 2)) + footer_height));
	$("#schedule_content, #about-content, #show_content").height($(window).height() - ((just_logo_header + (padding * 2)) + footer_height));
	
	//console.log( "left: " + offset.left + ", top: " + offset.top + "page height" + $(window).height() + "padding: " + padding + "top height: " + logo_video_search_height);
	//console.log($(window).height() - ((logo_video_search_height + (padding * 2)) - 56));

	//Stop Ustream Video From Playing
	
});