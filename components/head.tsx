import React from "react";
import Head from "next/head";
import constants from "../lib/constants";

export type OgType = "website" | "article";
export type HeadProps = {
  title: string;
  description: string;
  keyword: string;
  image: string;
  path: string;
  ogType: OgType;
};

function HeadLayout({
  title,
  description,
  keyword,
  image,
  path,
  ogType,
}: HeadProps): JSX.Element {
  const url = `${process.env.URL}${path}`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="keywords" content={keyword} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={constants.site.name} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@tcr_jp" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link type="application/xml" href="/sitemap.xml" />
      <link rel="canonical" href={url} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/favicon.ico" />
    </Head>
  );
}

export default HeadLayout;
