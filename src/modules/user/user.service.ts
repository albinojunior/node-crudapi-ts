import User from "./user.model";
import { hash } from "bcryptjs";
import Service from "../../common/Service";

class UserService extends Service {

    model: any = User;
    modelName: string = "Usuário";

    public async createUser(user: any) {
        try {
            const password = await hash(user.password, 10);

            const newUser = {
                name: user.name,
                email: user.email,
                password
            }

            return await this.create(newUser);

        } catch (err) {
            throw err;
        }

    }
}

export default new UserService();