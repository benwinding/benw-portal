var sitemap = require('express-sitemap');

const config = sitemap({
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

module.exports = (app) => {
  config.generate(app);
  config.toFile();
}
