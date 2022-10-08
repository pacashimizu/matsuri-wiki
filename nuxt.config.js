export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'matsuri-wiki',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com'},
      { rel: 'preconnect', href: 'https://fonts.gstatic.com'},
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Kosugi+Maru&display=swap'},
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/normalize.css',
    '@/assets/css/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [ 
    { src: '~/plugins/constants.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyDlWFQO1rsYZRlTgx-u8TCIRkt13NxRsiA',
          authDomain: 'matsuri-wiki.firebaseapp.com',
          projectId: 'matsuri-wiki',
          storageBucket: 'matsuri-wiki.appspot.com',
          messagingSenderId: '720264070261',
          appId: '1:720264070261:web:9eaef56fd59ddae25ca43c',
        },
        services: {
          auth: true, // Just as example. Can be any other service.
          firestore: true,
          storage: true
        }
      }
    ]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    modules: [
      '@nuxtjs/axios'
    ],
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  
};

