import User from "./user.model";
import ExampleFilter from "../../filters/example.filter";
import { CrudService } from "../../common/services/crud";
import { Filter } from "../../common/interfaces/filter";
import { Model } from "sequelize";

class UserService extends CrudService {
  public model: Model = User;
  public modelName: string = "Usuário";
  public filters: Filter[] = [ExampleFilter];
}

export default new UserService();
