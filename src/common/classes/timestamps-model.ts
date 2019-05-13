import { Model } from "sequelize";

export class TimestampsModel extends Model {
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly deleted_at: Date;
}
