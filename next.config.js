/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  experimental: {
    appDir: true,
  },
  pageExtensions: ["js", "jsx", "md", "ts", "tsx"],
  output: "export",
  distDir: "dist",
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "svg-inline-loader",
        },
        {
          loader: "svgo-loader",
          options: {
            plugins: [
              {
                name: "preset-default",
                params: {
                  overrides: {
                    removeViewBox: false,
                  },
                },
              },
            ],
          },
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;
