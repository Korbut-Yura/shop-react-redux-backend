import { formatJSONResponse } from "@libs/api-gateway";
import { scan } from "@libs/dynamoDB";
import { middyfy } from "@libs/lambda";
import { APIGatewayProxyResult } from "aws-lambda";
import { chain, find, map } from "lodash";

export const getProductsList = async (): Promise<APIGatewayProxyResult> => {
  const [productsTable, stocksTable] = await Promise.all([
    scan(process.env.PRODUCT_TABLE_NAME),
    scan(process.env.STOCKS_TABLE_NAME),
  ]);

  const products = map(productsTable, (product) =>
    chain(product)
      .merge(find(stocksTable, { product_id: product.id }))
      .omit("product_id")
      .value()
  );

  return formatJSONResponse({
    products,
  });
};

export const main = middyfy(getProductsList);
