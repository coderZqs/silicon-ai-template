class ErrorModel {
  code;
  msg;
  statusCode;
  constructor(code = 500, msg = "未知服务器错误", statusCode = 500) {
    this.code = code;
    this.msg = msg;
    this.statusCode = statusCode;
  }
  throwErr(ctx) {
    ctx.throw(this.statusCode, this.msg, {
      code: this.code,
      flag: "ErrorModel",
    });
  }
}

export default {
  ErrorModel,
};
