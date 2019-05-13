import SearchFilter from "../filters/search";
import { Filter } from "../classes/filter";
import { Op } from "sequelize";

export abstract class CrudService {
  abstract model: any;
  abstract modelName: string;
  private _filters: Filter[] = [SearchFilter];

  public get filters(): Filter[] {
    return this._filters;
  }

  public set filters(value) {
    this._filters = [...this._filters, ...value];
  }

  /**
   * Get method
   *
   * @param id
   * @param scope
   */
  public get = async (id: number, scope: any = "full"): Promise<any> => {
    return await this.model.scope(scope).findByPk(id);
  };

  /**
   * Get all method
   *
   * @param options
   * @param scope
   */
  public all = async (options: any, scope: any = "full"): Promise<any> => {
    const where = await this.processFilters(options);
    const findOptions = await this.buildFindOptions(options);
    const data = await this.model
      .scope(scope)
      .findAndCountAll({ ...findOptions, where });

    return await this.buildPaginationMetadata(data, options);
  };

  /**
   * List all method
   */
  public list = async (): Promise<any> => {
    return await this.model.scope("list").findAll();
  };

  /**
   * Create method
   *
   * @param object
   */
  public create = async (object: any): Promise<any> => {
    return await this.model.create(object);
  };

  /**
   * Update method
   *
   * @param data
   * @param id
   */
  public update = async (data: any, id: number | string): Promise<any> => {
    return await this.model.update(data, { where: { id }, sideEffects: false });
  };

  /**
   * Update method
   *
   * @param data
   * @param where
   */
  public updateWhere = async (data: any, where: any): Promise<any> => {
    return await this.model.update(data, { where });
  };

  /**
   * Delete method
   *
   * @param id
   */
  public delete = async (id: any): Promise<any> => {
    return await this.model.destroy({ where: { id } });
  };

  /**
   * Delete method
   *
   * @param where
   */
  public deleteWhere = async (where: any): Promise<any> => {
    return await this.model.destroy({ where });
  };

  public processFilters = async (options: any): Promise<any> => {
    let where = {};
    if (this._filters.length) where[Op.and] = [];

    this._filters.forEach(
      (filter): any => {
        where = filter.execute(where, this.model, options);
      }
    );

    return where;
  };

  /**
   * Building find options
   *
   * @param options
   */
  public buildFindOptions = async (options: any): Promise<{}> => {
    const limit = parseInt(options.limit);
    const offset = (options.page - 1) * limit;
    const order = [[options.sort, options.order]];

    return { limit, offset, order };
  };

  /**
   * Building pagination metadata
   *
   * @param data
   * @param options
   */
  public buildPaginationMetadata = async (
    data: any,
    options: any
  ): Promise<{}> => {
    const limit = parseInt(options.limit);
    const total = data.count / limit;
    const total_pages =
      total > Math.floor(total) ? Math.floor(total + 1) : total;

    return {
      ...data,
      items_per_page: limit,
      current_page: Number(options.page),
      total_pages
    };
  };
}
