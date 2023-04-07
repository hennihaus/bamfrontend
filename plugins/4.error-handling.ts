export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, context) => {
    console.log("Context:", context);
    console.log("Error:", error);
  };
});
