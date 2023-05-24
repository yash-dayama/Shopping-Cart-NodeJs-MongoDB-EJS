const User = require("../db/models/user");
var UserService = require("../db/services/UserService");
const {UserTypes} = require("../utils/constants");
const Util = require("../utils/utils");
const fs = require("fs");
var path = require("path");
let prefix = process.env.USER_PREFIX;
 
/*const index = async function (req, res) {
    try {
        var cart = await UserService.addToCart().withId().execute();
        let data = {
            page: "mycart/index",
            page_title: "My Cart",
            url: req.url, 
            cart: cart,
          };
          res.render("users/layouts/templates", {
            error: req.flash("error"),
            success: req.flash("success"),
            session: req.session,
            data: data,
          });
    } catch (error) {
    req.flash("error", "Exception: " + error);

    }
};*/
const index = async function (req, res) {
    try {
      var cart = await UserService.getAllUsers()
        .withId()
        .withBasicInfo()
        .execute();
  // console.log(product);
      let data = {
        page: "mycart/index",
        page_title: "MyCart",
        url: req.url,
        cart: cart,
      };
      res.render("users/layouts/templates", {
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

  const store = async function (req, res) {
    try {
      // console.log("from userCartController => ", req.body);
      var cart = await UserService.addToCart(req)
      var cartItem = await UserService.getAllCartItems(req).withCartInfo().execute()
      console.log(cartItem);
      let data = {
        page: "mycart/index",
        page_title: "My Cart",
        // faq: faq,
        url: req.url,
        cartItem: cartItem
      };
      // console.log(category);
      res.render("users/layouts/templates", {
        error: req.flash("error"),
        success: req.flash("success"),
        session: req.session,
        data: data,
      });
   
      
    } catch (error) {
      console.log(error);
      req.flash("error", "Exception: " + error);
    }
  };

module.exports = {
    index,
    store
}