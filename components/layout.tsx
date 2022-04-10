import React from "react";
import HeadLayout from "./head";
import constants from "../lib/constants";
import Header from "./header";
import Footer from "./footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // <div className="container mx-auto prose prose-slate p-5 max-w-max">
        <div className="container mx-auto ">
      <HeadLayout
        path=""
        description={constants.site.description}
        image={process.env.URL + constants.site.defaultImageUrl}
        keyword={constants.site.description}
        title={constants.site.name}
        ogType="website"
      />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
