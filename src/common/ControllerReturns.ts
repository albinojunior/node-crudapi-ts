import { Request, Response } from "express-serve-static-core";
import HandleErrors from "./HandleErrors";

export default abstract class ControllerReturns extends HandleErrors {

    public return200(res: Response, data: any, message: any = null, created: boolean = false) {
        return res.status(created ? 201 : 200).send({
            message: message,
            data: data,
            error: false
        });
    }

    public return500(res: Response, message: any = null) {
        return res.status(500).send({
            message: message,
            error: true
        });
    }

    public return400(res: Response, message: any = null) {
        return res.status(500).send({
            message: message,
            error: true
        });
    }

    public return404(res: Response, message: any = null) {
        return res.status(404).send({
            message: message,
            error: true
        });
    }

    public return(res: Response, data: any, message: any = null, error: boolean = false, status: any = 200) {
        return res.status(status).send({
            message,
            data,
            error
        });
    }

    public processError = async (res: Response, error: any) => {
        return res.status(400)
            .send(await this.parseErrors(error));
    };
}