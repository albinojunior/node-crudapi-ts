import Filter from "../../common/Filter";

import { isNumberType } from '../utils/functions.utils';
import { Sequelize } from 'sequelize-typescript';

class SearchFilter implements Filter {

  execute(where: any, model: any, options: any): any {
    if (options.search.length > 0) {
      where[Sequelize.Op.and].push({
        [Sequelize.Op.or]: Object.keys(model.attributes)
          .map((field: string) => {
            if (!['created_at', 'updated_at', 'deleted_at'].includes(field)) {
              const stringValue = `%${options.search}%`;
              const numberValue = Number(options.search);

              const isNumber = isNumberType(model.attributes[field].type) && numberValue;
              const OP = isNumber ? Sequelize.Op.eq : Sequelize.Op.like;

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

export default new SearchFilter();