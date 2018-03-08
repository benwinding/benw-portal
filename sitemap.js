const sm = require('express-sitemap');

function getTodaysDate() {
  return new Date().toISOString().slice(0,10);
}

const sitemap = sm({
  robots: 'public/robots.txt',
  sitemap: 'public/sitemap.xml',
  http: 'https',
  url: 'benwinding.com',
  sitemapSubmission: '/sitemap.xml',
  route: {
    'ALL': {
      lastmod: getTodaysDate(),
      changefreq: 'always',
      priority: 1.0,
    }
  },
});

module.exports = (app, router) => {
  sitemap.generate4(router);
  sitemap.toFile();
};
