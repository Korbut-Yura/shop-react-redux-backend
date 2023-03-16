import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { v4 as uuidv4 } from "uuid";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { getProductsTrasactItems, transactWriteProduct } from "@libs/dynamoDB";
import Schema from "./schema";

export const createProduct: ValidatedEventAPIGatewayProxyEvent<
  typeof Schema
> = async (event) => {
  try {
    await transactWriteProduct(
      getProductsTrasactItems({ ...event.body, id: uuidv4() })
    );

    return formatJSONResponse({ message: "Successfully added" });
  } catch (e) {
    return formatJSONResponse({ message: "Something went wrong !!!!" }, 500);
  }
};

export const main = middyfy(createProduct);
