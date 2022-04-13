import React from "react";
import Link from "next/link";
import constants from "../lib/constants";

export default function Header() {
  return (
    <header className={"mt-5"}>
      <Link href="/" as="/">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>
          <h1 className="text-2xl">{constants.site.name}</h1>
        </a>
      </Link>
      <section>
        <ul className="flex justify-end list-none">
          <li className="pl-5">
            <Link href="/" as="/">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className="">武器検索</a>
            </Link>
          </li>
          <li className="pl-5">
            <Link href={"/spell"} as="/spell" prefetch>
               {/*eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
              <a className="">スペル検索</a>
            </Link>
          </li>
        </ul>
      </section>
    </header>
  );
}
