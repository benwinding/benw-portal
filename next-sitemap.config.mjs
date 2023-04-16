/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || "https://benwinding.com",
  generateIndexSitemap: false,
  // generateRobotsTxt: true, // (optional)
  // ...other options
};

export default config;
