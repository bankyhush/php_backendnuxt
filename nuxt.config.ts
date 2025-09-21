// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/image", "@nuxt/ui"],

  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || "http://localhost/_API/fotmobapi",
    },
  },
});
