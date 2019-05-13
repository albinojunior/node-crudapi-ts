import User from "./user.model";
import { CrudService } from "../../common/services/crud";

class UserService extends CrudService {
  public model = User;
  public modelName = "Usuário";
  public filters = [];
}

export default new UserService();
