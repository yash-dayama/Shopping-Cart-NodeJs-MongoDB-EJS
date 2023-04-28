var mongoose = require("mongoose");
const { TableNames, TableFields, status } = require("../../utils/constants");

//define the schema for our product model
var productSchema = mongoose.Schema(
  {
    [TableFields.title]: {
      type: String,
      default: "",
    },
    [TableFields.shortDescription]: {
      type: String,
      default: "",
    },
    [TableFields.fullDescription]: {
      type: String,
      default: "",
    },
    [TableFields.status]: {
      type: [
        {
          type: Boolean,
          enum: [status.Active, status.Unactive],
        },
      ],
      default: status.Active,
    },
    [TableFields.amount]: {
      type: Number,
    },
    [TableFields.quantity]: {
      type: Number,
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
      default: "",
    },
    [TableFields.image]: {
      type: String,
    },
    [TableFields.category]: [
      {
        [TableFields.title]: {
          type: String,
          default: "",
        },
        [TableFields.categoryId]: {
          type: mongoose.Schema.Types.ObjectId,
          ref: TableName.Category,
          _id: false,
        },
        [TableFields.descriptionCategory]: {
          type: String,
          default: "",
        },
        [TableFields.image]: {
          type: String,
        },
        [TableFields.status]: {
          type: [
            {
              type: Boolean,
              enum: [status.Active, status.Unactive],
            },
          ],
          default: status.Active,
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
      },
    ],
  },
  {
    timestamps: true,
    toObject: {
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret.updatedAt;
      },
    },
  }
);

const Product = mongoose.model(TableNames.Product, productSchema);
module.exports = Product;
