import Controller from "../../common/Controller";
import UserService from "./user.service";


export class UserController extends Controller {

    service: any = UserService;

    /**
       *
       * @param req
       * @param res
       * @return {Promise<void>}
       */
    public register = async (req: any, res: any) => {
        try {
            const created = await this.service.createUser(req.body);
            if (created) {
                this.return200(res, created, `${this.service.modelName} criado com sucesso!`, true);

            } else {
                this.return500(res, `Erro durante criação de ${this.service.modelName}`);
            }
        } catch (err) {
            this.processError(res, err);
        }
    };

}

export default new UserController();