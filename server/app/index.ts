import Koa from "koa";
import { Server } from "http";
import staticServe from "koa-static";
import koaBody from "koa-body";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import Cors from "./middleWares/cors";
import AutoRouter from "./utils/autoRouteConfig";

const app = new Koa();
app.use(Cors);

/* app.use(
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, "../public/uploads"),
    },
    json: true,
  })
);

app.use(
  staticServe(path.join(__dirname, "../public/uploads"), { maxage: 2592000000 })
);

app.use(jwtToken); */
AutoRouter(app);

app.onerror = (err) => {
  console.log(err);
};

const run = (port: number): Server => {
  return app.listen(port);
};

run(8888);
