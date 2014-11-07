// JavaScript Document -- http://deen.tv/?json=get_category_index
function getShow() {
	var show_url = "http://deen.tv/?json=get_category_index";
	$.getJSON(show_url, function(data) {
		var show_content = data.categories;
		$.each(data.categories, function(i, item) {
			if((item.id != 4) && (item.id != 44)){
				$("#show_content").append("<span>" + item.title + "</span><br>");
			};
		});
	});
};
getShow();