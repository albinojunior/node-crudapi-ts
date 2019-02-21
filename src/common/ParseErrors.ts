import { Sequelize } from 'sequelize-typescript';

export default abstract class ParseErrors {

    public parseDefaultError = async (error: any) => {
        return {
            error: true,
            message: error.message
        }
    }

    public parseValidationError = async (error: any) => {
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

    public parseUniqueConstraintError = async (error: any) => {
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