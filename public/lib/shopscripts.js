$('#search-label').click(function () {
    $('#search-box').toggleClass('expanded');
    $('#search-label').toggleClass('expanded');
});

$("#search-box").blur(function() {
    document.getElementById('search-box').classList.remove('expanded');
    document.getElementById('search-label').classList.remove('expanded');
});

function openCartDrawer() {
    var cart = document.getElementById('cart-drawer');
    document.body.classList.add('has-active-menu');
    document.getElementById('page-container').classList.add('has-push-right');
    cart.classList.add('is-active');
    cart.focus();

    //load cart items
}

function closeCartDrawer() {
    document.body.classList.remove('has-active-menu');
    document.getElementById('page-container').classList.remove('has-push-right');
    document.getElementById('cart-drawer').classList.remove('is-active');
}

$("#cart-drawer").blur(function() {
    closeCartDrawer();
});