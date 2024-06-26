import { USER_ACCOUNT_EXPIRED, USER_NOT_LOGIN } from "../http/response-status";
import JWT_UTILS from "../utils/auth";

const jwtToken = async (ctx, next) => {

  console.log(ctx.path)

  if (!ctx.path.includes("/user/login")) {
    let token = ctx.request.headers["token"];
    if (!token) {
      USER_NOT_LOGIN(ctx);
    } else {
      let { admin } = JWT_UTILS.verify(token as string);
      if (admin) {
        let { time, timeout, id } = admin;
        let now = new Date().getTime();
        if (now - time <= timeout) {
          ctx.state.user_id = id;
        } else {
          USER_ACCOUNT_EXPIRED(ctx);
        }
      } else {
        USER_ACCOUNT_EXPIRED(ctx);
      }
    }
  }

  await next();
};

export { jwtToken };
