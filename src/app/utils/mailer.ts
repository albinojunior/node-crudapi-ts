import { resolve } from "path";
import { config } from "../../config/mailer.config";
import { createTransport } from "nodemailer";
import * as Mail from "nodemailer/lib/mailer";

const hbs = require("nodemailer-express-handlebars");

const mailer: Mail = createTransport(config);

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