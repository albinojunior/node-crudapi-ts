import { Model } from "sequelize-typescript";

abstract class Service {

    abstract model: any;
    abstract modelName: string;

    /**
     * Get method
     *
     * @param id 
     * @param options 
     */
    public get = async (id: number, scope: any = "full"): Promise<any> => {
        return await this.model.scope(scope).findById(id);
    };

    /**
     * List all method
     *
     * @param take 
     * @param options 
     */
    public all = async (options: any,  scope: any = "full") => {

        //paginate configs
        const limit = parseInt(options.limit);
        const offset = (options.page - 1) * limit;
        const order = [[options.sort, options.order]];

        return await this.model.scope(scope).findAndCountAll({
            limit, offset, order
        });
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
        return await this.model.update(data, { where: { id } });
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