import { ValidationErrorItem } from "sequelize";
import { HTTP } from "../constants/http";
import chalk from "chalk";

export abstract class ErrorHandler {
  /**
   * @param error
   */
  parseDefaultError = (error: any): { data: any; statusCode: number } => {
    console.log(chalk.bgRed(chalk.whiteBright("UNKNOWN ERROR: ")), error);
    return {
      data: {
        error: true,
        message: error.message
      },
      statusCode: HTTP.INTERNAL_SERVER_ERROR
    };
  };

  /**
   * @param error
   */
  parseValidationError = (error: any): { data: any; statusCode: number } => {
    const errors: any[] = [];

    error.errors.forEach((errorItem: ValidationErrorItem) => {
      errors.push({
        type: "invalid",
        field: errorItem.path,
        message: `Campo ${errorItem.path} não é válido.`
      });
    });

    return {
      data: {
        errors
      },
      statusCode: HTTP.UNPROCESSABLE_ENTITY
    };
  };

  /**
   * @param error
   */
  parseUniqueConstraintError = (
    error: any
  ): { data: any; statusCode: number } => {
    const errors: any[] = [];

    error.errors.forEach((errorItem: ValidationErrorItem) => {
      errors.push({
        type: "duplicated",
        field: errorItem.path,
        message: `Campo ${errorItem.path} já cadastrado.`
      });
    });

    return {
      data: {
        errors
      },
      statusCode: HTTP.UNPROCESSABLE_ENTITY
    };
  };
}
