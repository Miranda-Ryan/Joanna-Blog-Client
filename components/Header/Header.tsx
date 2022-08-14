import React, { Fragment } from "react";
import { NextPage } from "next";
import Link from "next/link";

const Header: NextPage = () => {
  return (
    <Fragment>
      <nav className="w-full max-w-5xl mx-auto flex flex-row gap-2 p-5 justify-between items-center">
        <Link href="/">
          <a className="text-2xl md:text-3xl font-bold text font-rubik">
            Joanna Dias
          </a>
        </Link>

        <div className="flex flex-row gap-5 md:gap-8">
          <Link href="/about">
            <a
              id="about_link"
              className="text-lg md:text-xl text-gray-500 hover:text-gray-400 font-rubik"
            >
              About Me
            </a>
          </Link>
          <Link href="/work">
            <a
              id="work_link"
              className="text-lg md:text-xl text-gray-500 hover:text-gray-400 font-rubik"
            >
              My Work
            </a>
          </Link>
        </div>
      </nav>
      <hr className="w-full bg-gray-400" />
    </Fragment>
  );
};

export default Header;
