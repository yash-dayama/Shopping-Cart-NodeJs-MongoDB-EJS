let ProductService = require("../db/services/ProductService");
const { TableNames } = require("../utils/constants");
const ServiceManager = require("../db/serviceManager");

const index = async function (req, res) {
  try {
    var pro = await ProductService.getAll()
      .withId()
      .withBasicInfo()
      .withAmount()
      .withQuantity()
      .withStatus()
      .withImage()
      .withCategory()
      .execute();
  } catch (error) {
    req.flash("error", "Exception: " + error);
    // res.redirect("back");
  }
};

const create = async function (req, res) {
  try {
  } catch (error) {
    req.flash("error", "Exception: " + error);
    // res.redirect("back");
  }
};

const store = async function (req, res) {
  try {
    var pro_ = await ProductService.insertRecord(req).execute();
    if (pro_) {
      req.flash("success", "Product has been added successfully");
      // res.redirect(prefix + "/Products");
    } else {
      req.flash("error", "Something went wrong");
      // res.redirect("back");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Exception: " + error);
  }
};

const edit = async function (req, res) {
  try {
    var pro = await ProductService.getById(req.params.id).execute();
  } catch (error) {
    req.flash("error", "Exception: " + error);
  }
};

const update = async function (req, res) {
  try {
    await ProductService.updateProductRecord(req.params.id, req);
    req.flash("success", "Product has been updated successfully");
  } catch (error) {
    console.log(error);
    req.flash("error", "Exception: " + error);
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
