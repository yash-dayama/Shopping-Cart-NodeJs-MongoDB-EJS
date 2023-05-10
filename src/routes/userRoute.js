const UserAuthController = require("../controller/UserAuthController");
const AdminController = require('../controller/AdminController')

const { TableFields, UserTypes } = require("../utils/constants");
let prefix = process.env.ADMIN_PREFIX;

let router = function (app, passport) {
  /**---------------------------------Authentication----------------------------------- */
  app.get(prefix + "/login", UserAuthController.showLoginPage);
  app.post(
    prefix + "/login",
    passport.authenticate("userLogin", {
      successRedirect: prefix + "/dashboard",
      faliureRedirect: prefix + "/login",
      faliurFlash: true,
    })
  );

  app.get(
    prefix + "/dashboard",
    UserAuthController.loggedIn,
    AdminController.dashboard
  );
};

module.exports = router;
