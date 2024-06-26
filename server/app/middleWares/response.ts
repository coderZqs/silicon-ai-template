const { ErrorModel } = require("../http/response-error");
// 格式化错误响应
const format = (err, ctx) => {
  ctx.response.status = err.statusCode;
  ctx.response.body = {
    code: err.code,
    msg: err.message || err.msg,
    request: ctx.method + " >> " + ctx.url,
  };
};

export default async (ctx, next) => {
  try {
    await next();
  } catch (err: any) {
    if (err.flag === "ErrorModel") {
      format(err, ctx);
    } else {
      // 对于未知的错误返回统一的消息
      format(new ErrorModel(), ctx);
    }
  }
};
