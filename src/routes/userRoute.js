const UserAuthController = require("../controller/UserAuthController");
const AdminController = require('../controller/AdminController')
const AdminProductController = require('../controller/AdminProductController')
const AdminCategoryController = require('../controller/AdminCategoryController')

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

    /**---------------------------------PRODUCTS----------------------------------- */

  app.all(
    prefix + "/product",
    UserAuthController.loggedIn,
    AdminProductController.index
  );
  app.get(
    prefix + "/products/add",
    UserAuthController.loggedIn,
    AdminProductController.create
  );
  app.post(
    prefix + "/products/store",
    UserAuthController.loggedIn,
    AdminProductController.store
  );
  app.get(
    prefix + "/products/edit/:id",
    UserAuthController.loggedIn,
    AdminProductController.edit
  );
  app.post(
    prefix + "/products/update",
    UserAuthController.loggedIn,
    AdminProductController.update
  );
  app.post(
    prefix + "/products/delete",
    UserAuthController.loggedIn,
    AdminProductController.destroy
  );
  app.post(
    prefix + "/products/exists",
    UserAuthController.loggedIn,
    AdminProductController.exists
  );

  /**---------------------------------CATEGORY----------------------------------- */

  app.all(
    prefix + "/category",
    UserAuthController.loggedIn,
    AdminCategoryController.index
  );
  app.get(
    prefix + "/categories/add",
    UserAuthController.loggedIn,
    AdminCategoryController.create
  );
  app.post(
    prefix + "/categories/store",
    UserAuthController.loggedIn,
    AdminCategoryController.store
  );
  app.get(
    prefix + "/categories/edit/:id",
    UserAuthController.loggedIn,
    AdminCategoryController.edit
  );
  app.post(
    prefix + "/categories/update",
    UserAuthController.loggedIn,
    AdminCategoryController.update
  );
  app.post(
    prefix + "/categories/delete",
    UserAuthController.loggedIn,
    AdminCategoryController.destroy
  );
  app.post(
    prefix + "/categories/exists",
    UserAuthController.loggedIn,
    AdminCategoryController.exists
  );
};

module.exports = router;
