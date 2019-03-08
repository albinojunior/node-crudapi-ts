import { Table, PrimaryKey, Column, DataType, AutoIncrement, Model, DefaultScope, Scopes, Is, BeforeCreate } from "sequelize-typescript";
import { defaultScope, scopes } from "./user.scopes";
import { hash } from "bcryptjs";

const EMAIL_REGEX = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$|^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;

@DefaultScope(defaultScope)
@Scopes(scopes)
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

    @Column(DataType.TEXT)
    reset_password_token: string;

    @Column(DataType.DATE)
    reset_password_expires: Date;

    @BeforeCreate
    static async hashPassword(user: User) {
        user.password = await hash(user.password, 10);
    }
}