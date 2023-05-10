var UserService = require("../db/services/UserService");
const { UserTypes } = require("../utils/constants");
// const storage = require("../utils/storage");
const Util = require("../utils/utils");
const fs = require("fs");
var path = require("path");
let prefix = process.env.ADMIN_PREFIX;
const dashboard = async function (req, res) {
  try {
    let data = {
      page: "dashboard",
      page_title: "Dashboard",
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
const editPageContent = async function (req, res) {
  try {
    let pagecontent = "";
    page_title = req.url;
    page_title = page_title.replace(prefix + "/edit/", "");

    let file_name = page_title;
    file_name = file_name.replace("-&-", "-") + ".txt";
    page_title = page_title.replace("-", " ");
    page_title = page_title.toUpperCase();

    var filePath = path.join(__dirname, "..", "storage", "app", file_name);
    if (fs.existsSync(filePath)) {
      pagecontent = fs.readFileSync(filePath, "utf8");
    }
    let data = {
      page: "pages/editPage",
      page_title: "Edit page content",
      url: req.url,
      pagecontent: pagecontent,
      page_heading: page_title,
      file_name: file_name,
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
const savepageContent = async function (req, res) {
  try {
    var filePath = path.join(
      __dirname,
      "..",
      "storage",
      "app",
      req.body.file_name
    );
    if (fs.existsSync(filePath)) {
      fs.writeFile(filePath, req.body.page_content, function (err) {
        if (err) throw err;
      });
    } else {
      fs.writeFile(filePath, req.body.page_content, function (err) {
        if (err) throw err;
      });
    }

    req.flash(
      "success",
      req.body.page_title + " page content saved successfully"
    );
    res.redirect(prefix + "/dashboard");
  } catch (error) {
    req.flash("error", "Exception: " + error);
    res.redirect("back");
  }
};

const saveSettings = async (req, res) => {
  try {
    var settings = await AppSettingsService.updateRecord(req.body.id, req);
    req.flash("success", "App Settings has been updated successfully");
    res.redirect(prefix + "/dashboard");
  } catch (error) {
    req.flash("error", "Exception: " + error);
    res.redirect("back");
  }
};

module.exports = {
  dashboard,
  editPageContent,
  savepageContent,
  saveSettings
};
