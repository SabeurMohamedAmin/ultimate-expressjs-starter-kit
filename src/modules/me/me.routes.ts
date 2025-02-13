import { Router } from "express";
import { meController } from "./me.controller";
import { sessionsGuard } from "@/src/common/guards/sessions.guard";

export const meRouter = Router();

/**
 * @swagger
 * /api/me:
 *  get:
 *    tags: [Me]
 *    summary: Get the current logged-in user's information.
 *    description: Get the current logged-in user's information.
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      '200':
 *        description: OK
 */
meRouter.get("/me", sessionsGuard, meController.getMe);
