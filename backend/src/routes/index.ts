import {Router} from "express";
import { userRouter } from "./user.routes";
import { threadsRouter } from "./threads.routes";
const apiRouter = Router();

apiRouter.use('/me',userRouter);
apiRouter.use('threads', threadsRouter);

export default apiRouter;