const UserService = require("../db/services/UserService");
const { TableFields, UserTypes } = require("../utils/constants");
var bcrypt = require("bcryptjs");
let prefix = process.env.ADMIN_PREFIX;

const showLoginPage = async function (req, res) {
  try {
    if (req.session.user) {
      res.redirect(prefix + "/");
    } else {
      let data = {
        page: "auth/login",
        page_title: "Login",
        url: req.url,
        output: "",
      };
      res.render("admin/layouts/templates", 
      {
        error: req.flash("error"),
        success: req.flash("success"),
        session: req.session,
        data: data,
      });
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Sorry, Something went wrong, Please try again.");
    res.redirect("back");
  }
};

module.exports = {
  showLoginPage,
};
