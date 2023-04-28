$(window).on("load", function () {
  calculateHeight();
  $("#loading").hide();
  //paste this code under head tag or in a seperate js file.
  // Wait for window load
  $("#preloader").fadeOut("slow");
});
if ($(".footer-script").length) {
  $(".footer-script script").each(function (i, e) {
    document.body.appendChild(e);
  });
  $(".footer-script").remove();
}
if ($(".header-script").length) {
  $(".header-script link").each(function (i, e) {
    document.head.appendChild(e);
  });
  $(".header-script").remove();
}

$(function () {
  "use strict";
  // $.ajaxSetup({
  //   headers: { "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content") },
  //   beforeSend: function () {
  //     $("html body").block({
  //       message: '<i class="fa fa-spinner fa-spin mx-auto"></i>',
  //       overlayCSS: {
  //         backgroundColor: "#fff",
  //         opacity: 0.8,
  //         cursor: "wait",
  //       },
  //       css: {
  //         border: 0,
  //         padding: 0,
  //         fontSize: "60px",
  //         zIndex: 100,
  //         color: "#00951d",
  //         backgroundColor: "transparent",
  //       },
  //     });
  //   },
  //   complete: function () {
  //     $("html body").unblock();
  //   },
  // });

  $(window).on("resize", function () {
    calculateHeight();
  });

  if (
    typeof iCheck !== "function" &&
    $.fn.iCheck &&
    $(".chk-remember").length
  ) {
    $(".chk-remember").iCheck({
      checkboxClass: "icheckbox_square-grey",
      radioClass: "iradio_square-grey",
    });
    $(".chk-remember").on("ifChanged", function (e) {
      $(this).trigger("change", e);
    });
  }

  if (typeof datetimepicker !== "function" && $.fn.datetimepicker) {
    $(".date-selectors")
      .datetimepicker({
        ignoreReadonly: true,
        format: "DD/MM/YYYY",
        useCurrent: false,
        minDate: new Date(moment().format("MM/DD/YYYY")).setHours(0, 0, 0, 0),
        locale: "en",
      })
      .on("dp.hide", function () {
        $(this).blur();
      });
    $(".date-select").each(function (k, v) {
      if ($(this).attr("data-minDate") !== undefined) {
        $(this)
          .datetimepicker({
            ignoreReadonly: true,
            format: "DD/MM/YYYY",
            useCurrent: false,
            locale: "en",
            minDate: new Date(moment().format("MM/DD/YYYY")).setHours(
              0,
              0,
              0,
              0
            ),
          })
          .on("dp.hide", function () {
            $(this).blur();
          });
      } else {
        $(this)
          .datetimepicker({
            ignoreReadonly: true,
            format: "DD/MM/YYYY",
            useCurrent: false,
            locale: "en",
          })
          .on("dp.hide", function () {
            $(this).blur();
          });
      }
    });

    $(".date-select.from").on("dp.show", function (e) {
      var to_date = $(this)
        .parents(".date-group")
        .find(".date-select.to")
        .val();
      if (to_date != "") {
        var d = moment(to_date, "DD/MM/YYY").format("MM/DD/YYYY");
        $(this).data("DateTimePicker").maxDate(new Date(d));
      }
    });
    $(".date-select.to").on("dp.show", function (e) {
      var from_date = $(this)
        .parents(".date-group")
        .find(".date-select.from")
        .val();
      if (from_date != "") {
        var d = moment(from_date, "DD/MM/YYY").format("MM/DD/YYYY");
        $(this).data("DateTimePicker").minDate(new Date(d));
      }
    });
  }

  if (typeof select2 !== "function" && $.fn.select2) {
    $(".select2")
      .select2({
        width: "100%",
        adaptDropdownCssClass: function (c) {
          return c;
        },
      })
      .on("change", function (e) {
        $(this).blur();
      });
    $(".select2-no-filter")
      .select2({
        minimumResultsForSearch: Infinity,
        width: "100%",
        adaptDropdownCssClass: function (c) {
          return c;
        },
      })
      .on("change", function (e) {
        $(this).blur();
      });
  }

  if (typeof validate !== "function" && $.fn.validate) {
    $.validator.addMethod(
      "letters",
      function (value, element) {
        return this.optional(element) || value == value.match(/^[a-zA-Z]*/);
      },
      function (params, element) {
        var name = removeSpecialCharactersFromName($(element).attr("name"));
        return "The " + name + " may only contain letters";
      }
    );
    $.validator.addMethod(
      "alpha",
      function (value, element) {
        return (
          this.optional(element) || value == value.match(/^[a-zA-Z][\sa-zA-Z]*/)
        );
      },
      function (params, element) {
        var name = removeSpecialCharactersFromName($(element).attr("name"));
        return "The " + name + " may only contain letters and spaces";
      }
    );
    $.validator.addMethod(
      "lettersdash",
      function (value, element) {
        return (
          this.optional(element) ||
          value == value.match(/^[a-zA-Z][\-\sa-zA-Z]*/)
        );
      },
      function (params, element) {
        var name = removeSpecialCharactersFromName($(element).attr("name"));
        return "The " + name + " may only contain letters, spaces and dash(-)";
      }
    );
    $.validator.addMethod(
      "alphacomma",
      function (value, element) {
        return (
          this.optional(element) ||
          value == value.match(/^[a-zA-Z][,\sa-zA-Z]*/)
        );
      },
      function (params, element) {
        var name = removeSpecialCharactersFromName($(element).attr("name"));
        return (
          "The " + name + " may only contain letters, spaces and commas(,)"
        );
      }
    );
    $.validator.addMethod(
      "alphadigits",
      function (value, element) {
        return (
          this.optional(element) ||
          value == value.match(/^[a-zA-Z0-9][\sa-zA-Z0-9]*/)
        );
      },
      function (params, element) {
        var name = removeSpecialCharactersFromName($(element).attr("name"));
        return "The " + name + " may only contain letters, numbers and spaces";
      }
    );
    $.validator.addMethod(
      "alphanumber",
      function (value, element) {
        return this.optional(element) || value == value.match(/^[a-zA-Z0-9]*/);
      },
      function (params, element) {
        var name = removeSpecialCharactersFromName($(element).attr("name"));
        return "The " + name + " may only contain letters and numbers";
      }
    );
    $.validator.addMethod(
      "alphadash",
      function (value, element) {
        return (
          this.optional(element) ||
          value == value.match(/^[a-zA-Z][\&\.,\sa-zA-Z]*/)
        );
      },
      function (params, element) {
        var name = removeSpecialCharactersFromName($(element).attr("name"));
        return (
          "The " +
          name +
          "  may only contain letters, spaces, dot(.), comma(,) and ampersand(&)"
        );
      }
    );
    $.validator.addMethod(
      "filesize",
      function (value, element, param) {
        return this.optional(element) || element.files[0].size <= param;
      },
      function (params, element) {
        var sizeKB = parseInt(params / 1000);
        var name = removeSpecialCharactersFromName($(element).attr("name"));
        return $.validator.format(
          "File size must be less than or equal to " + sizeKB + "KB"
        );
      }
    );
    $.validator.addMethod(
      "exactlength",
      function (value, element, param) {
        return this.optional(element) || value.length == param;
      },
      $.validator.format("Please enter exactly {0} characters.")
    );
    $.validator.addMethod(
      "noSpace",
      function (value, element) {
        return value.indexOf(" ") < 0 && value != "";
      },
      "Space are not allowed."
    );
    $.validator.addMethod(
      "checkEmail",
      function (value, element) {
        return (
          this.optional(element) ||
          /^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}$/i.test(value)
        );
      },
      "Please enter a valid email address"
    );
    $.validator.addMethod(
      "checkCkeditorEmpty",
      function (value, element, params) {
        var idname = $(element).attr("id");
        var editorcontent = $("#" + idname)
          .val()
          .replace(/<[^>]*>/gi, "");
        var editor_value = $.trim(editorcontent.replace(/&nbsp;/g, ""));
        if (Number(editor_value) === 0) {
          return false;
        }
        return true;
      },
      function (params, element) {
        var name = removeSpecialCharactersFromName($(element).attr("name"));
        return "Please enter " + name + " content";
      }
    );
    $.validator.addMethod(
      "ckrequired",
      function (value, element) {
        var idname = $(element).attr("id");
        var editor = CKEDITOR.instances[idname];
        var ckValue = GetTextFromHtml(editor.getData())
          .replace(/<[^>]*>/gi, "")
          .trim();
        if (ckValue.length === 0) {
          $(element).val(ckValue);
        } else {
          $(element).val(editor.getData());
        }
        return $(element).val().length > 0;
      },
      function (params, element) {
        var name = removeSpecialCharactersFromName($(element).attr("name"));
        return "Please enter " + name + " content";
      }
    );
    $.validator.addMethod(
      "unique",
      function (value, element) {
        var matches = new Array();
        $(".unique")
          .not(element)
          .each(function (index, item) {
            if (value == $(item).val()) {
              matches.push(item);
            }
          });
        return matches.length == 0;
      },
      function (params, element) {
        var name = removeSpecialCharactersFromName($(element).attr("name"));
        return "Please enter different " + name;
      }
    );
    $.validator.addMethod(
      "minImageWidth",
      function (value, element, minWidth) {
        return !isNaN(value) || ($(element).data("imageWidth") || 0) > minWidth;
      },
      function (minWidth, element) {
        var imageWidth = $(element).data("imageWidth");
        return imageWidth
          ? "Your image's width must be greater than " + minWidth + "px"
          : "Selected file is not an image.";
      }
    );
    $.validator.addMethod(
      "minImageHeight",
      function (value, element, minHeight) {
        return (
          !isNaN(value) || ($(element).data("imageHeight") || 0) > minHeight
        );
      },
      function (minHeight, element) {
        var imageHeight = $(element).data("imageHeight");
        return imageHeight
          ? "Your image's height must be greater than " + minWidth + "px"
          : "Selected file is not an image.";
      }
    );
    $.validator.addMethod(
      "fixImageWidth",
      function (value, element, minWidth) {
        return (
          !isNaN(value) || ($(element).data("imageWidth") || 0) == minWidth
        );
      },
      function (minWidth, element) {
        var imageWidth = $(element).data("imageWidth");
        return imageWidth
          ? "Your image width must be equal to " + minWidth + "px"
          : "Selected file is not an image.";
      }
    );
    $.validator.addMethod(
      "fixImageHeight",
      function (value, element, minHeight) {
        return (
          !isNaN(value) || ($(element).data("imageHeight") || 0) == minHeight
        );
      },
      function (minHeight, element) {
        var imageHeight = $(element).data("imageHeight");
        return imageHeight
          ? "Your image height must be equal to " + minHeight + "px"
          : "Selected file is not an image.";
      }
    );
    $.validator.addMethod(
      "maxFilesToSelect",
      function (value, element, params) {
        var fileCount = element.files.length;
        if ($(element).parents(".attachment").length) {
          fileCount = parseInt(
            fileCount +
              $(element)
                .parents(".attachment")
                .find(".init-file-name .init-file").length
          );
        }
        if (fileCount > params) {
          return false;
        } else {
          return true;
        }
      },
      $.validator.format("You can upload maximum {0} files")
    );

    $.validator.setDefaults({
      ignore: 'input[type=hidden]:not(".required"), .select2-search__field',
      errorClass: "invalid-feedback",
      successClass: "validation-valid-label",
      validClass: "validation-valid-element",
      highlight: function (element, errorClass, validClass) {
        $(element)
          .parents("div.input-group")
          .addClass(errorClass)
          .removeClass(validClass);
        $(element).addClass("is-invalid");
        $(element).removeClass(errorClass);
      },
      unhighlight: function (element, errorClass, validClass) {
        $(element)
          .parents("div.input-group")
          .removeClass(errorClass)
          .addClass(validClass);
        $(element).removeClass("is-invalid");
        $(element).removeClass(errorClass);
      },
      errorPlacement: function (error, element) {
        if (typeof element.data("error") !== "undefined") {
          var placement = $(element).data("error");
          if (element.parents("div").hasClass("r-group")) {
            $(element)
              .parents(".r-group")
              .find("." + placement)
              .append(error);
          } else {
            $("." + placement).append(error);
          }
        } else if (
          element.parents("div").hasClass("checker") ||
          element.parents("div").hasClass("choice") ||
          element.parents("div").hasClass("skin") ||
          element.parent().hasClass("bootstrap-switch-container")
        ) {
          if (
            element.parents("label").hasClass("checkbox-inline") ||
            element.parents("label").hasClass("radio-inline")
          ) {
            error.appendTo(element.parent().parent().parent().parent());
          } else {
            error.appendTo(element.parent().parent().parent());
          }
        } else if (
          element.parents("label").hasClass("checkbox-inline") ||
          element.parents("label").hasClass("radio-inline")
        ) {
          error.appendTo(element.parent().parent());
        } else if (element.parents("div").hasClass("input-group")) {
          error.appendTo(element.parent().parent().parent().parent());
        } else if (
          element.parents("div").hasClass("has-feedback") ||
          element.hasClass("select2-hidden-accessible")
        ) {
          error.appendTo(element.parent());
        } else if (
          element.parents("fieldset").hasClass("checkbox") ||
          element.parents("fieldset").hasClass("radio")
        ) {
          error.appendTo(element.parent().parent());
        } else if (
          element.parents("div").hasClass("has-feedback") ||
          element.hasClass("select2-hidden-accessible")
        ) {
          error.appendTo(element.parent());
        } else if (
          element.parents("div").hasClass("multiselect-native-select")
        ) {
          error.appendTo(element.parent().parent());
        } else if (
          element.parents("div").hasClass("ckeditor") ||
          element.hasClass("chosen-select")
        ) {
          error.appendTo(element.parent());
        } else if (element.parents("div").hasClass("custom-file")) {
          error.appendTo(element.parent().parent());
        } else if (
          element.parents("div").hasClass("multiselect-native-select")
        ) {
          error.appendTo(element.parent());
        } else {
          error.insertAfter(element);
        }
      },
      success: function (label) {
        label.remove();
      },
      submitHandler: function (form) {
        $(form).find('button[type="submit"]').attr("disabled", "disabled");
        form.submit();
      },
    });

    jQuery.extend($.validator.messages, {
      required: $.validator.format("Please enter a value"),
      remote: $.validator.format("Please fix this field."),
      email: $.validator.format("Please enter a valid email address."),
      url: $.validator.format("Please enter a valid URL with http or https."),
      date: "Please enter a valid date.",
      number: "Please enter a valid number.",
      digits: "Please enter only digits.",
      equalTo: "Please enter the same value as above.",
      accept: $.validator.format("Please select a valid file."),
      extension: $.validator.format("Please select a valid file."),
      maxlength: $.validator.format(
        "Please enter no more than {0} characters."
      ),
      minlength: $.validator.format("Please enter at least {0} characters."),
      max: $.validator.format(
        "Please enter a value less than or equal to {0}."
      ),
      min: $.validator.format(
        "Please enter a value greater than or equal to {0}."
      ),
    });
  }

  $(document).on("change", ".custom-file-input", function (event) {
    readURL(this);
  });
  $(document).on("click", ".custom-file-remove", function () {
    $(this).parents(".custom-file").find(".custom-file-input").val("");
    $(this)
      .parents(".custom-file")
      .find(".custom-file-label")
      .html("Choose file");
    $(this).parents(".custom-file").find(".custom-file-image").hide();
    $(this).parents(".custom-file").find(".custom-file-remove").hide();
    $(this).parents(".custom-file").find(".custom-temp-image").val("");
  });
});

