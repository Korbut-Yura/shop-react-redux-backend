import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import cors from "@middy/http-cors";
import { logger } from "./middlewares/logger";
import { errorHandler } from "./middlewares/error-handler";

export const middyfy = (handler) => {
  return middy(handler)
    .use(errorHandler())
    .use(logger())
    .use(middyJsonBodyParser())
    .use(
      cors({
        headers: "*",
      })
    );
};
