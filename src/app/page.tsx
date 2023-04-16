import { RainbowText } from "components/RainbowText";
import Head from "next/head";

export default function Page() {
  return <>
    <Head>
      <title>Home</title>
      <meta property="og:image" content="https://i.imgur.com/orqq5jB.jpg"></meta>
      <meta property="og:title" content="Home - Ben Winding"></meta>
      <meta property="og:description" content="A web developer from Adelaide, South Australia."></meta>
    </Head>
    <div className="absolute left-0 m-0 sm:ml-3" style={{
      top: '50%',
      transform: 'translateY(-50%)',
    }}>
      <div className="relative">
        <RainbowText text="Ben Winding" large></RainbowText>
        <p className="ml-2">Complex solutions create complex bugs...</p>
      </div>
    </div>
  </>;
}
