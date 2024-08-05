import 'dotenv/config';
import express from 'express';
import 'reflect-metadata';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { globalResponseFormater } from '@/middleware/response-formater/globalResponseFormater.middleware';
import { globalErrorHanlder } from '@/middleware/error-handler/globalErrorHanler.middleware';
import { route } from '@/routes';
import connection from '@/database/connection.database';
import { swaggerInit } from '@/utils/documentation/swagger/swagger-config.util';
import { GlobalConfig } from '@/utils/config/GlobalConfig.util';
import { endRequestPipelineHandler } from '@/middleware/end-request-pipline-handler.middleware';

/**
 * Express app
 */
const app = express();

/**
 * Middlewares
 */
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());

app.use(morgan(GlobalConfig.morgan.format || 'dev'));

app.use(cors(GlobalConfig.cors));

if (GlobalConfig.helmet.enable) {
  app.use(helmet());
}

/**
 * Swagger init
 */
if (GlobalConfig.swagger.enable) {
  swaggerInit(app);
}

/**
 * Global response formater
 */
app.use(globalResponseFormater);

/**
 * Routes
 */
route(app, GlobalConfig.server.api_version);
/**
 * Global error handler
 */
app.use(globalErrorHanlder);

/**
 * End request pipeline handler
 */
app.use(endRequestPipelineHandler);

/**
 * Server
 */
const PORT = GlobalConfig.server.port || 3000;
app.listen(PORT, async () => {
  /**
   * Init database connection
   */
  await connection.authenticate();
  if (GlobalConfig.enviroment === 'development') {
    await connection.sync();
  }

  console.log(`Server is running on port ${PORT} in ${GlobalConfig.enviroment} mode`);
});
