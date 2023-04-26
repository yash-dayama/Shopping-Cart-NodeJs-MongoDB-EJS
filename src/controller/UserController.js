let UserService = require("../db/services/UserService");
const {
  TableNames,
  TableFields,
  UserTypes,
  ValidationMsgs,
  Gender,
} = require("../../utils/constants");
const ServiceManager = require("../db/serviceManager");

const index = async function (req, res) {
  try {
    var user = await UserService.getAll()
      .withId()
      .withBasicInfo()
      .withEmail()
      .withGender()
      .withPassword()
      .withUserType()
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
    var user_ = await UserService.insertRecord(req).execute();
    if (user_) {
      req.flash("success", "User has been added successfully");
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
    var user = await UserService.getById(req.params.id).execute();
  } catch (error) {
    req.flash("error", "Exception: " + error);
  }
};

const update = async function (req, res) {
  try {
    await UserService.updateUserRecord(req.params.id, req);
    req.flash("success", "User has been updated successfully");
  } catch (error) {
    console.log(error);
    req.flash("error", "Exception: " + error);
  }
};

const destroy = async function (req, res) {
  try {
    await UserService.cascadeDelete(TableNames.User, req.body.id);
    return res.json({
      status: true,
      message: "User has been deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, message: error });
  }
};

const exists = async function (req, res) {
  try {
    var exists = await UserService.existRecord(req);

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
