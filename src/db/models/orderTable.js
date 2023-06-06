var mongoose = require("mongoose");
const {TableNames, TableFields, UserTypes, ValidationMsgs} = require("../../utils/constants");
const Util = require("../../utils/utils");

var orderSchema = mongoose.Schema({
    [TableFields.userId]: {
        type: mongoose.Schema.Types.ObjectId,
        ref: TableNames.User,
        _id: false,
    },
    [TableFields.productDetails]: [
        {
            [TableFields.productId]: {
                type: mongoose.Schema.Types.ObjectId,
                ref: TableNames.Product,
                _id: false,
            },
            [TableFields.productName]: {
                type: String,
                default: "",
            },
            [TableFields.productPrice]: {
                type: String,
                default: "",
            },
            [TableFields.category]: {
                type: String,
                default: "",
            },
            [TableFields.createdAt]: {
                type: Date,
                trim: true,
                default: "",
            },
            [TableFields.updatedAt]: {
                type: Date,
                trim: true,
                default: "",
            },
            [TableFields.deletedAt]: {
                type: String,
                trim: true,
                default: "",
            },
        },
    ],
    [TableFields.amount]: {
        type: Number,
    },
    [TableFields.quantity]: {
        type: Number,
        default: "1",
    },
    [TableFields.createdAt]: {
        type: Date,
        trim: true,
        default: "",
    },
    [TableFields.updatedAt]: {
        type: Date,
        trim: true,
        default: "",
    },
    [TableFields.deletedAt]: {
        type: String,
        trim: true,
        default: "",
    },
},
{
    timestamps: true,
    toObject: {
        transform: function (doc, ret) {
            delete ret.__v;
            delete ret.updatedAt;
        },
    },
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
            delete ret.updatedAt;
            delete ret.password;
            delete ret.passwordResetToken;
        },
    },
});
const Order = mongoose.model(TableNames.Order, orderSchema);
module.exports = Order;
