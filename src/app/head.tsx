const THEME_COLOR = '#800000'

export default function Head() {
  return (
    <>
      <link rel="apple-touch-icon" sizes="180x180" href="/icons/favicon_io/apple-touch-icon.png"></link>
      <link rel="icon" sizes="32x32" href="/icons/favicon_io/favicon-32x32.png"></link>
      <link rel="icon" sizes="16x16" href="/icons/favicon_io/favicon-16x16.png"></link>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <meta name="theme-color" content={THEME_COLOR}></meta>
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-38440481-1"></script>
      <script src="/google-analytics.js"></script>
    </>
  );
}
