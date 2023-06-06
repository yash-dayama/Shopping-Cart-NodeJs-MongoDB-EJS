const OrderTable = require("../db/models/orderTable");
var OrderTableService = require("../db/services/OrderTableService");
const Util = require("../utils/utils");
const fs = require("fs");
var path = require("path");
let prefix = process.env.USER_PREFIX;


const index = async function (req, res) {
    try {
        // console.log("checkout");
        let data = {
            page: "checkout/index",
            page_title: "Thankyou",
            url: req.url,
            data_value: data_value

        };
        // console.log("data", data);
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
        console.log("Check 1");
        let orderTable = (await OrderTableService.insertDataInOrderTable(req)).execute();
        console.log("orderTable", orderTable);
        return res.json({
            status: true,
            message: "Products has been checkout successfully",
        });
    } catch (error) {
        console.log(error);
        req.flash("error", "Exception: " + error);
    }
};

module.exports = {
    index,
    store,
};
