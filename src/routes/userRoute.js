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
    /**---------------------------------Settings----------------------------------- */
    app.get(
      prefix + "/edit/aboutUs",
      UserAuthController.loggedIn,
      AdminController.editPageContent
    );
    app.get(
      prefix + "/edit/privacyPolicy",
      UserAuthController.loggedIn,
      AdminController.editPageContent
    );
    app.get(
      prefix + "/edit/termsConditions",
      UserAuthController.loggedIn,
      AdminController.editPageContent
    );
   
    app.post(
      prefix + "/save-settings",
      UserAuthController.loggedIn,
      AdminController.saveSettings
    );
    app.post(
      prefix + "/savePageContent",
      UserAuthController.loggedIn,
      AdminController.savepageContent
    );
};

module.exports = router;
