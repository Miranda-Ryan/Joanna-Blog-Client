import React, { useEffect } from "react";
import { groq } from "next-sanity";
import { sanityClient, urlFor } from "../../../sanity";
import { PostCategory } from "../../../types/types";
import Link from "next/link";
import lottie from "lottie-web";
import ItemNotFound from "../../../public/assets/not-found.json";
import { GetServerSidePropsContext } from "next";

interface IProps {
  posts: [PostCategory];
  category: string;
}

const CategoryPage = (props: IProps) => {
  const { posts, category } = props;

  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: document.querySelector("#item_notfound") as Element,
      animationData: ItemNotFound,
      renderer: "svg"
    });

    return () => instance.destroy();
  }, []);

  if (!posts || posts.length < 1) {
    return (
      <div className="p-5 flex flex-col justify-center items-center gap-6 md:gap-3">
        <div id="item_notfound" style={{ width: "400px", height: "400px" }} />
        <p className="text-lg md:text-xl font-rubik font-semibold">
          There are no {category} yet!
        </p>

        <Link href="/work">
          <a className="mt-3 p-3 bg-gray-600 text-white font-rubik hover:bg-gray-800 rounded-xl md:text-lg">
            Go to My Work
          </a>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h1 className="text-center text-2xl mb-5 font-bold font-rubik">
        {category.toUpperCase()}
      </h1>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link href={`/work/${category}/${post.slug.current}`} key={post._id}>
            <div className="group w-full rounded-md overflow-hidden cursor-pointer border border-gray-300">
              <img
                src={urlFor(post.mainImage).url()!}
                className="object-contain group-hover:scale-105 transition-transform ease-in-out duration-200"
                alt="post-image"
              />
              <div className="p-3">
                <p className="uppercase font-semibold text-md flex mt-2 font-rubik">
                  {post.title}
                </p>
                <div className="flex flex-row justify-between items-center mt-3">
                  <p>{post.estimatedReadingTime} min read</p>
                  <p>
                    {new Date(String(post._createdAt))
                      .toDateString()
                      .substring(4)}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const category = query?.category;

  const sanityQuery = groq`
  *[_type == 'post' && category->slug.current == $category] | order(_createdAt desc) {
    _id,
    _createdAt,
    slug,
    title,
    author->{
     name,
     image
    },
    category->{
     slug
    },
    mainImage,
    "numberOfCharacters": length(pt::text(body)),
    "estimatedWordCount": round(length(pt::text(body)) / 5),
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200 )
  }
  `;
  const posts = await sanityClient.fetch(sanityQuery, {
    category
  });

  if (!posts || posts.length < 1) {
    return {
      props: {
        posts: []
      }
    };
  }

  return {
    props: {
      posts,
      category
    }
  };
};

export default CategoryPage;
