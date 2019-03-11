import { Sequelize } from 'sequelize-typescript';

export default abstract class ParseErrors {

  /**
   * @param error
   */
  parseDefaultError = (error: any): any => {
    return {
      error: true,
      message: error.message
    }
  };

  /**
   * @param error
   */
  parseValidationError = (error: any): any => {
    const errors: any[] = [];

    error.errors.forEach((errorItem: Sequelize['ValidationErrorItem']) => {
      errors.push({
        type: "invalid",
        field: errorItem.path,
        message: `Campo ${errorItem.path} não é válido.`
      });
    });

    return {
      errors
    };
  };

  /**
   * @param error
   */
  parseUniqueConstraintError = (error: any): any => {
    const errors: any[] = [];

    error.errors.forEach((errorItem: Sequelize['ValidationErrorItem']) => {
      errors.push({
        type: "duplicated",
        field: errorItem.path,
        message: `Campo ${errorItem.path} já cadastrado.`
      });
    });

    return {
      errors
    };
  }
}