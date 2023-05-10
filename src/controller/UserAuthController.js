const UserService = require("../db/services/UserService");
const { TableFields, UserTypes } = require("../utils/constants");
var bcrypt = require("bcryptjs");
let prefix = process.env.ADMIN_PREFIX;

const loggedIn = function (req, res, next) {
  console.log("check");
  if (req.session.user) {
    // console.log("check");
    if (req.user[TableFields.userType].includes(1)) {
      next();
    } else if (
      req.user[TableFields.userType].includes(2) == UserTypes.Admin
    ) {
      res.redirect("/");
    } else {
      req.flash(
        "error",
        "You do not have sufficient permissions to access this page."
      );
      res.redirect(prefix + "/login");
    }
  } else {
    res.redirect(prefix + "/login");
  }
};

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

const changePassword = async function (req, res) {
  try {
    let user = await UserService.getUserById(req.session.user[TableFields.ID])
      .withId()
      .withPassword()
      .execute();
    if (user) {
      if (!(await user.isValidPassword(req.body.currentPassword))) {
        req.flash(
          "error",
          "Your current password does not matches with the password you provided. Please try again."
        );
        res.redirect("back");
      } else {
        user[TableFields.password] = req.body.password;
        await user.save();

        req.flash("success", "Your password has been changed successfully.");
        res.redirect(prefix + "/dashboard");
      }
    } else {
      req.flash("error", "Sorry, We unable to find you, please login.");
      res.redirect("back");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Sorry, Something went wrong, Please try again.");
    res.redirect("back");
  }
};



module.exports = {
  showLoginPage,
  changePassword,
  loggedIn
};
