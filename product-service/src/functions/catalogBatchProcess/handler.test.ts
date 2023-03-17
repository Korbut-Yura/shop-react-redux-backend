import AWSMock from "aws-sdk-mock";
import AWS from "aws-sdk";
import { catalogBatchProcess } from "./handler";
import { SQSEvent } from "aws-lambda";

const mockEvent = {
  Records: [
    {
      messageId: "1",
      body: JSON.stringify({
        title: "title1",
        description: "description1",
        price: 1,
        count: 1,
      }),
    },
    {
      messageId: "2",
      body: JSON.stringify({
        title: "title2",
        description: "description2",
        price: 2,
        count: 2,
      }),
    },
  ],
};

const env = process.env;

beforeAll((done) => {
  process.env = { ...env, SNS_ARN: "arn::123" };
  done();
});
afterAll(() => {
  process.env = env;
});

describe("catalogBatchProcess", () => {
  test("should receive batched event from SQS  handle it and send a new event to SNS", async () => {
    const mockEventLength = mockEvent.Records.length;
    const MockConsumedCapacity = [
      {
        TableName: "Stocks",
        CapacityUnits: mockEventLength,
        WriteCapacityUnits: mockEventLength,
      },
      {
        TableName: "Products",
        CapacityUnits: mockEventLength,
        WriteCapacityUnits: mockEventLength,
      },
    ];
    const mockPublishToSNS = jest.fn().mockImplementation((_, callback) => {
      console.log("SNS", "tranpublishsactWrite", "mock called");
      callback(undefined, { MessageId: "3" });
    });
    const mockTransactWrite = jest.fn().mockImplementation((_, callback) => {
      console.log("DynamoDB.DocumentClient", "transactWrite", "mock called");
      callback(undefined, {
        ConsumedCapacity: MockConsumedCapacity,
      });
    });
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock("DynamoDB.DocumentClient", "transactWrite", mockTransactWrite);
    AWSMock.mock("SNS", "publish", mockPublishToSNS);

    const result = await catalogBatchProcess(mockEvent as unknown as SQSEvent);

    expect(mockTransactWrite).toBeCalled();
    expect(mockPublishToSNS).toBeCalled();
    expect(mockPublishToSNS.mock.calls[0][0]).toEqual({
      Subject: "Products added successfully",
      Message: JSON.stringify(MockConsumedCapacity),
      TopicArn: process.env.SNS_ARN,
    });
    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify({ message: "success" }),
    });

    AWSMock.restore("DynamoDB.DocumentClient");
    AWSMock.restore("SNS");
  });
});
