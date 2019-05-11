import * as SMTPTransport from "nodemailer/lib/smtp-transport";

const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS } = process.env;

export const config: SMTPTransport.Options = {
  host: MAIL_HOST,
  port: Number(MAIL_PORT) || 465,
  auth: {
    user: MAIL_USER || "email@gmail.com",
    pass: MAIL_PASS || "password"
  }
};