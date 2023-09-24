import { NuxtConfig } from '@nuxt/types';

const config: NuxtConfig = {
    ssr: false,

    target: 'static',

    head: {
        title: 'DC Full Stack Code Challenge',
        htmlAttrs: { lang: 'en' },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    css: [
        '@fortawesome/fontawesome-svg-core/styles.css',
        'bootstrap/dist/css/bootstrap.css',
        'bootstrap-vue/dist/bootstrap-vue.css',
    ],

    plugins: ['@/plugins/fontawesome', '@/plugins/bootstrap-vue', '@/plugins/vue-toast', '@/plugins/axios'],

    components: true,

    buildModules: ['@nuxt/typescript-build', 'bootstrap-vue/nuxt', 'nuxt-typed-vuex'],

    modules: ['@nuxtjs/axios', '@nuxtjs/proxy', 'bootstrap-vue/nuxt'],

    serverMiddleware: [{ path: '/api', handler: '@/server/middleware/cors.ts' }],

    router: {
        middleware: ['auth'],
    },

    publicRuntimeConfig: {
        axios: {
            browserBaseURL: process.env.BROWSER_BASE_URL,
        },
    },

    privateRuntimeConfig: {
        axios: {
            baseURL: process.env.BASE_URL,
        },
    },

    axios: {
        prefix: '/api',
        baseURL: process.env.BASE_API_URL,
        credentials: true,
        headers: {
            common: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
            },
        },
    },

    build: {},

    env: {
        BASE_API_URL: 'http://localhost:8000',
    },

    loading: false,
    loadingIndicator: false,

    pageTransition: 'page',
};

export default config;
