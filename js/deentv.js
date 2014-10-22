/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        init_app(); //initialize app
        
    }
};

/*
jQuery(document).on( "pagechange",  function( event ) {
  //  refreshPage();
});
*/
 
/* ******************************************************************* */       
        
//CODE FOR MAIN DEENTV APP
function init_app(){
	$(function(){
      
            //stops video when going to another screen

			  
			//GET SPECIFIC DEVICE VARIABLES
			var deviceType = (device.platform == 'iOS' && screen.width == 768) ? 'ipad' : (
			deviceType = (device.platform == 'iOS' && screen.width < 768) ? 'iphone' : (
			deviceType = (device.platform == 'Android' && screen.width > 768) ? 'android-phone' : 'android-tab'
			));
			
			function checkConnection2() {
				var networkState = navigator.connection.type;
				
				var states = {};
				states[Connection.UNKNOWN]  = 'Unknown connection';
				states[Connection.ETHERNET] = 'Ethernet connection';
				states[Connection.WIFI]     = 'WiFi connection';
				states[Connection.CELL_2G]  = 'Cell 2G connection';
				states[Connection.CELL_3G]  = 'Cell 3G connection';
				states[Connection.CELL_4G]  = 'Cell 4G connection';
				states[Connection.CELL]     = 'Cell generic connection';
				states[Connection.NONE]     = 'No network connection';
				
				if(states[networkState] == "No network connection"){
					alert("You have no internet connection");
				};
			}
			
			checkConnection2();
			
			  $("[data-role='header'], [data-role='footer']" ).toolbar();
			  
			  //*******GET HOMEPAGE*********************************
			getHomePage();
			function getHomePage(){
			  var htmlString = "";
			  var ytapiurl    = 'http://gdata.youtube.com/feeds/api/users/UCTK1vQoMkZGq5msgX6ofCUg/uploads?alt=json&'; //max-results=10
			  $.getJSON(ytapiurl, function(data) {
						$.each(data.feed.entry, function(i, item) {
							   var title    = item['title']['$t'];
							   var videoid  = item['id']['$t'];
							   var video_description = item['content']['$t'];;
							   
							   var pubdate  = item['published']['$t'];
							   var fulldate = new Date(pubdate).toLocaleDateString();
							   
							   var thumbimg = item['media$group']['media$thumbnail'][0]['url'];
							   var tinyimg1 = item['media$group']['media$thumbnail'][1]['url'];
							   var tinyimg2 = item['media$group']['media$thumbnail'][2]['url'];
							   var tinyimg3 = item['media$group']['media$thumbnail'][3]['url'];
							   
							   var vlink    = item['media$group']['media$content'][0]['url'];
							   var ytlink   = item['media$group']['media$player'][0]['url'];
							   var numviews = item['yt$statistics']['viewCount'];
							   var numcomms = item['gd$comments']['gd$feedLink']['countHint'];
							   
							
							   
							   
							   htmlString += '<li class="ui-li-has-thumb ui-first-child"><a href="#" id="'+videoid+'" class="videolink ui-btn ui-btn-icon-right ui-icon-carat-r" title="'+video_description+'">';
							   htmlString += '<img src="' + thumbimg + '" style="margin:10px 0px 0px 10px">';
							   htmlString += '<h2 class="videotitle">' + title + '</h2>';
							   htmlString += '<p class="videodate"><strong>' + fulldate + '</strong></p>'
							   htmlString += '</a></li>';
							   }); // end each loop
						
						$('#videos').html(htmlString);
						
					   
						//console.log(htmlString);
	
						$("a.videolink").on( "click", function(e) {
                            
							var thevideoid = $(this).attr("id");
							thevideoid = thevideoid.replace("http://gdata.youtube.com/feeds/api/videos/","");
							
							$.mobile.navigate( "#watch" );
                            refreshPage("#watch");
                            setTimeout(startvideo(thevideoid),6000);
                                
                                            
							if (deviceType == "ipad"){
								$("h2#yt_h2").html($(this).find("h2.videotitle").text());
								$("h3#yt_h3").html($(this).find("p.videodate").text());
								$("#yt_desc").html($(this).attr("title"));
                                /*
                                            $("h2#yt_h2").click(function(){
                                                       startvideo("MYP56QJpDr4");
                                                       });
                                            
                                            $("h3#yt_h3").click(function(){
                                                                startvideo("Go71P2UPgkc");
                                                                });*/
							}
                                    
                            
						});
	
					}); // end json parsing
			  } // end function getHomePage
			  
			  
			  //*******GET SCHEDULE*********************************
			  getSchedule();
			  function getSchedule(){
					var schedule_url = "http://deen.tv/schedule/?json=1";
					$.getJSON(schedule_url, function(json) {
						var content = json.page['content'];
						$("#schedule_content .scroller").html(content);
						}).fail(function() {
								$("#schedule_content .scroller").html("An error has occured. Please check your internet connection or if you are on airplane mode");
								console.log( "error" );});
			  }
			  
			  //--------------------------------------
			
			var p = $( "#wrapper" );
			var offset = p.offset();
			//alert( "left: " + offset.left + ", top: " + offset.top + "page height" + $(window).height());
			
			$("#wrapper").height(($(window).height() - offset.top)-56);
			  $("#schedule_content").height($(window).height()-56);
			
			  
			//set iScroll
			setTimeout(startIscroll, 2000);
			
			function startIscroll(){
				var myScroll = new IScroll('#wrapper', {
					scrollbars: false,
					click: true
				});
			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
			}
			
			function startIscroll_schedule(){
				var myScrollSchedule = new IScroll('#schedule_content', {
					 scrollbars: false,
					 click: true
				});
			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
			}
			  
			$(document).on( "pagecontainershow", function( event, ui ) {
					if($.mobile.activePage.attr('id') == "schedule"){
						startIscroll_schedule();
						displayTodaysSchedule();
					}
				   //alert($.mobile.activePage.attr('id'));
			});
	
			//refresh pages
			  $(".refresh").click(function(){
					window.location = "index-"+deviceType+".html";
				});
			  
			//--------------------------------------
			  // commafy function source ----
			  function commafy( arg ) {
				  arg += '';
				  var num = arg.split('.');
				  if (typeof num[0] !== 'undefined'){
					  var int = num[0];
					  if (int.length > 3){
						  int     = int.split('').reverse().join('');
						  int     = int.replace(/(\d{3})/g, "$1,");
						  int     = int.split('').reverse().join('')
					  }
				  }
				  if (typeof num[1] !== 'undefined'){
					  var dec = num[1];
					  if (dec.length > 4){
							  dec     = dec.replace(/(\d{3})/g, "$1 ");
					  }
				  }
				
				  return (typeof num[0] !== 'undefined'?int:'') + (typeof num[1] !== 'undefined'?'.'+dec:'');
			  }//End of Commafy -----
            $(".home, .schedule, .refresh, .about").click(function(){
                    doYoutube();
                    stopVideo();
                                                    //stopVideo():
             });
		}); // End of Jquery Function
} //*** End of init function ***


