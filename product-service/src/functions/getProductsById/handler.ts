import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import mockProducts from "../getProductsList/mockProducts.json";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";

export const getProductsById: ValidatedEventAPIGatewayProxyEvent<
  unknown
> = async (event) => {
  const { productId } = event.pathParameters;
  const availableProduct = mockProducts.find(({ id }) => id === productId);

  if (availableProduct) {
    return formatJSONResponse(availableProduct);
  } else {
    return formatJSONResponse({ message: "Product not found" }, 404);
  }
};

export const main = middyfy(getProductsById);
