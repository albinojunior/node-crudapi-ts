import { Sequelize } from 'sequelize-typescript';

export default abstract class ParseErrors {

    /**
     * @param error
     */
    public parseDefaultError = async (error: any): Promise<any> => {
        return {
            error: true,
            message: error.message
        }
    }

    /**
     * @param error
     */
    public parseValidationError = async (error: any): Promise<any> => {
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
    }

    /**
     * @param error
     */
    public parseUniqueConstraintError = async (error: any): Promise<any> => {
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