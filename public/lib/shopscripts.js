function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

$('#search-label').click(function () {
    $('#search-box').toggleClass('expanded');
    $('#search-label').toggleClass('expanded');
});

$("#search-box").blur(function () {
    document.getElementById('search-box').classList.remove('expanded');
    document.getElementById('search-label').classList.remove('expanded');
});

function openCartDrawer() {
    var cart = document.getElementById('cart-drawer');
    document.body.classList.add('has-active-menu');
    document.getElementById('page-container').classList.add('has-push-right');
    cart.classList.add('is-active');
    cart.focus();
}

function closeCartDrawer() {
    document.body.classList.remove('has-active-menu');
    document.getElementById('page-container').classList.remove('has-push-right');
    document.getElementById('cart-drawer').classList.remove('is-active');
}

$("#page-container").on("mousedown touchstart", function (e) {
    if ($('#cart-drawer').hasClass('is-active')) {
        closeCartDrawer();
    }
});

$("#cart-alert").focus();

$("#cart-alert").blur(function () {
    $(".alert").alert('close');
});

if (!isMobile()) {
    $(function () {
        $('.item-photo-pane a').click(function () {
            if ($(window).width() > $(window).height()) {
                $('.image-zoom img').css('width', '150%');
                $('.image-zoom img').css('height', 'auto');
            }
            else {
                $('.image-zoom img').css('height', '150%');
                $('.image-zoom img').css('width', 'auto');
            }
            $('.image-zoom img').attr('src', $(this).find('img').attr('src'));
            $('.image-zoom').show();
            $('.item-photo-pane').css('display', 'none');
            $("body").css("overflow", "hidden");
            return false;
        });

        $('.image-zoom').mousemove(function (e) {
            var h = $(this).find('img').height();
            var vptHeight = $(document).height();
            var y = -((h - vptHeight) / vptHeight) * e.pageY;
            var w = $(this).find('img').width();
            var vptWidth = $(document).width();
            var x = -((w - vptWidth) / vptWidth) * e.pageX;
            $('div img').css('top', y + "px");
            $('div img').css('left', x + "px");
        });

        $('.image-zoom').click(function () {
            $('.image-zoom').hide();
            $('.item-photo-pane').css('display', 'block');
            $("body").css("overflow", 'auto');
        });
    });
}