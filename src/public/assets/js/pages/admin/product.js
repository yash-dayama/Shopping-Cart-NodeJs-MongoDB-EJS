if (typeof filter_url === "undefined") {
    var filter_url = "";
}
if (typeof delete_url === "undefined") {
    var delete_url = "";
}
if (typeof add_url === "undefined") {
    var add_url = "";
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
                    $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
                    $(".datatable-title").html($(".table-title").html()).addClass("font-size-16");
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
                    data: {id: data_id},
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

    $(document).on("click", ".add-to-cart", function () {
        var _this = $(this);
        var data_value = $(_this).data("value");
        var data_id = $(_this).attr("id");
        var data_title = $(_this).attr("title");
        var data_amount = $(_this).attr("amount");
        var data_category = $(_this).attr("category");
        var sr = $(_this).parents("tr");
        swal({
            title: "Add Product To Cart",
            text: "Are you sure you want to add this Product?",
            buttons: ["No", "Yes"],
        }).then((isConfirm) => {
            if (isConfirm) {
                $.ajax({
                    type: "POST",
                    url: add_url,
                    data: {
                        product_id: data_id,
                        product_title: data_title,
                        product_category: data_category,
                        product_amount: data_amount,
                    },
                    success: function (data) {
                        if (typeof data !== "undefined") {
                            if (typeof data.status !== "undefined" && data.status == true) {
                                // Perform desired actions upon success
                                // console.log(add_url);
                                window.location.href = "/user/mycart"
                                successToast(data.message);
                            } else {
                                // Perform desired actions upon failure
                                // console.log("this is data ", data);
                                // console.log("Error ~ ", add_url);
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
                title: {
                    required: true,
                    normalizer: function (value) {
                        return $.trim(value);
                    },
                    minlength: 2,
                    maxlength: 255,
                },
                shortDescription: {
                    required: true,
                    normalizer: function (value) {
                        return $.trim(value);
                    },
                    minlength: 5,
                    maxlength: 25,
                },
                fullDescription: {
                    required: true,
                    normalizer: function (value) {
                        return $.trim(value);
                    },
                    minlength: 5,
                    maxlength: 255,
                },
                title: {
                    required: true,
                    normalizer: function (value) {
                        return $.trim(value);
                    },
                    minlength: 2,
                    maxlength: 255,
                },
                amount: {
                    required: true,
                    normalizer: function (value) {
                        return $.trim(value);
                    },
                    minlength: 2,
                    maxlength: 50,
                },
                qunatity: {
                    required: true,
                    normalizer: function (value) {
                        return $.trim(value);
                    },
                    minlength: 2,
                    maxlength: 50,
                },
                category: {
                    required: true,
                    normalizer: function (value) {
                        return $.trim(value);
                    },
                    minlength: 1,
                    // maxlength: 50,
                },
                /*email: {
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
        },*/
            },
            messages: {
                title: {
                    required: "Please enter a name",
                },
                shortDescription: {
                    required: "Please enter a Short Descrription",
                },
                fullDescription: {
                    required: "Please enter a Full Description",
                },
                amount: {
                    required: "Please enter an amount",
                },
                qunatity: {
                    required: "Please enter a quantity",
                },
                category: {
                    required: "Please enter a category",
                },
                /*email: {
          required: "Please enter an email",
          remote: "This email is already exists",
        },
        photo: {
          required: "Please upload user photo",
          extension: "Please select png or jpeg image",
          //filesize: "Image size must be less than or equal to 1MB",
        },*/
            },
        });
    }
    if (typeof validate !== "function" && $.fn.validate) {
        $(".product-form-validate").validate({
            rules: {
                title: {
                    required: true,
                    normalizer: function (value) {
                        return $.trim(value);
                    },
                    maxlength: 1000,
                    /*remote: {
            type: "POST",
            url: exists_url,
            data: {
              id: $('input[name="id"]').val(),
            },
          },*/
                },
                shortDescription: {
                    required: true,
                    normalizer: function (value) {
                        return $.trim(value);
                    },
                    maxlength: 100,
                },
                fullDescription: {
                    required: true,
                    normalizer: function (value) {
                        return $.trim(value);
                    },
                    maxlength: 300,
                },
                amount: {
                    required: true,
                    normalizer: function (value) {
                        return $.trim(value);
                    },
                    maxlength: 10,
                },
                qunatity: {
                    required: true,
                    normalizer: function (value) {
                        return $.trim(value);
                    },
                    maxlength: 10,
                },
                category: {
                    required: true,
                    normalizer: function (value) {
                        return $.trim(value);
                    },
                    maxlength: 10, //dropdown ??
                },
            },
            messages: {
                title: {
                    required: "Please enter a title",
                    remote: "This title already exists",
                },
                shortDescription: {
                    required: "Please enter short Description",
                },
                fullDescription: {
                    required: "Please enter full Description",
                },
                amount: {
                    required: "Please enter an amount",
                },
                qunatity: {
                    required: "Please enter a qunatity",
                },
                category: {
                    required: "Please select a category",
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
        if ($(".title").length) {
            $(".title").each(function () {
                $(this).rules("add", {
                    required: true,
                    normalizer: function (value) {
                        return $.trim(value);
                    },

                    messages: {
                        required: "Please enter the product Title",
                        remote: "This title already exists!",
                    },
                });
            });
        }
        if ($(".shortDescription").length) {
            $(".shortDescription").each(function () {
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
        if ($(".fullDescription").length) {
            $(".fullDescription").each(function () {
                $(this).rules("add", {
                    required: true,
                    normalizer: function (value) {
                        return $.trim(value);
                    },
                    messages: {
                        required: "Please Write Full Description",
                    },
                });
            });
        }
        if ($(".amount").length) {
            $(".amount").each(function () {
                $(this).rules("add", {
                    required: true,
                    normalizer: function (value) {
                        return $.trim(value);
                    },
                    messages: {
                        required: "Please Write an amount",
                    },
                });
            });
        }
        if ($(".quantity").length) {
            $(".quantity").each(function () {
                $(this).rules("add", {
                    required: true,
                    normalizer: function (value) {
                        return $.trim(value);
                    },
                    messages: {
                        required: "Please Write a Quantity",
                    },
                });
            });
        }
        if ($(".category").length) {
            $(".category").each(function () {
                $(this).rules("add", {
                    required: true,
                    normalizer: function (value) {
                        return $.trim(value);
                    },
                    messages: {
                        required: "Please Select a Category",
                    },
                });
            });
        }
    }
});
