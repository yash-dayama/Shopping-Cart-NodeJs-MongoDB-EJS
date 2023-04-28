$(document).ready(function () {
  if ($(".section-repeater").length > 0) {
    $(".section-repeater").each(function (index, element) {
      if ($(element).find(" .r-group").length == 0) {
        addMoreSection($(element));
      } else if ($(element).find(" .r-group").length > 1) {
        $(element).attr(
          "data-startingIndex",
          $(element).find(" .r-group").length
        );
        if (
          typeof $(element).attr("data-first-item-remove") !== "undefined" &&
          $(element).attr("data-first-item-remove") == "false"
        ) {
          $(element)
            .find(" .r-group")
            .not(":first")
            .find(".r-btnRemove")
            .closest("div.input-group-append")
            .css("visibility", "visible");
        } else {
          $(element)
            .find(" .r-group .r-btnRemove")
            .closest("div.input-group-append")
            .css("visibility", "visible");
        }
      }
    });
  }

  $(document).on("click", ".section-repeater .r-btnRemove", function () {
    var elem = $(this).closest(".r-group");
    var _parent = $(this).closest(".section-repeater");
    if ($(_parent).find(" .r-group").length > 1) {
      if (
        typeof $(elem).data("id") !== "undefined" &&
        $(_parent).find(".removed").length
      ) {
        var remove_item = [];
        if ($(_parent).find(".removed").val() != "") {
          remove_item = JSON.parse($(_parent).find(".removed").val());
        }
        remove_item.push($(elem).attr("data-id"));
        $(_parent).find(".removed").val(JSON.stringify(remove_item));
      }
      elem.remove();
    }
    if (
      $(_parent).find(" .r-group").length > 1 &&
      $(_parent).find(".no-records").length
    ) {
      $(_parent).find(".no-records").removeClass("d-block").addClass("d-none");
    } else {
      $(_parent).find(".no-records").removeClass("d-none").addClass("d-block");
    }
    if ($(_parent).find(" .r-group").length == 1) {
      $(_parent)
        .find(" .r-group:first .r-btnRemove:first")
        .closest("div.input-group-append")
        .css("visibility", "hidden");
    }
  });

  $(document).on("click", ".section-repeater .r-btnAdd", function () {
    var _parent = $(this).closest(".section-repeater");
    addMoreSection($(_parent));
  });
});

