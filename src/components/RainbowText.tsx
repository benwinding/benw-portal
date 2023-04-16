"use client";
import classNames from "classnames";
import interpolate from "color-interpolate";
import React from "react";
import styles from "./RainbowText.module.css";

export function RainbowText(props: {
  text: string;
  large?: boolean;
}) {
  return (
    <div
      className={classNames(
        "uppercase",
        props.large
          ? "text-6xl xs:text-10xl sm:text-12xl"
          : "text-5xl sm:text-8xl",
      )}
    >
      {Array.from(props.text).map((letter, index) => (
        <span key={index}>
          {letter !== " " && (
            <RainbowLetter
              letter={letter}
              color={getColor(index, props.text.length)}
            >
            </RainbowLetter>
          )}
        </span>
      ))}
    </div>
  );
}

function getColor(index: number, max: number): string {
  const colors = [
    "#800000",
    "#A21051",
    "#9D4B9E",
    "#6B7DD8",
    "#00A8F1",
    "#00CBEB",
  ].reverse();
  let colormap = interpolate(colors);
  const min = 0;
  const val = (max - index) / (max - min);
  return colormap(val);
}

function RainbowLetter(props: {
  letter: string;
  color: string;
}) {
  const [hovered, setHovered] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    if (!hovered) return;
    setTimeout(() => mounted && setHovered(false), 3200);
    return () => {
      mounted = false;
    };
  }, [hovered]);

  const onHover = () => {
    if (hovered) return;
    setHovered(true);
  };

  return (
    <span
      className={classNames(styles.letter, {
        [styles.hovered]: hovered,
      })}
      style={{ color: props.color }}
      onMouseOver={onHover}
    >
      {props.letter}
    </span>
  );
}
