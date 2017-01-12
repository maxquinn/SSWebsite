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
var testEle;
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

    $(window).scroll(function () {
        if (isInViewport(num1)) {
            $('#faded').fadeIn("slow");
            $('#fadeImage').attr("src",'../public/images/SAM GAT WEB IMAGE/1.jpg');
        }
        else if (isInViewport(num2)) {
            $('#faded').fadeIn("slow");
            $('#fadeImage').attr("src",'../public/images/SAM GAT WEB IMAGE/2.jpg');
        }
        else if (isInViewport(num3)) {
            $('#faded').fadeIn("slow");
            $('#fadeImage').attr("src",'../public/images/SAM GAT WEB IMAGE/3.jpg');
        }
        else if (isInViewport(num4)) {
            $('#faded').fadeIn("slow");
            $('#fadeImage').attr("src",'../public/images/SAM GAT WEB IMAGE/4.jpg');
        }
        else if (isInViewport(num5)) {
            $('#faded').fadeIn("slow");
            $('#fadeImage').attr("src",'../public/images/SAM GAT WEB IMAGE/5.jpg');
        }
        else if (isInViewport(num6)) {
            $('#faded').fadeIn("slow");
            $('#fadeImage').attr("src",'../public/images/SAM GAT WEB IMAGE/6.jpg');
        }
        else if (isInViewport(num7)) {
            $('#faded').fadeIn("slow");
            $('#fadeImage').attr("src",'../public/images/SAM GAT WEB IMAGE/7.png');
        }
        else if (isInViewport(num8)) {
            $('#faded').fadeIn("slow");
            $('#fadeImage').attr("src",'../public/images/SAM GAT WEB IMAGE/8.png');
        }
        else if (isInViewport(num9)) {
            $('#faded').fadeIn("slow");
            $('#fadeImage').attr("src",'../public/images/SAM GAT WEB IMAGE/9.png');
        }
        else if (isInViewport(num10)) {
            $('#faded').fadeIn("slow");
            $('#fadeImage').attr("src",'../public/images/SAM GAT WEB IMAGE/10.png');
        }
        else if (isInViewport(num11)) {
            $('#faded').fadeIn("slow");
            $('#fadeImage').attr("src",'../public/images/SAM GAT WEB IMAGE/11.png');
        }
        else if (isInViewport(num12)) {
            $('#faded').fadeIn("slow");
            $('#fadeImage').attr("src",'../public/images/SAM GAT WEB IMAGE/12.png');
        }
        else if (isInViewport(num13)) {
            $('#faded').fadeIn("slow");
            $('#fadeImage').attr("src",'../public/images/SAM GAT WEB IMAGE/13.jpg');
        }
        else if (isInViewport(num14)) {
            $('#faded').fadeIn("slow");
            $('#fadeImage').attr("src",'../public/images/SAM GAT WEB IMAGE/SAM CV.png');
        }
        else {
            $('#faded').fadeOut('slow');
        }
    });
});