function addMoreSection(_parent) {
  // extraFieldValidations();
  var isValid = true;
  $(_parent)
    .find("input, textarea, select")
    .each(function (i, e) {
      if (!$(this).valid()) {
        isValid = false;
      }
    });
  if (!isValid) {
    return false;
  }
  var startingIndex1 = parseInt($(_parent).attr("data-startingIndex"));
  var is_parent = false;
  if (!$(_parent).hasClass("sub-section")) {
    is_parent = true;
  }

  var clonedElement = null;
  //console.log($(_parent).find(" .r-group").length)
  if ($(_parent).find(" .r-group").length > 0) {
    if ($(_parent).find('[data-plugin="customselect"]').length) {
      $(_parent).find('[data-plugin="customselect"]').select2("destroy");
    }
    if ($(_parent).find(".multiselect").length) {
      $(_parent).find(".multiselect").multiselect("destroy");
    }
    if ($(_parent).find(".skin-square input").length) {
      $(_parent).find(".skin-square input").iCheck("destroy");
    }
    clonedElement = $(_parent).find(".r-group:first").clone();
    clonedElement.removeClass("d-none");
    clonedElement.removeAttr("data-id");
    clonedElement.find("div.input-group-append").show();
    clonedElement.find("div.input-group-append").css("visibility", "visible");
    if (is_parent) {
      clonedElement
        .find(".section-repeater.sub-section  .r-group")
        .not(":first")
        .remove();
      clonedElement
        .find(
          ".section-repeater.sub-section  .r-group:first .r-btnRemove:first"
        )
        .closest("div.input-group-append")
        .css("visibility", "hidden");
    }
    clonedElement.find("input.id").remove();
    clonedElement.find("input.old").remove();
    clonedElement.find(".view-doc").remove();
    clonedElement.find(".invalid-feedback").remove();
    clonedElement.find("label.error").remove();
    clonedElement.removeClass("no-edit");
    clonedElement.find(".custom-file-label").html("Choose file");
    clonedElement
      .find("input, textarea, select")
      .each(function (index, element) {
        if (typeof $(element).attr("data-pattern") !== "undefined") {
          this.name = $(element)
            .attr("data-pattern")
            .replace(/\+\+/, startingIndex1);
        } else if (is_parent) {
          this.name = this.name.replace(
            /\[\d+\]\[+/,
            "[" + startingIndex1 + "]["
          );
        } else {
          this.name = this.name.replace(
            /\]\[\d+\]+/g,
            "][" + startingIndex1 + "]"
          );
        }
        if (this.type == "checkbox" || this.type == "radio") {
          $(element).prop("checked", false);
          if (typeof $(element).attr("data-id-pattern") !== "undefined") {
            $(element).attr(
              "id",
              $(element).attr("data-id-pattern").replace(/\+\+/, startingIndex1)
            );
            $(element)
              .next("label")
              .attr("for", this.id.replace(/\d+/, startingIndex1));
          } else {
            $(element).attr("id", this.name.replace(/\[|\]/g, ""));
            $(element)
              .next("label")
              .attr("for", this.id.replace(/\d+/, startingIndex1));
          }
        } else {
          this.value = "";
        }
        $(element).removeClass("is-invalid");
        $(element).removeClass("error");
        $(element).removeClass("not-validate");
        $(element).prop("disabled", false);
      });

    clonedElement.find(".other-ralation").hide();
    clonedElement
      .find(".upload-image-box img")
      .attr(
        "src",
        clonedElement.find(".upload-image-box img").attr("data-src")
      );
    if (clonedElement.find(".upload-multiple-file").length) {
      clonedElement
        .find(".upload-multiple-file .upload-item:not(:first)")
        .remove();
    }
    clonedElement.find("select.multiselect.state").html("");
    $(clonedElement).attr("data-id", startingIndex1);
    // add aditional id for remove.
    // $(clonedElement).attr('id','remove_'+startingIndex1)
    if (clonedElement.find(".flatpickr-input").length) {
      createFlatDatePicker(clonedElement.find(".flatpickr-input"));
    }
    if (clonedElement.find(".flatpickr-custom").length) {
      createFlatCustomPicker(clonedElement.find(".flatpickr-custom"));
    }
    if (clonedElement.find(".flatpickr-time").length) {
      createFlatTimePicker(clonedElement.find(".flatpickr-time"));
    }
    $(clonedElement).insertBefore($(_parent).find(".btn-div:last"));
    if ($(_parent).find(".multiselect").length) {
      $(_parent)
        .find(".multiselect")
        .each(function () {
          createMultiselect($(this));
        });
    }
    if ($(_parent).find('[data-plugin="customselect"]').length) {
      createSelect2($(_parent).find('[data-plugin="customselect"]'));
    }
    if ($(_parent).find('[data-plugin="customicheck"]').length) {
      createICheck($(_parent).find('[data-plugin="customicheck"]'));
    }
    // console.log($(_parent).find(".skin-square"));
    // $(_parent).find(".skin-square input").iCheck({
    //   checkboxClass: "icheckbox_square-red",
    //   radioClass: "iradio_square-red",
    // });

    $(clonedElement).find(".time_view").css("display", "block");
    if ($(clonedElement).find(".default-start-time-view").length) {
      $(clonedElement).find(".default-start-time-view").val("09:00");
    }
    if ($(clonedElement).find(".default-end-time-view").length) {
      $(clonedElement).find(".default-end-time-view").val("17:00");
    }
  }

  startingIndex1++;
  $(_parent).attr("data-startingIndex", startingIndex1);

  if (
    $(_parent).find(" .r-group").length > 1 &&
    $(_parent).find(".no-records").length
  ) {
    $(_parent).find(".no-records").removeClass("d-block").addClass("d-none");
  } else {
    $(_parent).find(".no-records").removeClass("d-none").addClass("d-block");
  }

  var srn = 1;
  $(_parent)
    .find(".sno")
    .each(function (i, e) {
      $(e).html(srn);
      srn++;
    });

  var is_show = true;
  if (
    typeof $(_parent).attr("data-first-item-remove") !== "undefined" &&
    $(_parent).attr("data-first-item-remove") == "false"
  ) {
    is_show = false;
  }
  if ($(_parent).find(" .r-group").length > 1 && is_show) {
    $(_parent)
      .find(" .r-group:first .r-btnRemove:first")
      .closest("div.input-group-append")
      .css("visibility", "visible");
  } else {
    $(_parent)
      .find(" .r-group:first .r-btnRemove:first")
      .closest("div.input-group-append")
      .css("visibility", "hidden");
  }
  extraFieldValidations();

  var dateNow = new Date();
  $(".time")
    .datetimepicker({
      format: "HH:mm",
      useCurrent: false,
      icons: {
        time: "fas fa-clock-o",
        date: "fa fa-calendar",
        up: "fas fa-angle-up",
        down: "fas fa-angle-down",
        previous: "fa fa-chevron-left",
        next: "fa fa-chevron-right",
        today: "fa fa-clock-o",
        clear: "fa fa-trash-o",
      },
    })
    .on("dp.show", function () {
      return $(this)
        .data("DateTimePicker")
        .defaultDate(moment(dateNow).hours(0).minutes(0));
    });

  $(".datetimepicker").datetimepicker({
    format: "DD/MM/YYYY",
    maxDate: moment(),
  });

  // $(".unavailable_datetimepicker").datepicker({
  //   format: "dd/mm/yyyy",
  //   autoclose: true,
  //   startDate: "+0d",
  // });

  var postcodeInputs = document.getElementsByClassName("post-code");
  var types = ["(regions)"];
  for (var i = 0; i < postcodeInputs.length; i++) {
    var options = {
      types: types,
      componentRestrictions: { country: "uk" }, //UK only
    };
    const options1 = {
      country: "long_name",
    };
    const options2 = {
      postal_code: "long_name",
    };

    var places = new google.maps.places.Autocomplete(
      postcodeInputs[i],
      options
    );
    places.inputId = postcodeInputs[i];
    places.addListener("place_changed", fillIn);
    places.inputId.addEventListener("keyup", function () {
      $(this).parents(".location").find(".latitude, .longitude").val("");
    });
  }
}
function fillIn() {
  var place = this.getPlace();
  var postcode = "";
  var latitude = place.geometry.location.lat(),
    longitude = place.geometry.location.lng();
  for (const component of place.address_components) {
    const addressType = component.types[0];
    if (options2[addressType]) {
      postcode = component[options2[addressType]];
    }
  }
  $(this.inputId).val(postcode);
  if (postcode != "") {
    $(this.inputId).parents(".location").find(".latitude").val(latitude);
    $(this.inputId).parents(".location").find(".longitude").val(longitude);
  } else {
    $(this.inputId).parents(".location").find(".latitude").val("");
    $(this.inputId).parents(".location").find(".longitude").val("");
  }
}
function createICheck(element) {
  $(element).iCheck("destroy");
  $(element).iCheck({
    checkboxClass: "icheckbox_square-red",
    radioClass: "iradio_square-red",
  });
}
function createSelect2(element) {
  if (typeof select2 !== "function" && $.fn.select2) {
    $(element)
      .select2({
        width: "100%",
        placeholder: function () {
          $(this).data("placeholder");
        },
      })
      .on("change", function (e) {
        $(this).blur();
      });
  }
}
function createMultiselect(element) {
  if (typeof multiselect !== "function" && $.fn.multiselect) {
    $(element).multiselect({
      includeSelectAllOption: true,
      enableCaseInsensitiveFiltering: true,
      enableFiltering: true,
      allSelectedText: "All",
      numberDisplayed: 10,
      nSelectedText: "Selected",
      nonSelectedText: "Select",
      dropUp: false,
      onChange: function (option, checked) {
        var parentNode = option[0].parentNode,
          selectedOptions = $(parentNode).find("option:selected"),
          allOptions = $(parentNode).find("option");
        if (selectedOptions.length == allOptions.length) {
          $(parentNode).multiselect("selectAll").multiselect("refresh");
        } else if (selectedOptions.length < allOptions.length) {
          $(parentNode).multiselect("deselectAll");
          $(selectedOptions).prop("selected", true);
          option.prop("selected", checked);
          $(parentNode).multiselect("refresh");
        }
      },
    });
    if ($(element).find("option").length == 0) {
      $(element).multiselect("disable");
    }
  }
}
function createFlatTimePicker(el) {
  if (typeof flatpickr === "function") {
    $(el).flatpickr({
      disableMobile: "true",
      monthSelectorType: "static",
      enableTime: true,
      defaultHour: 9,
      noCalendar: true,
      dateFormat: "G:i K",
      prevArrow: "<i class='uil-angle-left'></i>",
      nextArrow: "<i class='uil-angle-right'></i>",
      onClose: function (selectedDates, dateStr, instance) {
        $(instance.element).blur();
      },
    });
  }
}
function createFlatDatePicker(el) {
  if (typeof flatpickr === "function") {
    $(el).flatpickr({
      disableMobile: "true",
      monthSelectorType: "static",
      dateFormat: "d/m/Y",
      prevArrow: "<i class='uil-angle-left'></i>",
      nextArrow: "<i class='uil-angle-right'></i>",
      onClose: function (selectedDates, dateStr, instance) {
        $(instance.element).blur();
      },
    });
  }
}
function createFlatCustomPicker(el) {
  if (typeof flatpickr === "function") {
    $(el).flatpickr({
      disableMobile: "true",
      dateFormat: "Y-m-d",
      mode: "multiple",
      monthSelectorType: "static",
      wrap: true,
      prevArrow: "<i class='uil-angle-left'></i>",
      nextArrow: "<i class='uil-angle-right'></i>",
      onChange: function (selectedDates, dateStr, instance) {
        $(instance.element)
          .find(".input-button")
          .html(
            selectedDates.length > 0
              ? selectedDates.length + " days selected"
              : "Select dates"
          );
      },
      onReady: function (selectedDates, dateStr, instance) {
        $(instance.element)
          .find(".input-button")
          .html(
            selectedDates.length > 0
              ? selectedDates.length + " days selected"
              : "Select dates"
          );
      },
      onClose: function (selectedDates, dateStr, instance) {
        $(instance.element).blur();
      },
    });
  }
}
