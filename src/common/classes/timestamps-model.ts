import { Model, DataTypes } from "sequelize";

export class TimestampsModel extends Model {
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly deleted_at: Date;
}

export const timestampsAttributes = {
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  deleted_at: DataTypes.DATE
};
