import { IUserToken } from "~/types/IUserToken";
import { IUser } from "~/types/IUser";

export const useUserStore = defineStore("user", {
  actions: {
    async login(data: IUser) {
      const login: IUserToken = await useApi().fetch(
        "POST",
        "/user/login",
        data
      );
      if (login?.accessToken && login?.refreshToken) {
        this.saveTokens({
          refreshToken: login.refreshToken,
          accessToken: login.accessToken,
        });
        return navigateTo("/admin");
      }
    },

    async saveTokens(tokens: Pick<IUserToken, "accessToken" | "refreshToken">) {
      const accessToken = useCookie("accessToken");
      const refreshToken = useCookie("refreshToken");
      refreshToken.value = tokens.refreshToken;
      accessToken.value = tokens.accessToken;
    },

    async refresh() {
      const accessToken = useCookie("accessToken");
      const refreshToken = useCookie("refreshToken");
      try {
        const fetchByAccess: IUserToken = await $fetch(
          useRuntimeConfig().public.api + "/user/refresh",
          {
            method: "POST",
            body: {
              token: accessToken.value,
            },
          }
        );
        this.saveTokens({
          refreshToken: fetchByAccess.refreshToken,
          accessToken: fetchByAccess.accessToken,
        });
      } catch (e) {
        try {
          const fetchByRefresh: IUserToken = await $fetch(
            useRuntimeConfig().public.api + "/user/refresh",
            {
              method: "POST",
              body: {
                token: refreshToken.value,
              },
            }
          );
          this.saveTokens({
            refreshToken: fetchByRefresh.refreshToken,
            accessToken: fetchByRefresh.accessToken,
          });
        } catch (e) {
          accessToken.value = null;
          refreshToken.value = null;
          return navigateTo("/admin/auth");
        }
      }
    },
  },
});
