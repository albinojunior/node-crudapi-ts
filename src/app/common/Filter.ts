import { WhereOptions } from "sequelize";

export default interface Filter {
  execute(where: any, model: any, options: any): WhereOptions<any>;
}