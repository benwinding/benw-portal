"use client";
import { getBlogPosts } from "components/blog/useBlog";
import { Loading } from "components/Loading";
import { RainbowText } from "components/RainbowText";
import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styles from "./about.module.css";

const TRANSITION_DELAY = 300;

export default function Page() {
  const [blogPosts, setBlogPosts] = React.useState([]);

  React.useEffect(() => {
    let mounted = true;
    getBlogPosts().then(data => {
      let posts = data.slice(0, 6).map(item => {
        return {
          title: item.title,
          date: new Date(item.date).toDateString(),
          link: "https://blog.benwinding.com/" + item.path,
        };
      });
      console.log(posts);
      let delayMs = 0;
      for (let i = 0; i < posts.length; i++) {
        delayMs += TRANSITION_DELAY;
        setTimeout(() => {
          mounted && setBlogPosts(posts.slice(0, i));
        }, delayMs);
        if (!mounted) return;
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

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
          {!blogPosts?.length && <Loading text="Loading Posts..."></Loading>}
          <TransitionGroup>
            {blogPosts.map((blog) => (
              <CSSTransition
                key={blog.title}
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
  const image = React.useRef<HTMLImageElement>();

  React.useEffect(() => {
    if (image.current?.complete) setLoaded(true);
  }, []);

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
