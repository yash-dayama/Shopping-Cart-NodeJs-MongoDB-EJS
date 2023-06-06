const {TableNames, TableFields} = require("../../utils/constants");
const Util = require("../../utils/utils");
const OrderTable = require("../models/orderTable");

/*const OrderTableService = class {
    static insertDataInOrderTable = async (req) => {
        return new ProjectionBuilder(async function () {
            console.log("from OrderTable => ", req.body);
            // console.log(req.user);

            let updateParams = {
                [TableFields.productId]: req.body.data_value.productId,
                [TableFields.productName]: req.body.data_value.productName,
                [TableFields.category]: req.body.data_value.product_category,
                [TableFields.productPrice]: req.body.data_value.product_amount,
                [TableFields.createdAt]: Util.getDate(),
                [TableFields.updatedAt]: Util.getDate(),
                [TableFields.deletedAt]: Util.getDate(),
            };

            let result = await OrderTable.insertMany({_id: req.user._id}, {$push: {productDetails: updateParams}}, {amount: req.user.subtotal});
            console.log("result", result);
            return result;
        });
    };
};*/

const OrderTableService = class {
    static insertDataInOrderTable = async (req) => {
      return new ProjectionBuilder(async function () {
        try {
          console.log("from OrderTable => ", req.body);
  
          const productDetails = req.body.data_value.map((product) => ({
            productId: product.productId,
            productName: product.productName,
            category: product.category,
            productPrice: product.productPrice,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: new Date(),
          }));
  
          const order = new OrderTable({
            userId: req.user._id,
            productDetails: productDetails,
            amount: req.body.subtotal,
          });
  
          const result = await order.save();
          console.log("result", result);
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
