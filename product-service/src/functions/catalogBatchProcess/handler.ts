import { SQSEvent } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { v4 as uuidv4 } from "uuid";
import { getProductsTrasactItems, transactWriteProduct } from "@libs/dynamoDB";

const catalogBatchProcess = async (event: SQSEvent) => {
  await transactWriteProduct(
    event.Records.reduce(
      (acc, { body }) =>
        acc.concat(
          getProductsTrasactItems({ ...JSON.parse(body), id: uuidv4() })
        ),
      []
    )
  );

  return formatJSONResponse({ message: "success" });
};

export const main = catalogBatchProcess;
