import React from "react";
import { sanityClient, urlFor } from "../../../sanity";
import { groq } from "next-sanity";
import { PostCategory } from "../../../types/types";
import { GetServerSidePropsContext } from "next";
import PortableText from "react-portable-text";
import NextImage from "next/image";

interface IProps {
  post: PostCategory;
}

const PostPage = ({ post }: IProps) => {
  const serializers = {
    ul: ({ children }: any) => <ul className="mt-xl list-disc">{children}</ul>,
    ol: ({ children }: any) => (
      <ul className="mt-xl list-decimal">{children}</ul>
    ),
    li: ({ children }: any) => <li className="ml-4">{children}</li>,
    link: ({ href, children }: any) => (
      <a
        href={href}
        target="_blank"
        rel="noindex nofollow"
        className="text-blue-500 hover:underline"
      >
        {children}
      </a>
    ),
    h1: (props: any) => <h1 className="text-4xl font-bold my-5" {...props} />,
    h2: (props: any) => <h1 className="text-3xl font-bold my-5" {...props} />,
    h3: (props: any) => <h1 className="text-2xl font-bold my-5" {...props} />,
    h4: (props: any) => <h1 className="text-xl font-bold my-5" {...props} />,
    normal: ({ children }: any) => <p className="text-lg my-5">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-slate-500 border-l-4 p-3">
        {children}
      </blockquote>
    ),
    code: ({ children }: any) => <code>{children}</code>,
    strong: ({ children }: any) => <strong>{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
    image: (props: any) => (
      <img
        className="mx-auto my-4"
        src={urlFor(props).url()!}
        loading="lazy"
        width={600}
      />
    )
  };

  return (
    <div className="p-5">
      <div className="relative w-full h-40 overflow-hidden">
        <NextImage
          className="w-full object-center"
          src={urlFor(post.mainImage).url()}
          alt="Main Image"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="my-5">
        <div className="flex flex-row gap-3 items-center">
          <img
            className="rounded-full w-12 h-12"
            src={urlFor(post.author.image).url()!}
            alt="Author's Image"
          />
          <div className="flex flex-col gap-1">
            <span className="text-lg font-semibold">{post.author.name}</span>
            <span className="text-md font-light">
              {new Date(String(post._createdAt)).toDateString().substring(4)}
            </span>
            <span className="text-md font-light">{post.estimatedReadingTime} min read</span>
          </div>
        </div>
      </div>

      <h1 className="text-5xl my-6">{post.title}</h1>

      <div>
        <PortableText
          content={post.body}
          dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
          serializers={serializers}
        />
      </div>
    </div>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params } = context;
  const category = params?.category;
  const slug = params?.slug;

  const query = groq`
  *[_type == 'post' && category->slug.current == $category && slug.current == $slug] {
    _id,
    slug,
    title,
    body,
    _createdAt,
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

  
  const post: [PostCategory] = await sanityClient.fetch(query, {
    category,
    slug
  });
  if (!post || post.length < 1) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      post: post[0]
    }
  };
};

export default PostPage;
