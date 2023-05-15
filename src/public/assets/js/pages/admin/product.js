if (typeof filter_url === "undefined") {
  var filter_url = "";
}
if (typeof delete_url === "undefined") {
  var delete_url = "";
}
if (typeof block_url === "undefined") {
  var block_url = "";
}
if (typeof view_url === "undefined") {
  var view_url = "";
}
if (typeof approve_url === "undefined") {
  var approve_url = "";
}
if (typeof exists_url === "undefined") {
  var exists_url = "";
}

var $declineModal = $("#declineModal"),
  $declineForm = $(".decline-form");

$(function () {
  var table = null;
  if ($(".data-table").length) {
    if (typeof dataTable !== "function" && $.fn.dataTable) {
      $.extend($.fn.dataTable.defaults, {
        autoWidth: false,
        responsive: true,
        displayLength: 10,
        ordering: true,
        bInfo: false,
        bPaginate: true,
        language: {
          search: "<span>Search:</span> _INPUT_",
          loadingRecords: "&nbsp;",
          processing: "Loading...",
          lengthMenu: "",
          paginate: {
            first: "First",
            last: "Last",
            previous: "<i class='uil uil-angle-left'>",
            next: "<i class='uil uil-angle-right'>",
          },
        },
        drawCallback: function () {
          $(".dataTables_paginate > .pagination").addClass(
            "pagination-rounded"
          );
          $(".datatable-title")
            .html($(".table-title").html())
            .addClass("font-size-16");
          if (typeof $(this).attr("data-title") !== "undefined") {
            $(this)
              .parents(".dataTables_wrapper")
              .find(".datatable-title")
              .html($(this).attr("data-title"));
          }
        },
      });
    }
    table = $(".data-table").DataTable({
      responsive: true,
      processing: true,
      pagination: true,
      serverSide: false,
      // ajax: {
      //     type: "POST",
      //     url: filter_url,
      // },
      // columns: [
      //     { data: 'DT_RowIndex', name: 'DT_RowIndex', searchable: false },
      //     { data: 'name', name: 'name' },
      //     { data: 'email', name: 'email' },
      //     { data: 'location', name: 'location' },
      //     { data: 'action', name: 'action', orderable: false, searchable: false, class: "text-white-space text-center" },
      // ]
    });
  }
  $(document).on("click", ".delete", function () {
    var _this = $(this);
    var data_id = $(_this).data("id");
    var sr = $(_this).parents("tr");
    swal({
      title: "Remove Product",
      text: "Are you sure you want to delete this Product?",
      // icon: "warning",
      // reverseButtons: true,
      buttons: ["No", "Yes"],
    }).then((isConfirm) => {
      if (isConfirm) {
        $.ajax({
          type: "POST",
          url: delete_url,
          data: { id: data_id },
          success: function (data) {
            if (typeof data !== "undefined") {
              if (typeof data.status !== "undefined" && data.status == true) {
                //table.ajax.reload();
                table.row(sr).remove().draw();
                successToast(data.message);
              } else {
                errorToast(data.message);
              }
            } else {
              errorToast("Oops! Something went wrong. Please try again.");
            }
          },
          error: function (data) {
            errorToast("Oops! Something went wrong. Please try again.");
          },
        });
      }
    });
  });

  if (typeof validate !== "function" && $.fn.validate) {
    $(".form-validate").validate({
      rules: {
        name: {
          required: true,
          normalizer: function (value) {
            return $.trim(value);
          },
          minlength: 2,
          maxlength: 255,
        },
        email: {
          required: true,
          normalizer: function (value) {
            return $.trim(value);
          },
          checkEmail: true,
          minlength: 2,
          maxlength: 255,
          remote: {
            type: "POST",
            url: exists_url,
            data: {
              id: $('input[name="id"]').val(),
            },
          },
        },
        photo: {
          required: {
            depends: function () {
              if ($("#old_photo").length && $("#old_photo").val() != "") {
                return false;
              }
              return true;
            },
          },
          normalizer: function (value) {
            return $.trim(value);
          },
          extension: "png|jpeg",
          filesize: 1000000,
        },
      },
      messages: {
        name: {
          required: "Please enter a name",
        },
        email: {
          required: "Please enter an email",
          remote: "This email is already exists",
        },
        photo: {
          required: "Please upload user photo",
          extension: "Please select png or jpeg image",
          //filesize: "Image size must be less than or equal to 1MB",
        },
      },
    });
  }
  if (typeof validate !== "function" && $.fn.validate) {
    $(".faqs-form-validate").validate({
      rules: {
        question: {
          required: true,
          normalizer: function (value) {
            return $.trim(value);
          },
          maxlength: 1000,
          remote: {
            type: "POST",
            url: exists_url,
            data: {
              id: $('input[name="id"]').val(),
            },
          },
        },
        answer: {
          required: true,
          normalizer: function (value) {
            return $.trim(value);
          },
          maxlength: 5000,
        },
      },
      messages: {
        question: {
          required: "Please enter a question",
          remote: "This question already exists",
        },
        answer: {
          required: "Please enter an answer",
          remote: "This question already exists",
        },
      },
    });
  }
  $("#add-more,.r-btnSubmit").click(function () {
    extraValidations();
    var _parent = $(this).closest(".section-repeater");
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
  });

  function extraValidations() {
    if ($(".question").length) {
      $(".question").each(function () {
        $(this).rules("add", {
          required: true,
          normalizer: function (value) {
            return $.trim(value);
          },

          messages: {
            required: "Please enter the product Title",
            remote: "This question already exists!",
          },
        });
      });
    }
    if ($(".answer").length) {
      $(".answer").each(function () {
        $(this).rules("add", {
          required: true,
          normalizer: function (value) {
            return $.trim(value);
          },
          messages: {
            required: "Please Write Short Description",
          },
        });
      });
    }
  }
});

