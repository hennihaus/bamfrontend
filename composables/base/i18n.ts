import {I18nScope, useI18n} from "vue-i18n";
import {Locales, MessageSchema, NumberSchema} from "~/plugins/1.i18n";

export const useBaseI18n = (useScope: I18nScope = "global") => {
    const {t, locale} = useI18n<{ message: MessageSchema; number: NumberSchema }, Locales>({
        useScope,
    });

    return {
        t,
        locale,
    }
}

export const useCapitalizedPassed = () => {
    const { t } = useBaseI18n();

    const capitalizePassed = computed(() => {
        return (
            t("team.passed", 1).charAt(0).toUpperCase() + t("team.passed", 1).slice(1)
        );
    });

    return {
        capitalizePassed,
    }
}