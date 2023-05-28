import { Buttons } from "../button/btns";
import { IContext } from "../interfaces/IContext";

const buttons = new Buttons();

export const startBot = (ctx: IContext) => {
  ctx.reply("Hi, choose action:", buttons.startButtons());
};
