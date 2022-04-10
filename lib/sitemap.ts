import { SitemapStream, streamToPromise } from "sitemap";

export async function generateSitemapXml() {
  const url = process.env.URL;
  const smStream = new SitemapStream({
    hostname: url,
    lastmodDateOnly: false,
  });

  // index page
  // 記事の最終更新日がindex pageの最終更新日とする
  smStream.write({
    url,
    changefreq: "daily",
    priority: 1.0,
  });

  smStream.end();

  const buffer = await streamToPromise(smStream);
  return buffer.toString();
}
