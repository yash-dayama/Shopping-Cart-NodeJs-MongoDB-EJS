const { TableNames, TableFields } = require("../../utils/constants");
const Util = require("../../utils/utils");
const Product = require("../models/product");

const ProductService = class {
  static insertRecords = (data) => {
    return new ProjectionBuilder(async function () {
      let product = [];
      try {
        product = await Product.insertMany(data);
      } catch (e) {
        console.log(e);
        throw e;
      }
      return product;
    });
  };

  static getById = (id) => {
    return new ProjectionBuilder(async function () {
      let populateFields = this.populate;
      let projectionFields = { ...this };
      delete projectionFields.populate;

      return await Product.findOne(
        { [TableFields.ID]: id },
        this.populate(populateFields)
      );
    });
  };

  static getAll = (sortBy = {}, limit = 0, skip = 0) => {
    return new ProjectionBuilder(async function () {
      return await Product.find({ [TableFields.deletedAt]: "" }, this)
        .populate("category")
        .limit(parseInt(limit))
        .skip(parseInt(skip))
        .sort(sortBy);
    });
  };

  static updateProductRecord = async (req) => {
    let qry = {
      [TableFields.ID]: req.body.productId,
    };
    let result = await Product.findOneAndUpdate(
      qry,
      {
        [TableFields.title]: req.body.title,
        [TableFields.status]: 0,
        [TableFields.amount]: req.body.amount,
        [TableFields.quantity]: req.body.quantity,
      },
      {
        new: true,
      }
    );
    return result;
  };

  static deleteMyReferences = async (
    cascadeDeleteMethodReference,
    tableName,
    ...referenceId
  ) => {
    let records = undefined;
    switch (tableName) {
      case TableNames.Product:
        records = await Product.find(
          {
            [TableFields.ID]: { $in: referenceId },
          },
          { [TableFields.ID]: 1 }
        );
        break;
    }
    if (records && records.length > 0) {
      let deleteRecordIds = records.map((a) => a[TableFields.ID]);
      await Product.updateMany(
        { [TableFields.ID]: { $in: deleteRecordIds } },
        { [TableFields.deletedAt]: Util.getDate(), [TableFields.isDeleted]: 1 }
      );
      if (tableName != TableNames.Product) {
        //🧨 It means that the above objects are deleted on request from model's references (And not from model itself)

        cascadeDeleteMethodReference.call(
          {
            ignoreSelfCall: true,
          },
          TableNames.Product,
          ...deleteRecordIds
        ); // 🧨 So, let's remove references which points to this model
      }
    }
  };
};

const ProjectionBuilder = class {
  constructor(methodToExecute) {
    const projection = {
      populate: {},
    };
    const putInPopulate = (path, selection) => {
      if (projection.populate[path]) {
        let existingRecord = projection.populate[path];
        existingRecord.select += " " + selection;
        projection.populate[path] = existingRecord;
      } else {
        projection.populate[path] = { path: path, select: selection };
      }
    };
    this.execute = async () => {
      if (Object.keys(projection.populate) == 0) {
        delete projection.populate;
      } else {
        projection.populate = Object.values(projection.populate);
      }
      return await methodToExecute.call(projection);
    };
  }
};
module.exports = ProductService;
