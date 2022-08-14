import React, { useEffect } from "react";
import lottie from "lottie-web";
import PageNotFound from "../public/assets/error-404.json";
import Link from "next/link";

const ErrorPage = () => {
  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: document.querySelector("#page_notfound") as Element,
      animationData: PageNotFound,
      renderer: "svg"
    });

    return () => instance.destroy();
  }, []);

  return (
    <div className="p-5 flex flex-col justify-center items-center gap-6 md:gap-3">
      <div id="page_notfound" style={{ width: "400px", height: "400px" }} />
      <p className="text-lg md:text-xl font-rubik font-semibold">
        This page does not exist
      </p>

      <Link href="/about">
        <a className="mt-3 p-3 bg-gray-600 text-white font-rubik hover:bg-gray-800 rounded-xl md:text-lg">
          Go to My Profile
        </a>
      </Link>
    </div>
  );
};

export default ErrorPage;
