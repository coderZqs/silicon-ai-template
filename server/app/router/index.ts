import dotenv from "dotenv";
dotenv.config();
import Router from "koa-router";
import IndexController from "../controller/index";
const router = new Router();

router.get("/send-message", IndexController.sendMessage);
export default router;
