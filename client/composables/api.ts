import { useAlertStore } from "@/store/alert.js";
export const useApi = () => {
  const accessToken = useCookie("accessToken");
  const refreshToken = useCookie("refreshToken");
  const headers = {
    Authorization: `Bearer ${accessToken.value}`,
  };

  const fetch = async (
    method: string,
    url: string,
    data: any = undefined
  ): Promise<any> => {
    try {
      if (method == "GET") {
        let fetch = await $fetch(useRuntimeConfig().public.api + url, {
          method: "GET",
          headers: { ...headers },
          params: data,
        });

        return fetch;
      }
      if (method == "POST") {
        let fetch = await $fetch(useRuntimeConfig().public.api + url, {
          method: "POST",
          headers: { ...headers },
          body: data,
        });

        return fetch;
      }

      if (method == "PATCH") {
        let fetch = await $fetch(useRuntimeConfig().public.api + url, {
          method: "PATCH",
          headers: { ...headers },
          body: data,
        });

        return fetch;
      }
      if (method == "DELETE") {
        let fetch = await $fetch(useRuntimeConfig().public.api + url, {
          method: "DELETE",
          headers: { ...headers },
          body: data,
        });

        return fetch;
      }
    } catch (e: any) {
      if (e.data?.statusCode == 400) {
        return useAlertStore().init(e.data?.message, true);
      }
      if (e.data?.statusCode == 401) {
        return navigateTo("/auth");
      }
      if (e.data?.statusCode == 403) {
        useAlertStore().init("Недостаточно прав", true);
        return navigateTo("/");
      }
      return useAlert("Server error", true);
    }
  };

  return { fetch };
};
