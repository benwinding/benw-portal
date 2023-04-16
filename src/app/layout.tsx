"use client"
import React from "react";
import "./global.css";
import "../../public/fonts/font.css";
import { Header } from "components/Header";
import { TransitionGroup, CSSTransition } from "react-transition-group";

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
  return <div className="h-screen w-screen" style={{ overflowY: 'overlay' as any, paddingRight: '10px' }} >
    <section className="max-w-6xl mx-auto p-2">
      <Header />
      <TransitionGroup>
        <CSSTransition
          timeout={300}
          classNames="item"
        >
          <>{props.children}</>
        </CSSTransition>
      </TransitionGroup>
    </section>
  </div>
}
