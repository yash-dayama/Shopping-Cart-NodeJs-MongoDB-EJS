const User = require("../db/models/user");
var UserService = require("../db/services/UserService");
const {UserTypes} = require("../utils/constants");
const Util = require("../utils/utils");
const fs = require("fs");
var path = require("path");
let prefix = process.env.USER_PREFIX;

const index = async function (req, res) {
    try {
        var cartItem = await UserService.getAllCartItems(req).withCartInfo().execute();
        // var cart = await UserService.getAllUsers().withId().withBasicInfo().execute();
        // console.log(cartItem);
        let data = {
            page: "mycart/index",
            page_title: "MyCart",
            url: req.url,
            cartItems: cartItem,
        };
        // console.log(cartItem);
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
        var cart = await UserService.addToCart(req);
        // console.log(cartItem);
        return res.json({
            status: true,
            message: "Product has been added successfully",
        });
    } catch (error) {
        console.log(error);
        req.flash("error", "Exception: " + error);
    }
};
const update = async function (req, res) {
    try {
        // console.log("User Cart COntroller");
      let data=await UserService.updateUserQuantity(req);
      req.flash("success", "Product has been updated successfully");
    } catch (error) {
      console.log(error);
      req.flash("error", "Exception: " + error);
    }
  };

const exists = async function (req, res) {
    try {
        console.log("Check");
        var exists = await UserService.existCartRecord(req);
        console.log(exists);
        if (exists) {
            res.send(false);
        } else {
            res.send(true);
        }
    } catch (error) {
        console.log(error);
        res.send(false);
    }
};

const destroy = async function (req, res) {
    try {
      let result = await UserService.removeCartItems(req);
      console.log("remove cart from controller -> ", result);
      return res.json({
        status: true,
        message: "Product has been deleted successfully",
      });
    } catch (error) {
      console.log(error);
      return res.json({ status: false, message: error });
    }
  };

module.exports = {
    index,
    store,
    update,
    exists,
    destroy
};
