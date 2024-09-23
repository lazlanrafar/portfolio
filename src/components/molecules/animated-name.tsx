"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const AnimatedName = () => {
  const [text, setText] = useState("LAZLANRAFAR");
  const [intervalId] = useState<number | null>(null);
  const ref = useRef<HTMLHeadingElement | null>(null);

  const handleMouseOver = useCallback(() => {
    let iteration = 0;

    if (intervalId !== null) {
      clearTimeout(intervalId);
    }

    const animate = () => {
      setText((prevText) =>
        prevText
          .split("")
          .map((_, index) => {
            if (index < iteration) {
              return text[index];
            }
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("")
      );

      if (iteration < text.length) {
        iteration += 1 / 3;
        setTimeout(animate, 30);
      }
    };

    animate();
  }, [intervalId, text]);

  useEffect(() => {
    const currentRef = ref.current;

    if (currentRef) {
      currentRef.addEventListener("mouseover", handleMouseOver);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("mouseover", handleMouseOver);
      }
    };
  }, [handleMouseOver, ref]);

  return (
    <h1 ref={ref} className="text-[max(6vw,21px)] font-medium leading-none">
      {text}
    </h1>
  );
};
