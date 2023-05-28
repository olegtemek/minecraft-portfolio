import { Markup } from "telegraf";
import { IProject } from "../interfaces/IProject";

export class Buttons {
  projectsButtons(projects: IProject[]) {
    const btns = projects.map((project) => {
      return {
        text: project.title,
        callback_data: `projects|||${project.slug}`,
      };
    });
    return Markup.inlineKeyboard([
      btns,
      [
        {
          text: "⬅️ Home",
          callback_data: "main",
        },
      ],
    ]);
  }

  startButtons() {
    return Markup.inlineKeyboard([
      [
        { text: "💼 Portfolio", callback_data: "projects" },
        { text: "🧠 Stack", callback_data: "stacks" },
        { text: "📝 Contacts", callback_data: "contacts" },
      ],
    ]);
  }

  backButton() {
    return Markup.inlineKeyboard([
      [
        {
          text: "⬅️ Back",
          callback_data: "projects",
        },
      ],
    ]);
  }
  mainMenuButton() {
    return Markup.inlineKeyboard([
      [
        {
          text: "⬅️ Home",
          callback_data: "main",
        },
      ],
    ]);
  }

  projectButtons(siteSlug: string, previewUrl: string) {
    return Markup.inlineKeyboard([
      [
        {
          text: "⬅️ Back",
          callback_data: "projects",
        },
        {
          text: "📺 Watch full",
          url: `https://olegtemek.kz/projects/${siteSlug}`,
        },
        {
          text: "👀 Preview",
          url: `${previewUrl}`,
        },
      ],
    ]);
  }
}
