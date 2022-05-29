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
  return <Link href={item.link}>
    <div className="border-2 rounded p-2 cursor-pointer">
      <a 
        title={item.title} 
        className="p-0" 
        dangerouslySetInnerHTML={{ __html: item.icon }}
        style={{fill: item.iconColor, width: 50, height: 50, display: 'flex'}}
      >
      </a>
      <a className="p-0 m-0" title={item.title}>{item.linkText}</a>
    </div>
  </Link>;
}
