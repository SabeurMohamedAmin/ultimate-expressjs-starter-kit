import { serializerService } from "@/src/common/lib/serializer";
import { validate } from "@/src/common/lib/validator";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { AccountDto } from "../dtos/account.dto";
import { testingQueue } from "../queues/testing/testing.queue";
import { accountUpdateSchema } from "../schemas/account-update.schema";
import { TESTING_JOB } from "../queues/testing/testing.job";

const testBadRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    throw createHttpError.BadRequest("Un problème est survenu.");

    return res.json({
      message: "Hello World",
    });
  } catch (error) {
    next(error);
  }
};

const testQueueLaunch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await testingQueue.add(TESTING_JOB, {
      message: "Hello World",
    });

    return res.json({
      message: "Job added to queue.",
    });
  } catch (error) {
    next(error);
  }
};

const testZod = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = await validate({
      req,
      schema: accountUpdateSchema,
    });

    return res.json(body);
  } catch (error) {
    next(error);
  }
};

const testSerializer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = {
      id: "123",
      name: "John Doe",
      thiswillalsoberemoved: "This will be removed too",
      extraData: {
        id: "456",
        name: "John Abc",
        thiswillberemoved: "This will be removed",
      },
    };

    const serialized = serializerService.serialize({
      dto: AccountDto,
      data,
    });

    return res.json(serialized);
  } catch (error) {
    next(error);
  }
};

export const testController = {
  testBadRequest,
  testQueueLaunch,
  testZod,
  testSerializer,
};
