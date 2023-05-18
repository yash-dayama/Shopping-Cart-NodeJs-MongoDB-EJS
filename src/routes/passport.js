var LocalStrategy = require("passport-local").Strategy;
const utils = require("../utils/utils");
const UserServices = require("../db/services/UserService");
const {UserTypes, TableFields} = require("../utils/constants");

// -> user model import
const User = require("../db/models/user");
// -> user service import

//expose this function to our app using module.exports
module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    /*passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });*/
    passport.deserializeUser(function (id, done) {
        User.findById(id)
        .then((user) => {
            done(null, user);
        })
        .catch((err) => {
            done(err, null);
        });
    });

    /* Admin Login */
    passport.use(
        "userLogin",
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
                passReqToCallback: true, // allows us to pass back the entire request to the callback
            },
            async function (req, email, password, done) {
                // callback with email and password in form
                /*UserServices ko define karna baki haii & getUserByEmail */
                let user = await UserServices.getUserByEmail(email, UserTypes.Admin)
                .withEmail()
                .withPassword()
                .withUserType()
                // .withName()
                .execute();
                // console.log(user);
                if (!user)
                    return done(
                        null,
                        false,
                        req.flash("error")
                        // req.flash("error", "These credentials do not match our records")
                    ); // req.flash is the way to set flashdata using connect-flash
                if (!(await user.isValidPassword(req.body.password)))
                    return done(
                        null,
                        false,
                        req.flash("error", "Password is incorrect, Please enter correct password")
                    ); // Create a loginMessage and save it to session as flashData
                // the userType herre is that which is define in model
                if (!user[TableFields.userType].includes(1))
                    return done(null, false, req.flash("error", "You don't have permission to access this page"));
                req.session.user = user;

                return done(null, user);
            }
        )
    );

    /* Register User Login */
    passport.use(
        "userRegister",
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
                passReqToCallback: true, // allows us to pass back the entire request to the callback
            },
            async function (req, email, password, done) {
                // callback with email and password from our form
                let user = await UserServices.getUserByEmail(email, UserTypes.User)
                .withEmail()
                .withPassword()
                .withUserType()
                .execute();
                if (!user) {
                    return done(null, false, 
                      //req.flash("error", "These credentials do not match our records.")
                      );
                }
                if (!(await user.isValidPassword(req.body.password))) {
                    return done(null, false, 
                      // req.flash("error", "Password is wrong, Please enter correct password.")
                      );
                }
                if (!user[TableFields.userType].includes(1)) {
                    return done(null, false, 
                      // req.flash("error", "You don't have permission to access this page.")
                      );
                }
                req.session.user = user;
                return done(null, user);
            }
        )
    );
};
