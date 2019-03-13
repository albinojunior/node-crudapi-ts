import UserService from "./user.service";
import { Controller } from "nodeapi-cruds";

export class UserController extends Controller {

  service: any = UserService;

}

export default new UserController();