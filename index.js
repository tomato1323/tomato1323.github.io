var minHeight = 500;

var isPhone = false;

var scrollSpeed = 1000;	

var originBgPosition = new Object();	

$(document).ready(function(){

	$('a').focus(function(e){this.blur()});

	var UA = navigator.userAgent;
	if(UA.indexOf('iPhone') > -1 || UA.indexOf('Android') > -1){
		isPhone = true;
	}

	$(".section").each(function(i){
		var _thisID = $(this).attr("id");
		originBgPosition[_thisID] = new Object();
		originBgPosition[_thisID]["section"] = getbackgroundPosition($(this));
	});

	$(".section").css("background-attachment","fixed");

	$(window).trigger("resize");

});

function getbackgroundPosition(obj) {
	var pos = obj.css("background-position");
	var posArray = new Array();

	if(pos){
		posArray = pos.split(" ");
	}else{
		posArray = [obj.css("backgroundPositionX"), obj.css("backgroundPositionY")];
	}	
	return {x:parseInt(posArray[0]), y:parseInt(posArray[1])};
}

$(window).bind("scroll resize", parallaxScroll);

function parallaxScroll (event) {

	if(event.type == "resize"){

		if($(window).height() > minHeight && !isPhone){
			$(".section").height($(window).height() + 50);
		}
	}

	if($(window).scrollTop() < $("ul#topNav").offset().top + $("ul#topNav").height()){
		$("#nav").animate({opacity:"hide"}, 200);
	} else {
		$("#nav").animate({opacity:"show"}, 200);
	}

	var activeContents = $(".section").filter(function (i) {	
		if($(window).scrollTop() + $(window).height() > $(this).offset().top && $(window).scrollTop() < $(this).offset().top + $(this).height()){
			return true;
		}else{
			return false;
		}
	});

	activeContents.each(function(i){

		var scrollTop = $(this).offset().top - $(window).scrollTop();
		var scrollLeft = $(this).offset().left- $(window).scrollLeft();

		var _thisID = $(this).attr("id");
		var newBgPosition = {section:{x:0, y:0}, layer1:{x:0, y:0}, layer2:{x:0, y:0}}

		newBgPosition["section"]["x"] = originBgPosition[_thisID]["section"]["x"] + scrollLeft * 0.2;

		newBgPosition["section"]["y"] = originBgPosition[_thisID]["section"]["y"] + scrollTop * 0.2;
	
		//$(this).css("background-position", newBgPosition["section"]["x"] + "px " + newBgPosition["section"]["y"] + "px");
		$(this).css("background-position", "center " + newBgPosition["section"]["y"] + "px");
	});
}

function pageScroll(n){
	$.scrollTo('#section' + n, scrollSpeed, {easing:"easeInOutQuart"});
}
