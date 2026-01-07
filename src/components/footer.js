import React from "react";
import Logo from "./logo";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="z-10 relative pt-24 bg-gradient-to-t from-primary-50/50 to-transparent" aria-label="Footer">
      <div className="container mx-auto pb-16">
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-6">
          <div className="w-24 opacity-80 hover:opacity-100 transition-opacity duration-300 shrink-0">
            <Logo />
          </div>

          <div className="order-2 md:order-3">
            <SocialLinks variant="footer" />
          </div>
          <div className="text-center space-y-2 w-full md:w-auto order-3 md:order-2">
            <div className="text-sm text-neutral-500 font-light flex items-center justify-center gap-3">
               <span>&copy; {currentYear}</span>
               <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
               <a href="tel:+380632498807" className="hover:text-primary-600 transition-colors">+38 063 2498807</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}