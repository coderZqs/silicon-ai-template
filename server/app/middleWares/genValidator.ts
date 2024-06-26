(() => {
  class Response {
    error_no;
    data;
    message;
    constructor(error_no, data, message) {
      this.error_no = error_no;

      if (data) {
        this.data = data;
      }

      if (message) {
        this.message = message;
      }
    }
  }

  class Fail extends Response {
    constructor(error_no = 1, message) {
      super(error_no, {}, "");
      if (message) {
        this.message = message;
      }
    }
  }

  exports.genValidator = (validateFn) => {
    return async (ctx, next) => {
      const data = ctx.data;
      const url = ctx.request.url;
      const error = validateFn(data, url.slice(url.lastIndexOf("/") + 1), ctx);
      if (error) {
        if (Array.isArray(error) && error.length > 0) {
          ctx.body = new Fail(50, error[0].message);
        } else {
          ctx.body = new Fail(50, "请求参数错误!");
        }
      } else {
        await next();
      }
    };
  };
})();
