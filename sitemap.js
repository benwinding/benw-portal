const sm = require('express-sitemap');

const sitemap = sm({
  robots: 'public/robots.txt',
  sitemap: 'public/sitemap.xml',
  http: 'https',
  url: 'benwinding.com',
  sitemapSubmission: '/sitemap.xml',
  route: {
    'ALL': {
      lastmod: new Date().toLocaleDateString(),
      changefreq: 'always',
      priority: 1.0,
    }
  },
});

module.exports = (app, router) => {
  sitemap.generate4(router);
  sitemap.toFile();
};
