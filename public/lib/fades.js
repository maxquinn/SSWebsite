$(window).load(function () {
    $(".se-pre-con").fadeOut("slow");
});

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

$(document).ready(function () {
    logoFadeIn('.kvka-logo');
});

$(window).scroll(function () {
    logoFadeIn('.kvka-logo');
});

var imgSrcs = [
    "../public/images/SAM GAT WEB IMAGE/1.jpg",
    "../public/images/SAM GAT WEB IMAGE/2.jpg",
    "../public/images/SAM GAT WEB IMAGE/3.jpg",
];

var row1;
$(document).ready(function () {
    row1 = document.getElementById("row1");
});

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

$(window).scroll(function () {
    if (isInViewport(row1)) {
        document.getElementById("sam-ultimate").style.backgroundImage = "url('../public/images/SAM GAT WEB IMAGE/1.jpg')";
        document.getElementById("sam-ultimate").style.transition = "background 3s linear";

    }
    else {
        document.getElementById("sam-ultimate").style.backgroundImage = "none";
        document.getElementById("sam-ultimate").style.transition = "background 3s linear";
    }
});
