const {TableNames, TableFields, UserTypes, ValidationMsgs, Gender} = require("../../utils/constants");
const Util = require("../../utils/utils");
const User = require("../models/user");
const Product = require("../models/product");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Category = require("../models/category");

const UserService = class {
    static insertUserRecord = (req, type) => {
        return new ProjectionBuilder(async function () {
            if (type === UserTypes.Register) {
                var UserType = type;

                var user = new User();

                if (req.body.firstName) {
                    user[TableFields.firstName] = req.body.firstName;
                }
                if (req.body.middleName) {
                    user[TableFields.middleName] = req.body.middleName;
                }

                if (req.body.lastName) {
                    user[TableFields.lastName] = req.body.lastName;
                }
                if (req.body.birthDate) {
                    user[TableFields.birthDate] = req.body.birthDate;
                }

                if (req.body.gender) {
                    user[TableFields.gender] = req.body.gender;
                }
                if (req.body.email) {
                    user[TableFields.email] = req.body.email;
                }

                if (req.body.password) {
                    user[TableFields.password] = req.body.password;
                }

                user[TableFields.userType] = UserTypes.Register;
                // console.log(user);
                try {
                    await user.save();
                    return user;
                } catch (e) {
                    throw e;
                }
            }
        });
    };

    static addToCart = async (req) => {
        // console.log("from UserService addToCart => ", req.body);
        // console.log(req.user);

        let updateParams = {
            [TableFields.productId]: req.body.product_id,
            [TableFields.productName]: req.body.product_title,
            [TableFields.category]: req.body.product_category,
            [TableFields.productPrice]: req.body.product_amount,
            [TableFields.createdAt]: Util.getDate(),
            [TableFields.updatedAt]: Util.getDate(),
            [TableFields.deletedAt]: Util.getDate(),
        };

        let result = await User.findOneAndUpdate({_id: req.user._id}, {$push: {addToCart: updateParams}});
        // console.log("result", result);
        return result;
    };

    static getAllUsers = () => {
        return new ProjectionBuilder(async function () {
            return await User.find({[TableFields.deletedAt]: ""}, this);
        });
    };
    static getAllCartItems = (req) => {
        return new ProjectionBuilder(async function () {
            return await User.findById({_id: req.user._id}, this);
            // return await User.findOne({ _id: req.user._id }, { addToCart: 1 }).lean();
        });
    };

    static getUserByEmail = (userEmail, userType) => {
        return new ProjectionBuilder(async function () {
            return await User.findOne(
                {
                    email: userEmail,
                    [TableFields.deletedAt]: "",
                    [TableFields.userType]: userType,
                },
                this
            );
        });
    };
    static getByIntId = (id) => {
        return new ProjectionBuilder(async function () {
            //   return await User.findOne({ ["emailId"]: id }, this);
            return await User.findOne({[TableFields.email]: id}, this);
        });
    };

    static getUserByIdAndToken = (userId, token) => {
        return new ProjectionBuilder(async function () {
            return await User.findOne(
                {
                    [TableFields.ID]: userId,
                    // tokens: { $in: [token] },
                },
                this
            );
        });
    };

    //   static saveAuthToken = (userId, token, fcmToken = "") => {
    static saveAuthToken = (userId, token = "") => {
        return new ProjectionBuilder(async function () {
            let updateQry = {
                $push: {token: token},
            };
            console.log(token, userId);

            let query = await User.updateOne(
                {
                    [TableFields.ID]: userId,
                },
                updateQry
            );
            //   UserService.removeFCMTokenFromOtherUsers(userId, fcmToken);
            // UserService.TokenFromOtherUsers(userId);
        });
    };

     static updateUserQuantity = async (req) => {
        console.log(req.body);
        let incrementFlag = req.body.incrementFlag === 'true'; 
        let qry = incrementFlag ? 1 : -1; 
    
        let result = await User.findOneAndUpdate(
            {
                _id: req.user._id,
                "addToCart.productId": req.body.product_id,
            },
            {
                $inc: { "addToCart.$.quantity": qry },
                $set: { [TableFields.updatedAt]: Util.getDate() },
            }
        );
    
        return result;
    };
    
    static updateUserRecord = async (req) => {
        let qry = {
            [TableFields.ID]: req.body.userId,
        };

        let result = await User.findOneAndUpdate(
            qry,
            {
                [TableFields.firstName]: req.body.firstName,
                [TableFields.middleName]: req.body.middleName,
                [TableFields.lastName]: req.body.lastName,
                [TableFields.gender]: req.body.gender,
                [TableFields.birthDate]: Util.getDateFormat(new Date(req.body.birthDate)),
                [TableFields.email]: req.body.email,
                [TableFields.password]: req.body.password,
            },
            {
                new: true,
            }
        );

        return result;
    };

    static removeCartItems = (userId, productId) => {
        return new ProjectionBuilder(async function () {
            await User.findOneAndUpdate(
                {
                    [TableFields.ID]: userId,
                },
                {
                    $pull: {
                        [TableFields.addToCart]: {
                            [TableFields.productId]: productId,
                        },
                    },
                },
                {select: this, new: true}
            );
        });
    };

    static existCartRecord = async (req) => {
        const qry = {
            [TableFields.ID]: req.body.userId,
            [TableFields.deletedAt]: "",
            [TableFields.addToCart]: {
                $elemMatch: {
                    [TableFields.productId]: req.body.productId,
                },
            },
        };

        const update = {
            $set: {
                [TableFields.addToCart.$.quantity]: req.body.quantity,
            },
        };

        const result = await User.findOneAndUpdate(qry, update);

        if (result) {
            console.log("Value exists and has been updated");
        } else {
            console.log("Value doesn't exist");
        }
    };

    static existRecord = async (req) => {
        var condition = {
            [TableFields.ID]: req.body.userId,
            [TableFields.deletedAt]: "",
        };
        if (req.body.userId !== "undefined" && req.body.userId != "") {
            condition[TableFields.ID] = req.body.userId;
        } else {
            return 0;
        }
        return await User.countDocuments(condition);
    };

    static deleteMyReferences = async (cascadeDeleteMethodReference, tableName, ...referenceId) => {
        let records = undefined;
        switch (tableName) {
            case TableNames.User:
                records = await User.find(
                    {
                        [TableFields.ID]: {$in: referenceId},
                    },
                    {[TableFields.ID]: 1}
                );
                break;
        }
        if (records && records.length > 0) {
            let deleteRecordIds = records.map((a) => a[TableFields.ID]);
            await Product.updateMany(
                {[TableFields.ID]: {$in: deleteRecordIds}},
                {[TableFields.deletedAt]: Util.getDate(), [TableFields.isDeleted]: 1}
            );
            if (tableName != TableNames.User) {
                //🧨 It means that the above objects are deleted on request from model's references (And not from model itself)

                cascadeDeleteMethodReference.call(
                    {
                        ignoreSelfCall: true,
                    },
                    TableNames.User,
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
            projection[TableFields.firstName] = 1;
            projection[TableFields.middleName] = 1;
            projection[TableFields.lastName] = 1;
            projection[TableFields.birthDate] = 1;
            return this;
        };
        this.withEmail = () => {
            projection.email = 1;
            return this;
        };
        this.withGender = () => {
            projection[TableFields.gender] = 1;
            return this;
        };
        this.withPassword = () => {
            projection[TableFields.password] = 1;
            return this;
        };
        this.withUserType = () => {
            projection[TableFields.userType] = 1;
            return this;
        };
        this.withDeleted = () => {
            projection[TableFields.deletedAt] = 1;
            return this;
        };
        this.withPasswordResetToken = () => {
            projection[TableFields.passwordResetToken] = 1;
            return this;
        };
        this.withCartInfo = () => {
            projection[TableFields.addToCart] = 1;
            return this;
        };

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
module.exports = UserService;
