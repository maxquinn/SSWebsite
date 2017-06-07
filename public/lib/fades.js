$(window).load(function () {
    $(".se-pre-con").fadeOut("slow");
});

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function logoFadeIn(el) {
    var windowHeight = $(window).height();
    $(el).each(function () {
        var thisPos = $(this).offset().top;

        var topOfWindow = $(window).scrollTop();
        if (topOfWindow + windowHeight - 200 > thisPos) {
            $(this).addClass("logo-fadein");
        }
    });
}

function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    var html = document.documentElement;
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || html.clientHeight) &&
        rect.right <= (window.innerWidth || html.clientWidth)
    );
}


if ($("#fadeScroller").length > 0) {
    $(document).ready(function () {
        num1 = document.getElementById('p1');
        num2 = document.getElementById('p2');
        num3 = document.getElementById('p3');
        num4 = document.getElementById('p4');
        num5 = document.getElementById('p5');
        num6 = document.getElementById('p6');
        num7 = document.getElementById('p7');
        num8 = document.getElementById('p8');
        num9 = document.getElementById('p9');
        num10 = document.getElementById('p10');
        num11 = document.getElementById('p11');
        num12 = document.getElementById('p12');
        num13 = document.getElementById('p13');
        num14 = document.getElementById('p14');
        backGroundSelector();
        $(window).scroll(function () {
            backGroundSelector();
        });
    });
}

function backGroundSelector() {
    if (isInViewport(num1)) {
        $('#fadeImage').attr("src", '../public/images/SAM GAT WEB IMAGE/1.jpg');
        $('#faded').stop().fadeIn(300);
    }
    else if (isInViewport(num2)) {
        $('#fadeImage').attr("src", '../public/images/SAM GAT WEB IMAGE/2.jpg');
        $('#faded').stop().fadeIn(300);
    }
    else if (isInViewport(num3)) {
        $('#fadeImage').attr("src", '../public/images/SAM GAT WEB IMAGE/3.jpg');
        $('#faded').stop().fadeIn(300);
    }
    else if (isInViewport(num4)) {
        $('#fadeImage').attr("src", '../public/images/SAM GAT WEB IMAGE/4.jpg');
        $('#faded').stop().fadeIn(300);
    }
    else if (isInViewport(num5)) {
        $('#fadeImage').attr("src", '../public/images/SAM GAT WEB IMAGE/5.jpg');
        $('#faded').stop().fadeIn(300);
    }
    else if (isInViewport(num6)) {
        $('#fadeImage').attr("src", '../public/images/SAM GAT WEB IMAGE/6.jpg');
        $('#faded').stop().fadeIn(300);
    }
    else if (isInViewport(num7)) {
        $('#fadeImage').attr("src", '../public/images/SAM GAT WEB IMAGE/7.png');
        $('#faded').stop().fadeIn(300);
    }
    else if (isInViewport(num8)) {
        $('#fadeImage').attr("src", '../public/images/SAM GAT WEB IMAGE/8.png');
        $('#faded').stop().fadeIn(300);
    }
    else if (isInViewport(num9)) {
        $('#fadeImage').attr("src", '../public/images/SAM GAT WEB IMAGE/9.png');
        $('#faded').stop().fadeIn(300);
    }
    else if (isInViewport(num10)) {
        $('#fadeImage').attr("src", '../public/images/SAM GAT WEB IMAGE/10.png');
        $('#faded').stop().fadeIn(300);
    }
    else if (isInViewport(num11)) {
        $('#fadeImage').attr("src", '../public/images/SAM GAT WEB IMAGE/11.png');
        $('#faded').stop().fadeIn(300);
    }
    else if (isInViewport(num12)) {
        $('#fadeImage').attr("src", '../public/images/SAM GAT WEB IMAGE/12.png');
        $('#faded').stop().fadeIn(300);
    }
    else if (isInViewport(num13)) {
        $('#fadeImage').attr("src", '../public/images/SAM GAT WEB IMAGE/13.jpg');
        $('#faded').stop().fadeIn(300);
    }
    else if (isInViewport(num14)) {
        $('#fadeImage').attr("src", '../public/images/SAM GAT WEB IMAGE/SAM CV.png');
        $('#faded').stop().fadeIn(300);
    }
    else {
        $('#faded').stop().fadeOut(50);
    }
}

