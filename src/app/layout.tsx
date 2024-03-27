import React from "react";
import "./global.css";
import "../../public/fonts/font.css";
import { Header } from "components/Header";

export default function MyApp(props: React.PropsWithChildren) {
  return (
    <html lang="en">
      {
        /*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
        */
      }
      <head />
      <body>
        <DefaultLayout>
          {props.children}
        </DefaultLayout>
      </body>
    </html>
  );
}

function DefaultLayout(props: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen" style={{ overflowY: "overlay" as any, paddingRight: "10px" }}>
      <section className="max-w-[980px] mx-auto p-4 md:p-11 ">
        <Header />
        {props.children}
      </section>
    </div>
  );
}
