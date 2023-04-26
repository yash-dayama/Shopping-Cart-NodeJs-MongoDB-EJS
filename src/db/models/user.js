var mongoose = require("mongoose");
const {
  TableName,
  TableFields,
  UserTypes,
  ValidationMsgs,
  Gender,
} = require("../../utils/constants");
const Util = require("../../utils/utils");

var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // To generate Hash

//define the schema for our User model
var userSchema = mongoose.Schema(
  {
    [TableFields.firstName]: {
      type: String,
      trim: true,
      required: [true, ValidationMsgs.firstNameEmpty],
      default: "",
    },
    [TableFields.middleName]: {
      type: String,
      trim: true,
      // required: [true, ValidationMsgs.firstNameEmpty],
      default: "",
    },
    [TableFields.lastName]: {
      type: String,
      trim: true,
      required: [true, ValidationMsgs.lastNameEmpty],
      default: "",
    },
    [TableFields.birthDate]: {
      type: Date,
      required: [false, ValidationMsgs.birthDateEmpty],
    },
    [TableFields.gender]: {
      type: Number,
      enum: [
        Gender.Male,
        Gender.Female,
        Gender.Intersex,
        Gender.NonBinary,
        Gender.None,
      ],
      default: Gender.Male,
    },
    [TableFields.userType]: {
      type: [
        {
          type: Number,
          enum: [UserTypes.Admin, UserTypes.Register, UserTypes.Guest],
        },
      ],
      // default: []
    },
    [TableFields.email]: {
      type: String,
      trim: true,
      default: "",
      required: [false, ValidationMsgs.emailEmpty],
    },
    [TableFields.password]: {
      type: String,
      trim: true,
    },
    [TableFields.token]: [
      {
        _id: false,
        type: String,
      },
    ],
    [TableFields.passwordResetToken]: {
      type: String,
      trim: true,
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
      trim: true,
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
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret.updatedAt;
        delete ret.password;
        delete ret.passwordResetToken;
      },
    },
  }
);

// Generating a hash for user password
userSchema.methods.generateHash = async function (password) {
  return await bcrypt.hash(password, 8);
};

// Check password is valid
userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.createAuthToken = function () {
  const token = jwt.sign(
    {
      [TableFields.ID]: this[TableFields.ID].toString(),
    },
    process.env.JWT_PRIVATE_KEY
  );
  return token;
};

userSchema.methods.isAdmin = function () {
  return this[TableFields.userType] == UserTypes.Admin;
};
userSchema.methods.isAdmin = function () {
  return this[TableFields.userType] == UserTypes.Guest;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isNew) {
    user.created_at = user.updatedAt = Util.getDate();
  } else {
    user.updatedAt = Util.getDate();
  }

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model(TableName.User, userSchema);
module.exports = User;
