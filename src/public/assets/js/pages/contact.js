$(function() {
    $("#contactForm").validate({
        rules: {
            name: {required: true,normalizer:function(value){return $.trim(value)},maxlength: 255},
            email: {required: true,normalizer: function(value) { return $.trim(value); },email: false,maxlength: 255,checkEmail: true},
            subject: {required: true,normalizer:function(value){return $.trim(value)},maxlength: 255},
            message: {required: true,normalizer:function(value){return $.trim(value)},maxlength: 5000}
        },
        messages: {
            name: {required: "Please enter a name"},
            email: {required: "Please enter an email address"},
            subject: {required: "Please enter a subject"},
            message: {required: "Please enter a message"},
        },
    });
});
