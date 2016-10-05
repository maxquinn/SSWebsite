	$(window).load(function() {
		$(".se-pre-con").fadeOut("slow");;
	});

function logoFadeIn(el) {
    var windowHeight = $(window).height();
    $(el).each(function(){
        var thisPos = $(this).offset().top;

        var topOfWindow = $(window).scrollTop();
        if (topOfWindow + windowHeight - 200 > thisPos ) {
            $(this).addClass("logo-fadein");
        }
    });
}

$(document).ready(function(){
    logoFadeIn('.kvka-logo');
});

$(window).scroll(function() {
    logoFadeIn('.kvka-logo');
});