import React, { useEffect } from "react";
import Link from "next/link";
import { groq } from "next-sanity";
import { sanityClient, urlFor } from "../../sanity";
import { Category } from "../../types/types";
import lottie from "lottie-web";
import ItemNotFound from "../../public/assets/not-found.json";

interface IProps {
  categories: [Category];
}

const WorkPage = (props: IProps) => {
  const { categories } = props;

  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: document.querySelector("#item_notfound") as Element,
      animationData: ItemNotFound,
      renderer: "svg"
    });

    return () => instance.destroy();
  }, []);

  if (!categories || categories.length < 1) {
    return (
      <div className="p-5 flex flex-col justify-center items-center gap-6 md:gap-3">
        <div id="item_notfound" style={{ width: "400px", height: "400px" }} />
        <p className="text-lg md:text-xl font-rubik font-semibold">
          There are no categories yet!
        </p>

        <Link href="/about">
          <a className="mt-3 p-3 bg-gray-600 text-white font-rubik hover:bg-gray-800 rounded-xl md:text-lg">
            Go to My Profile
          </a>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h1 className="text-center text-2xl mb-5 font-semibold font-rubik">CATEGORIES</h1>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link href={`/work/${category.slug.current}`} key={category._id}>
            <div className="group w-full relative rounded-md overflow-hidden cursor-pointer">
              <img
                src={urlFor(category.image).url()!}
                className="object-contain group-hover:scale-105 transition-transform ease-in-out duration-200"
                alt="category-image"
              />
              <a className="absolute top-0 left-0 uppercase text-white font-bold text-5xl w-full h-full flex items-center justify-center font-rubik">
                {category.title}
              </a>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const query = groq`
  *[_type == 'category'] {
    _id,
    title,
    slug,
    image
  }
  `;

  const categories: [Category] = await sanityClient.fetch(query);
  if (!categories || categories.length < 1) {
    return {
      props: {
        categories: []
      }
    };
  }

  return {
    props: {
      categories
    },
    revalidate: 24 * 60 * 60
  };
};

export default WorkPage;
