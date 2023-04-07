export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, context) => {
    /* eslint-disable-next-line no-console --
     * TODO: no reporting framework yet implemented
     */
    console.log("Context:", context);
    /* eslint-disable-next-line no-console --
     * TODO: no reporting framework yet implemented
     */
    console.log("Error:", error);
  };
});
