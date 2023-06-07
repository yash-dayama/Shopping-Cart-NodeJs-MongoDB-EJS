const General = {
  AdminEmail: "admin@gmail.com",
};
const ValidationMsgs = {
  firstNameEmpty: "First Name required!",
  lastNameEmpty: "Last Name required!",
  emailEmpty: "Email required!",
  birthDateEmpty: "Date Of Birth required!",
  genderEmpty: "Gender required!",
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
  productId: "productId",
  userId: "userId",
  firstName: "firstName",
  middleName: "middleName",
  lastName: "lastName",
  dateOfBirth: "dateOfBirth",
  gender: "gender",
  deletedAt: "deletedAt",
  userType: "userType",
  gender: "gender",
  password: "password",
  firstName: "firstName",
  middleName: "middleName",
  lastName: "lastName",
  birthDate: "birthDate",
  gender: "gender",
  email: "email",
  token: "token",
  passwordResetToken: "passwordResetToken",
  addToCart: "addToCart",
  productName: "productName",
  productPrice: "productPrice",
  subTotal: "subTotal",
  productDetails: "productDetails",
  totalPrice:"totalPrice"
  
};

const TableNames = {
  User: "users",
  Product: "products",
  Category: "categories",
  Order: "ordertable"
};

const status = {
  Active: 1,
  Unactive: 0,
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
  TableNames,
  status,
  Gender,
  ApiResponseCode,
  UserTypes,
  ValidationMsgs,
};
