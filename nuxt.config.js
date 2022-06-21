import colors from 'vuetify/es5/util/colors'

require('dotenv').config()


export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'LoNAP: %s',
    title: 'home',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/Ninive.png' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/vuelidate', '~/plugins/prefetch'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/google-fonts'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  publicRuntimeConfig: {
    apiPrefix: process.env.API_PREFIX || '/api',
    apiBaseUrl: process.env.API_BASE_URL
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: {
      font: false,
      icons: 'mdi'
    },
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent4
        }
      }
    }
  },

  axios: {
    baseURL: process.env.API_BASE_URL
  },

  auth: {
    scopeKey: 'roles',
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          required: true,
          type: 'Bearer'
        },
        user: {
          property: '',
          autoFetch: true
        },
        endpoints: {
          login: { url: process.env.API_PREFIX + '/login', method: 'post' },
          user: { url: process.env.API_PREFIX + '/users/me', method: 'get' }
        }
      }
    }
  },

  googleFonts: {
    families: {
      'Work+Sans': true,
      Asul: [700]
    },
    useStylesheet: true,
    preload: true
  },

  router: {
    base: process.env.NODE_ENV === 'production' ? process.env.APP_ROUTER_BASE : undefined,
    parseQuery(q) {
      return require('qs').parse(q)
    },
    stringifyQuery(q) {
      const r = require('qs').stringify(q)
      return r ? '?' + r : ''
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    publicPath: process.env.NODE_ENV === 'production' ? process.env.APP_PUBLIC_PATH : undefined
  }
}
