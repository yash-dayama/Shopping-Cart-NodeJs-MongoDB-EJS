const OrderTable = require("../db/models/orderTable");
var OrderTableService = require("../db/services/OrderTableService");
const UserService = require("../db/services/UserService");
const Util = require("../utils/utils");
const fs = require("fs");
var path = require("path");
let prefix = process.env.USER_PREFIX;

const store = async function (req, res) {
    try {
        let orderTable = (await OrderTableService.insertDataInOrderTable(req)).execute();
        let emptyCart = await UserService.addToCartNull(req)
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
    store,
};
