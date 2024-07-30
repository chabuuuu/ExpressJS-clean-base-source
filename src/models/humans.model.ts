import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement, HasMany, Unique } from "sequelize-typescript";
import { Dog } from "./dogs.model";
import { RolesEnum } from "@/enums/Roles.enum";

@Table({
  timestamps: false,
  tableName: "humans",
})
export class Human extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.ENUM(RolesEnum.CUSTOMER, RolesEnum.SHOP_OWNER),
    defaultValue: RolesEnum.CUSTOMER,
    allowNull: false,
  })
  role!: RolesEnum;

  @Unique
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  username!: string;

  @Column({
    type: DataType.STRING(70),
    allowNull: false,
  })
  password!: string;

  @HasMany(() => Dog)
  dogs!: Dog[]

}
