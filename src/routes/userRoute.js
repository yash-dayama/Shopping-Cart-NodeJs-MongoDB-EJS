const AdminAuthController = require("../controller/AdminAuthController");
const UserAuthController = require("../controller/UserAuthController");
const AdminController = require('../controller/AdminController')
const RegisterUserController = require('../controller/RegisterUserController')
const UserRegisterationController = require('../controller/UserRegisterationController')
const AdminProductController = require('../controller/AdminProductController')
const AdminCategoryController = require('../controller/AdminCategoryController')
const UserCartController = require('../controller/UserCartController')
const UserCategoryController= require('../controller/UserCategoryController')
const UserProductController = require('../controller/UserProductController')
const OrderTableController = require('../controller/OrderTableController')

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
  app.get(Uprefix + "/login", UserAuthController.showLoginPage, );
  app.post(
    Uprefix + "/login",
    passport.authenticate("redirect", {
      successRedirect: Uprefix + "/dashboard",
      faliureRedirect: Uprefix + "/login",
      faliurFlash: true,
    })
  );

  app.get(Uprefix + "/register", UserAuthController.showRegisterPage, UserRegisterationController.store );
  app.post(
    Uprefix + "/register",
    passport.authenticate("redirect", {
      successRedirect: Uprefix + "/dashboard",
      faliureRedirect: Uprefix + "/register",
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
    UserAuthController.loggedIn,
    UserProductController.index
  );

   /**---------------------------------MyCart USER----------------------------------- */

   app.all(
    Uprefix + "/mycart",
    UserAuthController.loggedIn,
    UserCartController.index
  );
  app.post(
    Uprefix + "/addtocart",
    UserAuthController.loggedIn,
    UserCartController.store
  );
  app.post(
    Uprefix + "/mycart/update",
    UserAuthController.loggedIn,
    UserCartController.update
  );
  app.post(
    Uprefix + "/mycart/delete",
    UserAuthController.loggedIn,
    UserCartController.destroy
  );
  app.get(Uprefix + "/addtocart", UserCartController.store)
  app.post(
    Uprefix + "/mycart/exists",
    UserAuthController.loggedIn,
    UserCartController.exists
  );

   /**---------------------------------CheckOut----------------------------------- */
  app.post(
    Uprefix + "/ordertable",
    UserAuthController.loggedIn,
    OrderTableController.store
  );
   /**---------------------------------Settings----------------------------------- */
    app.get(
      Uprefix + "/edit/aboutUs",
      UserAuthController.loggedIn,
      RegisterUserController.editPageContent
    );
    app.get(
      Uprefix + "/edit/privacyPolicy",
      UserAuthController.loggedIn,
      RegisterUserController.editPageContent
    );
    app.get(
      Uprefix + "/edit/termsConditions",
      UserAuthController.loggedIn,
      RegisterUserController.editPageContent
    );
   
    app.post(
      Uprefix + "/save-settings",
      UserAuthController.loggedIn,
      RegisterUserController.saveSettings
    );
    app.post(
      Uprefix + "/savePageContent",
      UserAuthController.loggedIn,
      RegisterUserController.savepageContent
    );

};

module.exports = router;
