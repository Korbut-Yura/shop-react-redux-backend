import { getProductsList } from "./handler";
import mockProducts from "../getProductsList/mockProducts.json";

describe("getProductsList", () => {
  test("should return a list of mocked products", async () => {
    const res = await getProductsList();
    expect(res).toEqual({
      statusCode: 200,
      body: JSON.stringify({ products: mockProducts }),
    });
  });
});
