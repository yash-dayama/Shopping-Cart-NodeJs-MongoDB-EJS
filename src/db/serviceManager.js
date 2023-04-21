const { TableNames } = require("../utils/utils");
const allServices = [
  // To append the tables need to be deleted

  [TableNames.Product, require("./services/ProductService").deleteMyReferences],
  [
    TableNames.Category,
    require("./services/CategoryService").deleteMyReferences,
  ],
];
const mCascadeDelete = async function (tableName, ...deletedRecordIds) {
  deletedRecordIds = deletedRecordIds.filter((a) => a != undefined);
  if (deletedRecordIds.length > 0) {
    if (this.ignoreSelfCall) {
      //To activate this, you need to call this function using .apply({ignoreSelfCall:true}) or .call({ignoreSelfCall:true}) or .bind({ignoreSelfCall:true})
      allServices.forEach(async (a) => {
        if (a[0] != tableName) {
          try {
            await a[1](mCascadeDelete, tableName, ...deletedRecordIds);
          } catch (e) {
            console.log("CascadeDelete Error (1) ", "(" + a[0] + ")", e);
            throw e;
          }
        }
      });
    } else {
      allServices.forEach(async (a) => {
        try {
          await a[1](mCascadeDelete, tableName, ...deletedRecordIds);
        } catch (e) {
          // console.log(e);
          // console.log("CascadeDelete Error (2) ", "(" + a[0] + ")", e);
          throw e;
        }
      });
    }
  }
};
exports.cascadeDelete = mCascadeDelete;
