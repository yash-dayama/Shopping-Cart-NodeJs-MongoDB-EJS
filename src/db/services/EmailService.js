var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
const Util = require("../../utils/utils");
const UserService = require("../services/UserService");

/*var transporter = nodemailer.createTransport(
    smtpTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
        secure: true,
      })
)*/

let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
    secure: true,
});

try {
    let info = transporter.sendMail({
        from: '"Admin 👻" <imperoit@gmail.com>',
        to: req.body.email,
        subject: "Hello ✔",
        text: "Welcome",
        html: "<b>Your order has been placed Successfully</b>",
    });

    console.log("Message sent: %s", info.messageId);
} catch (error) {
    console.log("Error: %s", error);
}
