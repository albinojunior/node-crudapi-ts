import { Response } from "express-serve-static-core";
import HandleErrors from "./HandleErrors";
import { HTTP_STATUS_CODES } from "./Constraints";

export default abstract class ControllerReturns extends HandleErrors {

  /**
   *
   * @param res
   * @param error
   */
  public processError = async (res: Response, error: any) => {
    return this.returnData(res, await this.parseErrors(error), HTTP_STATUS_CODES.BAD_REQUEST);
  }

  /**
   * @param res
   * @param data
   * @param message
   * @param error
   * @param status
   */
  public return(res: Response, data: any = {}, message: any = null, error: boolean = false, status: number = HTTP_STATUS_CODES.OK) {
    return res.status(status).send({ message, data, error });
  }

  /**
   *
   * @param res
   * @param data
   * @param status
   */
  public returnData(res: Response, data: any = {}, status: number = HTTP_STATUS_CODES.OK) {
    return res.status(status).send(data);
  }

  /**
   *
   * @param res
   * @param message
   * @param status
   * @param error
   */
  public returnMessage(res: Response, message: string = "", status: number = HTTP_STATUS_CODES.OK, error: boolean = false) {
    return res.status(status).send({ message, error });
  }

  /**
   *
   * @param res
   * @param data
   * @param message
   */
  public returnCreated(res: Response, data: any = {}, message: string = "") {
    return this.return(res, data, message, false, HTTP_STATUS_CODES.CREATED);
  }

  /**
   *
   * @param res
   * @param message
   */
  public returnBadRequest(res: Response, message: string = "") {
    return this.returnMessage(res, message, HTTP_STATUS_CODES.BAD_REQUEST);
  }

  /**
   *
   * @param res
   * @param message
   */
  public returnUnauthorized(res: Response, message: string = "") {
    return this.returnMessage(res, message, HTTP_STATUS_CODES.UNAUTHORIZED);
  }

  /**
   *
   * @param res
   * @param message
   */
  public returnNotFound(res: Response, message: string = "") {
    return this.returnMessage(res, message, HTTP_STATUS_CODES.NOT_FOUND);
  }

  /**
   *
   * @param res
   * @param message
   */
  public returnServerError(res: Response, message: string = "") {
    return this.returnMessage(res, message, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
  }
}