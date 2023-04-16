import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>Meta - How?</title>
        <meta property="og:image" content="https://i.imgur.com/orqq5jB.jpg"></meta>
        <meta property="og:title" content="Home - Ben Winding"></meta>
        <meta property="og:description" content="A web developer from Adelaide, South Australia."></meta>
      </Head>
      <h1>What?</h1>
      This website is an evolving expression of who I am and what I've done.

      <h1>How?</h1>
      This website is based on the code provided by Ali Spittel. The current technology stack is:
      <ul>
        <li>Vue js</li>
        <li>Webpack</li>
        <li>Sass</li>
        <li>Font Awesome</li>
      </ul>
    </>
  );
}
