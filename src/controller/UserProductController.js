let ProductService = require("../db/services/ProductService");
let CategoryService = require("../db/services/CategoryService");
let UserService = require("../db/services/UserService");
let ServiceManager = require("../db/serviceManager");
const { TableNames } = require("../utils/constants");
let prefix = process.env.USER_PREFIX;

const index = async function (req, res) {
  try {
    var product = await ProductService.getAll()
      .withId()
      .withBasicInfo()
      .withAmount()
      .withQuantity()
      .withStatus()
      .withImage()
      .withCategory()
      .execute();
// console.log(product);
    let data = {
      page: "product/index",
      page_title: "Products",
      url: req.url,
      products: product,
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

const create = async function (req, res) {
  try {
    let cart =  await UserService.addToCart().withId().withBasicInfo().execute()
    let data = {
      page: "mycart/index",
      page_title: "Cart ",
      // faq: faq,
      url: req.url,
      cart: cart
    };
    console.log(cart);
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
    console.log(req);
    var cart = await UserService.addToCart(req).execute();
    if (cart) {
      req.flash("success", "Product has been added successfully");
      res.redirect(prefix + "/cart");
    } else {
      req.flash("error", "Something went wrong");
      res.redirect("back");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Exception: " + error);
  }
};

const edit = async function (req, res) {
  try {
    var product = await ProductService.getById(req.params.id).execute();
    let data = {
      page: "product/addProduct",
      page_title: "Edit Product",
      url: req.url,
      products: product,
    };
    res.render("admin/layouts/templates", {
      error: req.flash("error"),
      success: req.flash("success"),
      session: req.session,
      data: data,
    });
  } catch (error) {
    req.flash("error", "Exception: " + error);
  }
};

const update = async function (req, res) {
  try {
    await ProductService.updateProductRecord(req.body.id, req);
    req.flash("success", "Product has been updated successfully");
    res.redirect(prefix + "/product");
  } catch (error) {
    console.log(error);
    req.flash("error", "Exception: " + error);
    res.redirect("back");
  }
};

const destroy = async function (req, res) {
  try {
    await ServiceManager.cascadeDelete(TableNames.Product, req.body.id);
    return res.json({
      status: true,
      message: "Product has been deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, message: error });
  }
};

const exists = async function (req, res) {
  try {
    var exists = await ProductService.existRecord(req);

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

module.exports = {
  index,
  create,
  store,
  edit,
  update,
  destroy,
  exists,
};
