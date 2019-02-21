import ParseErrors from "./ParseErrors";

export default abstract class HandleErrors extends ParseErrors {

    private ERROR_TYPES: Array<any> = [
        {
            type: /SequelizeValidationError/i,
            func: this.parseValidationError
        },
        {
            type: /SequelizeUniqueConstraintError/i,
            func: this.parseUniqueConstraintError
        }
    ]

    public parseErrors = async (error: any) => {
        const parseFuncion = await this.getParseFunction(error);
        return await parseFuncion(error);
    };

    private getParseFunction = async (error: any): Promise<any> => {
        let parseFunction: any = this.parseDefaultError;

        for (let errorItem of this.ERROR_TYPES) {
            if (errorItem.type.test(error.name)) {
                parseFunction = errorItem.func;
            }
        }

        return parseFunction;
    }

}