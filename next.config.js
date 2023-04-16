/** @type {import('next').NextConfig} */
module.exports = {
  trailingSlash: true,
  experimental: {
    appDir: true,
  },
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
