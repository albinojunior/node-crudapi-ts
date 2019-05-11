import { Filter } from "../common/interfaces/filter";
import { Op, Model } from "sequelize";

class ExampleFilter implements Filter {

  public execute(where: any, model: Model, options: any): any {
    if (options.hasOwnProperty('id')) {
      const { id } = options;
      where[Op.and].push({ id })
    }
    return where;
  }
}

export default new ExampleFilter();
