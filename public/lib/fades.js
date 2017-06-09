function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
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


//throttle function
function debounce(fn, wait) {
    var timeout = null;
    var c = function () { clearTimeout(timeout); timeout = null; };
    var t = function (fn) { timeout = setTimeout(fn, wait); };
    return function () {
        var context = this;
        var args = arguments;
        var f = function () { fn.apply(context, args); };
        if (!timeout) {
            t(c);
            f();
        } else {
            c();
            t(f);
        }
    };
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
                offset = $('#artist-social-module').offset(),
                $window = $(window);

            $window.on('scroll', function (e) {
                debounce(checkThatShit(), 250);
            });


            var checkThatShit = function () {
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
            };

        });
    }
    else if (isMobile()) { //mobile js sticky
        $(window).load(function () {
            var sticky = $('#artist-social-module'),
                stickyBackground = $('#social-module-background'),
                stickyClone,
                stickyTop = sticky.offset().top,
                $window = $(window);

            $window.on('scroll', function (e) {
                debounce(checkThatShit(), 400);
            });

            var checkThatShit = function () {
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
            };
        });
    }
    //sticky social module END ------------------------------------------
}


if ($('#david').length > 0) {
    var feed = new Instafeed({
        get: 'user',
        userId: '239485329',
        accessToken: '239485329.1677ed0.c82d80328e6d4a64a36e3ca604d28b77',
        resolution: 'standard_resolution',
        sortBy: 'most-recent',
        template: '<div class="instafeed-photo"><a href="{{link}}"><img src="{{image}}" /><div><span>{{caption}}</span></div><div class="insta-photo-footer"><span><i class="fa fa-heart"></i> {{likes}}</span><span><i class="fa fa-comment"></i> {{comments}}</span><span>{{model.created_time}}</span></div></a><hr></div>',
        filter: function (image) {

            var date = new Date(image.created_time * 1000);

            m = date.getMonth();
            d = date.getDate();
            y = date.getFullYear();

            var month_names = new Array();
            month_names[month_names.length] = "Jan";
            month_names[month_names.length] = "Feb";
            month_names[month_names.length] = "Mar";
            month_names[month_names.length] = "Apr";
            month_names[month_names.length] = "May";
            month_names[month_names.length] = "Jun";
            month_names[month_names.length] = "Jul";
            month_names[month_names.length] = "Aug";
            month_names[month_names.length] = "Sep";
            month_names[month_names.length] = "Oct";
            month_names[month_names.length] = "Nov";
            month_names[month_names.length] = "Dec";

            var thetime = month_names[m] + ' ' + d + ' ' + y;

            image.created_time = thetime;

            return true;
        }
    });
    feed.run();
}

if ($('#sam').length > 0) {
    var feed = new Instafeed({
        get: 'user',
        userId: '239485329',
        accessToken: '239485329.1677ed0.c82d80328e6d4a64a36e3ca604d28b77',
        resolution: 'standard_resolution',
        sortBy: 'most-recent',
        template: '<div class="instafeed-photo"><a href="{{link}}"><img src="{{image}}" /><div><span>{{caption}}</span></div><div class="insta-photo-footer"><span><i class="fa fa-heart"></i> {{likes}}</span><span><i class="fa fa-comment"></i> {{comments}}</span><span>{{model.created_time}}</span></div></a><hr></div>',
        filter: function (image) {

            var date = new Date(image.created_time * 1000);

            m = date.getMonth();
            d = date.getDate();
            y = date.getFullYear();

            var month_names = new Array();
            month_names[month_names.length] = "Jan";
            month_names[month_names.length] = "Feb";
            month_names[month_names.length] = "Mar";
            month_names[month_names.length] = "Apr";
            month_names[month_names.length] = "May";
            month_names[month_names.length] = "Jun";
            month_names[month_names.length] = "Jul";
            month_names[month_names.length] = "Aug";
            month_names[month_names.length] = "Sep";
            month_names[month_names.length] = "Oct";
            month_names[month_names.length] = "Nov";
            month_names[month_names.length] = "Dec";

            var thetime = month_names[m] + ' ' + d + ' ' + y;

            image.created_time = thetime;

            return true;
        }
    });
    feed.run();
}
