import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function useIsActiveRoute(href: string): boolean {
  const [isActive, setIsActive] = React.useState(false);
  const router = useRouter();
  React.useEffect(() => {
    if (router.route === href) {
      setIsActive(true);
    }
  }, [router.route]);
  return isActive;
}

function HeadLink(props: { href: string, children: React.ReactNode }) {
  const isActive = useIsActiveRoute(props.href);
  return <Link href={props.href}><a className={classNames("mr-3", isActive && 'border-b-2 border-blue-800')}>{props.children}</a></Link>
}

// TODO current link higlighted 
export function Header() {
  return <div>
    <div className="text-right text-blue-800 text md:text-2xl mt-4">
      <HeadLink href="/">Home</HeadLink>
      <HeadLink href="/about">About</HeadLink>
      <HeadLink href="/projects">Projects</HeadLink>
      <HeadLink href="/contact">Contact</HeadLink>
      <a className="mr-3" href="/3d/">3D</a>
    </div>
    <a className="fixed border-8 border-red-400 opacity-50 bottom-0 left-0 w-6 h-6 m-2 rounded-full" href="/eat-the-donut.html"></a>
  </div>;
}

