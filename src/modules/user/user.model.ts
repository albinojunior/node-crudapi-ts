import { Table, PrimaryKey, Column, DataType, AutoIncrement, Model, DefaultScope, Scopes, HasOne, HasMany, Is } from "sequelize-typescript";
import USER_SCOPES from "./user.scopes";

const EMAIL_REGEX = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;

@DefaultScope({
    attributes: ['id', 'name', 'email', 'created_at', 'updated_at', 'deleted_at']
})
@Scopes(USER_SCOPES)
@Table({ tableName: "users", timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at', deletedAt: 'deleted_at' })
export default class User extends Model<User> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Column(DataType.TEXT)
    name: string;

    @Is(EMAIL_REGEX)
    @Column(DataType.TEXT)
    email: string;

    @Column(DataType.TEXT)
    password: string;
}
