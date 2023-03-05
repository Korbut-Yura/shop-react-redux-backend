import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { queryById } from "@libs/dynamoDB";

export const getProductsById: ValidatedEventAPIGatewayProxyEvent<
  unknown
> = async (event) => {
  const { productId } = event.pathParameters;
  const availableProduct = await queryById(
    process.env.PRODUCT_TABLE_NAME,
    productId
  );

  if (availableProduct) {
    return formatJSONResponse(availableProduct);
  } else {
    return formatJSONResponse({ message: "Product not found" }, 404);
  }
};

export const main = middyfy(getProductsById);
