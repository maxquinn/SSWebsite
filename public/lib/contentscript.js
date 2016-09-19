/**
 * Created by Max on 14-Aug-16.
 */

/*TODO 18-Sep-16: 
- Fix navbar anchor scrolling - change selected var 
to reflect position after anchor click
- Add cookie that stores page position??
- Fix address bar when using navigation arrows
*/
var selected;
var anchors;

$(document).ready(function() {

    // var $root = $('html, body');
    // $('a').click(function() {
    //     var href = $.attr(this, 'href');
    //     $root.animate({
    //         scrollTop: $(href).offset().top
    //     }, 500, function () {
    //         window.location.hash = href;
    //     });
    //     return false;
    // });


$('.nav-link-a').click(function() {
  var href = $.attr(this, 'href');
  $('html, body').animate({scrollTop: $(href).offset().top + 'px'}, 500);
});

$('.js-next').click(function(e) {

  selected = $(".js-list-item.js-current-panel");
  anchors = $(".js-list-item");
  
  var pos = anchors.index(selected);

  if(pos == anchors.length - 1) {
    e.preventDefault();
    return;
  }

  var next = anchors.get(pos+1);
  var prev = anchors.get(pos-1);
  
  target = $(next);
  
  $(selected).removeClass("js-current-panel");
  $(next).addClass("js-current-panel");

	if (target.offset()) {
		$('html, body').animate({scrollTop: target.offset().top + 'px'}, 400);
	}

	e.preventDefault();
  
});


$('.js-prev').click(function(e) {

  selected = $(".js-list-item.js-current-panel");
  anchors = $(".js-list-item");

  var pos = anchors.index(selected);

  if(pos == 0) {
    e.preventDefault();
    return;
  }

  var next = anchors.get(pos+1);
  var prev = anchors.get(pos-1);
  
  target = $(prev);
  
	$(selected).removeClass("js-current-panel");
  $(prev).addClass("js-current-panel");
  
  if (target.offset()) {
		$('html, body').animate({scrollTop: target.offset().top + 'px'}, 400);
	}
  
  
	e.preventDefault();
});

});