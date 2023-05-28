import { IAlert } from "~/types/IAlert";

export const useAlertStore = defineStore("alert", {
  // arrow function recommended for full type inference
  state: (): { alert: IAlert } => ({
    alert: {
      timer: null,
      text: "",
      error: false,
    },
  }),

  actions: {
    async init(text: string, err = false) {
      if (this.alert.timer) {
        clearTimeout(this.alert.timer);
      }

      this.alert.text = text;
      this.alert.error = err;
      this.alert.timer = setTimeout(() => {
        this.alert.text = "";
      }, 2000);
    },
  },
  getters: {
    getAlert({ alert }) {
      return alert;
    },
  },
});