function createSelect2(element) {
  if (typeof select2 !== "function" && $.fn.select2) {
    $(element)
      .select2({
        width: "100%",
        adaptDropdownCssClass: function (c) {
          return c;
        },
      })
      .on("change", function (e) {
        $(this).blur();
      });
  }
}

function readURL(element) {
  $(element).removeData("imageWidth");
  $(element).removeData("imageHeight");
  var permitted = ["image/jpg", "image/jpeg", "image/png", "image/svg+xml"];
  var custom_label = $(element)
    .parents(".custom-file")
    .find(".custom-file-label");
  var custom_image = $(element)
    .parents(".custom-file")
    .find(".custom-file-image");
  var custom_remove = $(element)
    .parents(".custom-file")
    .find(".custom-file-remove");

  var file = element.files[0];
  custom_label.html("Choose file");
  if (custom_image.length > 0) {
    custom_image.hide();
    custom_remove.hide();
  }
  if ($(element).val() != "") {
    custom_label.html(file.name);
    if (custom_image.length > 0) {
      if ($.inArray(file["type"], permitted) > 0) {
        var img = new Image();
        img.onload = function () {
          $(element).data("imageWidth", img.width);
          $(element).data("imageHeight", img.height);
          var reader = new FileReader();
          reader.onload = function (e) {
            custom_image.attr("src", e.target.result);
            custom_image.show();
            custom_remove.show();
          };
          reader.readAsDataURL(file);
        };
        img.src = window.URL.createObjectURL(file);
      }
    }
  }
}

