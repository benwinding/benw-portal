"use client";
import { useBlogPosts } from "components/blog/useBlogPosts";
import { Loading } from "components/Loading";
import { RainbowText } from "components/RainbowText";
import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styles from "./about.module.css";

function useTimeoutCount(delayMs: number, onInterval: () => void) {
  React.useEffect(() => {
    const interval = setInterval(() => {
      onInterval();
    }, delayMs);
    return () => {
      clearInterval(interval);
    };
  }, [delayMs, onInterval]);
}

const TRANSITION_DELAY = 300;

export default function Page() {
  const blogPostsAll = useBlogPosts();
  const [showCount, setShowCount] = React.useState(0);
  useTimeoutCount(TRANSITION_DELAY, () => {
    if (blogPostsAll.length && showCount <= 6) {
      setShowCount(c => c + 1);
    }
  });
  const cssNodeRef = React.useRef(null);
  const posts = React.useMemo(() =>
    blogPostsAll.slice(0, showCount).map(item => ({
      title: item.title,
      date: new Date(item.date).toDateString(),
      link: "https://blog.benwinding.com/" + item.path,
    })), [blogPostsAll, showCount]);

  return (
    <>
      <RainbowText text="About"></RainbowText>
      <div className="flex flex-col md:flex-row">
        <img
          className="w-64 h-64 rounded-full border-8 border-red-900 p-1 mr-6 shadow-lg shadow-2xl"
          src="/images/pic.jpg"
          alt="selfie!"
        />
        <div className="w-full">
          <h2 className="text-2xl">History</h2>
          <p className="mb-2">
            Growing up in Adelaide, South Australia. Ben began his life as a normal child, with all the prospects of
            becoming a contributing member of society. He's trying his best and will continue to do so.
          </p>
          <h2 className="text-2xl">Now</h2>
          <p className="mb-2">
            He intends to be a successful web developer, making the internet a better place for all those who use it.
            {" "}
            <a className="link" href="/projects/">See projects!</a>
          </p>
          <h2 className="text-2xl">Development</h2>
          <p className="mb-2">
            Github contributions (
            <a href="https://github.com/benwinding">
              source
            </a>)
          </p>
          <GithubContributions />
          <h2 className="text-2xl">Writing</h2>
          {!posts?.length && <Loading text="Loading Posts..."></Loading>}
          <TransitionGroup>
            {posts.map((blog) => (
              <CSSTransition
                key={blog.title}
                nodeRef={cssNodeRef}
                timeout={1000}
                classNames={{
                  enterActive: styles.MyClassEnterActive,
                  enterDone: styles.MyClassEnterDone,
                }}
              >
                <div className="mb-1" key={blog.title}>
                  <a className="flex flex-col" href={blog.link}>
                    <p className="-mb-2 text-gray-600 text-xs">{blog.date}</p>
                    <p className="m-0 title">{blog.title}</p>
                  </a>
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    </>
  );
}

function GithubContributions() {
  const [loaded, setLoaded] = React.useState(false);
  const image = React.useRef<HTMLImageElement>(null);

  const imageComplete = image.current?.complete;
  React.useEffect(() => {
    if (imageComplete) setLoaded(true);
  }, [imageComplete]);

  return (
    <>
      {!loaded && <Loading text="Loading Contributions..."></Loading>}
      <a href="https://github.com/benwinding">
        <img
          ref={image}
          onLoad={() => setLoaded(true)}
          width="100%"
          className="mb-3 overflow-hidden"
          style={{ height: !loaded ? "0px" : "unset" }}
          src="https://ghchart.rshah.org/benwinding"
          alt="Ben Winding's Github Contributions"
        />
      </a>
    </>
  );
}
