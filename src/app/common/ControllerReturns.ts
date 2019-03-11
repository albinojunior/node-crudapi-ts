import { Response } from "express-serve-static-core";
import HandleErrors from "./HandleErrors";
import { HTTP } from "./Constraints";

export default abstract class ControllerReturns extends HandleErrors {

  /**
   * @param res
   * @param data
   * @param message
   * @param error
   * @param status
   */
  return = (res: Response, data: any = {}, message: any = null, error: boolean = false, status: number = HTTP.OK): Response => {
    return res.status(status).send({ message, data, error });
  };
  /**
   *
   * @param res
   * @param data
   * @param status
   */
  returnData = (res: Response, data: any = {}, status: number = HTTP.OK): Response => {
    return res.status(status).send(data);
  };

  /**
   *
   * @param res
   * @param message
   * @param status
   * @param error
   */
  returnMessage = (res: Response, message: string = "", status: number = HTTP.OK, error: boolean = false): Response => {
    return res.status(status).send({ message, error });
  };

  /**
   *
   * @param res
   * @param data
   * @param message
   */
  returnCreated = (res: Response, data: any = {}, message: string = ""): Response => {
    return this.return(res, data, message, false, HTTP.CREATED);
  };

  /**
   *
   * @param res
   * @param message
   */
  returnBadRequest = (res: Response, message: string = ""): Response => {
    return this.returnMessage(res, message, HTTP.BAD_REQUEST);
  };

  /**
   *
   * @param res
   * @param message
   */
  returnUnauthorized = (res: Response, message: string = ""): Response => {
    return this.returnMessage(res, message, HTTP.UNAUTHORIZED);
  };

  /**
   *
   * @param res
   * @param message
   */
  returnNotFound = (res: Response, message: string = ""): Response => {
    return this.returnMessage(res, message, HTTP.NOT_FOUND);
  };

  /**
   *
   * @param res
   * @param message
   */
  returnServerError = (res: Response, message: string = ""): Response => {
    return this.returnMessage(res, message, HTTP.INTERNAL_SERVER_ERROR);
  };

  /**
   *
   * @param res
   * @param error
   */
  processError = (res: Response, error: any): Response => {
    return this.returnData(res, this.parseErrors(error), HTTP.BAD_REQUEST);
  }
}