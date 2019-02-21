import { sign, verify } from "jsonwebtoken";
import User from "../user/user.model";
import { compare } from "bcryptjs";
import cfg from "../../../jwtconfig";

class AuthMiddleware {

    public auth = async (req: any, res: any, next: any) => {

        const token = cfg.jwtFromRequest(req);

        if (token) {
            try {
                const decoded: any = verify(token, cfg.secretOrKey);

                if (decoded.exp <= Date.now()) {
                    return res.status(401).send({
                        message: 'Acesso Expirado, faça login novamente',
                        error: true
                    })
                }

                const user = await User.findOne({ where: { email: decoded.email } });

                if (user) {
                    next();
                } else {
                    return this.dispatchUnauthorizedError(res);
                }

            } catch (err) {
                return this.dispatchUnauthorizedError(res);
            }
        } else {
            return this.dispatchUnauthorizedError(res);
        }
    };

    public generateToken = async (req: any, res: any) => {

        try {

            const { email, password } = req.body;

            const user = await User.scope("withPassword").findOne({ where: { email } });

            if (user) {

                const match = await compare(password.toString(), user.password);

                if (!match) {
                    return res.status(401).send({
                        message: 'Usuário ou senha incorretos.',
                        error: true
                    });
                }

            } else {
                return res.status(401).send({
                    message: 'Usuário ou senha incorretos.',
                    error: true
                });
            }

            const date = new Date();
            const token = sign({ email: user.email, exp: new Date().setHours(date.getHours() + 1) }, cfg.secretOrKey);
            const authUser = await User.findOne({ where: { email } });

            res.send({
                access_token: { token: token, expires_in: new Date().setHours(date.getHours() + 1) },
                auth_user: authUser
            });
        }
        catch (e) {
            console.log(e);
        }
    };

    private dispatchUnauthorizedError = (res: any) => {
        return res.status(401).send('Unauthozired');
    };

}

export default new AuthMiddleware();
