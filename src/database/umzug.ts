import { Umzug, SequelizeStorage } from 'umzug';
import { Sequelize } from 'sequelize';
import connection from './connection.database';

export const migrator = new Umzug({
  migrations: {
    glob: ['src/database/migrations/*.ts', { cwd: undefined }]
  },
  context: connection,
  storage: new SequelizeStorage({
    sequelize: connection
  }),
  logger: console
});

export type Migration = typeof migrator._types.migration;
