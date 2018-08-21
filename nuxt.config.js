module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - Ben Winding',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { rel:"apple-touch-icon", sizes:"57x57", href:"/favicons/apple-icon-57x57.png" },
      { rel:"apple-touch-icon", sizes:"60x60", href:"/favicons/apple-icon-60x60.png" },
      { rel:"apple-touch-icon", sizes:"72x72", href:"/favicons/apple-icon-72x72.png" },
      { rel:"apple-touch-icon", sizes:"76x76", href:"/favicons/apple-icon-76x76.png" },
      { rel:"apple-touch-icon", sizes:"114x114", href:"/favicons/apple-icon-114x114.png" },
      { rel:"apple-touch-icon", sizes:"120x120", href:"/favicons/apple-icon-120x120.png" },
      { rel:"apple-touch-icon", sizes:"144x144", href:"/favicons/apple-icon-144x144.png" },
      { rel:"apple-touch-icon", sizes:"152x152", href:"/favicons/apple-icon-152x152.png" },
      { rel:"apple-touch-icon", sizes:"180x180", href:"/favicons/apple-icon-180x180.png" },
      { rel:"icon", type:"image/png", sizes:"192x192",  href:"/favicons/android-icon-192x192.png" },
      { rel:"icon", type:"image/png", sizes:"32x32", href:"/favicons/favicon-32x32.png" },
      { rel:"icon", type:"image/png", sizes:"96x96", href:"/favicons/favicon-96x96.png" },
      { rel:"icon", type:"image/png", sizes:"16x16", href:"/favicons/favicon-16x16.png" },
      { rel:"manifest", href:"/favicons/manifest.json" },
      
      { name:"msapplication-TileColor", content:"#800000" },
      { name:"msapplication-TileImage", content:"/favicons/ms-icon-144x144.png" },
      { name:"theme-color", content:"#800000" },

      { rel: "stylesheet", href:"https://use.fontawesome.com/releases/v5.2.0/css/regular.css", integrity:"sha384-zkhEzh7td0PG30vxQk1D9liRKeizzot4eqkJ8gB3/I+mZ1rjgQk+BSt2F6rT2c+I", crossorigin:"anonymous" },
      { rel: "stylesheet", href:"https://use.fontawesome.com/releases/v5.2.0/css/fontawesome.css", integrity:"sha384-HbmWTHay9psM8qyzEKPc8odH4DsOuzdejtnr+OFtDmOcIVnhgReQ4GZBH7uwcjf6", crossorigin:"anonymous" },
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  modules: [
   '@nuxtjs/sitemap'
  ],

  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://benwinding.com',
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    generate: true, // Enable me when using nuxt generate
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.devtool = '#source-map';
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

