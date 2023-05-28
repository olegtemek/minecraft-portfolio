import { useUserStore } from "@/store/user.js";
export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client && to.meta.layout == "admin") {
    const accessToken = useCookie("accessToken");
    const refreshToken = useCookie("refreshToken");
    if (!accessToken.value || !refreshToken.value) {
      return navigateTo("/admin/auth");
    } else {
      await useUserStore().refresh();
    }
  }
});
