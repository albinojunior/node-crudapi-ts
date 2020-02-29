import { Response } from "express";
import { ExceptionHandler } from "../handlers/exception";
import { HTTP } from "../constants/http";

export default abstract class HttpController extends ExceptionHandler {
  /**
   * @param res
   * @param data
   * @param message
   * @param error
   * @param status
   */
  public return = (
    res: Response,
    data: any = {},
    message: any = null,
    error: boolean = false,
    status: number = HTTP.OK
  ): Response => {
    return res.status(status).send({ message, data, error });
  };
  /**
   *
   * @param res
   * @param data
   * @param status
   */
  public returnData = (
    res: Response,
    data: any = {},
    status: number = HTTP.OK
  ): Response => {
    return res.status(status).send(data);
  };

  /**
   *
   * @param res
   * @param message
   * @param status
   * @param error
   */
  public returnMessage = (
    res: Response,
    message: string = "",
    status: number = HTTP.OK,
    error: boolean = false
  ): Response => {
    return res.status(status).send({ message, error });
  };

  /**
   *
   * @param res
   * @param data
   * @param message
   */
  public returnCreated = (
    res: Response,
    data: any = {},
    message: string = "Created"
  ): Response => {
    return this.return(res, data, message, false, HTTP.CREATED);
  };

  /**
   *
   * @param res
   * @param message
   */
  public returnBadRequest = (
    res: Response,
    message: string = "Bad Request"
  ): Response => {
    return this.returnMessage(res, message, HTTP.BAD_REQUEST, true);
  };

  /**
   *
   * @param res
   * @param message
   */
  public returnUnauthorized = (
    res: Response,
    message: string = "Unauthorized"
  ): Response => {
    return this.returnMessage(res, message, HTTP.UNAUTHORIZED, true);
  };

  /**
   *
   * @param res
   * @param message
   */
  public returnNotFound = (
    res: Response,
    message: string = "Not Found"
  ): Response => {
    return this.returnMessage(res, message, HTTP.NOT_FOUND, true);
  };

  /**
   *
   * @param res
   * @param message
   */
  public returnServerError = (
    res: Response,
    message: string = "Internal Server Error"
  ): Response => {
    return this.returnMessage(res, message, HTTP.INTERNAL_SERVER_ERROR, true);
  };

  /**
   *
   * @param res
   * @param content
   * @param type
   * @param length
   */
  public returnFile = (
    res: Response,
    content: Buffer | string | any,
    type: string,
    length: string | number
  ): void => {
    const headers = {
      "Content-Type": type,
      "Content-Length": length
    };
    res.writeHead(HTTP.OK, headers);
    return res.end(content);
  };

  /**
   *
   * @param res
   * @param error
   */
  public processException = (res: Response, error: any): Response => {
    const { errorData, statusCode } = this.handleErrors(error);
    return this.returnData(res, errorData, statusCode);
  };
}
