const AdminAuthController = require("../controller/AdminAuthController");
const UserAuthController = require("../controller/UserAuthController");
const AdminController = require('../controller/AdminController')
const RegisterUserController = require('../controller/RegisterUserController')
const AdminProductController = require('../controller/AdminProductController')
const AdminCategoryController = require('../controller/AdminCategoryController')
const UserCategoryController = require('../controller/UserCategoryController')
const UserProductController = require('../controller/UserProductController')

const { TableFields, UserTypes } = require("../utils/constants");
let prefix = process.env.ADMIN_PREFIX;
let Uprefix = process.env.USER_PREFIX;

let router = function (app, passport) {
  /**---------------------------------Authentication Admin----------------------------------- */
  app.get(prefix + "/login", AdminAuthController.showLoginPage);
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
    AdminAuthController.loggedIn,
    AdminController.dashboard
  );
  app.get(
    prefix + "/logout",
    AdminAuthController.loggedIn,
    AdminAuthController.logout
  );

  /**---------------------------------Authentication User----------------------------------- */
  app.get(Uprefix + "/login", UserAuthController.showLoginPage);
  app.post(
    Uprefix + "/login",
    passport.authenticate("userLogin", {
      successRedirect: Uprefix + "/dashboard",
      faliureRedirect: Uprefix + "/login",
      faliurFlash: true,
    })
  );

  app.get(
    Uprefix + "/dashboard",
    UserAuthController.loggedIn,
    RegisterUserController.dashboard
  );
  /*app.get(
    Uprefix + "/logout",
    UserAuthController.loggedIn,
    RegisterUserController.logout
  );*/
    /**---------------------------------Settings----------------------------------- */
    app.get(
      prefix + "/edit/aboutUs",
      AdminAuthController.loggedIn,
      AdminController.editPageContent
    );
    app.get(
      prefix + "/edit/privacyPolicy",
      AdminAuthController.loggedIn,
      AdminController.editPageContent
    );
    app.get(
      prefix + "/edit/termsConditions",
      AdminAuthController.loggedIn,
      AdminController.editPageContent
    );
   
    app.post(
      prefix + "/save-settings",
      AdminAuthController.loggedIn,
      AdminController.saveSettings
    );
    app.post(
      prefix + "/savePageContent",
      AdminAuthController.loggedIn,
      AdminController.savepageContent
    );

    /**---------------------------------PRODUCTS ADMIN----------------------------------- */

  app.all(
    prefix + "/product",
    AdminAuthController.loggedIn,
    AdminProductController.index
  );
  app.get(
    prefix + "/products/add",
    AdminAuthController.loggedIn,
    AdminProductController.create
  );
  app.post(
    prefix + "/products/store",
    AdminAuthController.loggedIn,
    AdminProductController.store
  );
  app.get(
    prefix + "/products/edit/:id",
    AdminAuthController.loggedIn,
    AdminProductController.edit
  );
  app.post(
    prefix + "/products/update",
    AdminAuthController.loggedIn,
    AdminProductController.update
  );
  app.post(
    prefix + "/products/delete",
    AdminAuthController.loggedIn,
    AdminProductController.destroy
  );
  app.post(
    prefix + "/products/exists",
    AdminAuthController.loggedIn,
    AdminProductController.exists
  );

  /**---------------------------------CATEGORY ADMIN----------------------------------- */

  app.all(
    prefix + "/category",
    AdminAuthController.loggedIn,
    AdminCategoryController.index
  );
  app.get(
    prefix + "/categories/add",
    AdminAuthController.loggedIn,
    AdminCategoryController.create
  );
  app.post(
    prefix + "/categories/store",
    AdminAuthController.loggedIn,
    AdminCategoryController.store
  );
  app.get(
    prefix + "/categories/edit/:id",
    AdminAuthController.loggedIn,
    AdminCategoryController.edit
  );
  app.post(
    prefix + "/categories/update",
    AdminAuthController.loggedIn,
    AdminCategoryController.update
  );
  app.post(
    prefix + "/categories/delete",
    AdminAuthController.loggedIn,
    AdminCategoryController.destroy
  );
  app.post(
    prefix + "/categories/exists",
    AdminAuthController.loggedIn,
    AdminCategoryController.exists
  );


  /**---------------------------------PRODUCTS USER----------------------------------- */

  app.all(
    Uprefix + "/product",
    AdminAuthController.loggedIn,
    UserProductController.index
  );
  /*app.get(
    prefix + "/products/add",
    AdminAuthController.loggedIn,
    AdminProductController.create
  );
  app.post(
    prefix + "/products/store",
    AdminAuthController.loggedIn,
    AdminProductController.store
  );
  app.get(
    prefix + "/products/edit/:id",
    AdminAuthController.loggedIn,
    AdminProductController.edit
  );
  app.post(
    prefix + "/products/update",
    AdminAuthController.loggedIn,
    AdminProductController.update
  );
  app.post(
    prefix + "/products/delete",
    AdminAuthController.loggedIn,
    AdminProductController.destroy
  );
  app.post(
    prefix + "/products/exists",
    AdminAuthController.loggedIn,
    AdminProductController.exists
  );*/

   /**---------------------------------CATEGORY USER----------------------------------- */

   app.all(
    Uprefix + "/category",
    AdminAuthController.loggedIn,
    UserCategoryController.index
  );
  /*app.get(
    Uprefix + "/categories/add",
    // AdminAuthController.loggedIn,
    // AdminCategoryController.create
  );
  app.post(
    Uprefix + "/categories/store",
    // AdminAuthController.loggedIn,
    UserCategoryController.store
  );
  app.get(
    Uprefix + "/categories/edit/:id",
    // AdminAuthController.loggedIn,
    // AdminCategoryController.edit
  );
  app.post(
    Uprefix + "/categories/update",
    // AdminAuthController.loggedIn,
    // AdminCategoryController.update
  );
  app.post(
    Uprefix + "/categories/delete",
    // AdminAuthController.loggedIn,
    // AdminCategoryController.destroy
  );
  app.post(
    Uprefix + "/categories/exists",
    // AdminAuthController.loggedIn,
    // AdminCategoryController.exists
  );*/
};

module.exports = router;
