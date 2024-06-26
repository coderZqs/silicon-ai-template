export default async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With"
  );
  ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");

  console.log(ctx.path)
  if (ctx.method == "OPTIONS") {
    ctx.body = 200;
  } else {
    await next();
  }
};
