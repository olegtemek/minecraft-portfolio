import * as dotenv from "dotenv";
dotenv.config();
import { Telegraf } from "telegraf";
import { IContext } from "./interfaces/IContext";
import { ICallback } from "./interfaces/ICallback";
import { Buttons } from "./button/btns";
import { startBot } from "./utils/utils";
import { Api } from "./api/api";
import { IStack } from "./interfaces/IStack";
import { IProject } from "./interfaces/IProject";

const bot = new Telegraf(`${process.env.BOT_API_KEY}`);
const useApi = new Api();

const buttons = new Buttons();

bot.start(async (ctx: IContext) => {
  const user: any = await ctx.getChat();
  ctx.telegram.sendMessage(
    `${process.env.ADMIN_CHAT_ID}`,
    `Notification:\nThis user start chatting with bot: @${user.username}`
  );

  startBot(ctx);
});

bot.on("callback_query", async (ctx: IContext) => {
  const callBack = ctx.callbackQuery as ICallback;
  const query = callBack.data.split("|||");

  if (query.length > 1 && query[0] == "projects") {
    ctx.deleteMessage();

    const project = await useApi.findProjectBySlug(query[1]);

    if (!project)
      return ctx.reply(
        "Im so sorry, project not found 😢",
        buttons.backButton()
      );

    return ctx.replyWithHTML(
      `<strong>${project.title}</strong>\n${project.shortDescription}\n\n`,
      buttons.projectButtons(project.slug, project.link)
    );
  }

  if (query[0] == "projects") {
    ctx.deleteMessage();
    const projects: IProject[] = await useApi.findAllProjects();
    return ctx.reply("Choose a project: ", buttons.projectsButtons(projects));
  }
  if (query[0] == "contacts") {
    return ctx.replyWithHTML(
      `
    <strong>Contacts: </strong>\n\nTelegram: @olegtemek\nGitHub: <a href="https://github.com/olegtemek">olegtemek</a>\nMail: <a href="mailto:olegtemek@gmail.com">olegtemek@gmail.com</a>
  `,
      buttons.mainMenuButton()
    );
  }

  if (query[0] == "stacks") {
    const stacks: IStack[] = await useApi.findAllStacks();
    return ctx.reply(
      `${stacks
        .map((stack) => {
          return `${stack.title}\n`;
        })
        .join("")}`,
      buttons.mainMenuButton()
    );
  }
  if (query[0] == "main") {
    return startBot(ctx);
  }
});

bot.launch();
