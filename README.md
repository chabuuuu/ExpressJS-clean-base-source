# ExpressJS-clean-basesource

### Author: haphuthinh

Very clean base source of NodeJS (Express) using DI with Inversify + Service - Repository Pattern with Sequelize

## What this base source including?

- The controller-service-repository structure
- Dependency injection with inversify
- Typescript ORM with sequelize-typescript
- Database migration with umzug
- Redis with ioredis (including some base helper for caching)
- DTOs using class-transformer
- Request schema valitate using Joi
- Microservice message handler for Kafka, RabbitMQ,...
- Global response formatter
- Global error handler
- Base repository + base service
- Swagger API Documentation: auto mapping Typescript DTO to swagger schema using class-to-swagger-schema
- API security using JWT + RBAC
- Linter with eslint
- Format source with prettier
- Storing application config with config
- Dockerize with default Dockerfile config

## Structure

![alt text](https://res.cloudinary.com/practicaldev/image/fetch/s--CDARQ4Hj--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/of739v9cu7namgc9m2am.jpg)

The guide for using each entity in the structure please read the \*.guide.md in each folder.

## Usage

### Development:

```
npm run start:dev
```

### Production:

```
npm run build
npm run start:prod
```

### How to create new API Endpoint:

1. Create new Model Class in src/models
2. Create new repository and its repository interface in src/repository
3. Create new service and its service interface in src/service
4. Create new controller and its controller interface in src/controller
5. Combine all to container in src/container
6. Create new route in src/route

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

- Create new migration:

```
NAME=migration-name.ts npm run migrate:create
```

With [migration-name] is the name of the migration you want.

- Apply migration:

```
npm run migrate:up
```

- Migrate down:

```
npm run migrate:down
```

- Revert all migration:

```
npm run migrate:revert-all
```

### Lint source

```
npm run lint
```

Lint fix:

```
npm run lint:fix
```

### Format source

Check:

```
npm run prettier
```

Apply format:

```
npm run prettier:fix
```
