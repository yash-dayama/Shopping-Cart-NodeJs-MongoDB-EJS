const {TableNames, TableFields} = require("../../utils/constants");
const Util = require("../../utils/utils");
const OrderTable = require("../models/orderTable");

const OrderTableService = class {
    static insertDataInOrderTable = async (req) => {
      return new ProjectionBuilder(async function () {
        try {
  
          const productDetails = req.body.data_value.map((product) => ({
            productId: product.productId,
            productName: product.productName,
            category: product.category,
            productPrice: product.productPrice,
            createdAt: Util.getDate(),
            updatedAt: Util.getDate(),
            deletedAt: Util.getDate(),
          }));
  
          const order = new OrderTable({
            userId: req.user._id,
            productDetails: productDetails,
            amount: req.body.subtotal,
          });
  
          const result = await order.save();
          return result;
        } catch (error) {
          console.error(error);
          throw error;
        }
      });
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

        // this.withProductDetails = () => {
        //     projection[TableFields.productId] = 1;
        //     projection[TableFields.productName] = 1;
        //     projection[TableFields.productPrice] = 1;
        //     projection[TableFields.category] = 1;
        //     return this;
        // };
        // this.withAmount = () => {
        //     projection[TableFields.amount] = 1;
        //     return this;
        // };
        // this.withQuantity = () => {
        //     projection[TableFields.quantity] = 1;
        //     return this;
        // };

        const putInPopulate = (path, selection) => {
            if (projection.populate[path]) {
                let existingRecord = projection.populate[path];
                existingRecord.select += " " + selection;
                projection.populate[path] = existingRecord;
            } else {
                projection.populate[path] = {path: path, select: selection};
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
module.exports = OrderTableService;
