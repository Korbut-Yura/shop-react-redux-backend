import { S3 } from "aws-sdk";
import { S3Event } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import csv from "csv-parser";

const s3 = new S3({ region: "eu-west-1" });

const importFileParser = async (event: S3Event) => {
  await Promise.all(
    event.Records.map((record) => {
      const s3Stream = s3
        .getObject({
          Bucket: process.env.IMPORT_BUCKET_NAME,
          Key: record.s3.object.key,
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
          .on("data", (data) => {
            console.log("data", JSON.stringify(data));
          })
          .on("error", (error) => {
            console.log(error);
            reject(error);
          })
          .on("end", () => {
            console.log("READ STREAM FINISHED");
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
