import User from "../user/user.model";
import Service from "../../../common/Service";
import mailer from "../../utils/mailer";
import { sign } from "jsonwebtoken";
import cfg from "../../../config/jwt.config";
import { AES } from "crypto-js";

class AuthService extends Service {

  model: any = User;
  modelName: string = "Usuário";
  filters: any [] = [];

  forgotEmailConfig: any = {
    from: "no-reply <no-reply@mail.com>",
    subject: "Recuperacão de senha",
    template: "auth/forgot_password"
  };

  public sendForgotPasswordEmail = async (to: string, token: any): Promise<any> => {
    await mailer.sendMail({
      ...this.forgotEmailConfig,
      to,
      context: { token }
    });
  };

  public generateToken = async (email: string): Promise<any> => {
    const now = new Date();
    const expires_in = now.setHours(now.getHours() + 1);
    const token = sign({ email, exp: expires_in }, cfg.secretOrKey);

    return { token, expires_in }
  };


  public createResetToken = async (email: string): Promise<any> => {
    const now = new Date();
    const reset_password_token = AES.encrypt(email, process.env.APP_SECRET_KEY || "SECRET").toString();
    const reset_password_expires = now.setHours(now.getHours() + 24);


    await User.update({ reset_password_token, reset_password_expires }, { where: { email } });

    return reset_password_token;
  };
}

export default new AuthService();