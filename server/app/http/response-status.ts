const SuccessModel = require("./response-success");

const {
  ParameterError,
} = require("./response-error");

// 200 请求成功
export const SUCCESS = async (
  ctx,
  data: object | string | null = null,
  msg = "success!"
) => new SuccessModel(200, msg, data).success(ctx);
// 权限限制
export const USER_NO_PERMISSION = async (ctx, msg = "没有权限") =>
  new SuccessModel(2100, msg).success(ctx);

export const PARAM_NOT_VALID = async (ctx, msg = "请求参数无效") =>
  new ParameterError(1001, msg).throwErr(ctx);