import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { SwaggerTheme, SwaggerThemeNameEnum } from "swagger-themes";
const theme = new SwaggerTheme();
import express from "express";
import { swaggerSchema } from "@/utils/documentation/swagger.schema";

type SwaggerServer = {
  servers: [
    {
      url: string;
      description: string;
    }
  ];
};
export function swaggerInit(
  app: express.Application,
  root_api: string,
  port: number,
  serverList: SwaggerServer
) {
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
      servers: serverList.servers,
      components: {
        schemas: swaggerSchema,
      },
    },
    apis: ["./src/controllers/*.ts", "./src/dto/**/*.ts"],
  };
  const specs = swaggerJsdoc(options);

  //Swagger init
  app.use(
    `${root_api}/api-docs`,
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true,
      customCss: theme.getBuffer(SwaggerThemeNameEnum.FLATTOP),
    })
  );
  console.log(
    `Swagger is running on http://localhost:${port}${root_api}/api-docs`
  );
}
