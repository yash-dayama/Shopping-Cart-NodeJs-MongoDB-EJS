var mongoose = require("mongoose");
const { TableName, TableFields, status } = require("../../utils/constants");

//define the schema for our product model
var categorySchema = mongoose.Schema(
  {
    [TableFields.title]: {
      type: String,
      default: "",
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
    [TableFields.deletedAt]: {
      type: String,
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
  }
);

const Category = mongoose.model(TableName.Category, categorySchema);
module.exports = Product;
