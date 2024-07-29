import { Table, Model, Column, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Human } from "./humans.model";

@Table({
  timestamps: false,
  tableName: "dogs",
})
export class Dog extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  breed!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: true,
  })
  isGoodBoy!: boolean;

  @ForeignKey(() => Human)
  @Column
  humanId!: number;

  @BelongsTo(() => Human)
  human!: Human;
}
