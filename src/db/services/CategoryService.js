const { TableNames, TableFields } = require("../../utils/constants");
const Util = require("../../utils/utils");
const Category = require("../models/category");

const CategoryService = class {
  static insertRecord = (req) => {
    return new ProjectionBuilder(async function () {
      let category = [];
      try {
        category = await Category.insertMany(req.body.category);
        console.log(req.body);
      } catch (e) {
        console.log(e);
        throw e;
      }
      return category;
    });
  };

  static getById = (id) => {
    return new ProjectionBuilder(async function () {
      let populateFields = this.populate;
      let projectionFields = { ...this };
      delete projectionFields.populate;

      return await Category.findOne(
        { [TableFields.ID]: id },
        this.populate(populateFields)
      );
    });
  };

  static getAll = (sortBy = {}, limit = 0, skip = 0) => {
    return new ProjectionBuilder(async function () {
      return await Category.find({ [TableFields.deletedAt]: "" }, this)
        .limit(parseInt(limit))
        .skip(parseInt(skip))
        .sort(sortBy);
    });
  };

  static updateCategoryRecord = async (req) => {
    let qry = {
      [TableFields.ID]: req.body.categoryId,
    };
    let result = await Category.findOneAndUpdate(
      qry,
      {
        [TableFields.title]: req.body.title,
        [TableFields.status]: 0,
        [TableFields.shortDescription]: req.body.shortDescription,
      },
      {
        new: true,
      }
    );
    return result;
  };

  static existRecord = async (req) => {
    var condition = {
      [TableFields.title]: {
        $regex: new RegExp("^" + req.body.title.toLowerCase(), "i"),
      },
      [TableFields.question]: req.body.question,
      [TableFields.deletedAt]: "",
    };
    if (req.body.id !== "undefined" && req.body.id != "") {
      condition[TableFields.ID] = { $ne: req.body.id };
    }
    return await Category.countDocuments(condition);
  };

  static deleteMyReferences = async (
    cascadeDeleteMethodReference,
    tableName,
    ...referenceId
  ) => {
    let records = undefined;
    switch (tableName) {
      case TableNames.Category:
        records = await Category.find(
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
      if (tableName != TableNames.Category) {
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

    this.withId = () => {
      projection[TableFields.ID] = 1;
      return this;
    };

    this.withBasicInfo = () => {
      projection[TableFields.title] = 1;
      projection[TableFields.descriptionCategory] = 1;
      return this;
    };

    this.withImage = () => {
      projection[TableFields.image] = 1;
      return this;
    };

    this.withStatus = () => {
      projection[TableFields.status] = 1;
      return this;
    };

    this.withDeleted = () => {
      projection[TableFields.deletedAt] = 1;
      return this;
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
module.exports = CategoryService;
