import { ExtractJwt } from "passport-jwt";

export default {
  secretKey: process.env.APP_SECRET_KEY || '',
  getTokenFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};
