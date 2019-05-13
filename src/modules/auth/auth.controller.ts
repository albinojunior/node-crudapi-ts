import { Request, Response } from "express";
import { compare, hash } from "bcryptjs";

import HttpController from "../../common/controllers/http";
import User from "../user/user.model";
import AuthService from "./auth.service";

export class AuthController extends HttpController {
  public service = AuthService;

  public authenticate = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    let messageError = "Usuário ou senha incorretos.";
    try {
      const { email, password } = req.body;

      const user = await User.scope("withPassword").findOne({
        where: { email }
      });
      if (!user) return this.returnUnauthorized(res, messageError);

      const match = await compare(password.toString(), user.password);
      if (!match) return this.returnUnauthorized(res, messageError);

      const access_token = await this.service.generateToken(email);

      return this.returnData(res, {
        access_token,
        auth_user: await User.findOne({ where: { email } })
      });
    } catch (err) {
      return this.returnServerError(res, err.message);
    }
  };

  public forgotPassword = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { email } = req.body;

      const user = await User.scope("withPassword").findOne({
        where: { email }
      });
      if (!user) return this.returnBadRequest(res, "Usuário inválido!");

      //creating reset token
      // const resetToken = await this.service.createResetToken(email);

      //sending email
      // await this.service.sendForgotPasswordEmail(email, resetToken);

      return this.returnMessage(
        res,
        "E-mail de recuperacão de senha enviado com sucesso!"
      );
    } catch (err) {
      return this.returnServerError(res, err.message);
    }
  };

  public resetPassword = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { token, password, confirm_password } = req.body;

      if (!token) return this.returnBadRequest(res, "Token inválido!");
      if (password !== confirm_password)
        return this.returnBadRequest(res, "Senhas não conferem.");

      const user = await User.scope("resetPassword").findOne({
        where: { reset_password_token: token }
      });
      if (!user) return this.returnBadRequest(res, "Token inválido!");

      const now = new Date();
      if (now > user.reset_password_expires)
        return this.returnBadRequest(res, "Token expirado!");

      await User.update(
        {
          password: await hash(password, 10),
          reset_password_expires: now.setHours(now.getHours() - 24)
        },
        { where: { id: user.id } }
      );

      return this.returnMessage(res, "Senha atualizada com sucesso!");
    } catch (err) {
      return this.returnServerError(res, err.message);
    }
  };
}

export default new AuthController();
