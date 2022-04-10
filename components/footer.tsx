import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-20">
      <small>
        <Link href="/feed.xml">
          <a className="float-right">
            RSS
          </a>
        </Link>
      </small>
    </footer>
  );
}
