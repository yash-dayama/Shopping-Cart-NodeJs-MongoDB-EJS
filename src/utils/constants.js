const General = {
  AdminEmail: "admin@gmail.com",
};

const TableFields = {
  ID: "_id",
  title: "title",
  shortDescription: "shortDescription",
  fullDescription: "fullDescription",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  category: "category",
  amount: "amount",
  quantity: "quantity",
  image: "image",
  descriptionCategory: "descriptionCategory",
  categoryId: "categoryId",
  firstName: "firstName",
  middleName: "middleName",
  lastName: "lastName",
  dateOfBirth: "dateOfBirth",
  gender: "gender",
  deletedAt: "deletedAt",
};

const TableNames = {
  User: "users",
  Product: "products",
  Category: "categories",
};

const status = {
  Active: 0,
  Unactive: 1,
};
const UserTypes = {
  Admin: 1,
  Register: 2,
  Guest: 3,
};

const ApiResponseCode = {
  ResponseFail: 0,
  ClientOrServerError: 400,
  ResponseSuccess: 200,
  AuthError: 401,
  AccountDeleted: 403,
  NotFound: 404,
  ValidationMsg: 422,
  UnderMaintanance: 503,
  ForceUpdate: 426,
};

const Gender = {
  Male: 1,
  Female: 2,
  Intersex: 3,
  NonBinary: 4,
  None: 5,
};

module.exports = {
  General,
  TableFields,
  TableName,
  status,
  Gender,
  ApiResponseCode,
  UserTypes,
};
