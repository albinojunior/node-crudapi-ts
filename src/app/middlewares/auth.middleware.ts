import { NextFunction, Request, Response } from "express";
import { ControllerReturns } from "nodeapi-cruds";
import { verify } from "jsonwebtoken";
import jwt from "../utils/jwt";
import User from "../modules/user/user.model";

export class AuthMiddleware extends ControllerReturns {

  /**
   *
   * @param req
   */
  getAuthUser = async (req: Request): Promise<User | null> => {
    const token = this.getToken(req);
    return await this.getAuthUserByToken(token);
  };

  /**
   *
   * @param token
   */
  getAuthUserByToken = async (token: string): Promise<User | null> => {
    const decoded: any = verify(token, jwt.secretKey);

    if (decoded.exp <= Date.now())
      throw new Error('Acesso Expirado, faça login novamente');

    return await User.findOne({ where: { email: decoded.email } });
  };

  /**
   *
   * @param req
   */
  getToken = (req: Request): string => {
    const token = jwt.getTokenFromRequest(req);
    if (!token) throw new Error('Token is required');

    return token;
  };

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  verifyAuth = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    if (req.method == 'OPTIONS') return next();

    try {
      const authUser = await this.getAuthUser(req);

      if (authUser) {
        res.locals = { authUser };
        return next();
      } else {
        return this.returnUnauthorized(res);
      }

    } catch (err) {
      return this.returnUnauthorized(res, err.message);
    }
  };

}

export default new AuthMiddleware();
