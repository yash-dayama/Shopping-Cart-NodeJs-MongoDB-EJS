$(function () {
    $(".register-form-validate").validate({
      rules: {
        firstName: { required: true },
        lastName: { required: true },
        middleName: { required: true },
        birthDate: { required: true },
        gender: { required: true },
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
        firstName: { required: "Please enter First Name" },
        lastName: { required: "Please enter Last Name" },
        middleName: { required: "Please enter Middle Name" },
        birthDate: { required: "Please enter a date" },
        gender: { required: "Please enter a gender" },
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
  