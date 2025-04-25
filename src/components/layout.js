import React from "react";
import Header from "./header";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <>
      <div id="portal" className="z-[999]"></div>
      <Header />
      <main className="pt-16 lg:pt-20 overflow-hidden">
        {children}
      </main>
      <Footer />
      <div id="skip-link" className="sr-only">
        <a href="#main-content" className="focus:not-sr-only">Skip to main content</a>
      </div>
    </>
  )
}