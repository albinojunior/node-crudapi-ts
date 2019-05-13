import { ErrorHandler } from "./error";
import { UniqueConstraintError, ValidationError } from "sequelize";

export abstract class ExceptionHandler extends ErrorHandler {
  private _ERROR_TYPES = [
    {
      type: ValidationError,
      func: this.handleValidationError
    },
    {
      type: UniqueConstraintError,
      func: this.handleUniqueConstraintError
    }
  ];

  public get ERROR_TYPES(): any {
    return this._ERROR_TYPES;
  }

  public set ERROR_TYPES(value) {
    this._ERROR_TYPES = [...this._ERROR_TYPES, ...value];
  }

  /**
   * @param error
   */
  public getParseFunction = (error: Error): Function => {
    for (let errorItem of this._ERROR_TYPES) {
      if (error instanceof errorItem.type) {
        return errorItem.func;
      }
    }

    return this.handleUnknownError;
  };

  /**
   * @param error
   */
  public handleErrors = (error: Error): any => {
    const handleFunction = this.getParseFunction(error);
    return handleFunction(error);
  };
}
