import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: "HFU - Business Integration",
            link: [
                { rel: "icon", href: "/favicon.ico" },
                { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/semantic-ui@2.5.0/dist/semantic.min.css" }
            ],
        },
    },
    appConfig: {
        passwordLength: 10,
        passwordSequence: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    },
    css: [
        '@/assets/css/main.css',
    ],
    devServer: {
      port: 4200,
    },
    extensions: [
        ".vue",
        ".ts"
    ],
    ssr: false,
    telemetry: false,
    test: true,
    typescript: {
        strict: true,
        tsConfig: {
            compilerOptions: {
                types: [
                    "@intlify/unplugin-vue-i18n/messages",
                ],
                allowUnreachableCode: false,
                allowUnusedLabels: false,
                alwaysStrict: true,
                exactOptionalPropertyTypes: true,
                noFallthroughCasesInSwitch: true,
                noImplicitAny: true,
                noImplicitOverride: true,
                noImplicitReturns: true,
                noImplicitThis: true,
                noUnusedLocals: true,
                noUnusedParameters: true,
                strict: true,
                strictBindCallApply: true,
                strictFunctionTypes: true,
                strictNullChecks: true,
                strictPropertyInitialization: true,
                useUnknownInCatchVariables: true
            },
        },
    },
    runtimeConfig: {
        public: {
            baseURL: "http://localhost:8080",
            baseVersion: "v1",
            activeMqURL: "http://localhost:8161/admin",
            googleCloudIamURL: "https://google.de",
            locale: "de",
            fallbackLocale: "de"
        }
    },
    vite: {
        plugins: [
            VueI18nPlugin({
                runtimeOnly: false,
                globalSFCScope: false,
            })
        ],
    }
})
