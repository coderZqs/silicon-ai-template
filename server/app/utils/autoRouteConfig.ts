/**
 * 自动加载路由
 */

import fs from "fs";
import path from "path";

export default (app) => {
  let modules = fs.readdirSync(path.resolve(__dirname, `../router`));

  modules.forEach(async (routeName) => {
    let module = await import(`../router/${routeName}`);
    const route = module.default;

    if (route && typeof route.routes === "function") {
      app.use(route.routes());
    }
  });
};
