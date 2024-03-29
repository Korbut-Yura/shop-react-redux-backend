import type { AWS } from "@serverless/typescript";

import { basicAuthorizer } from "@functions/index";

const serverlessConfiguration: AWS = {
  service: "authorization-service",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-dotenv-plugin"],
  useDotenv: true,
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
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      Korbut_Yura: "${env.Korbut_Yura}",
    },
  },
  // import the function via paths
  functions: { basicAuthorizer },
  package: { individually: true },
  custom: {
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
  },
  resources: {
    Outputs: {
      authorizerArn: {
        Description: "ARN of basic authorizer",
        Value: { "Fn::GetAtt": ["BasicAuthorizerLambdaFunction", "Arn"] },
        Export: { Name: "authorizerArn" },
      },
    },
  },
};

module.exports = serverlessConfiguration;
