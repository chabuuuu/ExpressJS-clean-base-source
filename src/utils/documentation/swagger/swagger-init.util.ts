import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { SwaggerTheme, SwaggerThemeNameEnum } from "swagger-themes";
const theme = new SwaggerTheme();
import express from "express";
import { swaggerSchemaMapping } from "@/utils/documentation/swagger/swagger-schema-mapping.util";
import { GlobalConfig } from "@/utils/config/GlobalConfig.util";
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "ExpressJS Super Clean Base Source API Documentation",
      version: "0.1.0",
      description:
        "This is API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Thinh Ha",
        email: "haphuthinh332004@gmail.com",
      },
    },
    servers: [
      {
        url: `http://${GlobalConfig.server.host}:${
          GlobalConfig.server.port || 3000
        }${GlobalConfig.server.api_version}`,
        description: "Local server",
      },
    ],
    components: {
      schemas: swaggerSchemaMapping,
    },
  },
  apis: ["./src/controllers/*.ts", "./src/dto/**/*.ts"],
};

export function swaggerInit(app: express.Application) {
  const specs = swaggerJsdoc(options);

  //Swagger init
  app.use(
    `${GlobalConfig.server.api_version}/api-docs`,
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true,
      customCss: theme.getBuffer(SwaggerThemeNameEnum.FLATTOP),
    })
  );
  console.log(
    `Swagger is running on http://${GlobalConfig.server.host}:${GlobalConfig.server.port}${GlobalConfig.server.api_version}/api-docs`
  );
}
