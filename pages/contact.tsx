import { RainbowText } from "components/RainbowText";
import React from "react";
import { DefaultLayout } from "layouts/default";
import { CardContact, Contact } from "components/CardContact";

const socials: Contact[] = [
  {
    link: "mailto:hello@benwinding.com",
    linkText: "hello@benwinding.com",
    title: "Email!",
    icon: require("~/assets/icons/material/email.svg"),
    iconColor: '#800000'
  },
  {
    link: "https://github.com/benwinding",
    linkText: "github.com/benwinding",
    title: "Github",
    icon: require("~/assets/icons/simple/github.svg"),
    iconColor: 'black'
  },
  {
    link: "https://twitter.com/benwinding",
    linkText: "twitter.com/benwinding",
    title: "Twitter",
    icon: require("~/assets/icons/simple/twitter.svg"),
    iconColor: '#1DA1F2'
  },
  {
    link: "https://dev.to/benwinding",
    linkText: "dev.to/benwinding",
    title: "Dev.to",
    icon: require("~/assets/icons/material/dev-to.svg"),
    iconColor: 'black'
  },
  {
    link: "https://linkedin.com/in/benwinding",
    linkText: "linkedin.com/in/benwinding",
    title: "LinkedIn",
    icon: require("~/assets/icons/simple/linkedin.svg"),
    iconColor: '#0073b1'
  },
  {
    link: "https://instagram.com/benwinding",
    linkText: "instagram.com/benwinding",
    title: "Instagram",
    icon: require("~/assets/icons/simple/instagram.svg"),
    iconColor: 'purple'
  },
  {
    link: "https://www.npmjs.com/~benwinding",
    linkText: "npmjs.com/~benwinding",
    title: "NPM Profile",
    icon: require("~/assets/icons/simple/npm.svg"),
    iconColor: 'red'
  },
  {
    link: "https://stackoverflow.com/users/2419584/ben-winding",
    linkText: "stackoverflow",
    title: "Stack Overflow",
    icon: require("~/assets/icons/misc/stackoverflow-svgrepo-com.svg"),
    iconColor: 'grey'
  },
  {
    link: "https://leetcode.com/ben58/",
    linkText: "leetcode.com/ben58",
    title: "Leetcode Profile",
    icon: require("~/assets/icons/misc/leetcode.svg"),
    iconColor: 'black'
  },
  {
    link: "tel: 0423-225-163",
    linkText: "Call Me: 0423-225-163",
    title: "Phone",
    icon: require("~/assets/icons/material/cellphone-basic.svg"),
    iconColor: 'darkgreen'
  },
  {
    link: "/Ben-Winding-2021-Resume.pdf",
    linkText: "Resume - Ben Winding",
    title: "Resume",
    icon: require("~/assets/icons/custom/cv.svg"),
    iconColor: 'orange'
  },
];

export default function Page() {
  return <DefaultLayout>
    <RainbowText text="Contact"></RainbowText>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {socials.map(item => <section key={item.link}>
        <CardContact item={item} />
      </section>)}
    </div>
  </DefaultLayout>;
}
