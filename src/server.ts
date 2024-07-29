import "dotenv/config";
import express from 'express';
import "reflect-metadata";
import cors from 'cors';
import helmet from "helmet";
import morgan from 'morgan';
import config from 'config';
import { globalResponseFormater } from "@/middleware/response-formater/globalResponseFormater.middleware";
import { globalErrorHanlder } from "@/middleware/error-handler/globalErrorHanler.middleware";
import { route } from "@/routes";
import connection from "@/database/connection.database";

/**
 * Load configs
 */
const morganFormat = config.get<string>('morganFormat');
const useHelmet = config.get<boolean>('helmet');
const corsOption = config.get<cors.CorsOptions>('cors');
const server_config = config.get<{
    port: number,
    host: string
}>("server");
const enviroment = config.get<string>("enviroment");

/**
 * Express app
 */
const app = express();

/**
 * Middlewares
 */
app.use(
    express.urlencoded({
      extended: true,
    })
  );

app.use(express.json());

app.use(morgan(morganFormat || "dev"));

app.use(cors(corsOption));
if (useHelmet) {
    app.use(helmet());
}

/**
 * Global response formater
 */
app.use(globalResponseFormater);

/**
 * Routes
 */
route(app, '/api/v1');
/**
 * Global error handler
 */
app.use(globalErrorHanlder);

/**
 * Server
 */
const PORT = server_config.port || 3000;
app.listen(PORT, async () => {
  /**
   * Init database connection
   */
    await connection.authenticate();
    if (enviroment === "development") {
      await connection.sync();
    }

    console.log(`Server is running on port ${PORT} in ${enviroment} mode`);
})