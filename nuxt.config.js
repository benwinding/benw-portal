module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - Ben Winding",
    link: [
      { name: "msapplication-TileColor", content: "#800000" },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "icons/favicon_io/apple-touch-icon.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "icons/favicon_io/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "icons/favicon_io/favicon-16x16.png"
      },
      { rel: "stylesheet", href: "/fonts/font.css" },
    ],
    meta: [
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0"
      }
    ]
  },
  manifest: {
    name: "Ben Winding",
    lang: "en",
    icons: [
      {
        src: "icons/favicon_io/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "icons/favicon_io/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    theme_color: "#800000",
    background_color: "#ffffff",
    display: "standalone"
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#800000" },

  buildModules: [
    "@nuxtjs/sitemap",
    "nuxt-svg-loader",
    "@nuxtjs/tailwindcss",
    "@nuxt/typescript-build"
  ],

  sitemap: {
    path: "/sitemap.xml",
    hostname: "https://benwinding.com",
    cacheTime: 1000 * 60 * 15,
    gzip: true
  },
  /*
   ** Build configuration
   */
  build: {
    vendor: ["pts"],
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.devtool = "#source-map";
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  },
};
