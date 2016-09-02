/**
 * Created by Max on 14-Aug-16.
 */

/*TODO 02-Sep-16: Fix this whole thing*/
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



$('.js-scroll-to').click(function(e) {

	target = $($(this).attr('href'));

	if (target.offset()) {
		$('html, body').animate({scrollTop: target.offset().top + 'px'}, 500);
	}

	e.preventDefault();
});



$('.js-next').click(function(e) {

  var selected = $(".js-list-item.js-current-panel");
  var anchors = $(".js-list-item");

  var pos = anchors.index(selected);
  var next = anchors.get(pos+1);
  var prev = anchors.get(pos-1);
  
  target = $(next);
  
  $(selected).removeClass("js-current-panel");
  $(next).addClass("js-current-panel");
  
	if (target.offset()) {
		$('html, body').animate({scrollTop: target.offset().top + 'px'}, 600);
	}
 

	e.preventDefault();
});


$('.js-prev').click(function(e) {

  var selected = $(".js-list-item.js-current-panel");
  var anchors = $(".js-list-item");

  var pos = anchors.index(selected);
  var next = anchors.get(pos+1);
  var prev = anchors.get(pos-1);
  
  target = $(prev);
  
	$(selected).removeClass("js-current-panel");
  $(prev).addClass("js-current-panel");
  
  if (target.offset()) {
		$('html, body').animate({scrollTop: target.offset().top + 'px'}, 600);
	}
  
  
	e.preventDefault();
});

});