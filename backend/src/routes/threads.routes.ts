import {Router} from "express";
import { createdThread, listCategories } from "../modules/threads/threads.repository";
import { z } from "zod";
import { UnauthorizedError } from "../lib/errors";
import { getAuth } from "@clerk/express";
import { getUsersFromClerk } from "../modules/users/user.service";
export const threadsRouter = Router();

const CreatedThreadSchema = z.object({
    title: z.string().trim().min(5).max(200),
    body: z.string().trim().min(10).max(2000),
    categorySlug: z.string().trim().min(1),
  });
  
threadsRouter.get("/categories", async (_req, res, next) => {
    try {
      const extractListOfCategories = await listCategories();
  
      res.json({ data: extractListOfCategories });
    } catch (err) {
      next(err);
    }
  });

  threadsRouter.post("/threads", async (req, res, next) => {
    try {
      const auth = getAuth(req);
      if (!auth.userId) {
        throw new UnauthorizedError("Unauthorized");
      }
  
      const parsedBody = CreatedThreadSchema.parse(req.body);
  
      const profile = await getUsersFromClerk(auth.userId);
  
      const newlyCreatedThread = await createdThread({
        categorySlug: parsedBody.categorySlug,
        authorUserId: profile.user.id,
        title: parsedBody.title,
        body: parsedBody.body,
      });
  
      res.status(201).json({ data: newlyCreatedThread });
    } catch (e) {
      next(e);
    }
  });