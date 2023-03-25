import { formatJSONResponse } from "@libs/api-gateway";
import middy from "@middy/core";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const errorHandler = (): middy.MiddlewareObj<
  APIGatewayProxyEvent,
  APIGatewayProxyResult
> => ({
  onError: async (request) => {
    request.response = {
      ...request.response,
      ...formatJSONResponse({ message: "Something went wrong" }, 500),
    };
  },
});
