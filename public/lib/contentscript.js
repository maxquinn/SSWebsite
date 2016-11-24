/**
 * Created by Max on 14-Aug-16.
 */

/*TODO 28-sept
-Almost got scroll position tracking working ugggh
*/

$(function(){
    $(window).bind('scroll', function() {
        $('.js-list-item').each(function() {
            var post = $(this);
            var topPosition = post.position().top - $(window).scrollTop();
            var botPosition = topPosition + post.outerHeight(true);
            if (topPosition <= 0 && botPosition >= 0) {
              post.addClass('js-current-panel');
            }
            else {
              post.removeClass('js-current-panel');
            }
            });
     });
});

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

$('.nav-link-a').click(function(e) {
  var href = $.attr(this, 'href');
  $('html, body').animate({scrollTop: $(href).offset().top + 'px'}, 500);

  e.preventDefault();
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

  //More or less text changer
  $('#more-or-less').click(function(){ //you can give id or class name here for $('button')
    $(this).text(function(i,old){
        return old=='... Read More' ?  '... Read Less' : '... Read More';
    });
  });

});

//infinate scroller for media page
function infinateScroller(dataArray) {
    
};

