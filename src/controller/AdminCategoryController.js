let CategoryService = require("../db/services/CategoryService");
let ServiceManager = require("../db/serviceManager");
const { TableNames } = require("../utils/constants");
let prefix = process.env.ADMIN_PREFIX;

const index = async function (req, res) {
  try {
    var cat = await CategoryService.getAll()
      .withId()
      .withBasicInfo()
      .withStatus()
      .withImage()
      .execute();

    let data = {
      page: "category/index",
      page_title: "Category",
      url: req.url,
      category: cat,
    };
    res.render("admin/layouts/templates", {
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
    let data = {
      page: "category/addCategory",
      page_title: "Add Category ",
      url: req.url,
    };
    res.render("admin/layouts/templates", {
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
    var cat_ = await CategoryService.insertRecord(req).execute();
    if (cat_) {
      req.flash("success", "Category has been added successfully");
      res.redirect(prefix + "/category");
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
    var cat = await CategoryService.getById(req.params.id).execute();
    let data = {
      page: "category/addCategory",
      page_title: "Edit Category",
      url: req.url,
      category: cat,
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
    await CategoryService.updateCategoryRecord(req.params.id, req);
    req.flash("success", "Category has been updated successfully");
    res.redirect(prefix + "/category");
  } catch (error) {
    console.log(error);
    req.flash("error", "Exception: " + error);
    res.redirect("back");
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
