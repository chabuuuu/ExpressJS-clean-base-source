# ExpressJS-clean-basesource

### Author: haphuthinh

Very clean base source of NodeJS (Express) using DI with Inversify + Service - Repository Pattern with Sequelize

## What this base source including?

- The controller-service-repository structure: [What is Controller-Service-Repotiory structure](https://tom-collings.medium.com/controller-service-repository-16e29a4684e5)
- Dependency injection with [inversify](https://inversify.io/)
- Typescript ORM with [sequelize-typescript](https://www.npmjs.com/package/sequelize-typescript) which based on [SequelizeORM](https://sequelize.org/docs/v6/other-topics/typescript/)
- Database migration with [umzug](https://www.npmjs.com/package/umzug)
- Redis with [ioredis](https://www.npmjs.com/package/ioredis) (including some base helper for caching)
- DTOs using [class-transformer](https://www.npmjs.com/package/class-transformer)
- Request schema valitate using [Joi](https://www.npmjs.com/package/joi)
- Microservice message handler for Kafka, RabbitMQ,...
- Global response formatter
- Global error handler
- Base repository + base service
- Swagger API Documentation: auto mapping Typescript DTO to swagger schema using [class-to-swagger-schema](https://www.npmjs.com/package/class-to-swagger-schema)
- API security using JWT + RBAC
- Linter with [eslint](https://www.npmjs.com/package/eslint)
- Format source with [prettier](https://www.npmjs.com/package/prettier)
- Linting git commint message using [husky](https://typicode.github.io/husky/)
- Manage application config with [config](https://www.npmjs.com/package/config)
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

### Start using docker compose

On first start up:

```
mkdir -p docker-data/data/redis docker-data/data/postgres/data docker-data/data/postgres/config docker-data/data/redis docker-data/data/media && sudo chmod -R a+rwx docker-data/
```

Then:

```
docker compose up --build -d
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

## Commit message guideline

### Commit Message Format

Each commit message consists of a header, a body and a footer. The header has a special format that includes a type, a scope and a subject:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The header is mandatory and the scope of the header is optional.

The <type> word should be one of the rules items you have written in your .commitlintrc.json file and the <scope> is the module/component you are working on.

Samples:

```
docs(changelog): update changelog to beta.5
```

```
fix(release): need to depend on latest rxjs and zone.js

The version in our package.json gets copied to the one we publish, and users need the latest of these.
```

### Type

Must be one of the following:

build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
docs: Documentation only changes
feat: A new feature
fix: A bug fix
perf: A code change that improves performance
refactor: A code change that neither fixes a bug nor adds a feature
style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
test: Adding missing tests or correcting existing tests
