import { sanityClient, urlFor } from "../../sanity";
import React from "react";
import { groq } from "next-sanity";
import { Author } from "../../types/types";
import PortableText from "react-portable-text";
import { FaLinkedin, FaRegEnvelope } from "react-icons/fa";
import NextImage from "next/image";

interface IProps {
  author: Author;
}

const AboutPage = (props: IProps) => {
  const { author } = props;

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
    normal: ({ children }: any) => (
      <p className="text-lg md:text-xl my-5">{children}</p>
    ),
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
      <div className="w-full flex flex-col gap-8 items-center">
        <NextImage
          className="rounded-full h-80 w-80 my-4"
          src={urlFor(author.image).url()!}
          alt="Author Image"
          height={320}
          width={320}
        />
        <div className="text-center">
          <PortableText
            content={author.bio}
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            serializers={serializers}
          />
        </div>

        <div className="flex flex-row gap-2 items-center">
          <a href={`mailto:${author.email}`} target="_blank">
            <FaRegEnvelope className="text-3xl hover:text-red-900 transition-colors ease-in-out duration-300" />
          </a>
          <a href={author.linkedin} target="_blank">
            <FaLinkedin className="text-3xl hover:text-blue-900 transition-colors ease-in-out duration-300" />
          </a>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const name = process.env.NEXT_PUBLIC_AUTHOR;
  const query = groq`
    *[_type == 'author' && name == $name] {
        _id,  
        slug,
        name,
        email,
        linkedin,
        image,
        bio
    }
    `;
  const author = await sanityClient.fetch(query, { name });

  return {
    props: {
      author: author[0]
    },
    revalidate: 24 * 60 * 60
  };
};

export default AboutPage;
