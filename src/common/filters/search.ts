import { Op } from 'sequelize';
import { Filter } from "../interfaces/filter";
import { isNumberType } from "../utils/functions";

export class SearchFilter implements Filter {
  private exceptFields: string[] = ['created_at', 'updated_at', 'deleted_at'];

  execute(where: any, model: any, options: any): any {
    if (options.hasOwnProperty("search")) {
      where[Op.and].push({
        [Op.or]: Object.keys(model.rawAttributes)
          .map((field: string) => {
            if (!this.exceptFields.includes(field)) {
              const stringValue = `%${options.search}%`;
              const numberValue = Number(options.search);

              const isNumber = isNumberType(model.rawAttributes[field].type) && numberValue;
              const OP = isNumber ? Op.eq : Op.like;

              return {
                [field]: {
                  [OP]: isNumber ? numberValue : stringValue
                }
              }
            }
          })
      });
    }

    return where;
  }
}
