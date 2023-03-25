import AWS from "aws-sdk";
import { SQSEvent } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { v4 as uuidv4 } from "uuid";
import { getProductsTrasactItems } from "@libs/dynamoDB";

export const catalogBatchProcess = async (event: SQSEvent) => {
  const sns = new AWS.SNS();
  const dynamo = new AWS.DynamoDB.DocumentClient();
  const parsedRecors = event.Records.map((record) => ({
    ...record,
    body: JSON.parse(record.body),
  }));

  const response = await dynamo
    .transactWrite({
      TransactItems: parsedRecors.reduce(
        (acc, { body }) =>
          acc.concat(getProductsTrasactItems({ ...body, id: uuidv4() })),
        []
      ),
      ReturnConsumedCapacity: "TOTAL",
      ReturnItemCollectionMetrics: "SIZE",
    })
    .promise();

  await sns
    .publish({
      Subject: "Products added successfully",
      MessageAttributes: {
        not_enough_products: {
          DataType: "String",
          StringValue: parsedRecors.some(({ body }) => body.count <= 2)
            ? "true"
            : "false",
        },
      },
      Message: JSON.stringify(response.ConsumedCapacity),
      TopicArn: process.env.SNS_ARN,
    })
    .promise();

  return formatJSONResponse({ message: "success" });
};

export const main = catalogBatchProcess;
