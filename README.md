# Sequelize typescript basesource
## Usage

### Create new model
Go to ./src/model
 Example:
```
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
}
```
This using [sequelize-typescript](https://www.npmjs.com/package/sequelize-typescript)

### Migrations

+ Create new migration:
```
NAME=migration-name.ts npm run migrate:create
```

With [migration-name] is the name of the migration you want.

+ Apply migration: 
```
npm run migrate:up
```

+ Migrate down: 
```
npm run migrate:down
```

+ Revert all migration:
```
npm run migrate:revert-all
```# sequelize-typescript-migration
# expressjs-clean-base-source
# ExpressJS-clean-base-source
