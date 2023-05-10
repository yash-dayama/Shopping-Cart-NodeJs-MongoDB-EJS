$(function () {
  // Setup validation
  $(".change-password-form-validation").validate({
    rules: {
      currentPassword: { required: true },
      password: { required: true, minlength: 8, maxlength: 18 },
      password_confirmation: { required: true, equalTo: "#password" },
    },
    messages: {
      currentPassword: { required: "Please enter current password" },
      password: { required: "Please enter a new password" },
      password_confirmation: {
        required: "Please enter a confirm new password",
        equalTo: "Please enter the same password as above",
      },
    },
  });
});
