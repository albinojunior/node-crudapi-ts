import { ErrorHandler } from "./error";
import { UniqueConstraintError, ValidationError } from "sequelize";

export abstract class ExceptionHandler extends ErrorHandler {
  private ERROR_TYPES = [
    {
      type:  ValidationError,
      func: this.parseValidationError
    },
    {
      type: UniqueConstraintError,
      func: this.parseUniqueConstraintError
    }
  ];

  /**
   * @param error
   */
  private getParseFunction = (error): Function => {
    let parseFunction = this.parseDefaultError;

    for (let errorItem of this.ERROR_TYPES) {
      if (error instanceof errorItem.type) {
        parseFunction = errorItem.func;
      }
    }

    return parseFunction;
  };

  /**
   * @param error
   */
  public parseErrors = (error: any): any => {
    const parseFunction = this.getParseFunction(error);
    return parseFunction(error);
  };
}
