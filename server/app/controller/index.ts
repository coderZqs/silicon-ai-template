import { Context } from "koa";
import { SUCCESS, PARAM_NOT_VALID } from "../http/response-status";

import sdk from "@api/siliconflow";

const TOKEN = process.env.TOKEN as string;
const MODEL = "deepseek-ai/DeepSeek-V2-Chat";
class IndexController {
  async sendMessage(ctx: Context) {
    console.log(ctx.query);
    let text = ctx.query.text as string;
    sdk.auth(TOKEN);

    let { data } = await sdk.chatCompletions({
      model: MODEL,
      messages: [
        {
          role: "user",
          content: text,
        },
      ],
    });

    if (data.choices && data.choices.length) {
      SUCCESS(ctx, data.choices[0].message);
    } else {
      PARAM_NOT_VALID(ctx);
    }
  }
}

export default new IndexController();
