import { IStack } from "~/types/IStack";

export const useStackStore = defineStore("stack", {
  // arrow function recommended for full type inference
  state: (): { stacks: IStack[]; stack: IStack | undefined } => ({
    stacks: [],
    stack: undefined,
  }),

  actions: {
    async fetchAll() {
      const stacks: { stacks: IStack[] } = await useApi().fetch(
        "GET",
        "/stack"
      );
      this.stacks = stacks.stacks;
    },

    async create(data: IStack) {
      const form = new FormData();
      form.append("title", data.title);
      form.append("image", data.image);
      const stack: IStack = await useApi().fetch("POST", "/stack", form);
      if (stack.message) {
        useAlert(stack.message);
        return navigateTo("/admin/stack");
      }
    },
    async update(data: IStack, id: number) {
      const form = new FormData();
      form.append("title", data.title);
      form.append("image", data.image);
      const stack: IStack = await useApi().fetch("PATCH", `/stack/${id}`, form);
      if (stack.message) {
        useAlert(stack.message);
        return navigateTo("/admin/stack");
      }
    },
    async destroy(id: number) {
      const stack: IStack = await useApi().fetch("DELETE", `/stack/${id}`);
      if (stack.message) {
        useAlert(stack.message);
        this.fetchAll();
        return navigateTo("/admin/stack");
      }
    },

    async fetchOne(id: number) {
      const stack: { stack: IStack } = await useApi().fetch(
        "GET",
        `/stack/${id}`
      );
      this.stack = stack.stack;
    },
  },
  getters: {
    getStacks({ stacks }) {
      return stacks;
    },
    getStack({ stack }) {
      return stack;
    },
  },
});
