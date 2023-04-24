let CategoryService = require("../db/services/CategoryService");
const { TableNames } = require("../utils/constants");
const ServiceManager = require("../db/serviceManager");
const ProductService = require("../db/services/ProductService");

const index = async function (req, res) {
  try {
    var cat = await CategoryService.getAll()
      .withId()
      .withBasicInfo()
      .withStatus()
      .withImage()
      .withDeleted()
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
    var cat_ = await CategoryService.insertRecord(req).execute();
    if (cat_) {
      req.flash("success", "Category has been added successfully");
      // res.redirect(prefix + "/faqs");
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
    var cat = await CategoryService.getById(req.params.id).execute();
  } catch (error) {
    req.flash("error", "Exception: " + error);
  }
};

const update = async function (req, res) {
  try {
    await CategoryService.updateCategoryRecord(req.params.id, req);
    req.flash("success", "Category has been updated successfully");
  } catch (error) {
    console.log(error);
    req.flash("error", "Exception: " + error);
  }
};

const destroy = async function (req, res) {
  try {
    await ServiceManager.cascadeDelete(TableNames.Category, req.body.id);
    return res.json({
      status: true,
      message: "Category has been deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, message: error });
  }
};

const exists = async function (req, res) {
  try {
    var exists = await CategoryService.existRecord(req);

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
