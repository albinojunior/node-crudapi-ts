import { Filter } from "nodeapi-cruds-ts";
import { Op } from "sequelize";

class ExampleFilter implements Filter {

  execute(where: any, model: any, options: any): any {
    if (options.query.hasOwnProperty('id') && options.query.id) {
      const { id } = options.query;
      where[Op.and].push({ id })
    }

    return where;
  }
}

export default new ExampleFilter();