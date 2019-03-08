import { Request, Response } from "express-serve-static-core";
import ControllerReturns from "../../../common/ControllerReturns";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import cfg from "../../../config/jwt.config";
import User from "../user/user.model";
import mailer from "../../utils/mailer";

export class AuthController extends ControllerReturns {

    public generateToken = async (req: Request, res: Response) => {
        let messageError = 'Usuário ou senha incorretos.';
        try {
            const { email, password } = req.body;

            const user = await User.scope("withPassword").findOne({ where: { email } });
            if (!user) return this.returnUnauthorized(res, messageError);

            const match = await compare(password.toString(), user.password);
            if (!match) return this.returnUnauthorized(res, messageError);

            const date = new Date();
            const token = sign({ email: user.email, exp: new Date().setHours(date.getHours() + 1) }, cfg.secretOrKey);
            const authUser = await User.findOne({ where: { email } });

            res.send({
                access_token: { token: token, expires_in: new Date().setHours(date.getHours() + 1) },
                auth_user: authUser
            });
        }
        catch (err) {
            this.returnServerError(res, err.message);
        }
    };

    public forgotPassword = async (req: Request, res: Response) => {
        try {
            const { email } = req.body;
            const user = await User.scope("withPassword").findOne({ where: { email } });
            if (!user) return this.returnBadRequest(res, "Usuário inválido!");

            const now = new Date();
            const reset_password_token = await hash(user.email + now, 10);
            const reset_password_expires = now.setHours(now.getHours() + 24);

            await User.update({ reset_password_token, reset_password_expires }, { where: { email } });

            await mailer.sendMail({
                to: email,
                from: "e27ee7401a-b49550@inbox.mailtrap.io",
                subject: "Recuperacão de senha",
                template: "auth/forgot_password",
                context: {
                    token: reset_password_token
                }
            });

            this.returnMessage(res, "E-mail de recuperacão de senha enviado com sucesso!");

        } catch (err) {
            this.returnServerError(res, err.message);
        }
    };


    public resetPassword = async (req: Request, res: Response) => {
        try {
            const { token, password, confirm_password } = req.body;

            if (!token) return this.returnBadRequest(res, "Token inválido!");
            if (password !== confirm_password) return this.returnBadRequest(res, "Senhas não conferem.");

            const user = await User.scope("resetPassword").findOne({ where: { reset_password_token: token } });
            if (!user) return this.returnBadRequest(res, "Token inválido!");

            const now = new Date();
            if (now > user.reset_password_expires) return this.returnBadRequest(res, "Token expirado!");

            await User.update({ password, reset_password_expires: now.setHours(now.getHours() - 24) }, { where: { id: user.id } });

            this.returnMessage(res, "Senha atualizada com sucesso!");

        } catch (err) {
            this.returnServerError(res, err.message);
        }
    };

}

export default new AuthController();