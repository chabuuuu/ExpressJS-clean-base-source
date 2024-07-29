import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement, HasMany } from "sequelize-typescript";
import { Dog } from "./dogs.model";

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

  @HasMany(() => Dog)
  dogs!: Dog[]

}
