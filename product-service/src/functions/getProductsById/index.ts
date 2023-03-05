import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "get",
        path: "products/{productId}",
        cors: true,
        summary: "Product details",
        description: "Request available product by Id",
        responses: {
          200: {
            description: "There is product in a table",
            bodyType: "Product",
          },
          404: {
            description: "There is no product  in a table",
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
