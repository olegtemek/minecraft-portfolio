import { useAlertStore } from "@/store/alert";
export const useAlert = (text: string, err = false) => {
  useAlertStore().init(text, err);
};
