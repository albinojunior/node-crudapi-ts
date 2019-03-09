import { verify } from "jsonwebtoken";
import User from "../modules/user/user.model";
import cfg from "../../config/jwt.config";
import { NextFunction, Request, Response } from "express-serve-static-core";

export class AuthMiddleware {

  public getAuthUser = async (req: Request): Promise<User | any> => {
    const token = this.getToken(req);
    return await this.getAuthUserByToken(token);
  }

  public getAuthUserByToken = async (token: any): Promise<User | any> => {
    const decoded: any = verify(token, cfg.secretOrKey);

    if (decoded.exp <= Date.now())
      throw new Error('Acesso Expirado, faça login novamente');

    return await User.findOne({ where: { email: decoded.email } });
  }

  public getToken = (req: Request): any => {
    const token = cfg.jwtFromRequest(req);
    if (!token) throw new Error('Token is required');

    return token;
  }

  public verifyAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (req.method == 'OPTIONS') return next();

    try {
      const token = this.getToken(req);
      const authUser = await this.getAuthUserByToken(token);

      if (authUser) {
        res.locals = { authUser };
        next();
      } else {
        return this.dispatchUnauthorizedError(res);
      }

    } catch (err) {
      return this.dispatchUnauthorizedError(res);
    }
  };

  private dispatchUnauthorizedError = (res: Response) => {
    return res.status(401).send('Unauthozired');
  };

}

const authMiddleware = new AuthMiddleware();

//export singleton of middleware class
export default authMiddleware;

//export default function middleware
export const auth = authMiddleware.verifyAuth;
