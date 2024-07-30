import "dotenv/config";
import express from "express";
import "reflect-metadata";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import config from "config";
import { globalResponseFormater } from "@/middleware/response-formater/globalResponseFormater.middleware";
import { globalErrorHanlder } from "@/middleware/error-handler/globalErrorHanler.middleware";
import { route } from "@/routes";
import connection from "@/database/connection.database";
import { swaggerInit } from "@/utils/documentation/swagger.util";

/**
 * Load configs
 */
export const morgan_config = config.get<{
  format: string;
}>("morgan");
export const helment_config = config.get<{
  enable: boolean;
}>("helmet");
export const cors_config = config.get<cors.CorsOptions>("cors");
export const server_config = config.get<{
  port: number;
  host: string;
  api_version: string;
}>("server");
export const enviroment = config.get<string>("enviroment");
export const swagger_config = config.get<{
  enable: boolean;
}>("swagger");

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

app.use(morgan(morgan_config.format || "dev"));

app.use(cors(cors_config));
if (helment_config.enable) {
  app.use(helmet());
}

/**
 * Swagger init
 */
if (swagger_config.enable) {
  swaggerInit(app, server_config.api_version, server_config.port || 3000, {
    servers: [
      {
        url: `http://localhost:${server_config.port || 3000}${
          server_config.api_version
        }`,
        description: "Local server",
      },
    ],
  });
}

/**
 * Global response formater
 */
app.use(globalResponseFormater);

/**
 * Routes
 */
route(app, server_config.api_version);
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
});
