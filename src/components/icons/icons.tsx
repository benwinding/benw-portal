import classNames from "classnames";
import styles from "./icons.module.css";

export type IconName = keyof typeof IconRequireMap;

type IconProps = { className?: string, onClick?: () => void, iconName: IconName, color?: string, width?: number };
export function Icon(props: IconProps) {
  const icon = IconRequireMap[props.iconName];
  const color = props.color || IconColorMap[props.iconName] || '#ddd';
  const width = props.width || 40;
  return <div
    className={classNames(styles.svgWrapper, "p-0", props.className)}
    dangerouslySetInnerHTML={{ __html: icon }}
    style={{ fill: color, width: width, height: width, display: 'flex' }}
    onClick={props.onClick}
  >
  </div>
}

type FullIconColorMap = Record<IconName, string>;
const IconColorMap: Partial<FullIconColorMap> = {
  three: "#777",

  checkall: "#222222",
  hackernews: "#ff8239",
  pdf: "red",
  pen: "#4b924b",

  angular: "#800000",
  chrome: "#3949ab",
  firebase: "#777",
  firefox: "#f44336",
  flutter: "#3fb6d3",
  instagram: "#8134af",
  javascript: "#ffc107",
  messenger: "#3680f8",
  python: "#4b924b",
  react: "darkred",
  svelte: "#aa0000",
  tailwind: "#06b6d4",
  vue: "#009651",
  wordpress: "#00bcd4",

  apple: "#333",
  next: "#000",
}

const IconRequireMap = {
  three: require("assets/icons/custom/three-js.svg"),

  checkall: require("assets/icons/material/check-box-multiple-outline.svg"),
  hackernews: require("assets/icons/material/hackernews.svg"),
  pdf: require("assets/icons/material/file-pdf.svg"),
  pen: require("assets/icons/material/lead-pencil.svg"),

  angular: require("assets/icons/simple/angular.svg"),
  chrome: require("assets/icons/simple/googlechrome.svg"),
  firebase: require("assets/icons/simple/firebase.svg"),
  firefox: require("assets/icons/simple/mozillafirefox.svg"),
  github: require("assets/icons/simple/github.svg"),
  instagram: require("assets/icons/simple/instagram.svg"),
  javascript: require("assets/icons/simple/javascript.svg"),
  messenger: require("assets/icons/simple/messenger.svg"),
  python: require("assets/icons/simple/python.svg"),
  react: require("assets/icons/simple/react.svg"),
  svelte: require("assets/icons/simple/svelte.svg"),
  tailwind: require("assets/icons/simple/tailwindcss.svg"),
  vue: require("assets/icons/simple/vuejs.svg"),
  wordpress: require("assets/icons/simple/wordpress.svg"),

  android: require("assets/icons/devicons/android.svg"),
  apple: require("assets/icons/devicons/apple.svg"),
  contentful: require("assets/icons/devicons/contentful.svg"),
  docker: require("assets/icons/devicons/docker.svg"),
  flutter: require("assets/icons/devicons/flutter.svg"),
  next: require("assets/icons/devicons/next.svg"),
  typescript: require("assets/icons/devicons/typescript.svg"),

  arrowsupdown: require("assets/icons/misc/arrows-updown.svg"),
  book: require("assets/icons/misc/book-svgrepo-com.svg"),
  closex: require("assets/icons/misc/close-x.svg"),
  live: require("assets/icons/misc/live-svgrepo-com.svg"),
  play: require("assets/icons/misc/play-svgrepo-com.svg"),
  plus: require("assets/icons/misc/plus.svg"),
  puppeteer: require("assets/icons/misc/puppeteer.svg"),
  search: require("assets/icons/misc/search.svg"),
  uparrow: require("assets/icons/misc/uparrow.svg"),
}
