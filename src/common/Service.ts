'use strict';

import searchFilter from "../app/filters/search.filter";

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

        let where = {};

        //paginate configs
        const limit = parseInt(options.limit);
        const offset = (options.page - 1) * limit;
        const order = [[options.sort, options.order]];

        //default filter search
        where = searchFilter.execute(where, this.model, options);

        this.filters.forEach(filter => {
            where = filter.execute(where, this.model, options);
        });

        return await this.model.scope(scope).findAndCountAll({
            limit, offset, order, where
        });
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
    public update = async (data: any, id: any): Promise<any> => {
        return await this.model.update(data, { where: { id }, sideEffects: false });
    };

    /**
     * Delete method
     *
     * @param id
     */
    public delete = async (id: any): Promise<any> => {
        return await this.model.destroy({ where: { id } });
    };


}

export default Service;