/* ******************************************************************* */ 

//YOUTUBE CODE
doYoutube();
function doYoutube(){
    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}
// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('ytplayer', {
                           height: '390',
                           width: '640',
                           videoId: 'pvq_RgK20wk',
                           events: {
                           'onReady': onPlayerReady,
                           'onStateChange': onPlayerStateChange
                           }
                           });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    //event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if ((event.data == YT.PlayerState.ENDED) || (event.data == YT.PlayerState.PAUSED)){
        $.mobile.navigate( "#home" );
        var deviceType = (device.platform == 'iOS' && screen.width == 768) ? 'ipad' : (
            deviceType = (device.platform == 'iOS' && screen.width < 768) ? 'iphone' : (
            deviceType = (device.platform == 'Android' && screen.width > 768) ? 'android-phone' : 'android-tab'
        ));
        
        if (deviceType=="ipad"){
           window.location = "index-"+deviceType+".html";
        }
        //refreshPage("#watch");
        startIscroll();
        //alert("asdfa")
    }
}
function stopVideo() {
    player.stopVideo();
}

function startvideo(vidurl){
    //console.log("hehe");
    //document.getElementById("video-container").style.display="block"
    //player.playVideo();
    //alert("startvideo");
    player.loadVideoById(vidurl)
}

/* ******************************************************************* */ 

//*********************** SCHEDULE CODE ******************************

var elements = new Array();

function displayTodaysSchedule(){
    
	hideall();
    
	
    
	var day=new Date().getDay();
    
	switch (day)
    
	{
            
        case 0:
            
            document.getElementById("sun").style.display = "block";
            
            document.getElementById('selectOpt').options[0].selected = true;
            
            break;
            
        case 1:
            
            document.getElementById("mon").style.display = "block";
            
            document.getElementById('selectOpt').options[1].selected = true;
            
            break;
            
        case 2:
            
            document.getElementById("tue").style.display = "block";
            
            document.getElementById('selectOpt').options[2].selected = true;
            
            break;
            
        case 3:
            
            document.getElementById("wed").style.display = "block";
            
            document.getElementById('selectOpt').options[3].selected = true;
            
            break;
            
        case 4:
            
            document.getElementById("thu").style.display = "block";
            
            document.getElementById('selectOpt').options[4].selected = true;
            
            break;
            
        case 5:
            
            document.getElementById("fri").style.display = "block";
            
            document.getElementById('selectOpt').options[5].selected = true;
            
            break;
            
        case 6:
            
            document.getElementById("sat").style.display = "block";
            
            document.getElementById('selectOpt').options[6].selected = true;;
            
            break;
            
	}
    
}



function hideall() {
    
    elements = document.getElementsByClassName("2014schedule");
    
	for (var i = 0; i < elements.length; i++) {
        
		elements[i].style.display = "none";
        
	}
    
}



function jsFunction(){
    
    hideall();
    
    var myselect = document.getElementById("selectOpt");
    
    document.getElementById(myselect.options[myselect.selectedIndex].value).style.display = "block";
    
}

function refreshPage(page) {
    
    $.mobile.changePage(page,
                        {
                        allowSamePageTransition : true,
                        transition              : 'none',
                        showLoadMsg             : false,
                        reloadPage              : true
                        }
                        );
    //alert("refresh");
}
