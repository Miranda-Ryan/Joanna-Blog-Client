import React, { useEffect, useRef } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import lottie from "lottie-web";
import Hero from "../public/assets/hero.json";
import Typed from "typed.js";

const Home: NextPage = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: document.querySelector("#hero") as Element,
      animationData: Hero,
      renderer: "svg"
    });

    if (typedRef.current == null) return;

    const typed = new Typed(typedRef.current, {
      strings: ["", "Writer", "Researcher", "Editor", "Proof Reader"],
      startDelay: 300,
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 100,
      loop: true,
      showCursor: false
    });

    // Destropying
    return () => {
      typed.destroy();
      instance.destroy();
    };
  }, []);

  return (
    <div className="p-5 flex flex-col justify-center items-center mx-auto gap-8">
      <div className="w-full flex justify-center max-w-lg mx-auto">
        <div id="hero"></div>
      </div>
      <div className="mt-6 flex flex-col justify-center items-center mx-auto gap-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-rubik text-center">
          Content Creator
        </h1>
        <p
          className="text-lg md:text-xl lg:text-2xl font-rubik text-center h-7"
          ref={typedRef}
        />
        <Link href="/work">
          <a className="mt-3 p-3 bg-gray-600 text-white font-rubik hover:bg-gray-800 rounded-xl md:text-lg">
            View My Work
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
