import { Sequelize } from 'sequelize-typescript';
import ParseErrors from "./ParseErrors";

export default abstract class HandleErrors extends ParseErrors {

    private ERROR_TYPES: Array<any> = [
        {
            type: Sequelize.ValidationError,
            func: this.parseValidationError
        },
        {
            type: Sequelize.UniqueConstraintError,
            func: this.parseUniqueConstraintError
        }
    ]

    /**
     * @param error
     */
    public parseErrors = async (error: any): Promise<any> => {
        const parseFunction = await this.getParseFunction(error);
        return await parseFunction(error);
    };

    /**
     * @param error
     */
    private getParseFunction = async (error: any): Promise<any> => {
        let parseFunction: any = this.parseDefaultError;

        for (let errorItem of this.ERROR_TYPES) {
            if (error instanceof errorItem.type) {
                parseFunction = errorItem.func;
            }
        }

        return parseFunction;
    }

}