$(function () {
    $(".login-form-validate").validate({
      rules: {
        email: {
          required: true,
          normalizer: function (value) {
            return $.trim(value);
          },
          email: false,
          checkEmail: true,
        },
        password: { required: true },
      },
      messages: {
        email: { required: "Please enter an email address" },
        password: { required: "Please enter a password" },
      },
    });
  });
  var version = detectIE();
  if (version === false) {
  } else {
    var element = document.getElementById("support");
    element.classList.add("d-block");
  }
  function detectIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (msie > 0) {
      return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
    }
    var trident = ua.indexOf("Trident/");
    if (trident > 0) {
      var rv = ua.indexOf("rv:");
      return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
    }
    return false;
  }
  