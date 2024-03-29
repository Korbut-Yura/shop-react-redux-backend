import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: "${self:custom.import_bucket_name}",
        event: "s3:ObjectCreated:*",
        existing: true,
        rules: [
          {
            prefix: "uploaded/",
          },
        ],
      },
    },
  ],
};
