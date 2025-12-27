import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  app: {
    // basic default seo
    head: {
      title: "Saras Finance Search Demo", // default fallback title
      meta: [
        {
          name: "description",
          content: "Vue.js Frontend Developer Assignment Task",
        },
      ],
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  runtimeConfig: {
    // unsplash keys
    unsplashAppId: "",
    unsplashAccessKey: "",
    unsplashSecretKey: "",
    public: {
      unsplashApiBase: "https://api.unsplash.com",
    },
  },
  css: ["./app/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
});
