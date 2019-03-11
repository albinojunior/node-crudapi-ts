import Controller from "../../common/Controller";
import UserService from "./user.service";

export class UserController extends Controller {

  service: any = UserService;

}

export default new UserController();