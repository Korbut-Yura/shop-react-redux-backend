import AWS from "aws-sdk";
import { S3Event } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import csv from "csv-parser";

const importFileParser = async (event: S3Event) => {
  const s3 = new AWS.S3({ region: "eu-west-1" });
  const SQS = new AWS.SQS();

  await Promise.all(
    event.Records.map(({ s3: { object } }) => {
      const s3Stream = s3
        .getObject({
          Bucket: process.env.IMPORT_BUCKET_NAME,
          Key: object.key,
        })
        .createReadStream();

      return new Promise<void>((resolve, reject) => {
        s3Stream
          .pipe(
            csv({
              headers: ["title", "description", "price", "count"],
              skipLines: 1, // skip headers line
            })
          )
          .on("data", async (data) => {
            await SQS.sendMessage({
              QueueUrl: process.env.SQS_URL,
              MessageBody: JSON.stringify(data),
            }).promise();
          })
          .on("error", (error) => {
            console.log(error);
            reject(error);
          })
          .on("end", async () => {
            await s3
              .copyObject({
                Bucket: process.env.IMPORT_BUCKET_NAME,
                CopySource: `${process.env.IMPORT_BUCKET_NAME}/${object.key}`,
                Key: object.key.replace("uploaded", "parsed"),
              })
              .promise();

            await s3
              .deleteObject({
                Bucket: process.env.IMPORT_BUCKET_NAME,
                Key: object.key,
              })
              .promise();
            resolve();
          });
      });
    })
  );

  return formatJSONResponse({
    message: "success",
  });
};

export const main = importFileParser;
