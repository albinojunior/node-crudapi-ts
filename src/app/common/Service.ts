'use strict';

import searchFilter from "../filters/search.filter";
import { Sequelize } from "sequelize-typescript";

abstract class Service {

  abstract model: any;
  abstract modelName: string;
  abstract filters: any[] = [];

  /**
   * Get method
   *
   * @param id
   * @param scope
   */
  get = async (id: number, scope: any = "full"): Promise<any> => {
    return await this.model.scope(scope).findByPk(id);
  };

  /**
   * Get all method
   *
   * @param options
   * @param scope
   */
  all = async (options: any, scope: any = "full"): Promise<any> => {

    const where = await this.processFilters(options);
    const findOptions = await this.buildFindOptions(options);
    const data = await this.model.scope(scope).findAndCountAll({ ...findOptions, where });

    return await this.buildPaginationMetadata(data, options);

  };

  /**
   * List all method
   */
  list = async (): Promise<any> => {
    return await this.model.scope("list").findAll();
  };

  /**
   * Create method
   *
   * @param object
   */
  create = async (object: any): Promise<any> => {
    return await this.model.create(object);
  };

  /**
   * Update method
   *
   * @param data
   * @param id
   */
  update = async (data: any, id: any): Promise<any> => {
    return await this.model.update(data, { where: { id }, sideEffects: false });
  };


  /**
   * Update method
   *
   * @param data
   * @param where
   */
  updateWhere = async (data: any, where: any): Promise<any> => {
    return await this.model.update(data, { where });
  };

  /**
   * Delete method
   *
   * @param id
   */
  delete = async (id: any): Promise<any> => {
    return await this.model.destroy({ where: { id } });
  };

  /**
   * Delete method
   *
   * @param where
   */
  deleteWhere = async (where: any): Promise<any> => {
    return await this.model.destroy({ where });
  };


  private processFilters = async (options: any) => {
    let where = searchFilter.execute({ [Sequelize.Op.and]: [] }, this.model, options);

    this.filters.forEach(filter => {
      where = filter.execute(where, this.model, options);
    });

    return where;
  };

  /**
   * Building find options
   *
   * @param options
   */
  private buildFindOptions = async (options: any) => {
    const limit = parseInt(options.limit);
    const offset = (options.page - 1) * limit;
    const order = [[options.sort, options.order]];

    return { limit, offset, order }
  };

  /**
   * Building pagination metadata
   *
   * @param data
   * @param options
   */
  private buildPaginationMetadata = async (data: any, options: any) => {
    const limit = parseInt(options.limit);
    const total = data.count / limit;
    const total_pages = total > Math.floor(total) ? Math.floor(total + 1) : total;

    return { ...data, items_per_page: limit, current_page: Number(options.page), total_pages };
  }

}

export default Service;