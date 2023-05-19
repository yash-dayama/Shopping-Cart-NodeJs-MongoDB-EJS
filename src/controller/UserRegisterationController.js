var UserService = require("../db/services/UserService");
const {UserTypes} = require("../utils/constants");
const Util = require("../utils/utils");
const fs = require("fs");
var path = require("path");
let prefix = process.env.USER_PREFIX;

const index = async function (req, res) {
    try {
        var registerUser = await UserService.get;
    } catch (error) {}
};

const create = async function (req, res) {
    try {
        let registerUser = await UserService.getAllUsers()
        .withId()
        .withBasicInfo()
        .withGender()
        .withEmail()
        .withPassword()
        .execute();
        let data = {
            page: "auth/login",
            page_title: "Register User",
            // faq: faq,
            url: req.url,
            registerUser: registerUser,
        };
        res.render("user/layouts/templates", {
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
        console.log("user/register");
        var registerUser = await UserService.insertUserRecord(req).execute();
        console.log(req);
        if (registerUser) {
            req.flash("success", "User has been registered successfully");
            res.redirect(prefix + "/login");
        } else {
            req.flash("error", "Something went wrong");
            res.redirect("back");
        }
    } catch (error) {
        console.log(error);
        req.flash("error", "Exception: " + error);
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
    
    exists,
};
