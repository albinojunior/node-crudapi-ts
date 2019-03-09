import { resolve } from "path";
import { config } from "../../config/mailer.config";

const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

const mailer = nodemailer.createTransport(config);

const path = resolve("src/resources/mail");

mailer.use("compile", hbs({
  viewEngine: {
    extName: '.html',
    partialsDir: path,
    layoutsDir: path
  },
  viewPath: path,
  extName: ".html"
}));

export default mailer;