import { getProductsById } from "./handler";
import mockProducts from "../getProductsList/mockProducts.json";
import { Context } from "aws-lambda";

describe("getProductsById", () => {
  test("should return a product data with equal prouctID", async () => {
    const res = await getProductsById(
      {
        pathParameters: { productId: "1" },
        httpMethod: "GET",
        path: "products/1",
        headers: {
          "Content-Type": "application/json",
        },
      } as unknown as Parameters<typeof getProductsById>[0],
      {} as Context,
      jest.fn()
    );
    expect(res).toEqual({
      statusCode: 200,
      body: JSON.stringify(mockProducts[0]),
    });
  });
  test("in case of absend productId should return 404 error", async () => {
    const res = await getProductsById(
      {
        pathParameters: { productId: "231" },
        httpMethod: "GET",
        path: "products/231",
        headers: {
          "Content-Type": "application/json",
        },
      } as unknown as Parameters<typeof getProductsById>[0],
      {} as Context,
      jest.fn()
    );
    expect(res).toEqual({
      statusCode: 404,
      body: JSON.stringify({ message: "Product not found" }),
    });
  });
});
