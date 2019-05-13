import { Op, WhereOptions } from "sequelize";
import { Filter } from "../classes/filter";
import { isNumberType, isDateType } from "../utils/functions";

class SearchFilter extends Filter {
  public execute(where: WhereOptions, model: any, options: any): any {
    if (options.hasOwnProperty("search") && options.search.length) {
      const attributes: any = model.rawAttributes;
      const fields: any[] = [];

      for (let field in attributes) {
        if (isDateType(attributes[field].type)) continue;
        const stringValue = `%${options.search}%`;
        const numberValue = Number(options.search);
        const isNumber = isNumberType(attributes[field].type) && numberValue;
        const OP = isNumber ? Op.eq : Op.like;
        fields.push({
          [field]: {
            [OP]: isNumber ? numberValue : stringValue
          }
        });
      }

      where = {
        ...where,
        [Op.and]: [...[Op.and], ...[{ [Op.or]: fields }]]
      };
    }

    return where;
  }
}

export default new SearchFilter();
