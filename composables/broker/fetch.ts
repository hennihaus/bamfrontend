export const useBrokerFetch = () => {
    const {t} = useBaseI18n();

    const message = ref("");

    const resetBroker = async (): Promise<void> => {
        message.value = "";

        await useBaseFetch<void>("/activemq", {
            method: "DELETE",
        });

        message.value = t("core.home-restart-course-success");
    }

    return {
        message: readonly(message),
        resetBroker,
    }
}