function validateFloatKeyPress(el, evt) {
  var charCode = evt.which ? evt.which : event.keyCode;
  var number = el.value.split(".");
  if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  if (number.length > 1 && charCode == 46) {
    return false;
  }
  var caratPos = getSelectionStart(el);
  var dotPos = el.value.indexOf(".");
  if (caratPos > dotPos && dotPos > -1 && number[1].length > 1) {
    return false;
  }
  return true;
}

function getSelectionStart(o) {
  if (o.createTextRange) {
    var r = document.selection.createRange().duplicate();
    r.moveEnd("character", o.value.length);
    if (r.text == "") return o.value.lengthreturn;
    o.value.lastIndexOf(r.text);
  } else return o.selectionStart;
}

function removeSpecialCharactersFromName(name) {
  return name
    .replace("_", " ")
    .replace(/(\[(.*?)\]\[)|(_)/g, " ")
    .replace("]", "")
    .replace("#", "");
}

function calculateHeight() {
  var count_hieght =
    $(window).height() -
    ($(".header-navbar").outerHeight() + $("footer.footer").outerHeight());
  $(".app-content").css("min-height", count_hieght + "px");
}

function GetTextFromHtml(html) {
  var dv = document.createElement("DIV");
  dv.innerHTML = html;
  return dv.textContent || dv.innerText || "";
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function loadJS(file) {
  var jsElm = document.createElement("script");
  jsElm.type = "application/javascript";
  jsElm.defer = true;
  jsElm.src = assetUrl + file;
  document.body.appendChild(jsElm);
}

function loadCss(file) {
  var cssElm = document.createElement("link");
  cssElm.type = "text/css";
  cssElm.href = file;
  document.head.appendChild(cssElm);
}
