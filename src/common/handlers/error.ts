import chalk from "chalk";
import {
  ValidationErrorItem,
  ValidationError,
  UniqueConstraintError
} from "sequelize";

import { HTTP } from "../constants/http";
import { DefaultReturn } from "../interfaces/return";
import { ErrorReturn } from "../interfaces/error-return";
import { ErrorDescription } from "../interfaces/error-description";

export abstract class ErrorHandler {
  /**
   * @param error
   *
   */
  public handleUnknownError(
    error: Error
  ): { data: DefaultReturn; statusCode: number } {
    console.log(chalk.bgRed(chalk.whiteBright("UNKNOWN ERROR: ")), error);
    return {
      data: {
        error: true,
        message: error.message
      },
      statusCode: HTTP.INTERNAL_SERVER_ERROR
    };
  }

  /**
   * @param error
   */
  public handleValidationError(
    error: ValidationError
  ): { data: ErrorReturn; statusCode: number } {
    const errors: ErrorDescription[] = [];

    error.errors.forEach(
      (errorItem: ValidationErrorItem): void => {
        errors.push({
          type: "invalid",
          field: errorItem.path,
          message: `Campo ${errorItem.path} não é válido.`
        });
      }
    );

    return {
      data: {
        errors
      },
      statusCode: HTTP.UNPROCESSABLE_ENTITY
    };
  }

  /**
   * @param error
   */
  public handleUniqueConstraintError(
    error: UniqueConstraintError
  ): { data: ErrorReturn; statusCode: number } {
    const errors: ErrorDescription[] = [];

    error.errors.forEach(
      (errorItem: ValidationErrorItem): void => {
        errors.push({
          type: "duplicated",
          field: errorItem.path,
          message: `Campo ${errorItem.path} já cadastrado.`
        });
      }
    );

    return {
      data: {
        errors
      },
      statusCode: HTTP.UNPROCESSABLE_ENTITY
    };
  }
}
