import { Model } from "sequelize";
// import { defaultScope, scopes } from "./user.scopes";
// import { hashSync } from "bcryptjs";

// const EMAIL_REGEX = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$|^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;

//  function hashPassword(user: User) {
//     user.password = hashSync(user.password, 10);
//   }

export default class User extends Model {}
