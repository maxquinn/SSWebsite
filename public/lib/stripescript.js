var stripe = Stripe('pk_test_ZMfXhgXmCJrjVHnVgnm7TqQV');
var elements = stripe.elements();

var stockTaken = false;

$.get('/shop/checkout/stocktaken', function (data) {
  stockTaken = data;
});

var card = elements.create('card', {
  style: {
    base: {
      iconColor: '#666EE8',
      color: '#31325F',
      lineHeight: '40px',
      fontWeight: 300,
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSize: '15px',

      '::placeholder': {
        color: '#CFD7E0',
      },
    },
  }
});
card.mount('#card-element');

function setOutcome(result) {
  var errorElement = document.querySelector('.payment-error');
  var submitButton = $('#pay-button');
  var form = $('#payment-form');
  errorElement.classList.remove('visible');

  if (result.token) {
    if (!stockTaken) {
      $.get('/shop/checkout/stockcheck').done(
        function (res, status, xhr) {
          if (xhr.status === 205) {
            //stock check failed - cart adjusted
            angular.element(document.getElementById('payments-page')).scope().updateCart();
            errorElement.textContent = "Sorry there was a stock discrepancy! Your cart has been updated to reflect current stock levels. Payment has not been processed - Please try again...";
            errorElement.classList.add('visible');
            submitButton.prop('disabled', false);
            buttonActive();
          }
          else if (xhr.status === 202) {
            stockTaken = true;
            form.append($('<input type="hidden" name="stripeToken" />').val(result.token.id));
            form.submit();
          }
          else {
            //unknown error - should never happen
            errorElement.textContent = "There was an unknown error, please refresh the page - You have not been charged.";
            errorElement.classList.add('visible');
            submitButton.prop('disabled', false);
            buttonActive();
          }
        });
    }
    else {
      form.append($('<input type="hidden" name="stripeToken" />').val(result.token.id));
      form.submit();
    }

  } else if (result.error) {
    errorElement.textContent = result.error.message;
    errorElement.classList.add('visible');
    submitButton.prop('disabled', false);
    buttonActive();
  }
}

card.on('change', function (event) {
  setOutcome(event);
});

document.querySelector('#payment-form').addEventListener('submit', function (e) {
  e.preventDefault();
  var form = document.querySelector('form');
  var submitButton = $('#pay-button');
  submitButton.prop('disabled', true);
  buttonProcessing();
  var extraDetails = {
    name: form.querySelector('input[name=cardholder_name]').value,
    email: form.querySelector('input[name=cardholder_email]').value,
    address_line1: form.querySelector('input[name=address_line1]').value,
    address_line2: form.querySelector('input[name=address_line2]').value,
    address_zip: form.querySelector('input[name=address_zip]').value,
    address_city: form.querySelector('input[name=address_city]').value,
    address_country: form.querySelector('select[name=address_country]').value,
  };
  stripe.createToken(card, extraDetails).then(setOutcome);
});

function buttonProcessing() {
  $('#show-price').hide();
  $('#show-processing').show();
}

function buttonActive() {
  $('#show-processing').hide();
  $('#show-price').show();
}