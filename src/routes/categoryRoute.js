const CategoryController = require("../controller/CategoryController");
let prefix = process.env.Category_Prefix;

let router = function (app) {
  /**---------------------------------Category----------------------------------- */
  app.all(prefix + "/all", CategoryController.index);

  app.get(prefix + "/add", CategoryController.create);
  app.post(prefix + "/store", CategoryController.store);
  app.get(prefix + "/edit/:id", CategoryController.edit);
  app.post(prefix + "/update", CategoryController.update);
  app.post(prefix + "/delete", CategoryController.destroy);
  app.post(prefix + "/exists", CategoryController.exists);
};

module.exports = router;
