import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import mockProducts from "./mockProducts.json";

const getProductsList = async () => {
  return formatJSONResponse({
    products: mockProducts,
  });
};

export const main = middyfy(getProductsList);
