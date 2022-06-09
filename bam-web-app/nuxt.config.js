import dotenv from 'dotenv'
import pkg from './package'

dotenv.config()

const APIProtocol = (process.env.API_HTTPS ? 'https' : 'http') + '://'
const APIPort = ':' + process.env.API_PORT
const APIPrefix = process.env.API_PREFIX || '/'
const BASE_API_URI = APIProtocol + process.env.API_HOST + APIPort + APIPrefix
const isDev = () => {
  return process.env.NODE_ENV && process.env.NODE_ENV === 'development'
}

// The change module was changed to export default to charge all environments variables and components

export default {
  mode: 'universal',
  server: {},
  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  // Sass styles, it's necesary to compile SCSS files and transform to CSS
  css: [{ 
	 src: '@/assets/styles/index.scss', 
	 lang: 'scss'}],

  /*
   ** Plugins to load before mounting the App
   */
  // Just used this plugin to configure Front-End styles, is missing to add axios, cognito and authentication
  plugins: [
    { src: '@/plugins/cognito.js'},
    { src: '@/plugins/vue-pikaday.js', mode: 'client' },
    { src: '@/plugins/vue-tel-input.js', mode: 'client' },
    { src: '@/plugins/vuetable.js', mode: 'client' },
    { src: '@/plugins/vue-select.js', mode: 'client' },
    { src: '@/plugins/axios.client.js', mode: 'client' },
    { src: '@/plugins/authentication.client.js', mode: 'client' }
  ],

  // middleware is used to add the first configuration users, it's has just three users public-admin-private
  // This should be changed to get menú from new system after got it the user authenticated.
  router: {
	middleware: 'authentication'
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    [
      'nuxt-i18n',
      {
        locales: [
          {
            name: 'Español',
            code: 'es',
            iso: 'es-MX',
            file: 'es-MX.js'
          },
          {
            name: 'English',
            code: 'en',
            iso: 'en-US',
            file: 'en-US.js'
          }
        ],
        defaultLocale: 'en',
        lazy: true,
        langDir: 'lang/'
      }
    ],
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-svg'
    // here will land the configure tag-manager and googleAnalytics.
  ],

  /*
   ** Axios module configuration
   */
  // environments variables to axios, I mean https variables
  axios: {
    https: !!process.env.API_HTTPS
    // See https://github.com/nuxt-community/axios-module#options
    //https: !!process.env.API_HTTPS
  },

  // environments variables axios and cognito 
  env: {
    BASE_API_URI: BASE_API_URI,
    AWS_COGNITO_USERPOOLID: process.env.AWS_COGNITO_USERPOOLID,
    AWS_COGNITO_CLIENTID: process.env.AWS_COGNITO_CLIENTID
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    postcss: {
      preset: {
        // Change the postcss-preset-env settings
        stage: 0
      }
    },

    extractCSS: {
      allChunks: true
    },

    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
  }
}
