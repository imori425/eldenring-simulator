import { GetServerSidePropsContext } from "next";
import { generateSitemapXml } from "../lib/sitemap";

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  const xml = await generateSitemapXml(); // xmlコードを生成する処理（後で書く）

  res.statusCode = 200;
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate"); // 24時間のキャッシュ
  res.setHeader("Content-Type", "text/xml");
  res.end(xml);

  return {
    props: {},
  };
};

function Page(): null {
  return null;
}
export default Page;
