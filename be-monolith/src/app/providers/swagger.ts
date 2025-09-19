import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce API",
      version: "1.0.0",
      description: "API documentation",
    },
  },
  apis: [path.join(__dirname, "../../docs/*.yaml")],
};

export const swaggerSpec = swaggerJSDoc(options);

export const swaggerMiddleware = swaggerUi.serve;
export const swaggerSetup = swaggerUi.setup(swaggerSpec);
