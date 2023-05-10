var UserService = require("../db/services/UserService");
const { UserTypes } = require("../utils/constants");
// const storage = require("../utils/storage");
const Util = require("../utils/utils");
const fs = require("fs");
var path = require("path");
let prefix = process.env.ADMIN_PREFIX;
const dashboard = async function (req, res) {
  try {
    let data = {
      page: "dashboard",
      page_title: "Dashboard",
      url: req.url,
    };
    res.render("admin/layouts/templates", {
      error: req.flash("error"),
      success: req.flash("success"),
      session: req.session,
      data: data,
    });
  } catch (error) {
    req.flash("error", "Exception: " + error);
    res.redirect("back");
  }
};

module.exports = {
  dashboard,
};
