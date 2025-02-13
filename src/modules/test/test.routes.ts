import { Router } from "express";
import { testController } from "./controllers/test.controller";
import { strictThrottler } from "@/src/common/throttlers/strict.throttler";

export const testRouter = Router();

/**
 * @swagger
 * /api/tests/bad-request:
 *  get:
 *    tags: [Tests]
 *    summary: Test bad request
 *    description: Test a bad request error thrown from the server.
 *    responses:
 *      '200':
 *        description: OK
 */
testRouter.get("/tests/bad-request", testController.testBadRequest);

/**
 * @swagger
 * /api/tests/strict-throttler:
 *  get:
 *    tags: [Tests]
 *    summary: Test strict throttler
 *    description: Test a strict throttler that will block the IP Address after X attempts.
 *    responses:
 *      '200':
 *        description: OK
 */
testRouter.get(
  "/tests/strict-throttler",
  strictThrottler,
  testController.testSerializer
);

/**
 * @swagger
 * /api/tests/queue-launch:
 *  get:
 *    tags: [Tests]
 *    summary: Start a new queue
 *    description: Start a new sandboxed queue with BullMQ.
 *    responses:
 *      '200':
 *        description: OK
 */
testRouter.get("/tests/queue-launch", testController.testQueueLaunch);

/**
 * @swagger
 * /api/tests/zod:
 *  post:
 *    tags: [Tests]
 *    summary: Test Zod
 *    description: Test Zod validation.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              bookings:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                    name:
 *                      type: string
 *    responses:
 *      '200':
 *        description: OK
 */
testRouter.post("/tests/zod", testController.testZod);

/**
 * @swagger
 * /api/tests/serializer:
 *  post:
 *    tags: [Tests]
 *    summary: Test serializer
 *    description: Test serializer.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              bookings:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                    name:
 *                      type: string
 *    responses:
 *      '200':
 *        description: OK
 */
testRouter.post("/tests/serializer", testController.testSerializer);
