import { handlerPath } from "@libs/handler-resolver";
import validationSchema from "./schema";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "products",
        cors: true,
        summary: "Create Product",
        description: "Add a new product to the table",
        bodyType: "ProductPostBody",
        request: {
          schemas: {
            "application/json": JSON.stringify(validationSchema),
          },
        },
        responses: {
          200: {
            description: "Product added successfully",
            bodyType: "InfoResponse",
          },
          400: {
            description: "Product data is invalid",
            bodyType: "InfoResponse",
          },
          500: {
            description: "Server error",
            bodyType: "InfoResponse",
          },
        },
      },
    },
  ],
};
