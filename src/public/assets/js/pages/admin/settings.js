$(function () {
  // Setup validation
  if (typeof validate !== "function" && $.fn.validate) {
    $(".settings-form-validate").validate({
      rules: {
        androidVersion: {
          required: true,
          normalizer: function (value) {
            return $.trim(value);
          },
          number: true,
          min: 0,
        },
        iosVersion: {
          required: true,
          normalizer: function (value) {
            return $.trim(value);
          },
          number: true,
          min: 0,
        },
      },
      messages: {
        androidVersion: {
          required: "Please enter android version",
        },
        iosVersion: {
          required: "Please enter IOS version",
        },
      },
    });
  }
});
