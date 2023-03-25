import type { AWS } from "@serverless/typescript";

import {
  getProductsList,
  getProductsById,
  createProduct,
} from "@functions/index";

const serverlessConfiguration: AWS = {
  service: "product-service",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-auto-swagger"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    stage: "dev",
    region: "eu-west-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      PRODUCT_TABLE_NAME: "${self:custom.products_table_name}",
      STOCKS_TABLE_NAME: "${self:custom.stocks_table_name}",
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
        ],
        Resource: [
          "arn:aws:dynamodb:eu-west-1:704165866494:table/${self:custom.products_table_name}",
          "arn:aws:dynamodb:eu-west-1:704165866494:table/${self:custom.stocks_table_name}",
        ],
      },
    ],
  },
  functions: { getProductsList, getProductsById, createProduct },
  package: { individually: true },
  custom: {
    products_table_name: "Products",
    stocks_table_name: "Stocks",
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    autoswagger: {
      apiType: "http",
      typefiles: ["./src/types/api-types.d.ts"],
      basePath: "/dev",
    },
  },
};

module.exports = serverlessConfiguration;
