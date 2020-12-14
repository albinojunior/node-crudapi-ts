import { Model, DataTypes } from "sequelize";

export default class ModelExample extends Model {
  public id!: number;
}

export const attributes = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  }
};

export const associate = (model, sequelize): void => {
  model.belongsTo(sequelize.models.OtherModule);
};

export const init = (sequelize): void => {
  ModelExample.init(attributes, {
    sequelize,
    tableName: "model"
  });
};
