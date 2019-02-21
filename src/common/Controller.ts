import Service from "./Service";
import { Request, Response } from "express-serve-static-core";
import ControllerReturns from "./ControllerReturns";

abstract class Controller extends ControllerReturns {

    abstract service: Service;

    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @return {Promise<void>}
     */
    public get = async (req: Request, res: Response) => {
        const id = req.params.id;

        if (!id) {
            this.return500(res, `ID de ${this.service.modelName} inválido!`);
        }

        const data = await this.service.get(id);
        this.return200(res, data);
    };


    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @return {Promise<void>}
     */
    public index = async (req: Request, res: Response) => {
        const options = await this.getPaginateOptions(req.query);
        const data = await this.service.all(options);
        this.return200(res, data);
    };


    /**
     *
     * @param req
     * @param res
     * @return {Promise<void>}
     */
    public store = async (req: any, res: any) => {
        try {
            const created = await this.service.create(req.body);
            if (created) {
                this.return200(res, created, `${this.service.modelName} criado com sucesso!`, true);
            } else {
                this.return400(res, `Erro durante criação de ${this.service.modelName}`);
            }
        } catch (err) {
            this.processError(res, err);
            // this.return400(res, `Erro durante a criação. ${err.message}`);
        }
    };

    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @return {Promise<void>}
     */
    public update = async (req: Request, res: Response) => {
        const id = req.params.id;

        if (!id) {
            this.return404(res, `ID de ${this.service.modelName} inválido!`);
        }

        try {
            const updated = await this.service.update(req.body, id);
            if (updated) {
                const user = await this.service.get(id, false);
                this.return200(res, user, `${this.service.modelName} atualizado com sucesso!`);
            } else {
                this.return400(res, `Erro durante a atualização de ${this.service.modelName}`);
            }
        } catch (err) {
            this.processError(res, err);
            // this.return400(res, `Erro durante a atualização. ${err.message}`);
        }
    };

    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @return {Promise<void>}
     */
    public delete = async (req: Request, res: Response) => {
        const id = req.params.id;

        if (!id) {
            this.return404(res, `ID de ${this.service.modelName} inválido!`);
        }

        try {
            if (await this.service.delete(id)) {
                this.return200(res, null, `${this.service.modelName} excluido com sucesso!`, true);
            } else {
                this.return400(res, `Erro durante a exclusão de ${this.service.modelName}`);
            }
        } catch (err) {
            this.processError(res, err);
            // this.return400(res, `Erro durante a exclusão. ${err.message}`);
        }
    };

    private getPaginateOptions = async (query: any) => {
        return {
            limit: query.hasOwnProperty('limit') ? query.limit : 15,
            page: query.hasOwnProperty('page') ? query.page : 1,
            order: query.hasOwnProperty('order') ? query.order : "ASC",
            sort: query.hasOwnProperty('sort') ? query.sort : "id"
        }
    }
}

export default Controller;