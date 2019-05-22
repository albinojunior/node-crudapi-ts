import { hashSync } from "bcryptjs";
import { TimestampsModel } from "./../../common/classes/timestamps-model";
import { timestamps } from "./../../common/constants/timestamps";
import { defaultScope, scopes } from "./user.scopes";
import { DataTypes } from "sequelize";

export default class User extends TimestampsModel {
  public id!: number;
  public email!: string;
  public password!: string;
  public reset_password_token!: string;
  public reset_password_expires!: Date;
}

const hooks = {
  beforeCreate: (user): void => {
    user.password = hashSync(user.password, 10);
  }
};

export const attributes = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED, // you can omit the `new` but this is discouraged
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reset_password_token: {
    type: DataTypes.STRING,
    allowNull: true
  },
  reset_password_expires: {
    type: DataTypes.DATE,
    allowNull: true
  }
};

export const init = (sequelize): void => {
  User.init(attributes, {
    sequelize,
    tableName: "users",
    defaultScope,
    scopes,
    ...timestamps,
    hooks
  });
};
