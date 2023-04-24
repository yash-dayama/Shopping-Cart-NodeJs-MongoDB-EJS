const ProductController = require("../controller/ProductController");
let prefix = process.env.Product_Prefix;

let router = function (app) {
  /**---------------------------------Product----------------------------------- */
  app.all(prefix + "/all", ProductController.index);

  app.get(prefix + "/add", ProductController.create);
  app.post(prefix + "/store", ProductController.store);
  app.get(prefix + "/edit/:id", ProductController.edit);
  app.post(prefix + "/update", ProductController.update);
  app.post(prefix + "/delete", ProductController.destroy);
  app.post(prefix + "/exists", ProductController.exists);
};

module.exports = router;
