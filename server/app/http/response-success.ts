(() => {
  class SuccessModel {
    code;
    msg;
    data;
    constructor(code, msg, data) {
      this.code = code || 200;
      this.msg = msg || "操作成功";
      if (data) {
        this.data = data;
      }
    }
    success(ctx) {
      ctx.body = this;
    }
  }

  module.exports = SuccessModel;
})();
