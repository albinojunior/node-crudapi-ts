import User from "./user.model";
import { Service } from "nodeapi-cruds-ts";
import ExampleFilter from "../../filters/example.filter";

class UserService extends Service {

  model: any = User;
  modelName: string = "Usuário";
  filters: any[] = [
    ExampleFilter
  ];
}

export default new UserService();