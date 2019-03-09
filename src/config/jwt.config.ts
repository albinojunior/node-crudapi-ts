const passportJWT: any = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;

export default {
  secretOrKey: process.env.APP_SECRET_KEY || '',
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
};
