//Load HTTP module
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

var path = require("path");
var session = require("express-session");
const MongoStore = require("connect-mongo");
var flash = require("connect-flash");
var passport = require("passport");
const DB = require("./db/mongoose");
const Util = require("./utils/utils");
require("dotenv").config();

app.use(
  express.urlencoded({ extended: true, limit: "5gb", parameterLimit: 50000 })
); // To parse application/json
app.use(express.json({ limit: "5gb" }));

app.use(express.static(path.join(__dirname, "./public")));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");
app.use(
  session({
    secret: process.env.APP_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.Database_URL,
      ttl: 60 * 24 * 60 * 60 * 1000, // 60 days
    }),
  })
);

app.locals = {
  base_url: Util.getBaseURL(),
  admin_url: Util.getBaseURL() + process.env.ADMIN_PREFIX,
  assets_url: Util.getBaseURL() + "/",
  admin_prefix: process.env.ADMIN_PREFIX,
  venue_url: Util.getBaseURL() + process.env.VENUE_ADMIN_PREFIX,
  //   moment: require("moment"),
};

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//   require("./routes/venueAdminRoute")(app, passport); // uncomment if front web interface
// require("./routes/adminRoute")(app, passport);
// require("./routes/apiRoute")(app);

app.use(function (req, res, next) {
  res.status(404);
  res.format({
    html: function () {
      let data = {
        page: "404",
        page_title: "404 - Page not found",
        url: req.url,
      };
      res.render("errors/templates", {
        error: req.flash("error"),
        success: req.flash("success"),
        session: req.session,
        data: data,
      });
    },
    json: function () {
      res.json({ error: "Not found" });
    },
    default: function () {
      res.type("txt").send("Not found");
    },
  });
});

DB.initConnection(async () => {
  // const { ChatController } = require("./routes/socket");
  //   const { ChatController } = require("./controllers/Api/ChatController");
  const httpServer = require("http").createServer(app);
  //   new ChatController(httpServer);

  httpServer.listen(process.env.PORT, function () {
    console.log("Server is running on", Util.getBaseURL());
  });
});
