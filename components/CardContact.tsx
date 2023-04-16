import Link from "next/link";
import React from "react";

export type Contact = {
  title: string,
  link: string,
  linkText: string,
  icon?: any,
  iconColor: string,
}

export function CardContact({ item }: { item: Contact }) {
  return <Link
    href={item.link}
    title={item.title}
    className="border-2 rounded p-2 cursor-pointer flex flex-col"
  >
    <span
      className="p-0 flex"
      dangerouslySetInnerHTML={{ __html: item.icon }}
      style={{ fill: item.iconColor, width: 50, height: 50 }}
    >
    </span>
    <span className="p-0 m-0 mt-1">{item.linkText}</span>
  </Link>;
}
