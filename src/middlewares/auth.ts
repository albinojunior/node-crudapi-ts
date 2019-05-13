import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import User from "../modules/user/user.model";
import HttpController from "../common/controllers/http";

const { APP_SECRET_KEY } = process.env;

export class AuthMiddleware extends HttpController {
  public secretKey: string = APP_SECRET_KEY || "";

  /**
   *
   * @param req
   */
  public getTokenFromRequest(req: Request): string | null {
    let authorization = req.header("authorization");
    let token = authorization ? authorization.split(" ") : [];
    return token.length ? token[1] : null;
  }

  /**
   *
   * @param req
   */
  public getAuthUser = async (req: Request): Promise<User | null> => {
    const token = this.getToken(req);
    return await this.getAuthUserByToken(token);
  };

  /**
   *
   * @param token
   */
  public getAuthUserByToken = async (token: string): Promise<User | null> => {
    const decoded: any = verify(token, this.secretKey);

    if (decoded.exp <= Date.now())
      throw new Error("Acesso Expirado, faça login novamente");

    return await User.findOne({ where: { email: decoded.email } });
  };

  /**
   *
   * @param req
   */
  public getToken = (req: Request): string => {
    const token = this.getTokenFromRequest(req);
    if (!token) throw new Error("Token is required");

    return token;
  };

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  public verifyAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
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
