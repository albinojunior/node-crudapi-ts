export const config = {
  service: 'Gmail',
  auth: {
    user: process.env.MAIL_USER || "email@gmail.com",
    pass: process.env.MAIL_PASS || "password"
  }
}