$('.pagetopbtn').on('click', function (e) {
    e.preventDefault();
    $('html, body').css('opacity', '0').scrollTop(0).animate({
        opacity: 1
    }, 800);
});

function adjustDoublePhotos(photo1, photo2) {
    if (!isMobile()) {
        //min height photo1 + photo 2 - needs to adjust on resize
        $('.double-photo').css('min-height', photo1.height() + photo2.height());


        photo1.offset();
    }
}

//artist page specific JS
if ($(".artist-page").length > 0) {

    //sticky social module
    if (!isMobile()) {
        $(window).load(function () {
            var sticky = $('#artist-social-module'),
                stickyBackground = $('#social-module-background'),
                stickyListItem = $('.social-li'),
                stickyClone,
                stickyTop = sticky.offset().top,
                scrolled = false,
                offset = $('#artist-social-module').offset(),
                $window = $(window);

            $window.on('scroll', function (e) {
                scrolled = true;
            });

            var timeout = setInterval(function () {
                if (scrolled) {
                    scrolled = false;
                    if ($window.scrollTop() >= (stickyTop + sticky.height()) && !stickyClone) {
                        if (sticky.css("position") !== "fixed") {
                            stickyClone = sticky.clone().prop('id', sticky.prop('id') + '-clone');
                            stickyClone.insertBefore(sticky);
                            sticky.remove();
                            sticky.addClass('fixed');
                            stickyListItem.addClass('fixed');
                            stickyBackground.addClass('fixed');
                            stickyClone.after(sticky);

                        }
                    } else if ($window.scrollTop() < stickyTop && stickyClone) {
                        if (sticky.css("position") === "fixed") {
                            sticky.addClass('fadeOut');
                            sticky.on('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd',
                                function () {
                                    sticky.removeClass('fixed fadeOut');
                                    stickyListItem.removeClass('fixed');
                                    stickyBackground.removeClass('fixed');
                                    sticky.css({
                                        width: 'auto',
                                    });
                                    $('#artist-social-module-clone').remove();
                                    sticky.animate({ 'opacity': '1' });
                                });
                            stickyClone = null;
                        }
                    }
                }
            }, 100);
        });
    }
    else if (isMobile()) { //mobile js sticky
        $(window).load(function () {
            var sticky = $('#artist-social-module'),
                stickyBackground = $('#social-module-background'),
                stickyClone,
                stickyTop = sticky.offset().top,
                scrolled = false,
                $window = $(window);

            $window.on('scroll', function (e) {
                scrolled = true;
            });

            var timeout = setInterval(function () {
                if (scrolled) {
                    scrolled = false;
                    if ($window.scrollTop() >= (stickyTop - 10) && !stickyClone) {
                        if (sticky.css("position") !== "fixed") {
                            stickyClone = sticky.clone().prop('id', sticky.prop('id') + '-clone');
                            stickyClone = stickyClone.insertBefore(sticky);
                            stickyBackground.css({
                                width: sticky.width(),
                            });
                            stickyBackground.addClass('mobile-fixed');
                            sticky.addClass('mobile-fixed');
                        }
                    } else if ($window.scrollTop() < stickyTop && stickyClone) {
                        if (sticky.css("position") === "fixed") {
                            stickyClone.remove();
                            stickyClone = null;
                            stickyBackground.removeClass('mobile-fixed');
                            sticky.removeClass('mobile-fixed');
                        }
                    }
                }
            }, 100);
        });
    }
    //sticky social module END ------------------------------------------
}

